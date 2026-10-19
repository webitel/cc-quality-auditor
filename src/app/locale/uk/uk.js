import { InteractionType } from '../../../modules/scorecards/enums/InteractionType.enum';

export default {
	audit: 'Аудит',
	scorecards: {
		scorecards: 'Анкета | Анкети',
		emptyWorkspace: 'Анкети ще не створені',
		usedScorecardCantEdit:
			'Анкета має оцінки, її не можна редагувати. Відкрийте її і скористайтеся ЗБЕРЕГТИ ЯК, щоб створити копію.',
		usedScorecardCantDelete: 'Анкета використовується, її не можна видалити.',
		interactionType: 'Тип взаємодії',
		interactionTypes: {
			[InteractionType.CALL]: 'Дзвінок',
			[InteractionType.CHAT]: 'Чат',
			[InteractionType.EMAIL]: 'Email',
		},
		noPositiveRequiredCriterion:
			'Додайте хоча б один обов’язковий критерій з максимальним балом більше 0.',
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
