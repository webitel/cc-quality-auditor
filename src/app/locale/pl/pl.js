import { HandledBy } from '../../../modules/interactions/enums/HandledBy.enum';
import { InteractionType } from '../../../modules/interactions/enums/InteractionType.enum';

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
		customer: 'Klient',
		plan: 'Plan',
		dueDate: 'Termin',
		contactReason: 'Powód kontaktu',
		contactResult: 'Wynik kontaktu',
		csat: 'CSAT',
		ratedAt: 'Data oceny',
		handledBy: 'Obsłużone przez',
		firstResponse: 'Pierwsza odpowiedź',
		messages: 'Wiadomości',
		skipReason: 'Powód pominięcia',
		skippedBy: 'Pominięte przez',
		skippedAt: 'Data pominięcia',
		handledByTypes: {
			[HandledBy.Agent]: 'Agent',
			[HandledBy.Bot]: 'Bot',
			[HandledBy.Ivr]: 'IVR',
		},
		interactionTypes: {
			[InteractionType.Call]: ({ linked }) =>
				linked('objects.interactionType.call'),
			[InteractionType.Chat]: ({ linked }) =>
				linked('objects.interactionType.chat'),
			[InteractionType.Email]: ({ linked }) =>
				linked('objects.interactionType.email'),
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
