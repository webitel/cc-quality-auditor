import { HandledBy } from '../../../modules/interactions/enums/HandledBy.enum';
import { InteractionType } from '../../../modules/interactions/enums/InteractionType.enum';

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
		assignInteractions:
			'Назначить взаимодействие | Назначить взаимодействия: {n}',
		me: '(я)',
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
			text: 'Создание анкет оценивания, веса критериев и группировка вопросов.',
		},
	},
	objects: {
		criterion: 'Критерий | Критерии',
	},
};
