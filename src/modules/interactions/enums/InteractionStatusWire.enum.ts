import { InteractionStatus } from '@webitel/api-services/enums';

export const InteractionStatusWire = {
	[InteractionStatus.NotEvaluated]: 'EVALUATION_STATUS_NOT_EVALUATED',
	[InteractionStatus.Pending]: 'EVALUATION_STATUS_PENDING',
	[InteractionStatus.Skipped]: 'EVALUATION_STATUS_SKIPPED',
	[InteractionStatus.Completed]: 'EVALUATION_STATUS_COMPLETED',
} as const;

export const InteractionStatusFromWire: Record<string, InteractionStatus> = {
	[InteractionStatusWire[InteractionStatus.NotEvaluated]]:
		InteractionStatus.NotEvaluated,
	[InteractionStatusWire[InteractionStatus.Pending]]: InteractionStatus.Pending,
	[InteractionStatusWire[InteractionStatus.Skipped]]: InteractionStatus.Skipped,
	[InteractionStatusWire[InteractionStatus.Completed]]:
		InteractionStatus.Completed,
};
