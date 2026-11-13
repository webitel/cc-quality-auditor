import { InteractionType } from '../../../modules/interactions/enums/InteractionType.enum';
import { SearchMode } from '../../../modules/interactions/enums/SearchMode.enum';

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
		deleteEvaluations: "Baholarni o'chirish | Baholarni o'chirish: {n}",
		evaluationsWillBeDeleted: "Baho o'chiriladi. | Bu baholar o'chiriladi.",
		interactionReturnsToNotEvaluated:
			"O'zaro aloqa «Baholanmagan» holatiga qaytadi.",
		interactionDate: "O'zaro aloqa sanasi",
		customer: 'Mijoz',
		plan: 'Reja',
		contactReason: 'Murojaat sababi',
		contactResult: 'Murojaat natijasi',
		csat: 'CSAT',
		skipReason: "O'tkazib yuborish sababi",
		interactionTypes: {
			[InteractionType.Call]: ({ linked }) =>
				linked('objects.interactionType.call'),
			[InteractionType.Chat]: ({ linked }) =>
				linked('objects.interactionType.chat'),
			[InteractionType.Email]: ({ linked }) =>
				linked('objects.interactionType.email'),
		},
		searchModes: {
			[SearchMode.Search]: 'Oddiy qidiruv',
			[SearchMode.Fts]: "To'liq matnli qidiruv",
			[SearchMode.Description]: 'Agent izohi',
		},
	},
	evaluationCard: {
		conversation: 'Suhbat',
		information: "Ma'lumot",
		evaluation: 'Baholash',
		skip: "O'TKAZIB YUBORISH",
	},
	startPage: {
		interactions: {
			text: "Qo'ng'iroqlar, chatlar va xatlarni qidiring, ularni tayinlang yoki baholang.",
		},
		scorecards: {
			text: 'Baholash varaqalarini yarating, mezonlar vaznini belgilang va savollarni guruhlang.',
		},
	},
	objects: {
		criterion: 'Mezon | Mezonlar',
	},
};
