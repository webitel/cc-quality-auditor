import { InteractionType } from '../../../modules/interactions/enums/InteractionType.enum';
import { SearchMode } from '../../../modules/interactions/enums/SearchMode.enum';

export default {
	audit: 'Auditoría',
	scorecards: {
		scorecards: 'Hoja de puntuación | Hojas de puntuación',
		emptyWorkspace: 'Todavía no hay hojas de puntuación',
		usedScorecardCantEdit:
			'Esta hoja de puntuación tiene evaluaciones y no se puede editar. Ábrela y usa GUARDAR COMO para crear una copia.',
		usedScorecardCantDelete:
			'Esta hoja de puntuación está en uso y no se puede eliminar.',
	},
	interactions: {
		allInteractions: 'Todas las interacciones',
		transcribe: 'Transcribir',
		assign: 'Asignar',
		assignInteractions: 'Asignar interacción | Asignar {n} interacciones',
		me: '(yo)',
		deleteEvaluations: 'Eliminar evaluaciones | Eliminar {n} evaluaciones',
		evaluationsWillBeDeleted:
			'La evaluación será eliminada. | Estas evaluaciones serán eliminadas.',
		interactionReturnsToNotEvaluated: 'La interacción vuelve a «No evaluado».',
		interactionDate: 'Fecha de interacción',
		customer: 'Cliente',
		plan: 'Plan',
		contactReason: 'Motivo de contacto',
		contactResult: 'Resultado del contacto',
		csat: 'CSAT',
		skipReason: 'Motivo de omisión',
		interactionTypes: {
			[InteractionType.Call]: ({ linked }) =>
				linked('objects.interactionType.call'),
			[InteractionType.Chat]: ({ linked }) =>
				linked('objects.interactionType.chat'),
			[InteractionType.Email]: ({ linked }) =>
				linked('objects.interactionType.email'),
		},
		searchModes: {
			[SearchMode.Search]: 'Búsqueda regular',
			[SearchMode.Fts]: 'Búsqueda de texto completo',
			[SearchMode.Description]: 'Comentario del agente',
		},
	},
	evaluationCard: {
		conversation: 'Conversación',
		information: 'Información',
		evaluation: 'Evaluación',
		skip: 'OMITIR',
	},
	startPage: {
		interactions: {
			text: 'Busque llamadas, chats y correos electrónicos, asígnelos o evalúelos.',
		},
		scorecards: {
			text: 'Cree hojas de puntuación, defina el peso de los criterios y agrupe las preguntas.',
		},
	},
	objects: {
		criterion: 'Criterio | Criterios',
	},
};
