import { InteractionStatus } from '../../../modules/interactions/enums/InteractionStatus.enum';

export default {
	audit: 'Audit',
	scorecards: {
		scorecards: 'Fișă de evaluare | Fișe de evaluare',
		emptyWorkspace: 'Nu există încă fișe de evaluare',
		usedScorecardCantEdit:
			'Această fișă de evaluare are evaluări și nu poate fi editată. Deschide-o și folosește SALVEAZĂ CA pentru a crea o copie.',
		usedScorecardCantDelete:
			'Această fișă de evaluare este în uz și nu poate fi ștearsă.',
	},
	interactions: {
		allInteractions: 'Toate interacțiunile',
		transcribe: 'Transcrie',
		assign: 'Atribuie',
		interactionDate: 'Data interacțiunii',
		interactionType: 'Tipul interacțiunii',
		customer: 'Client',
		statuses: {
			[InteractionStatus.NotEvaluated]: 'Neevaluat',
			[InteractionStatus.Pending]: 'În așteptare',
			[InteractionStatus.Skipped]: 'Omis',
			[InteractionStatus.Completed]: 'Evaluat',
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
