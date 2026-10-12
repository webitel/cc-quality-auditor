import { InteractionType } from '../../../modules/scorecards/enums/InteractionType.enum';

export default {
	audit: 'Аудит',
	scorecards: {
		scorecards: 'Сауалнама | Сауалнамалар',
		emptyWorkspace: 'Сауалнамалар әлі жасалмады',
		usedScorecardCantEdit:
			'Сауалнамада бағалар бар, оны өңдеуге болмайды. Оны ашып, көшірме жасау үшін БАСҚАША САҚТАУ пайдаланыңыз.',
		usedScorecardCantDelete: 'Сауалнама пайдаланылуда, оны жоюға болмайды.',
		interactionType: 'Өзара әрекеттесу түрі',
		interactionTypes: {
			[InteractionType.CALL]: 'Қоңырау',
			[InteractionType.CHAT]: 'Чат',
			[InteractionType.EMAIL]: 'Email',
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
