import { ChannelType } from '@webitel/api-services/enums';

import { InteractionType } from './InteractionType.enum';

export const InteractionChannel = {
	[InteractionType[ChannelType.Call]]: ChannelType.Call,
	[InteractionType[ChannelType.Chat]]: ChannelType.Chat,
	[InteractionType[ChannelType.Email]]: ChannelType.Email,
} as const;
