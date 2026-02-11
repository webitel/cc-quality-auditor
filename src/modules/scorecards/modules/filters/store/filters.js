import FiltersStoreModule from '@webitel/ui-sdk/src/modules/Filters/store/FiltersStoreModule';

const filtersList = [
	{
		name: 'page',
		value: 1,
		defaultValue: 1,
	},
	{
		name: 'size',
		value: 10,
		defaultValue: 10,
	},
	{
		name: 'sort',
	},
	{
		name: 'fields',
		localStorageKey: 'audit/scorecards/fields',
		set: [
			'value',
			'query',
			'localStorage',
		],
		get: [
			'value',
			'query',
			'localStorage',
		],
		restore: [
			'query',
			'localStorage',
		],
	},
	{
		name: 'q',
	},
	{
		name: 'question',
	},
];

export default new FiltersStoreModule().addFilter(filtersList).getModule();
