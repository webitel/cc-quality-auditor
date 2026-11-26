import { ChannelType } from '@webitel/api-services/enums';

import { EvaluationCardTab } from '../../../modules/evaluation-card/enums/EvaluationCardTab.enum';
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
			[InteractionType[ChannelType.Call]]: ({ linked }) =>
				linked('objects.interactionType.call'),
			[InteractionType[ChannelType.Chat]]: ({ linked }) =>
				linked('objects.interactionType.chat'),
			[InteractionType[ChannelType.Email]]: ({ linked }) =>
				linked('objects.interactionType.email'),
		},
		searchModes: {
			[SearchMode.Search]: 'Звичайний пошук',
			[SearchMode.Fts]: 'Повнотекстовий пошук',
			[SearchMode.Description]: 'Коментар оператора',
		},
	},
	evaluationCard: {
		tabs: {
			[EvaluationCardTab.Conversation]: 'Розмова',
			[EvaluationCardTab.Information]: 'Інформація',
			[EvaluationCardTab.ScreenRecording]: 'Запис екрану',
		},
		evaluation: 'Оцінка',
		skip: 'Пропустити',
		information: {
			unknown: 'Невідомо',
			postprocessing: 'Постобробка',
			empty: 'Інформації ще немає',
		},
	},
	startPage: {
		interactions: {
			text: 'Пошук дзвінків, чатів і листів, призначення та оцінювання.',
		},
		scorecards: {
			text: 'Створення анкет оцінювання, ваги критеріїв і групування питань.',
		},
	},
	objects: {
		criterion: 'Критерій | Критерії',
	},
};
