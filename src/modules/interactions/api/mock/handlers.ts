import { InteractionStatus } from '@webitel/api-services/enums';
import { HttpResponse, http } from 'msw';

import {
	isInRange,
	isOneOf,
	paginateItems,
	sortItems,
} from '../../../../mocks/utils';
import { EvaluationsUrl, InteractionsUrl } from '../InteractionsAPIRepository';
import { getCallTranscripts, interactionsMock } from './interactionsMock';

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
		`${import.meta.env.VITE_API_URL}${EvaluationsUrl}/assign`,
		async ({ request }) => {
			const { interactions, assignee_id } = (await request.json()) as {
				interactions: {
					type: string;
					id: string;
				}[];
				assignee_id: string;
			};

			const assigned = interactions.filter(({ type, id }) => {
				const item = interactionsMock.find(
					(row) => row.type === type && row.id === id,
				);
				if (!item || item.status === InteractionStatus.Completed) return false;
				item.status = InteractionStatus.Pending;
				item.evaluation = {
					...item.evaluation,
					id: item.evaluation?.id ?? `${5500 + interactionsMock.indexOf(item)}`,
					assignee: {
						id: assignee_id,
						name: `Evaluator ${assignee_id}`,
					},
				};
				return true;
			});

			return HttpResponse.json({
				interactions: assigned,
				failures: interactions
					.filter((key) => !assigned.includes(key))
					.map((interaction) => ({
						interaction,
						error: {
							code: 9,
							message: 'Evaluation is completed',
						},
					})),
			});
		},
	),
	http.post(
		`${import.meta.env.VITE_API_URL}/storage/transcript_file`,
		async ({ request }) => {
			const { file_id } = (await request.json()) as {
				file_id: string[];
			};

			const items = interactionsMock.flatMap(({ call }) => {
				const files = call?.files.filter(({ id }) => file_id.includes(id));
				if (!call || !files?.length) return [];
				const transcripts = getCallTranscripts(files);
				call.transcripts.push(...transcripts);
				return transcripts.map(({ id, file_id }) => ({
					id,
					file_id,
					created_at: String(Date.now()),
				}));
			});

			return HttpResponse.json({
				items,
			});
		},
	),
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
