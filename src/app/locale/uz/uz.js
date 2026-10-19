import { InteractionType } from '../../../modules/scorecards/enums/InteractionType.enum';

export default {
	audit: 'Audit',
	scorecards: {
		scorecards: 'Baholash varaqasi | Baholash varaqalari',
		emptyWorkspace: 'Hozircha baholash varaqalari mavjud emas',
		usedScorecardCantEdit:
			'Bu baholash varaqasida baholar mavjud, uni tahrirlab bo‘lmaydi. Uni oching va nusxa yaratish uchun BOSHQA NOM BILAN SAQLASH dan foydalaning.',
		usedScorecardCantDelete:
			'Bu baholash varaqasi foydalanilmoqda, uni o‘chirib bo‘lmaydi.',
		interactionType: 'Muloqot turi',
		interactionTypes: {
			[InteractionType.CALL]: "Qo'ng'iroq",
			[InteractionType.CHAT]: 'Chat',
			[InteractionType.EMAIL]: 'Email',
		},
		noPositiveRequiredCriterion:
			'Maksimal bali 0 dan yuqori bo‘lgan kamida bitta majburiy mezon qo‘shing.',
	},
	startPage: {
		scorecards: {
			text: 'Baholash varaqalarini yarating, mezonlar vaznini belgilang va savollarni guruhlang.',
		},
	},
	objects: {
		criterion: 'Mezon | Mezonlar',
	},
};
