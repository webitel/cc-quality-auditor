import { ChannelType, InteractionStatus } from '@webitel/api-services/enums';

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
		const isHandledByBot = index % 9 === 5;

		return {
			id: `${index + 1}`,
			interactionDate: now - (index + 1) * hour,
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
		};
	},
);
