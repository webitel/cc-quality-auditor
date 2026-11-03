import { InteractionStatus } from '../../../modules/interactions/enums/InteractionStatus.enum';

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
		interactionDate: 'Өзара әрекет күні',
		interactionType: 'Өзара әрекет түрі',
		customer: 'Клиент',
		statuses: {
			[InteractionStatus.NotEvaluated]: 'Бағаланбаған',
			[InteractionStatus.Pending]: 'Күтуде',
			[InteractionStatus.Skipped]: 'Өткізілген',
			[InteractionStatus.Completed]: 'Бағаланған',
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
