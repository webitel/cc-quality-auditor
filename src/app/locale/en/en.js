import { InteractionType } from '../../../modules/scorecards/enums/InteractionType.enum';

export default {
	audit: 'Audit',
	scorecards: {
		scorecards: 'Scorecard | Scorecards',
		emptyWorkspace: 'There aren’t scorecards yet',
		usedScorecardCantEdit:
			"This scorecard has evaluations and can't be edited. Open it and use SAVE AS to create a copy.",
		usedScorecardCantDelete: "This scorecard is in use and can't be deleted.",
		interactionType: 'Interaction type',
		interactionTypes: {
			[InteractionType.CALL]: 'Call',
			[InteractionType.CHAT]: 'Chat',
			[InteractionType.EMAIL]: 'Email',
		},
		noPositiveRequiredCriterion:
			'Add at least one required criterion with a maximum score above 0.',
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
