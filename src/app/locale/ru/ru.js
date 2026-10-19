import { InteractionType } from '../../../modules/scorecards/enums/InteractionType.enum';

export default {
	audit: 'Аудит',
	scorecards: {
		scorecards: 'Анкета | Анкеты',
		emptyWorkspace: 'Анкеты еще не созданы',
		usedScorecardCantEdit:
			'У анкеты есть оценки, её нельзя редактировать. Откройте её и используйте СОХРАНИТЬ КАК, чтобы создать копию.',
		usedScorecardCantDelete: 'Анкета используется, её нельзя удалить.',
		interactionType: 'Тип взаимодействия',
		interactionTypes: {
			[InteractionType.CALL]: 'Звонок',
			[InteractionType.CHAT]: 'Чат',
			[InteractionType.EMAIL]: 'Email',
		},
		noPositiveRequiredCriterion:
			'Добавьте хотя бы один обязательный критерий с максимальным баллом больше 0.',
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
