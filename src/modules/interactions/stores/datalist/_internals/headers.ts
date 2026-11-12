import type { WtTableHeader } from '@webitel/ui-sdk/src/components/wt-table/types/WtTable';

export const headers: WtTableHeader[] = [
	{
		value: 'interactionDate',
		locale: 'interactions.interactionDate',
		show: true,
	},
	{
		value: 'interactionType',
		locale: 'interactions.interactionType',
		show: true,
	},
	{
		value: 'customer',
		locale: 'interactions.customer',
		show: true,
	},
	{
		value: 'agent',
		locale: [
			'objects.agent.agent',
			1,
		],
		show: true,
	},
	{
		value: 'team',
		locale: [
			'objects.team',
			1,
		],
		show: true,
	},
	{
		value: 'duration',
		locale: 'vocabulary.duration',
		show: true,
	},
	{
		value: 'status',
		locale: 'reusable.status',
		show: true,
	},
	{
		value: 'assignee',
		locale: 'cases.assignee',
		show: true,
	},
	{
		value: 'score',
		locale: [
			'webitelUI.auditForm.score',
			1,
		],
		show: true,
	},
];
