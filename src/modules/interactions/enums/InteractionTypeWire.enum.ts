import { ChannelType } from '@webitel/api-services/enums';

export const InteractionTypeWire = {
	[ChannelType.Call]: 'INTERACTION_TYPE_CALL',
	[ChannelType.Chat]: 'INTERACTION_TYPE_CHAT',
	[ChannelType.Email]: 'INTERACTION_TYPE_EMAIL',
} as const;

export const InteractionTypeFromWire: Record<string, ChannelType> = {
	[InteractionTypeWire[ChannelType.Call]]: ChannelType.Call,
	[InteractionTypeWire[ChannelType.Chat]]: ChannelType.Chat,
	[InteractionTypeWire[ChannelType.Email]]: ChannelType.Email,
};
