import { ChannelType, InteractionStatus } from '@webitel/api-services/enums';

import { EvaluationCardTab } from '../../../modules/evaluation-card/enums/EvaluationCardTab.enum';
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
			[InteractionType[ChannelType.Call]]: ({ linked }) =>
				linked('objects.interactionType.call'),
			[InteractionType[ChannelType.Chat]]: ({ linked }) =>
				linked('objects.interactionType.chat'),
			[InteractionType[ChannelType.Email]]: ({ linked }) =>
				linked('objects.interactionType.email'),
		},
		searchModes: {
			[SearchMode.Search]: 'Zwykłe wyszukiwanie',
			[SearchMode.Fts]: 'Wyszukiwanie pełnotekstowe',
			[SearchMode.Description]: 'Komentarz agenta',
		},
	},
	evaluationCard: {
		tabs: {
			[EvaluationCardTab.Conversation]: 'Rozmowa',
			[EvaluationCardTab.Information]: 'Informacje',
			[EvaluationCardTab.ScreenRecording]: 'Nagranie ekranu',
		},
		evaluation: 'Ocena',
		skip: {
			action: 'Pomiń',
			title: 'Pomiń interakcję',
			popupDescription:
				'Interakcja zostanie usunięta z Twojej kolejki i oznaczona jako pominięta.',
			reasonPlaceholder: 'Dlaczego pomijasz tę interakcję?',
		},
		assignedTo: 'Przypisano do',
		unavailable: {
			[InteractionStatus.Pending]: 'Nie możesz ocenić tej interakcji',
			[InteractionStatus.Skipped]: 'Ta interakcja została pominięta',
		},
		date: 'Data',
		information: {
			unknown: 'Nieznany',
			postprocessing: 'Po zakończeniu',
			empty: 'Brak informacji',
		},
	},
	startPage: {
		interactions: {
			text: 'Wyszukuj połączenia, czaty i e-maile, przydzielaj je lub oceniaj.',
		},
		scorecards: {
			text: 'Twórz arkusze ocen, ustawiaj wagi kryteriów i grupuj pytania.',
		},
	},
	objects: {
		criterion: 'Kryterium | Kryteria',
	},
};
