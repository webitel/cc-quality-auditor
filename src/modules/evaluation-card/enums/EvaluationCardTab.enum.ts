export const EvaluationCardTab = {
	Conversation: 'conversation',
	Information: 'information',
	ScreenRecording: 'screen-recording',
} as const;

export type EvaluationCardTab =
	(typeof EvaluationCardTab)[keyof typeof EvaluationCardTab];
