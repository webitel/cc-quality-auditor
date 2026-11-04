import { HandledBy } from '../../../modules/interactions/enums/HandledBy.enum';

export default {
	audit: 'Audit',
	scorecards: {
		scorecards: 'Scorecard | Scorecards',
		emptyWorkspace: 'There aren’t scorecards yet',
		usedScorecardCantEdit:
			"This scorecard has evaluations and can't be edited. Open it and use SAVE AS to create a copy.",
		usedScorecardCantDelete: "This scorecard is in use and can't be deleted.",
	},
	interactions: {
		allInteractions: 'All interactions',
		transcribe: 'Transcribe',
		assign: 'Assign',
		interactionDate: 'Interaction date',
		customer: 'Customer',
		plan: 'Plan',
		dueDate: 'Due date',
		contactReason: 'Contact reason',
		contactResult: 'Contact result',
		csat: 'CSAT',
		ratedAt: 'Rated at',
		handledBy: 'Handled by',
		firstResponse: 'First response',
		messages: 'Messages',
		skipReason: 'Skip reason',
		skippedBy: 'Skipped by',
		skippedAt: 'Skipped at',
		handledByTypes: {
			[HandledBy.Agent]: 'Agent',
			[HandledBy.Bot]: 'Bot',
			[HandledBy.Ivr]: 'IVR',
		},
	},
	startPage: {
		scorecards: {
			text: 'Create evaluation forms, set criteria weights, and group questions.',
		},
	},
	objects: {
		criterion: 'Criterion | Criteria',
	},
};
