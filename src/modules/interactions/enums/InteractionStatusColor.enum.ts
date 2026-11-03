import { InteractionStatus } from './InteractionStatus.enum';

export const InteractionStatusColor = {
	[InteractionStatus.NotEvaluated]: 'disabled',
	[InteractionStatus.Pending]: 'info',
	[InteractionStatus.Skipped]: 'primary',
	[InteractionStatus.Completed]: 'success',
} as const;
