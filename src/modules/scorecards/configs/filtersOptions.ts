import {
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

export const interactionTypeFilterConfig = createFilterConfig({
	name: FilterOption.InteractionType,
	showFilterName: true,
});

export const filtersOptions: FilterConfigDefinition[] = [
	interactionTypeFilterConfig,
];
