import {
	getDefaultGetListResponse,
	getDefaultGetParams,
	getDefaultInstance,
} from '@webitel/api-services/api/defaults';
import {
	applyTransform,
	generateUrl,
	merge,
	notify,
	snakeToCamel,
} from '@webitel/api-services/api/transformers';
import { normalizeToTimestamp } from '@webitel/ui-sdk/scripts';

import { toInteractionsListItem } from '../scripts/toInteractionsListItem';
import type {
	GetInteractionsParams,
	InteractionsRange,
} from '../types/interaction';

// URL і назви параметрів — припущення до контракту DT-65
export const InteractionsUrl = '/interactions';

const instance = getDefaultInstance();

const normalizeInteractionDate = (value?: string | InteractionsRange) => {
	if (typeof value !== 'string') return value;
	return {
		from: normalizeToTimestamp(value, {
			round: 'start',
		}),
		to: normalizeToTimestamp(value, {
			round: 'end',
		}),
	};
};

const getList = async ({
	page,
	size,
	sort,
	fields,
	createdAt,
	interactionType,
	contact,
	agent,
	team,
	talkDuration,
	interactionStatus,
	user,
	score,
}: GetInteractionsParams) => {
	const interactionDate = normalizeInteractionDate(createdAt);

	const url = applyTransform(
		{
			page,
			size,
			sort,
			fields,
			'interaction_date.from': interactionDate?.from,
			'interaction_date.to': interactionDate?.to,
			interaction_type: interactionType,
			contact_id: contact,
			agent_id: agent,
			team_id: team,
			'duration.from': talkDuration?.from,
			'duration.to': talkDuration?.to,
			status: interactionStatus,
			assignee_id: user,
			'score.from': score?.from,
			'score.to': score?.to,
		},
		[
			merge(getDefaultGetParams()),
			generateUrl(InteractionsUrl),
		],
	);

	try {
		const response = await instance.get(url);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: items.map(toInteractionsListItem),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const InteractionsAPIRepository = {
	getList,
};

export default InteractionsAPIRepository;
