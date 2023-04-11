<template>
  <form class="history-search">
    <wt-search-bar
      :value="search"
      debounce
      @enter="loadList"
      @input="setSearch"
      @search="loadList"
    >
    </wt-search-bar>
    <wt-context-menu
      :options="searchModeOptions"
      @click="changeMode($event.option)"
    >
      <template v-slot:activator>
        <wt-tooltip>
          <template v-slot:activator>
            <wt-icon-btn
              icon="filter"
            ></wt-icon-btn>
          </template>
          {{ $t('objects.filters.settingsHint') }}
        </wt-tooltip>
      </template>
      <template v-slot:option="{ value, text }">
        <wt-radio
          :label="text"
          :selected="filterQuery === value"
          :value="true"
        ></wt-radio>
      </template>
    </wt-context-menu>
  </form>
</template>
<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n/index.mjs';
import { useTableStore } from '@webitel/ui-sdk/src/modules/TableStoreModule/composables/useTableStore';
import SearchMode from '../enums/SearchMode.enum';

const { t } = useI18n();
const namespace = 'scorecards';
const {
  headers,
  search,
  isLoading,

  loadData,
  setHeaders,
  setLoading,
  setSearch,
} = useTableStore(namespace);

async function loadList() {
  setLoading(true);
  try {
    loadData();
  } catch (error) {
  } finally {
    setLoading(false);
  }
}
const searchModeOptions = computed(() => [
  {
    value: SearchMode.NAME,
    text: t(`reusable.${SearchMode.NAME}`),
  },
  {
    value: SearchMode.CRITERION,
    text: t(`objects.${SearchMode.CRITERION}`),
  },
]);

function changeMode({ value }) {
  console.log(value);
}

</script>

<style lang="scss" scoped>

</style>
