import { HandledBy } from '../../../modules/interactions/enums/HandledBy.enum';

export default {
	audit: 'Аудит',
	scorecards: {
		scorecards: 'Анкета | Анкеты',
		emptyWorkspace: 'Анкеты еще не созданы',
		usedScorecardCantEdit:
			'У анкеты есть оценки, её нельзя редактировать. Откройте её и используйте СОХРАНИТЬ КАК, чтобы создать копию.',
		usedScorecardCantDelete: 'Анкета используется, её нельзя удалить.',
	},
	interactions: {
		allInteractions: 'Все взаимодействия',
		transcribe: 'Транскрибировать',
		assign: 'Назначить',
		interactionDate: 'Дата взаимодействия',
		customer: 'Клиент',
		plan: 'План',
		dueDate: 'Срок',
		contactReason: 'Причина обращения',
		contactResult: 'Результат обращения',
		csat: 'CSAT',
		ratedAt: 'Дата оценки',
		handledBy: 'Обслуживал',
		firstResponse: 'Первый ответ',
		messages: 'Сообщения',
		skipReason: 'Причина пропуска',
		skippedBy: 'Кто пропустил',
		skippedAt: 'Дата пропуска',
		handledByTypes: {
			[HandledBy.Agent]: 'Оператор',
			[HandledBy.Bot]: 'Бот',
			[HandledBy.Ivr]: 'IVR',
		},
	},
	startPage: {
		scorecards: {
			text: 'Создание анкет оценивания, веса критериев и группировка вопросов.',
		},
	},
	objects: {
		criterion: 'Критерий | Критерии',
	},
};
