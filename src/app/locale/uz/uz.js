import { ChannelType, InteractionStatus } from '@webitel/api-services/enums';

import { EvaluationCardTab } from '../../../modules/evaluation-card/enums/EvaluationCardTab.enum';
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
			[InteractionType[ChannelType.Call]]: ({ linked }) =>
				linked('objects.interactionType.call'),
			[InteractionType[ChannelType.Chat]]: ({ linked }) =>
				linked('objects.interactionType.chat'),
			[InteractionType[ChannelType.Email]]: ({ linked }) =>
				linked('objects.interactionType.email'),
		},
		searchModes: {
			[SearchMode.Search]: 'Oddiy qidiruv',
			[SearchMode.Fts]: "To'liq matnli qidiruv",
			[SearchMode.Description]: 'Agent izohi',
		},
	},
	evaluationCard: {
		tabs: {
			[EvaluationCardTab.Conversation]: 'Suhbat',
			[EvaluationCardTab.Information]: "Ma'lumot",
			[EvaluationCardTab.ScreenRecording]: 'Ekran yozuvi',
		},
		evaluation: 'Baholash',
		skip: {
			action: "O'tkazib yuborish",
			title: "O'zaro aloqani o'tkazib yuborish",
			popupDescription:
				"O'zaro aloqa navbatingizdan olib tashlanadi va o'tkazib yuborilgan deb belgilanadi.",
			reasonPlaceholder: "Nega bu o'zaro aloqani o'tkazib yuboryapsiz?",
		},
		assignedTo: 'Tayinlangan',
		unavailable: {
			[InteractionStatus.Pending]: "Siz bu o'zaro aloqani baholay olmaysiz",
			[InteractionStatus.Skipped]: "Bu o'zaro aloqa o'tkazib yuborildi",
		},
		date: 'Sana',
		information: {
			unknown: "Noma'lum",
			postprocessing: 'Keyingi ishlov',
			empty: "Hozircha ma'lumot yo'q",
		},
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
