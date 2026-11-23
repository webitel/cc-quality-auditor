import {
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

export const filterConfigs = {
	[FilterOption.CreatedAt]: createFilterConfig({
		name: FilterOption.CreatedAt,
		showFilterName: true,
		notDeletable: true,
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
	[FilterOption.DueDate]: createFilterConfig({
		name: FilterOption.DueDate,
		showFilterName: true,
	}),
	[FilterOption.RatedAt]: createFilterConfig({
		name: FilterOption.RatedAt,
		showFilterName: true,
	}),
	[FilterOption.Scorecard]: createFilterConfig({
		name: FilterOption.Scorecard,
		showFilterName: true,
	}),
	[FilterOption.InteractionHandledBy]: createFilterConfig({
		name: FilterOption.InteractionHandledBy,
		showFilterName: true,
	}),
	[FilterOption.FirstResponse]: createFilterConfig({
		name: FilterOption.FirstResponse,
		showFilterName: true,
	}),
	[FilterOption.Messages]: createFilterConfig({
		name: FilterOption.Messages,
		showFilterName: true,
	}),
	[FilterOption.SkippedBy]: createFilterConfig({
		name: FilterOption.SkippedBy,
		showFilterName: true,
	}),
	[FilterOption.SkippedAt]: createFilterConfig({
		name: FilterOption.SkippedAt,
		showFilterName: true,
	}),
} satisfies Record<string, FilterConfigDefinition>;

export const filtersOptions: FilterConfigDefinition[] =
	Object.values(filterConfigs);
