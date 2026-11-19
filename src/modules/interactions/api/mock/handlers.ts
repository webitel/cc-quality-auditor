import { InteractionStatus } from '@webitel/api-services/enums';
import type {
	EngineCallAnnotation,
	EngineCallServiceCreateCallAnnotationBody,
	EngineCallServiceUpdateCallAnnotationBody,
} from '@webitel/api-services/gen-wire/models';
import { HttpResponse, http } from 'msw';

import {
	isInRange,
	isOneOf,
	paginateItems,
	sortItems,
} from '../../../../mocks/utils';
import { EvaluationsUrl, InteractionsUrl } from '../InteractionsAPIRepository';
import {
	DeletedRecordingFileId,
	getCallTranscripts,
	interactionsMock,
} from './interactionsMock';

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
	due_at?: Range;
	rated_at?: Range;
	scorecard_id?: string[];
	handled_by?: string[];
	first_response_sec?: Range;
	message_count?: Range;
	skipped_by_id?: string[];
	skipped_at?: Range;
	q?: string;
	fts?: string;
	agent_description?: string;
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

const SearchTopics = [
	'order delivery',
	'refund request',
	'password reset',
	'tariff change',
	'connection issue',
] as const;

const getTopic = (item: (typeof interactionsMock)[number], shift = 0) =>
	SearchTopics[(interactionsMock.indexOf(item) + shift) % SearchTopics.length];

const getConversationText = (item: (typeof interactionsMock)[number]) =>
	item.chat || item.call?.transcripts.length ? getTopic(item) : undefined;

const getAgentComment = (item: (typeof interactionsMock)[number]) =>
	item.agent ? `Customer asked about ${getTopic(item, 2)}` : undefined;

const includesText = (text?: string, query?: string) =>
	!query || !!text?.toLowerCase().includes(query.toLowerCase());

const getSilentWav = (seconds: number) => {
	const sampleRate = 8000;
	const channels = 2;
	const dataSize = sampleRate * seconds * channels * 2;
	const view = new DataView(new ArrayBuffer(44 + dataSize));
	const writeText = (offset: number, text: string) =>
		[
			...text,
		].forEach((char, index) => {
			view.setUint8(offset + index, char.charCodeAt(0));
		});
	writeText(0, 'RIFF');
	view.setUint32(4, 36 + dataSize, true);
	writeText(8, 'WAVE');
	writeText(12, 'fmt ');
	view.setUint32(16, 16, true);
	view.setUint16(20, 1, true);
	view.setUint16(22, channels, true);
	view.setUint32(24, sampleRate, true);
	view.setUint32(28, sampleRate * channels * 2, true);
	view.setUint16(32, channels * 2, true);
	view.setUint16(34, 16, true);
	writeText(36, 'data');
	view.setUint32(40, dataSize, true);
	return view.buffer;
};

const MockAnnotationAuthor = {
	id: '0',
	name: 'Evaluator 1',
};

const findCall = (callId: string) =>
	interactionsMock.find(({ call }) => call?.id === callId)?.call;

const callNotFound = () =>
	HttpResponse.json(
		{
			code: 5,
			message: 'Call not found',
		},
		{
			status: 404,
		},
	);

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
					isInRange(item.evaluation?.score, filter.score) &&
					isInRange(item.evaluation?.due_at, filter.due_at) &&
					isInRange(item.evaluation?.rated_at, filter.rated_at) &&
					isOneOf(item.evaluation?.scorecard?.id, filter.scorecard_id) &&
					isOneOf(item.handled_by, filter.handled_by) &&
					isInRange(item.chat?.first_response_sec, filter.first_response_sec) &&
					isInRange(item.chat?.message_count, filter.message_count) &&
					isOneOf(item.evaluation?.skipped_by?.id, filter.skipped_by_id) &&
					isInRange(item.evaluation?.skipped_at, filter.skipped_at) &&
					includesText(getCustomer(item), filter.q) &&
					includesText(getConversationText(item), filter.fts) &&
					includesText(getAgentComment(item), filter.agent_description),
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
	http.delete(
		`${import.meta.env.VITE_API_URL}${EvaluationsUrl}`,
		({ request }) => {
			const ids = new URL(request.url).searchParams.getAll('id');

			const deleted = ids.filter((id) => {
				const item = interactionsMock.find(
					({ evaluation }) => evaluation?.id === id,
				);
				if (!item) return false;
				item.status = InteractionStatus.NotEvaluated;
				item.evaluation = undefined;
				return true;
			});

			return HttpResponse.json({
				id: deleted,
				failures: ids
					.filter((id) => !deleted.includes(id))
					.map((id) => ({
						id,
						error: {
							code: 5,
							message: 'Evaluation not found',
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
	http.delete(
		`${import.meta.env.VITE_API_URL}/storage/transcript_file`,
		async ({ request }) => {
			const { id = [] } = (await request.json()) as {
				id?: string[];
			};

			interactionsMock.forEach(({ call }) => {
				if (!call) return;
				call.transcripts = call.transcripts.filter(
					(transcript) => !id.includes(transcript.id),
				);
			});

			return HttpResponse.json({
				items: id,
			});
		},
	),
	http.post(
		`${import.meta.env.VITE_API_URL}/calls/history/:callId/annotation`,
		async ({ params, request }) => {
			const call = findCall(String(params.callId));
			if (!call) return callNotFound();

			const body =
				(await request.json()) as EngineCallServiceCreateCallAnnotationBody;
			const annotation: EngineCallAnnotation = {
				...body,
				id: `${Date.now()}`,
				call_id: call.id,
				created_at: String(Date.now()),
				created_by: MockAnnotationAuthor,
			};
			call.annotations.push(annotation);

			return HttpResponse.json(annotation);
		},
	),
	http.put(
		`${import.meta.env.VITE_API_URL}/calls/history/:callId/annotation/:id`,
		async ({ params, request }) => {
			const annotation = findCall(String(params.callId))?.annotations.find(
				({ id }) => id === params.id,
			);
			if (!annotation) return callNotFound();

			Object.assign(
				annotation,
				(await request.json()) as EngineCallServiceUpdateCallAnnotationBody,
				{
					updated_at: String(Date.now()),
					updated_by: MockAnnotationAuthor,
				},
			);

			return HttpResponse.json(annotation);
		},
	),
	http.delete(
		`${import.meta.env.VITE_API_URL}/calls/history/:callId/annotation/:id`,
		({ params }) => {
			const call = findCall(String(params.callId));
			const annotation = call?.annotations.find(({ id }) => id === params.id);
			if (!call || !annotation) return callNotFound();

			call.annotations = call.annotations.filter((item) => item !== annotation);

			return HttpResponse.json(annotation);
		},
	),
	http.get(
		`${import.meta.env.VITE_API_URL}/storage/recordings/:id/:mode`,
		({ params }) =>
			params.id === DeletedRecordingFileId
				? new HttpResponse(null, {
						status: 404,
					})
				: new HttpResponse(getSilentWav(60), {
						headers: {
							'Content-Type': 'audio/wav',
						},
					}),
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
	http.get(
		`${import.meta.env.VITE_API_URL}${InteractionsUrl}/:type/:id`,
		({ params }) => {
			const item = interactionsMock.find(
				({ type, id }) => type === params.type && id === params.id,
			);
			if (!item) {
				return HttpResponse.json(
					{
						code: 5,
						message: 'Interaction not found',
					},
					{
						status: 404,
					},
				);
			}
			return HttpResponse.json(item);
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
