export const HandledBy = {
	Agent: 'HANDLED_BY_AGENT',
	Bot: 'HANDLED_BY_BOT',
	Ivr: 'HANDLED_BY_IVR',
} as const;

export type HandledBy = (typeof HandledBy)[keyof typeof HandledBy];
