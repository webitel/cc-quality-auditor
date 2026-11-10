import { ChannelType, InteractionStatus } from '@webitel/api-services/enums';

import { HandledBy } from '../../enums/HandledBy.enum';
import { HandledByWire } from '../../enums/HandledByWire.enum';
import { InteractionStatusWire } from '../../enums/InteractionStatusWire.enum';
import { InteractionTypeWire } from '../../enums/InteractionTypeWire.enum';

const minute = 60 * 1000;
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
		const handledBy = isHandledByBot
			? isChat
				? HandledBy.Bot
				: HandledBy.Ivr
			: HandledBy.Agent;

		return {
			type: InteractionTypeWire[isChat ? ChannelType.Chat : ChannelType.Call],
			id,
			parent_id: `parent-${id}`,
			domain_id: '1',
			created_at: String(createdAt),
			handled_by: HandledByWire[handledBy],
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
			status: InteractionStatusWire[status],
			evaluation: getEvaluation(index, status, createdAt),
			call: isChat
				? undefined
				: {
						id,
						files: [],
						transcripts: [],
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
