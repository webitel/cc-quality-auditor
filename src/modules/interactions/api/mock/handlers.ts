import { camelToSnake } from '@webitel/api-services/api/transformers';
import { InteractionStatus } from '@webitel/api-services/enums';
import { HttpResponse, http } from 'msw';

import {
	isInRange,
	isOneOf,
	paginateItems,
	sortItems,
} from '../../../../mocks/utils';
import { InteractionsUrl } from '../InteractionsAPIRepository';
import { interactionsMock } from './interactionsMock';

type InteractionWire = Record<string, unknown> & {
	agent?: {
		id: string;
	};
	team?: {
		id: string;
	};
	assignee?: {
		id: string;
	};
	contact?: {
		id: string;
	};
};

const getRange = (query: URLSearchParams, key: string) => ({
	from: query.get(`${key}.from`),
	to: query.get(`${key}.to`),
});

// URL, назви параметрів і формат відповіді — припущення до контракту DT-65
export const interactionsHandlers = [
	http.get(
		`${import.meta.env.VITE_API_URL}${InteractionsUrl}`,
		({ request }) => {
			const query = new URL(request.url).searchParams;
			const items = camelToSnake()(interactionsMock) as InteractionWire[];

			const filteredItems = items.filter(
				(item) =>
					isInRange(
						item.interaction_date,
						getRange(query, 'interaction_date'),
					) &&
					isOneOf(item.interaction_type, query.getAll('interaction_type')) &&
					isOneOf(item.contact?.id, query.getAll('contact_id')) &&
					isOneOf(item.agent?.id, query.getAll('agent_id')) &&
					isOneOf(item.team?.id, query.getAll('team_id')) &&
					isInRange(item.duration, getRange(query, 'duration')) &&
					isOneOf(item.status, query.getAll('status')) &&
					isOneOf(item.assignee?.id, query.getAll('assignee_id')) &&
					isInRange(item.score, getRange(query, 'score')) &&
					isOneOf(item.id, query.getAll('id')),
			);

			return HttpResponse.json(
				paginateItems(sortItems(filteredItems, query.get('sort')), {
					page: Number(query.get('page')),
					size: Number(query.get('size')),
				}),
			);
		},
	),
	http.post(
		`${import.meta.env.VITE_API_URL}/storage/transcript_file`,
		async ({ request }) => {
			const { uuid } = (await request.json()) as {
				uuid: string[];
			};

			interactionsMock
				.filter(({ id }) => uuid.includes(id))
				.forEach((item) => {
					item.transcripts.push({
						id: `transcript-${item.id}`,
						file: {
							name: item.files[0]?.name,
						},
					});
				});

			return HttpResponse.json({
				items: [],
			});
		},
	),
	http.get(
		`${import.meta.env.VITE_API_URL}/storage/transcript_file/:id/phrases`,
		() =>
			HttpResponse.json({
				items: [
					{
						channel: 0,
						start_sec: 0,
						end_sec: 4,
						phrase: 'Hello, how can I help you?',
					},
					{
						channel: 1,
						start_sec: 5,
						end_sec: 9,
						phrase: 'I would like to check my order.',
					},
				],
			}),
	),
	http.get(
		`${import.meta.env.VITE_API_URL}/storage/recordings/:id/download`,
		() =>
			new HttpResponse(new Uint8Array(16), {
				headers: {
					'Content-Type': 'application/octet-stream',
				},
			}),
	),
	http.post(
		`${import.meta.env.VITE_API_URL}${InteractionsUrl}/assign`,
		async ({ request }) => {
			const { interaction_ids, assignee } = (await request.json()) as {
				interaction_ids: string[];
				assignee: {
					id: string;
					name: string;
				};
			};

			interactionsMock
				.filter(({ id }) => interaction_ids.includes(id))
				.forEach((item) => {
					item.status = InteractionStatus.Pending;
					item.assignee = assignee;
				});

			return HttpResponse.json({});
		},
	),
];
