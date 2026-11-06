import { HandledBy } from '../../../modules/interactions/enums/HandledBy.enum';
import { SearchMode } from '../../../modules/interactions/enums/SearchMode.enum';

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
		assignInteractions: 'Atribuie interacțiunea | Atribuie {n} interacțiuni',
		me: '(eu)',
		interactionDate: 'Data interacțiunii',
		customer: 'Client',
		plan: 'Plan',
		dueDate: 'Termen',
		contactReason: 'Motivul contactului',
		contactResult: 'Rezultatul contactului',
		csat: 'CSAT',
		ratedAt: 'Data evaluării',
		handledBy: 'Gestionat de',
		firstResponse: 'Primul răspuns',
		messages: 'Mesaje',
		skipReason: 'Motivul omiterii',
		skippedBy: 'Omis de',
		skippedAt: 'Data omiterii',
		handledByTypes: {
			[HandledBy.Agent]: 'Agent',
			[HandledBy.Bot]: 'Bot',
			[HandledBy.Ivr]: 'IVR',
		},
		searchModes: {
			[SearchMode.Search]: 'Căutare regulată',
			[SearchMode.Fts]: 'Căutare text complet',
			[SearchMode.Description]: 'Comentariul agentului',
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
