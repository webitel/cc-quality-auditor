import { HandledBy } from '../../../modules/interactions/enums/HandledBy.enum';

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
		assignInteractions:
			"O'zaro aloqani tayinlash | O'zaro aloqalarni tayinlash: {n}",
		me: '(men)',
		interactionDate: "O'zaro aloqa sanasi",
		customer: 'Mijoz',
		plan: 'Reja',
		dueDate: 'Muddat',
		contactReason: 'Murojaat sababi',
		contactResult: 'Murojaat natijasi',
		csat: 'CSAT',
		ratedAt: 'Baholangan sana',
		handledBy: "Xizmat ko'rsatgan",
		firstResponse: 'Birinchi javob',
		messages: 'Xabarlar',
		skipReason: "O'tkazib yuborish sababi",
		skippedBy: "Kim o'tkazib yubordi",
		skippedAt: "O'tkazib yuborilgan sana",
		handledByTypes: {
			[HandledBy.Agent]: 'Agent',
			[HandledBy.Bot]: 'Bot',
			[HandledBy.Ivr]: 'IVR',
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
