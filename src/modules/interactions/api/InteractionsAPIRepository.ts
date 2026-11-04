import { CallTranscriptAPI } from '@webitel/api-services/api';
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
import type { ChannelType } from '@webitel/api-services/enums';
import { InteractionStatus } from '@webitel/api-services/enums';
import type {
	EngineCallFile,
	EngineTranscriptLookup,
} from '@webitel/api-services/gen/models';
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { convertDuration, normalizeToTimestamp } from '@webitel/ui-sdk/scripts';
import { formatDate } from '@webitel/ui-sdk/utils';

import type { HandledBy } from '../enums/HandledBy.enum';

type Lookup = {
	id: string;
	name: string;
};

type Range = {
	from?: number | null;
	to?: number | null;
};

export type InteractionRaw = {
	id: string;
	interactionDate: number;
	interactionType: ChannelType;
	customer: string;
	agent?: Lookup;
	team?: Lookup;
	duration: number;
	status: InteractionStatus;
	assignee?: Lookup;
	score?: number;
	plan?: Lookup;
	dueDate?: number;
	contactReason?: string;
	contactResult?: string;
	csat?: number;
	ratedAt?: number;
	scorecard?: Lookup;
	handledBy: HandledBy;
	source?: string;
	firstResponse?: number;
	messages?: number;
	skipReason?: string;
	skippedBy?: Lookup;
	skippedAt?: number;
	files: EngineCallFile[];
	transcripts: EngineTranscriptLookup[];
};

type GetInteractionsParams = {
	page?: number;
	size?: number;
	sort?: string | null;
	fields?: string[];
	createdAt?: string | Range;
	interactionType?: string[];
	contact?: number[];
	agent?: number[];
	team?: number[];
	talkDuration?: Range;
	interactionStatus?: string[];
	user?: number[];
	score?: Range;
};

// URL і назви параметрів — припущення до контракту DT-65
export const InteractionsUrl = '/interactions';

const instance = getDefaultInstance();

const computeDateAndTime = (timestamp?: number) => {
	if (!timestamp) return null;
	return formatDate(timestamp, FormatDateMode.DATETIME);
};

const normalizeInteractionDate = (value?: string | Range) => {
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

const groupFilesByType = (files: EngineCallFile[]) =>
	files.reduce<Record<string, EngineCallFile[]>>((acc, file) => {
		const type = String(file.type);
		acc[type] = acc[type] || [];
		acc[type].push(file);
		return acc;
	}, {});

const transformResponseItems = (items: InteractionRaw[]) =>
	items.map((item) => ({
		...item,
		interactionDate: computeDateAndTime(item.interactionDate),
		duration: convertDuration(item.duration),
		agent: item.agent?.name,
		team: item.team?.name,
		assignee: item.assignee?.name,
		plan: item.plan?.name,
		dueDate: computeDateAndTime(item.dueDate),
		isOverdue:
			item.status === InteractionStatus.Pending &&
			!!item.dueDate &&
			item.dueDate < Date.now(),
		ratedAt: computeDateAndTime(item.ratedAt),
		scorecard: item.scorecard?.name,
		firstResponse: item.firstResponse && convertDuration(item.firstResponse),
		skippedBy: item.skippedBy?.name,
		skippedAt: computeDateAndTime(item.skippedAt),
		files: groupFilesByType(item.files),
	}));

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
			items: transformResponseItems(items),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const transcribe = ({ callId }: { callId: string[] }) =>
	CallTranscriptAPI.create({
		callId: callId as unknown as string,
	});

const InteractionsAPIRepository = {
	getList,
	transcribe,
};

export default InteractionsAPIRepository;
