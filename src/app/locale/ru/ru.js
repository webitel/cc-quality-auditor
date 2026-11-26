import { ChannelType } from '@webitel/api-services/enums';

import { EvaluationCardTab } from '../../../modules/evaluation-card/enums/EvaluationCardTab.enum';
import { InteractionType } from '../../../modules/interactions/enums/InteractionType.enum';
import { SearchMode } from '../../../modules/interactions/enums/SearchMode.enum';

export default {
	audit: 'Аудит',
	scorecards: {
		scorecards: 'Анкета | Анкеты',
		emptyWorkspace: 'Анкеты еще не созданы',
		usedScorecardCantEdit:
			'У анкеты есть оценки, её нельзя редактировать. Откройте её и используйте СОХРАНИТЬ КАК, чтобы создать копию.',
		usedScorecardCantDelete: 'Анкета используется, её нельзя удалить.',
	},
	interactions: {
		allInteractions: 'Все взаимодействия',
		transcribe: 'Транскрибировать',
		assign: 'Назначить',
		assignInteractions:
			'Назначить взаимодействие | Назначить взаимодействия: {n}',
		me: '(я)',
		deleteEvaluations: 'Удалить оценки | Удалить оценки: {n}',
		evaluationsWillBeDeleted: 'Оценка будет удалена. | Оценки будут удалены.',
		interactionReturnsToNotEvaluated:
			'Взаимодействие вернётся в статус «Не оценено».',
		interactionDate: 'Дата взаимодействия',
		customer: 'Клиент',
		plan: 'План',
		contactReason: 'Причина обращения',
		contactResult: 'Результат обращения',
		csat: 'CSAT',
		skipReason: 'Причина пропуска',
		interactionTypes: {
			[InteractionType[ChannelType.Call]]: ({ linked }) =>
				linked('objects.interactionType.call'),
			[InteractionType[ChannelType.Chat]]: ({ linked }) =>
				linked('objects.interactionType.chat'),
			[InteractionType[ChannelType.Email]]: ({ linked }) =>
				linked('objects.interactionType.email'),
		},
		searchModes: {
			[SearchMode.Search]: 'Обычный поиск',
			[SearchMode.Fts]: 'Полнотекстовый поиск',
			[SearchMode.Description]: 'Комментарий оператора',
		},
	},
	evaluationCard: {
		tabs: {
			[EvaluationCardTab.Conversation]: 'Разговор',
			[EvaluationCardTab.Information]: 'Информация',
			[EvaluationCardTab.ScreenRecording]: 'Запись экрана',
		},
		evaluation: 'Оценка',
		skip: 'Пропустить',
		information: {
			unknown: 'Неизвестно',
			postprocessing: 'Постобработка',
			empty: 'Информации пока нет',
		},
	},
	startPage: {
		interactions: {
			text: 'Поиск звонков, чатов и писем, назначение и оценивание.',
		},
		scorecards: {
			text: 'Создание анкет оценивания, веса критериев и группировка вопросов.',
		},
	},
	objects: {
		criterion: 'Критерий | Критерии',
	},
};
