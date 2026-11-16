import { ChannelType } from '@webitel/api-services/enums';

import { InteractionType } from './InteractionType.enum';

export const InteractionChannel = {
	[InteractionType.Call]: ChannelType.Call,
	[InteractionType.Chat]: ChannelType.Chat,
	[InteractionType.Email]: ChannelType.Email,
} as const;
