import { InteractionStatus } from '../../../modules/interactions/enums/InteractionStatus.enum';

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
		interactionDate: 'Дата взаємодії',
		interactionType: 'Тип взаємодії',
		customer: 'Клієнт',
		statuses: {
			[InteractionStatus.NotEvaluated]: 'Не оцінено',
			[InteractionStatus.Pending]: 'Очікує',
			[InteractionStatus.Skipped]: 'Пропущено',
			[InteractionStatus.Completed]: 'Оцінено',
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
