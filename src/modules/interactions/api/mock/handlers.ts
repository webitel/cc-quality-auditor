import { HttpResponse, http } from 'msw';

import {
	isInRange,
	isOneOf,
	paginateItems,
	sortItems,
} from '../../../../mocks/utils';
import { InteractionStatusWire } from '../../enums/InteractionStatusWire.enum';
import { InteractionTypeWire } from '../../enums/InteractionTypeWire.enum';
import { InteractionsUrl } from '../InteractionsAPIRepository';
import { interactionsMock } from './interactionsMock';

const getRange = (query: URLSearchParams, key: string) => ({
	from: query.get(`${key}.from`),
	to: query.get(`${key}.to`),
});

const getWireValues = (
	query: URLSearchParams,
	key: string,
	map: Record<string, string>,
) => query.getAll(key).map((value) => map[value]);

export const interactionsHandlers = [
	http.get(
		`${import.meta.env.VITE_API_URL}${InteractionsUrl}`,
		({ request }) => {
			const query = new URL(request.url).searchParams;

			const filteredItems = interactionsMock.filter(
				(item) =>
					isInRange(item.created_at, getRange(query, 'interaction_date')) &&
					isOneOf(
						item.type,
						getWireValues(query, 'interaction_type', InteractionTypeWire),
					) &&
					isOneOf(item.contact?.id, query.getAll('contact_id')) &&
					isOneOf(item.agent?.id, query.getAll('agent_id')) &&
					isOneOf(item.team?.id, query.getAll('team_id')) &&
					isInRange(item.duration, getRange(query, 'duration')) &&
					isOneOf(
						item.status,
						getWireValues(query, 'status', InteractionStatusWire),
					) &&
					isOneOf(item.evaluation?.assignee.id, query.getAll('assignee_id')) &&
					isInRange(item.evaluation?.score, getRange(query, 'score')),
			);

			return HttpResponse.json(
				paginateItems(sortItems(filteredItems, query.get('sort')), {
					page: Number(query.get('page')),
					size: Number(query.get('size')),
				}),
			);
		},
	),
];
