import { HandledBy } from '../../../modules/interactions/enums/HandledBy.enum';
import { InteractionType } from '../../../modules/interactions/enums/InteractionType.enum';
import { SearchMode } from '../../../modules/interactions/enums/SearchMode.enum';

export default {
	audit: 'Аудит',
	scorecards: {
		scorecards: 'Сауалнама | Сауалнамалар',
		emptyWorkspace: 'Сауалнамалар әлі жасалмады',
		usedScorecardCantEdit:
			'Сауалнамада бағалар бар, оны өңдеуге болмайды. Оны ашып, көшірме жасау үшін БАСҚАША САҚТАУ пайдаланыңыз.',
		usedScorecardCantDelete: 'Сауалнама пайдаланылуда, оны жоюға болмайды.',
	},
	interactions: {
		allInteractions: 'Барлық өзара әрекеттер',
		transcribe: 'Транскриберлеу',
		assign: 'Тағайындау',
		assignInteractions:
			'Өзара әрекетті тағайындау | Өзара әрекеттерді тағайындау: {n}',
		me: '(мен)',
		interactionDate: 'Өзара әрекет күні',
		customer: 'Клиент',
		plan: 'Жоспар',
		dueDate: 'Мерзім',
		contactReason: 'Хабарласу себебі',
		contactResult: 'Хабарласу нәтижесі',
		csat: 'CSAT',
		ratedAt: 'Бағалау күні',
		handledBy: 'Қызмет көрсеткен',
		firstResponse: 'Алғашқы жауап',
		messages: 'Хабарламалар',
		skipReason: 'Өткізіп жіберу себебі',
		skippedBy: 'Кім өткізіп жіберді',
		skippedAt: 'Өткізіп жіберу күні',
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
		searchModes: {
			[SearchMode.Search]: 'Қарапайым іздеу',
			[SearchMode.Fts]: 'Толық мәтінді іздеу',
			[SearchMode.Description]: 'Оператордың түсініктемесі',
		},
	},
	startPage: {
		scorecards: {
			text: 'Бағалау сауалнамаларын жасаңыз, критерийлердің салмағын белгілеңіз және сұрақтарды топтастырыңыз.',
		},
	},
	objects: {
		criterion: 'Критерий | Критерийлер',
	},
};
