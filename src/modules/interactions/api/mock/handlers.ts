import { HttpResponse, http } from 'msw';

import {
	isInRange,
	isOneOf,
	paginateItems,
	sortItems,
} from '../../../../mocks/utils';
import { InteractionsUrl } from '../InteractionsAPIRepository';
import { interactionsMock } from './interactionsMock';

type Range = {
	from?: string;
	to?: string;
};

type SearchRequest = {
	page: number;
	size: number;
	sort?: string;
	filter?: {
		created_at?: Range;
		type?: string[];
		contact_id?: string[];
		agent_id?: string[];
		team_id?: string[];
		duration?: Range;
		status?: string[];
		assignee_id?: string[];
		score?: Range;
	};
};

const getCustomer = ({
	direction,
	from,
	to,
}: (typeof interactionsMock)[number]) =>
	(direction === 'outbound' ? to : from)?.number;

export const interactionsHandlers = [
	http.post(
		`${import.meta.env.VITE_API_URL}${InteractionsUrl}/search`,
		async ({ request }) => {
			const {
				page,
				size,
				sort,
				filter = {},
			} = (await request.json()) as SearchRequest;

			const filteredItems = interactionsMock
				.filter(
					(item) =>
						isInRange(item.created_at, filter.created_at) &&
						isOneOf(item.type, filter.type) &&
						isOneOf(item.contact?.id, filter.contact_id) &&
						isOneOf(item.agent?.id, filter.agent_id) &&
						isOneOf(item.team?.id, filter.team_id) &&
						isInRange(item.duration, filter.duration) &&
						isOneOf(item.status, filter.status) &&
						isOneOf(item.evaluation?.assignee.id, filter.assignee_id) &&
						isInRange(item.evaluation?.score, filter.score),
				)
				.map((item) => ({
					...item,
					customer: getCustomer(item),
				}));

			const { items, next } = paginateItems(sortItems(filteredItems, sort), {
				page,
				size,
			});

			return HttpResponse.json({
				next,
				items: items.map(({ customer, ...item }) => item),
				unavailable: [],
			});
		},
	),
];
