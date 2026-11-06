import { HandledBy } from '../../../modules/interactions/enums/HandledBy.enum';
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
		interactionDate: 'Fecha de interacción',
		customer: 'Cliente',
		plan: 'Plan',
		dueDate: 'Fecha límite',
		contactReason: 'Motivo de contacto',
		contactResult: 'Resultado del contacto',
		csat: 'CSAT',
		ratedAt: 'Fecha de evaluación',
		handledBy: 'Atendido por',
		firstResponse: 'Primera respuesta',
		messages: 'Mensajes',
		skipReason: 'Motivo de omisión',
		skippedBy: 'Omitido por',
		skippedAt: 'Fecha de omisión',
		handledByTypes: {
			[HandledBy.Agent]: 'Agente',
			[HandledBy.Bot]: 'Bot',
			[HandledBy.Ivr]: 'IVR',
		},
		searchModes: {
			[SearchMode.Search]: 'Búsqueda regular',
			[SearchMode.Fts]: 'Búsqueda de texto completo',
			[SearchMode.Description]: 'Comentario del agente',
		},
	},
	startPage: {
		scorecards: {
			text: 'Cree hojas de puntuación, defina el peso de los criterios y agrupe las preguntas.',
		},
	},
	objects: {
		criterion: 'Criterio | Criterios',
	},
};
