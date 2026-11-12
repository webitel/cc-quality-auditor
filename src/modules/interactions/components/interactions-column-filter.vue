<template>
  <column-filter
    :header="header"
    :form-view="formView"
    :hide="hide"
    :filters-manager="filtersManager"
    :has-read-access="userinfoStore.hasReadAccess"
    @add:filter="addFilter"
    @update:filter="updateFilter"
    @delete:filter="deleteFilter"
  />
</template>

<script lang="ts" setup>
import { ColumnFilterComponent as ColumnFilter } from '@webitel/ui-datalist/filters';
import type { WtTableHeader } from '@webitel/ui-sdk/src/components/wt-table/types/WtTable';
import { storeToRefs } from 'pinia';

import { useUserinfoStore } from '../../userinfo/userInfoStore';
import { useInteractionsDatalistStore } from '../stores';

defineOptions({
	components: {
		ColumnFilter,
	},
});

defineProps<{
	header: WtTableHeader;
	formView?: boolean;
	hide?: () => void;
}>();

const userinfoStore = useUserinfoStore();
const tableStore = useInteractionsDatalistStore();
const { filtersManager } = storeToRefs(tableStore);

const { addFilter, updateFilter, deleteFilter } = tableStore;
</script>
