export const HandledBy = {
	Agent: 'agent',
	Bot: 'bot',
	Ivr: 'ivr',
} as const;

export type HandledBy = (typeof HandledBy)[keyof typeof HandledBy];
