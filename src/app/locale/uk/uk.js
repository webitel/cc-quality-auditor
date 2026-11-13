import { InteractionType } from '../../../modules/interactions/enums/InteractionType.enum';
import { SearchMode } from '../../../modules/interactions/enums/SearchMode.enum';

export default {
	audit: 'Аудит',
	scorecards: {
		scorecards: 'Анкета | Анкети',
		emptyWorkspace: 'Анкети ще не створені',
		usedScorecardCantEdit:
			'Анкета має оцінки, її не можна редагувати. Відкрийте її і скористайтеся ЗБЕРЕГТИ ЯК, щоб створити копію.',
		usedScorecardCantDelete: 'Анкета використовується, її не можна видалити.',
	},
	interactions: {
		allInteractions: 'Усі взаємодії',
		transcribe: 'Транскрибувати',
		assign: 'Призначити',
		assignInteractions: 'Призначити взаємодію | Призначити взаємодії: {n}',
		me: '(я)',
		deleteEvaluations: 'Видалити оцінки | Видалити оцінки: {n}',
		evaluationsWillBeDeleted: 'Оцінку буде видалено. | Оцінки буде видалено.',
		interactionReturnsToNotEvaluated:
			'Взаємодія повернеться в статус «Не оцінено».',
		interactionDate: 'Дата взаємодії',
		customer: 'Клієнт',
		plan: 'План',
		contactReason: 'Причина звернення',
		contactResult: 'Результат звернення',
		csat: 'CSAT',
		skipReason: 'Причина пропуску',
		interactionTypes: {
			[InteractionType.Call]: ({ linked }) =>
				linked('objects.interactionType.call'),
			[InteractionType.Chat]: ({ linked }) =>
				linked('objects.interactionType.chat'),
			[InteractionType.Email]: ({ linked }) =>
				linked('objects.interactionType.email'),
		},
		searchModes: {
			[SearchMode.Search]: 'Звичайний пошук',
			[SearchMode.Fts]: 'Повнотекстовий пошук',
			[SearchMode.Description]: 'Коментар оператора',
		},
	},
	startPage: {
		scorecards: {
			text: 'Створення анкет оцінювання, ваги критеріїв і групування питань.',
		},
	},
	objects: {
		criterion: 'Критерій | Критерії',
	},
};
