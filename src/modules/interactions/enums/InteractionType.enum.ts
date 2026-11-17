import { ChannelType } from '@webitel/api-services/enums';

export const InteractionType = {
	[ChannelType.Call]: 'INTERACTION_TYPE_CALL',
	[ChannelType.Chat]: 'INTERACTION_TYPE_CHAT',
	[ChannelType.Email]: 'INTERACTION_TYPE_EMAIL',
} as const;

export type InteractionType =
	(typeof InteractionType)[keyof typeof InteractionType];
