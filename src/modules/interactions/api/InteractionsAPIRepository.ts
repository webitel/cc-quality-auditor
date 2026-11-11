import {
	getDefaultGetListResponse,
	getDefaultInstance,
} from '@webitel/api-services/api/defaults';
import {
	applyTransform,
	merge,
	notify,
	snakeToCamel,
} from '@webitel/api-services/api/transformers';

import { getSearchBody } from '../scripts/getSearchBody';
import { toInteractionsListItem } from '../scripts/toInteractionsListItem';
import type {
	GetInteractionsParams,
	InteractionKey,
	InteractionResponseItem,
} from '../types/interaction';

export const InteractionsUrl = '/v1/audit/interactions';
export const EvaluationsUrl = '/v1/audit/evaluations';

const instance = getDefaultInstance();

const getList = async (params: GetInteractionsParams) => {
	try {
		const response = await instance.post(
			`${InteractionsUrl}/search`,
			getSearchBody(params),
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: (items as InteractionResponseItem[]).map(toInteractionsListItem),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const assign = async ({
	interactions,
	assigneeId,
}: {
	interactions: InteractionKey[];
	assigneeId: string;
}) => {
	try {
		const response = await instance.post(`${EvaluationsUrl}/assign`, {
			interactions,
			assignee_id: assigneeId,
		});
		return response.data;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const InteractionsAPIRepository = {
	getList,
	assign,
};

export default InteractionsAPIRepository;
