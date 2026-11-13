<template>
  <table-filters-panel
    :filters-manager="filtersManager"
    :filter-options="filtersOptions"
    :preset-namespace="namespace"
    :use-presets-store="useInteractionsFilterPresetsStore"
    :has-read-access="userinfoStore.hasReadAccess"
    @filter:add="addFilter"
    @filter:update="updateFilter"
    @filter:delete="deleteFilter"
    @filter:reset-all="resetFilters"
    @preset:apply="applyPreset"
    @preset:restore="restorePreset"
    @hide="emit('hide')"
  />
</template>

<script lang="ts" setup>
import {
	FilterOption,
	TableFiltersPanelComponent as TableFiltersPanel,
} from '@webitel/ui-datalist/filters';
import { RelativeDatetimeValue } from '@webitel/ui-sdk/enums';
import { storeToRefs } from 'pinia';

import { useUserinfoStore } from '../../userinfo/userInfoStore';
import { filtersOptions } from '../configs/filtersOptions';
import { SearchMode } from '../enums/SearchMode.enum';
import {
	InteractionsNamespace as namespace,
	useInteractionsDatalistStore,
	useInteractionsFilterPresetsStore,
} from '../stores';

defineOptions({
	components: {
		TableFiltersPanel,
	},
});

const emit = defineEmits<{
	hide: [];
}>();

const userinfoStore = useUserinfoStore();
const tableStore = useInteractionsDatalistStore();
const { filtersManager } = storeToRefs(tableStore);

const { addFilter, updateFilter, deleteFilter } = tableStore;

const initializeDefaultCreatedAtFilter = () => {
	if (filtersManager.value.hasFilter(FilterOption.CreatedAt)) return;

	addFilter({
		name: FilterOption.CreatedAt,
		value: RelativeDatetimeValue.Today,
	});
};

initializeDefaultCreatedAtFilter();

const resetFilters = () => {
	const excludeNotDeletableFilters = filtersOptions.reduce<string[]>(
		(excludes, opt) => {
			if (typeof opt !== 'string' && opt.notDeletable) {
				excludes.push(String(opt.name));
			}

			return excludes;
		},
		[],
	);

	filtersManager.value.reset({
		exclude: [
			...excludeNotDeletableFilters,
			...Object.values(SearchMode),
		],
	});

	addFilter({
		name: FilterOption.CreatedAt,
		value: RelativeDatetimeValue.Today,
	});
};

const applyPreset = (snapshot: string) => {
	resetFilters();
	filtersManager.value.fromString(snapshot);
};

const restorePreset = (snapshot: string) => {
	filtersManager.value.fromString(snapshot);
};
</script>
