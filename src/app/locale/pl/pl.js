import { InteractionStatus } from '../../../modules/interactions/enums/InteractionStatus.enum';

export default {
	audit: 'Audyt',
	scorecards: {
		scorecards: 'Arkusz ocen | Arkusze ocen',
		emptyWorkspace: 'Brak jeszcze arkuszy ocen',
		usedScorecardCantEdit:
			'Ten arkusz ocen ma oceny i nie można go edytować. Otwórz go i użyj ZAPISZ JAKO, aby utworzyć kopię.',
		usedScorecardCantDelete:
			'Ten arkusz ocen jest używany i nie można go usunąć.',
	},
	interactions: {
		allInteractions: 'Wszystkie interakcje',
		transcribe: 'Transkrybuj',
		assign: 'Przypisz',
		interactionDate: 'Data interakcji',
		interactionType: 'Typ interakcji',
		customer: 'Klient',
		statuses: {
			[InteractionStatus.NotEvaluated]: 'Nieocenione',
			[InteractionStatus.Pending]: 'Oczekuje',
			[InteractionStatus.Skipped]: 'Pominięte',
			[InteractionStatus.Completed]: 'Ocenione',
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
