import { getDefaultGetParams } from '@webitel/api-services/api/defaults';
import { applyTransform, merge } from '@webitel/api-services/api/transformers';
import { normalizeToTimestamp } from '@webitel/ui-sdk/scripts';

import { NotRequestedFields, RequiredFields } from '../configs/searchFields';
import { InteractionStatusWire } from '../enums/InteractionStatusWire.enum';
import { InteractionTypeWire } from '../enums/InteractionTypeWire.enum';
import type {
	GetInteractionsParams,
	InteractionsRange,
} from '../types/interaction';

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

const toWireRange = (range?: InteractionsRange) => {
	if (!range) return undefined;
	const { from, to } = range;
	if (from == null && to == null) return undefined;
	return {
		from: from == null ? undefined : String(from),
		to: to == null ? undefined : String(to),
	};
};

const toWireList = <T>(values?: T[], map?: Record<string, string>) => {
	if (!values?.length) return undefined;
	return values.map((value) => (map ? map[String(value)] : String(value)));
};

const getRequestFields = (fields: string[] = []) => [
	...new Set([
		...RequiredFields,
		...fields
			.filter((field) => !NotRequestedFields.includes(field))
			.map((field) => field.split('.')[0]),
	]),
];

export const getSearchBody = ({
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
}: GetInteractionsParams) =>
	applyTransform(
		{
			page,
			size,
			sort,
			fields: getRequestFields(fields),
			filter: {
				created_at: toWireRange(normalizeInteractionDate(createdAt)),
				type: toWireList(interactionType, InteractionTypeWire),
				contact_id: toWireList(contact),
				agent_id: toWireList(agent),
				team_id: toWireList(team),
				duration: toWireRange(talkDuration),
				status: toWireList(interactionStatus, InteractionStatusWire),
				assignee_id: toWireList(user),
				score: toWireRange(score),
			},
		},
		[
			merge(getDefaultGetParams()),
		],
	);
