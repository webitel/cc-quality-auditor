export const InteractionType = Object.freeze({
	CALL: 'call',
	CHAT: 'chat',
	EMAIL: 'email',
} as const);

export type InteractionType =
	(typeof InteractionType)[keyof typeof InteractionType];
