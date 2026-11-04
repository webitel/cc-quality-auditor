import {
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

export const filterConfigs = {
	[FilterOption.CreatedAt]: createFilterConfig({
		name: FilterOption.CreatedAt,
		showFilterName: true,
	}),
	[FilterOption.InteractionType]: createFilterConfig({
		name: FilterOption.InteractionType,
		showFilterName: true,
	}),
	[FilterOption.Contact]: createFilterConfig({
		name: FilterOption.Contact,
		showFilterName: true,
	}),
	[FilterOption.Agent]: createFilterConfig({
		name: FilterOption.Agent,
		showFilterName: true,
	}),
	[FilterOption.Team]: createFilterConfig({
		name: FilterOption.Team,
		showFilterName: true,
	}),
	[FilterOption.TalkDuration]: createFilterConfig({
		name: FilterOption.TalkDuration,
		showFilterName: true,
	}),
	[FilterOption.InteractionStatus]: createFilterConfig({
		name: FilterOption.InteractionStatus,
		showFilterName: true,
	}),
	[FilterOption.User]: createFilterConfig({
		name: FilterOption.User,
		showFilterName: true,
	}),
	[FilterOption.Score]: createFilterConfig({
		name: FilterOption.Score,
		showFilterName: true,
	}),
} satisfies Record<string, FilterConfigDefinition>;

export const filtersOptions: FilterConfigDefinition[] =
	Object.values(filterConfigs);
