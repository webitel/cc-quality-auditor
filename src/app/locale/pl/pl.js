import { InteractionType } from '../../../modules/scorecards/enums/InteractionType.enum';

export default {
	audit: 'Audyt',
	scorecards: {
		scorecards: 'Arkusz ocen | Arkusze ocen',
		emptyWorkspace: 'Brak jeszcze arkuszy ocen',
		usedScorecardCantEdit:
			'Ten arkusz ocen ma oceny i nie można go edytować. Otwórz go i użyj ZAPISZ JAKO, aby utworzyć kopię.',
		usedScorecardCantDelete:
			'Ten arkusz ocen jest używany i nie można go usunąć.',
		interactionType: 'Typ interakcji',
		interactionTypes: {
			[InteractionType.CALL]: 'Połączenie',
			[InteractionType.CHAT]: 'Czat',
			[InteractionType.EMAIL]: 'Email',
		},
	},
	startPage: {
		scorecards: {
			text: 'Twórz arkusze ocen, ustawiaj wagi kryteriów i grupuj pytania.',
		},
	},
	objects: {
		criterion: 'Kryterium | Kryteria',
	},
};
