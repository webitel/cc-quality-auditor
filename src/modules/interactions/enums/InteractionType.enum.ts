export const InteractionType = {
	Call: 'INTERACTION_TYPE_CALL',
	Chat: 'INTERACTION_TYPE_CHAT',
	Email: 'INTERACTION_TYPE_EMAIL',
} as const;

export type InteractionType =
	(typeof InteractionType)[keyof typeof InteractionType];
