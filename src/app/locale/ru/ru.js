import { InteractionStatus } from '../../../modules/interactions/enums/InteractionStatus.enum';

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
		interactionType: 'Тип взаимодействия',
		customer: 'Клиент',
		statuses: {
			[InteractionStatus.NotEvaluated]: 'Не оценено',
			[InteractionStatus.Pending]: 'Ожидает',
			[InteractionStatus.Skipped]: 'Пропущено',
			[InteractionStatus.Completed]: 'Оценено',
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
