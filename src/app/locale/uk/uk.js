import { HandledBy } from '../../../modules/interactions/enums/HandledBy.enum';

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
		interactionDate: 'Дата взаємодії',
		customer: 'Клієнт',
		plan: 'План',
		dueDate: 'Строк',
		contactReason: 'Причина звернення',
		contactResult: 'Результат звернення',
		csat: 'CSAT',
		ratedAt: 'Дата оцінки',
		handledBy: 'Обслуговував',
		firstResponse: 'Перша відповідь',
		messages: 'Повідомлення',
		skipReason: 'Причина пропуску',
		skippedBy: 'Хто пропустив',
		skippedAt: 'Дата пропуску',
		handledByTypes: {
			[HandledBy.Agent]: 'Оператор',
			[HandledBy.Bot]: 'Бот',
			[HandledBy.Ivr]: 'IVR',
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
