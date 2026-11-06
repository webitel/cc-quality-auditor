import { ChannelType, InteractionStatus } from '@webitel/api-services/enums';
import { EngineCallFileType } from '@webitel/api-services/gen/models';

import { HandledBy } from '../../enums/HandledBy.enum';

const hour = 60 * 60 * 1000;
const now = Date.now();

const statuses = Object.values(InteractionStatus);

const getCustomer = (interactionType: string, index: number) =>
	interactionType === ChannelType.Call
		? `+38050${String(1000000 + index * 7919).slice(-7)}`
		: `telegram: @client_${index + 1}`;

export const interactionsMock = Array.from(
	{
		length: 25,
	},
	(_, index) => {
		const interactionType =
			index % 3 === 1 ? ChannelType.Chat : ChannelType.Call;
		const status = statuses[index % statuses.length];
		const isHandledByBot = [
			4,
			5,
		].includes(index % 9);
		const isChat = interactionType === ChannelType.Chat;
		const isInPlan =
			status !== InteractionStatus.NotEvaluated && index % 4 !== 0;
		const interactionDate = now - (index + 1) * hour;
		const hasRecording = !isChat && index % 5 !== 2;
		const hasTranscript = hasRecording && index % 6 === 3;
		const hasScreenRecording = hasRecording && index % 4 === 3;

		return {
			id: `${index + 1}`,
			interactionDate,
			interactionType,
			customer: getCustomer(interactionType, index),
			agent: isHandledByBot
				? undefined
				: {
						id: `${index % 3}`,
						name: `Agent ${(index % 3) + 1}`,
					},
			team: {
				id: `${index % 2}`,
				name: `Team ${(index % 2) + 1}`,
			},
			duration: 45 + ((index * 337) % 3600),
			status,
			assignee:
				status === InteractionStatus.NotEvaluated
					? undefined
					: {
							id: `${index % 2}`,
							name: `Evaluator ${(index % 2) + 1}`,
						},
			score:
				status === InteractionStatus.Completed
					? 50 + ((index * 13) % 51)
					: undefined,
			plan: isInPlan
				? {
						id: `${index % 2}`,
						name: `Plan ${(index % 2) + 1}`,
					}
				: undefined,
			dueDate: isInPlan
				? now + (index % 3 === 1 ? -1 : 1) * 24 * hour
				: undefined,
			contactReason: `Reason ${(index % 4) + 1}`,
			contactResult: `Result ${(index % 3) + 1}`,
			csat: index % 5 === 0 ? undefined : (index % 5) + 1,
			ratedAt:
				status === InteractionStatus.Completed
					? interactionDate + 2 * hour
					: undefined,
			scorecard:
				status === InteractionStatus.Completed
					? {
							id: `${index % 2}`,
							name: `Scorecard ${(index % 2) + 1}`,
						}
					: undefined,
			handledBy: isHandledByBot
				? isChat
					? HandledBy.Bot
					: HandledBy.Ivr
				: HandledBy.Agent,
			source: isChat ? 'Telegram' : `Trunk ${(index % 2) + 1}`,
			firstResponse: isChat ? 5 + ((index * 17) % 120) : undefined,
			messages: isChat ? 4 + ((index * 7) % 40) : undefined,
			skipReason:
				status === InteractionStatus.Skipped ? 'Not relevant' : undefined,
			skippedBy:
				status === InteractionStatus.Skipped
					? {
							id: `${index % 2}`,
							name: `Evaluator ${(index % 2) + 1}`,
						}
					: undefined,
			files: [
				...(hasRecording
					? [
							{
								id: `file-${index + 1}`,
								name: `recording_${index + 1}.mp3`,
								type: EngineCallFileType.FileTypeAudio,
							},
						]
					: []),
				...(hasScreenRecording
					? [
							{
								id: `screen-${index + 1}`,
								name: `screen_${index + 1}.mp4`,
								type: EngineCallFileType.FileTypeScreensharing,
							},
						]
					: []),
			],
			transcripts: hasTranscript
				? [
						{
							id: `transcript-${index + 1}`,
							file: {
								name: `recording_${index + 1}.mp3`,
							},
						},
					]
				: [],
			skippedAt:
				status === InteractionStatus.Skipped
					? interactionDate + hour
					: undefined,
		};
	},
);
