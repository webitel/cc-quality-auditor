import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { FilterOption } from '@webitel/ui-datalist/filters';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

import { filterConfigs } from '../../../configs/filtersOptions';

export const headers: DatalistTableHeader[] = [
	{
		value: 'interactionDate',
		locale: 'interactions.interactionDate',
		show: true,
		field: 'interaction_date',
		sort: SortSymbols.DESC,
		filter: filterConfigs[FilterOption.CreatedAt],
	},
	{
		value: 'interactionType',
		locale: 'interactions.interactionType',
		show: true,
		field: 'interaction_type',
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.InteractionType],
	},
	{
		value: 'customer',
		locale: 'interactions.customer',
		show: true,
		field: 'customer',
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.Contact],
	},
	{
		value: 'agent',
		locale: [
			'objects.agent.agent',
			1,
		],
		show: true,
		field: 'agent',
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.Agent],
	},
	{
		value: 'team',
		locale: [
			'objects.team',
			1,
		],
		show: true,
		field: 'team',
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.Team],
	},
	{
		value: 'duration',
		locale: 'vocabulary.duration',
		show: true,
		field: 'duration',
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.TalkDuration],
	},
	{
		value: 'status',
		locale: 'reusable.status',
		show: true,
		field: 'status',
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.InteractionStatus],
	},
	{
		value: 'assignee',
		locale: 'cases.assignee',
		show: true,
		field: 'assignee',
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.User],
	},
	{
		value: 'score',
		locale: [
			'webitelUI.auditForm.score',
			1,
		],
		show: true,
		field: 'score',
		sort: SortSymbols.NONE,
		filter: filterConfigs[FilterOption.Score],
	},
];
