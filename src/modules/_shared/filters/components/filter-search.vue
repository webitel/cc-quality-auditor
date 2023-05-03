<template>
  <form class="filter-search">
    <wt-search-bar
      :value="filterSchema.value"
      debounce
      @input="setValue({ filter: filterQuery, value: $event })"
      @search="setValueToQuery({ filterQuery, value: $event })"
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
              v-if="!filterSchema.value"
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
import { useI18n } from 'vue-i18n';
import SearchMode from '../enums/SearchMode.enum';
import { useFilterStore } from '../../../../app/composables/useFilter';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
});

const {
  filterQuery,
  filterSchema,

  setValue,
  setValueToQuery,
  changeMode,
} = useFilterStore(props.namespace);

const { t } = useI18n();

const searchModeOptions = computed(() => [
  {
    value: SearchMode.NAME,
    text: t('reusable.name'),
  },
  {
    value: SearchMode.CRITERION,
    text: t('objects.criterion', 1),
  },
]);

</script>

<style lang="scss" scoped>
.filter-search {
  position: relative;

  .wt-context-menu {
    position: absolute;
    top: 50%;
    right: var(--spacing-xs);
    transform: translateY(-50%);
  }
}
</style>
