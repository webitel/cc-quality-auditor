import { ChannelType } from '@webitel/api-services/enums';

import { InteractionType } from './InteractionType.enum';

export const InteractionTypeWire = {
	[ChannelType.Call]: InteractionType.Call,
	[ChannelType.Chat]: InteractionType.Chat,
	[ChannelType.Email]: InteractionType.Email,
} as const;
