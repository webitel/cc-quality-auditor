import { ChannelType, InteractionStatus } from '@webitel/api-services/enums';

import { EvaluationCardTab } from '../../../modules/evaluation-card/enums/EvaluationCardTab.enum';
import { InteractionType } from '../../../modules/interactions/enums/InteractionType.enum';
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
		deleteEvaluations: 'Șterge evaluările | Șterge {n} evaluări',
		evaluationsWillBeDeleted:
			'Evaluarea va fi ștearsă. | Aceste evaluări vor fi șterse.',
		interactionReturnsToNotEvaluated: 'Interacțiunea revine la „Neevaluat”.',
		interactionDate: 'Data interacțiunii',
		customer: 'Client',
		plan: 'Plan',
		contactReason: 'Motivul contactului',
		contactResult: 'Rezultatul contactului',
		csat: 'CSAT',
		skipReason: 'Motivul omiterii',
		interactionTypes: {
			[InteractionType[ChannelType.Call]]: ({ linked }) =>
				linked('objects.interactionType.call'),
			[InteractionType[ChannelType.Chat]]: ({ linked }) =>
				linked('objects.interactionType.chat'),
			[InteractionType[ChannelType.Email]]: ({ linked }) =>
				linked('objects.interactionType.email'),
		},
		searchModes: {
			[SearchMode.Search]: 'Căutare regulată',
			[SearchMode.Fts]: 'Căutare text complet',
			[SearchMode.Description]: 'Comentariul agentului',
		},
	},
	evaluationCard: {
		tabs: {
			[EvaluationCardTab.Conversation]: 'Conversație',
			[EvaluationCardTab.Information]: 'Informații',
			[EvaluationCardTab.ScreenRecording]: 'Înregistrarea ecranului',
		},
		evaluation: 'Evaluare',
		skip: 'Omite',
		assignedTo: 'Atribuit lui',
		unavailable: {
			[InteractionStatus.Pending]: 'Nu puteți evalua această interacțiune',
			[InteractionStatus.Skipped]: 'Această interacțiune a fost omisă',
		},
		date: 'Data',
		information: {
			unknown: 'Necunoscut',
			postprocessing: 'Postprocesare',
			empty: 'Nu există încă informații',
		},
	},
	startPage: {
		interactions: {
			text: 'Căutați apeluri, chaturi și e-mailuri, atribuiți-le sau evaluați-le.',
		},
		scorecards: {
			text: 'Creați fișe de evaluare, setați ponderea criteriilor și grupați întrebările.',
		},
	},
	objects: {
		criterion: 'Criteriu | Criterii',
	},
};
