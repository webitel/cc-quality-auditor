import { InteractionStatus } from '../../../modules/interactions/enums/InteractionStatus.enum';

export default {
	audit: 'Audit',
	scorecards: {
		scorecards: 'Baholash varaqasi | Baholash varaqalari',
		emptyWorkspace: 'Hozircha baholash varaqalari mavjud emas',
		usedScorecardCantEdit:
			'Bu baholash varaqasida baholar mavjud, uni tahrirlab bo‘lmaydi. Uni oching va nusxa yaratish uchun BOSHQA NOM BILAN SAQLASH dan foydalaning.',
		usedScorecardCantDelete:
			'Bu baholash varaqasi foydalanilmoqda, uni o‘chirib bo‘lmaydi.',
	},
	interactions: {
		allInteractions: "Barcha o'zaro aloqalar",
		transcribe: 'Transkriptsiya qilish',
		assign: 'Tayinlash',
		interactionDate: "O'zaro aloqa sanasi",
		interactionType: "O'zaro aloqa turi",
		customer: 'Mijoz',
		statuses: {
			[InteractionStatus.NotEvaluated]: 'Baholanmagan',
			[InteractionStatus.Pending]: 'Kutilmoqda',
			[InteractionStatus.Skipped]: "O'tkazib yuborilgan",
			[InteractionStatus.Completed]: 'Baholangan',
		},
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
