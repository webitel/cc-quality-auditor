import { InteractionType } from '../../../modules/scorecards/enums/InteractionType.enum';

export default {
	audit: 'Audit',
	scorecards: {
		scorecards: 'Fișă de evaluare | Fișe de evaluare',
		emptyWorkspace: 'Nu există încă fișe de evaluare',
		usedScorecardCantEdit:
			'Această fișă de evaluare are evaluări și nu poate fi editată. Deschide-o și folosește SALVEAZĂ CA pentru a crea o copie.',
		usedScorecardCantDelete:
			'Această fișă de evaluare este în uz și nu poate fi ștearsă.',
		interactionType: 'Tip de interacțiune',
		interactionTypes: {
			[InteractionType.CALL]: 'Apel',
			[InteractionType.CHAT]: 'Chat',
			[InteractionType.EMAIL]: 'Email',
		},
	},
	startPage: {
		scorecards: {
			text: 'Creați fișe de evaluare, setați ponderea criteriilor și grupați întrebările.',
		},
	},
	objects: {
		criterion: 'Criteriu | Criterii',
	},
};
