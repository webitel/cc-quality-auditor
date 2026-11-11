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

type InteractionKey = {
	type: string;
	id: string;
};

type SearchFilter = {
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

type SearchRequest = {
	page: number;
	size: number;
	sort?: string;
	filter?: SearchFilter;
};

type ExportRequest = {
	sort?: string;
	filter?: SearchFilter;
	interactions?: InteractionKey[];
	format: string;
	separator?: string;
};

const ExportColumns = [
	'type',
	'id',
	'created_at',
	'status',
] as const;

const getCustomer = ({
	direction,
	from,
	to,
}: (typeof interactionsMock)[number]) =>
	(direction === 'outbound' ? to : from)?.number;

const findItems = (filter: SearchFilter = {}, sort?: string) =>
	sortItems(
		interactionsMock
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
			})),
		sort,
	);

export const interactionsHandlers = [
	http.post(
		`${import.meta.env.VITE_API_URL}${EvaluationsUrl}/assign`,
		async ({ request }) => {
			const { interactions, assignee_id } = (await request.json()) as {
				interactions: InteractionKey[];
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

			const { items, next } = paginateItems(findItems(filter, sort), {
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
	http.post(
		`${import.meta.env.VITE_API_URL}${InteractionsUrl}/export`,
		async ({ request }) => {
			const {
				sort,
				filter,
				interactions = [],
				separator = ',',
			} = (await request.json()) as ExportRequest;

			const rows = findItems(filter, sort)
				.filter(
					(item) =>
						!interactions.length ||
						interactions.some(
							({ type, id }) => item.type === type && item.id === id,
						),
				)
				.map((item) =>
					ExportColumns.map((column) => item[column]).join(separator),
				);

			return new HttpResponse(
				[
					ExportColumns.join(separator),
					...rows,
				].join('\n'),
				{
					headers: {
						'Content-Type': 'text/csv',
					},
				},
			);
		},
	),
];
