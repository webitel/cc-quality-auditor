import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';

export const headers: DatalistTableHeader[] = [
	{
		value: 'interactionDate',
		locale: 'interactions.interactionDate',
		show: true,
		field: 'interaction_date',
		sort: SortSymbols.DESC,
	},
	{
		value: 'interactionType',
		locale: 'interactions.interactionType',
		show: true,
		field: 'interaction_type',
		sort: SortSymbols.NONE,
	},
	{
		value: 'customer',
		locale: 'interactions.customer',
		show: true,
		field: 'customer',
		sort: SortSymbols.NONE,
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
	},
	{
		value: 'duration',
		locale: 'vocabulary.duration',
		show: true,
		field: 'duration',
		sort: SortSymbols.NONE,
	},
	{
		value: 'status',
		locale: 'reusable.status',
		show: true,
		field: 'status',
		sort: SortSymbols.NONE,
	},
	{
		value: 'assignee',
		locale: 'cases.assignee',
		show: true,
		field: 'assignee',
		sort: SortSymbols.NONE,
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
	},
];
