import {
	ChannelType,
	InteractionHandledBy,
	InteractionStatus,
} from '@webitel/api-services/enums';
import {
	EngineCallFileType,
	EngineHistoryFileJobHistoryFileJobAction,
	EngineHistoryFileJobHistoryFileJobState,
} from '@webitel/api-services/gen/models';
import type { EngineCallAnnotation } from '@webitel/api-services/gen-wire/models';

import { InteractionType } from '../../enums/InteractionType.enum';

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const now = Date.now();

const statuses = Object.values(InteractionStatus);

const getLookup = (prefix: string, index: number) => ({
	id: `${index}`,
	name: `${prefix} ${index + 1}`,
});

const getCustomer = (isChat: boolean, index: number) =>
	isChat
		? {
				type: 'telegram',
				number: `@client_${index + 1}`,
				name: `Client ${index + 1}`,
			}
		: {
				type: 'dest',
				number: `+38050${String(1000000 + index * 7919).slice(-7)}`,
			};

const getAgentEndpoint = (agent?: { id: string; name: string }) =>
	agent && {
		type: 'user',
		number: `100${agent.id}`,
		...agent,
	};

export const DeletedRecordingFileId = '88014';

const getAudioFile = (id: number, name: string, createdAt: number) => ({
	id: `${id}`,
	name,
	mime_type: 'audio/mpeg',
	type: EngineCallFileType.FileTypeAudio,
	start_at: String(createdAt),
	stop_at: String(createdAt + minute),
});

const getScreenRecordingFile = (
	id: number,
	name: string,
	createdAt: number,
) => ({
	id: `${id}`,
	name,
	mime_type: 'video/mp4',
	type: EngineCallFileType.FileTypeScreensharing,
	start_at: String(createdAt),
	stop_at: String(createdAt + minute),
});

const getCallFiles = (index: number, createdAt: number) =>
	index % 5 === 2
		? []
		: [
				getAudioFile(88000 + index, `recording_${index + 1}.mp3`, createdAt),
				...(index % 8 === 0
					? [
							getAudioFile(
								87000 + index,
								`recording_${index + 1}_part_2.mp3`,
								createdAt,
							),
						]
					: []),
				...(index % 4 === 3
					? [
							getScreenRecordingFile(
								89000 + index,
								`screen_${index + 1}.mp4`,
								createdAt,
							),
							getScreenRecordingFile(
								89100 + index,
								`screen_${index + 1}_part_2.mp4`,
								createdAt + minute,
							),
						]
					: []),
			];

export const getCallTranscripts = (
	files: {
		id: string;
		name: string;
	}[],
) =>
	files.map(({ id, name }) => ({
		id: `transcript-${id}`,
		file_id: id,
		file: {
			id,
			name,
		},
	}));

const getCallHold = (index: number, createdAt: number) =>
	index % 2 === 0
		? [
				{
					start: String(createdAt + 20 * second),
					stop: String(createdAt + 30 * second),
					sec: 10,
				},
			]
		: [];

const getCallAnnotations = (
	index: number,
	createdAt: number,
	files: {
		id: string;
		type: string;
	}[],
	agent?: {
		id: string;
		name: string;
	},
): EngineCallAnnotation[] => {
	const audioFile = files.find(
		({ type }) => type === EngineCallFileType.FileTypeAudio,
	);
	if (!audioFile || index % 3 !== 0) return [];
	const author = agent ?? getLookup('Evaluator', 0);
	return [
		{
			id: `${7700 + index}`,
			call_id: `call-${index + 1}`,
			file_id: audioFile.id,
			note: 'Customer confirmed the order number',
			start_sec: 10,
			end_sec: 15,
			created_at: String(createdAt + hour),
			created_by: author,
		},
	];
};

const getCallFilesJob = (
	index: number,
	createdAt: number,
	files: {
		id: string;
		type: string;
	}[],
) => {
	const audioFile = files.find(
		({ type }) => type === EngineCallFileType.FileTypeAudio,
	);
	if (!audioFile) return [];
	const state =
		index % 6 === 5
			? EngineHistoryFileJobHistoryFileJobState.Active
			: index % 6 === 0
				? EngineHistoryFileJobHistoryFileJobState.Error
				: undefined;
	if (!state) return [];
	return [
		{
			id: `${6600 + index}`,
			file_id: audioFile.id,
			action: EngineHistoryFileJobHistoryFileJobAction.Stt,
			state,
			created_at: String(createdAt + hour),
			error_detail:
				state === EngineHistoryFileJobHistoryFileJobState.Error
					? 'Transcription failed'
					: undefined,
		},
	];
};

const hasCallInformation = (index: number) => index % 5 !== 4;

const getCallVariables = (index: number) =>
	hasCallInformation(index)
		? {
				Country: 'UA',
				Language: 'Default',
				wbt_contact_id: `${100 + index}`,
				contact_reason: 'Default',
				contact_result: 'Default',
				customer_segment: 'Default',
				campaign: 'Default',
				transfer_from: 'Default',
			}
		: undefined;

const getCallForms = (
	index: number,
	createdAt: number,
	agent?: {
		id: string;
		name: string;
	},
) =>
	hasCallInformation(index) && agent && index % 2 === 0
		? [
				{
					agent,
					reporting_at: String(createdAt + 2 * minute),
					form_fields: {
						reason: 'UA',
						result: 'Default',
						client_type: 'Default',
						product: 'Default',
						comment: 'Default',
						follow_up: 'Default',
						city: 'Default',
					},
				},
			]
		: undefined;

const getEvaluation = (
	index: number,
	status: InteractionStatus,
	createdAt: number,
) => {
	if (status === InteractionStatus.NotEvaluated) return undefined;
	const isInPlan = index % 4 !== 0;
	const isCompleted = status === InteractionStatus.Completed;
	const isSkipped = status === InteractionStatus.Skipped;
	return {
		id: `${5500 + index}`,
		assignee: getLookup('Evaluator', index % 2),
		plan: isInPlan ? getLookup('Plan', index % 2) : undefined,
		due_at: isInPlan
			? String(now + (index % 3 === 1 ? -1 : 1) * 24 * hour)
			: undefined,
		scorecard: isCompleted ? getLookup('Scorecard', index % 2) : undefined,
		score: isCompleted ? 50 + ((index * 13) % 51) : undefined,
		rated_at: isCompleted ? String(createdAt + 2 * hour) : undefined,
		skip_reason: isSkipped ? 'Not relevant' : undefined,
		skipped_by: isSkipped ? getLookup('Evaluator', index % 2) : undefined,
		skipped_at: isSkipped ? String(createdAt + hour) : undefined,
	};
};

export const interactionsMock = Array.from(
	{
		length: 25,
	},
	(_, index) => {
		const isChat = index % 3 === 1;
		const status = statuses[index % statuses.length];
		const isHandledByBot = [
			4,
			5,
		].includes(index % 9);
		const isOutbound = !isChat && index % 7 === 6;
		const createdAt = now - (index + 1) * 2 * minute;
		const id = `${isChat ? 'chat' : 'call'}-${index + 1}`;
		const agent = isHandledByBot ? undefined : getLookup('Agent', index % 3);
		const customer = getCustomer(isChat, index);
		const agentEndpoint = getAgentEndpoint(agent);
		const files = isChat ? [] : getCallFiles(index, createdAt);
		const handledBy = isHandledByBot
			? isChat
				? InteractionHandledBy.Bot
				: InteractionHandledBy.Ivr
			: InteractionHandledBy.Agent;

		return {
			type: InteractionType[isChat ? ChannelType.Chat : ChannelType.Call],
			id,
			parent_id: `parent-${id}`,
			domain_id: '1',
			created_at: String(createdAt),
			handled_by: handledBy,
			direction: isOutbound ? 'outbound' : 'inbound',
			from: isOutbound ? agentEndpoint : customer,
			to: isOutbound ? customer : agentEndpoint,
			contact:
				!isChat && index % 2 === 0
					? getLookup('Contact', index % 4)
					: undefined,
			agent,
			team: getLookup('Team', index % 2),
			source: isChat
				? {
						id: '9',
						name: 'Telegram bot',
					}
				: getLookup('Trunk', index % 2),
			duration: 45 + ((index * 337) % 3600),
			status,
			evaluation: getEvaluation(index, status, createdAt),
			call: isChat
				? undefined
				: {
						id,
						direction: isOutbound ? 'outbound' : 'inbound',
						created_at: String(createdAt),
						answered_at: String(createdAt + 5 * second),
						bridged_at: String(createdAt + 5 * second),
						duration: 60,
						bill_sec: 55,
						from: isOutbound ? agentEndpoint : customer,
						to: isOutbound ? customer : agentEndpoint,
						hold: getCallHold(index, createdAt),
						variables: getCallVariables(index),
						forms: getCallForms(index, createdAt, agent),
						annotations: getCallAnnotations(index, createdAt, files, agent),
						files_job: getCallFilesJob(index, createdAt, files),
						files,
						transcripts:
							index % 6 === 3 ||
							files.some(({ id }) => id === DeletedRecordingFileId)
								? getCallTranscripts(
										files.filter(
											({ type }) => type === EngineCallFileType.FileTypeAudio,
										),
									)
								: [],
					},
			chat: isChat
				? {
						first_response_sec: 5 + ((index * 17) % 120),
						message_count: 4 + ((index * 7) % 40),
					}
				: undefined,
		};
	},
);
