import { InteractionType } from '../../../modules/interactions/enums/InteractionType.enum';
import { SearchMode } from '../../../modules/interactions/enums/SearchMode.enum';

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
		assignInteractions: 'Przypisz interakcję | Przypisz interakcje: {n}',
		me: '(ja)',
		deleteEvaluations: 'Usuń oceny | Usuń oceny: {n}',
		evaluationsWillBeDeleted:
			'Ocena zostanie usunięta. | Te oceny zostaną usunięte.',
		interactionReturnsToNotEvaluated:
			'Interakcja wróci do statusu „Nieocenione”.',
		interactionDate: 'Data interakcji',
		customer: 'Klient',
		plan: 'Plan',
		contactReason: 'Powód kontaktu',
		contactResult: 'Wynik kontaktu',
		csat: 'CSAT',
		skipReason: 'Powód pominięcia',
		interactionTypes: {
			[InteractionType.Call]: ({ linked }) =>
				linked('objects.interactionType.call'),
			[InteractionType.Chat]: ({ linked }) =>
				linked('objects.interactionType.chat'),
			[InteractionType.Email]: ({ linked }) =>
				linked('objects.interactionType.email'),
		},
		searchModes: {
			[SearchMode.Search]: 'Zwykłe wyszukiwanie',
			[SearchMode.Fts]: 'Wyszukiwanie pełnotekstowe',
			[SearchMode.Description]: 'Komentarz agenta',
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
