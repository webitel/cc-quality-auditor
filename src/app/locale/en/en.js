import { ChannelType } from '@webitel/api-services/enums';

import { EvaluationCardTab } from '../../../modules/evaluation-card/enums/EvaluationCardTab.enum';
import { InteractionType } from '../../../modules/interactions/enums/InteractionType.enum';
import { SearchMode } from '../../../modules/interactions/enums/SearchMode.enum';

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
		assignInteractions: 'Assign interaction | Assign {n} interactions',
		me: '(me)',
		deleteEvaluations: 'Delete evaluations | Delete {n} evaluations',
		evaluationsWillBeDeleted:
			'The evaluation will be deleted. | These evaluations will be deleted.',
		interactionReturnsToNotEvaluated:
			'The interaction returns to Not evaluated.',
		interactionDate: 'Interaction date',
		customer: 'Customer',
		plan: 'Plan',
		contactReason: 'Contact reason',
		contactResult: 'Contact result',
		csat: 'CSAT',
		skipReason: 'Skip reason',
		interactionTypes: {
			[InteractionType[ChannelType.Call]]: ({ linked }) =>
				linked('objects.interactionType.call'),
			[InteractionType[ChannelType.Chat]]: ({ linked }) =>
				linked('objects.interactionType.chat'),
			[InteractionType[ChannelType.Email]]: ({ linked }) =>
				linked('objects.interactionType.email'),
		},
		searchModes: {
			[SearchMode.Search]: 'Regular search',
			[SearchMode.Fts]: 'Full text search',
			[SearchMode.Description]: "Agent's comment",
		},
	},
	evaluationCard: {
		tabs: {
			[EvaluationCardTab.Conversation]: 'Conversation',
			[EvaluationCardTab.Information]: 'Information',
			[EvaluationCardTab.ScreenRecording]: 'Screen recording',
		},
		evaluation: 'Evaluation',
		skip: 'Skip',
		information: {
			unknown: 'Unknown',
			postprocessing: 'Postprocessing',
			empty: 'There is no information yet',
		},
	},
	startPage: {
		interactions: {
			text: 'Search calls, chats, and emails, assign or evaluate them.',
		},
		scorecards: {
			text: 'Create evaluation forms, set criteria weights, and group questions.',
		},
	},
	objects: {
		criterion: 'Criterion | Criteria',
	},
};
