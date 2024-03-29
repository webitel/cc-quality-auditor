<template>
  <form
    class="filter-search"
    @submit.prevent
  >
    <wt-search-bar
      v-model="localValue"
      debounce
      @search="setValue({ filter: filterQuery, value: localValue })"
    >
      <template #additional-actions>
        <wt-context-menu
          :options="searchModeOptions"
          @click="changeMode($event.option)"
        >
          <template #activator>
            <wt-tooltip>
              <template #activator>
                <wt-icon-btn
                  icon="filter"
                />
              </template>
              {{ $t('webitelUI.searchBar.settingsHint') }}
            </wt-tooltip>
          </template>
          <template #option="{ value, text }">
            <wt-radio
              :label="text"
              :selected="filterQuery === value"
              :value="true"
            />
          </template>
        </wt-context-menu>
      </template>
    </wt-search-bar>
  </form>
</template>
<script setup>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import {
  watch,
  computed,
  ref,
  onMounted,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import SearchMode from '../enums/SearchMode.enum';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
});

const store = useStore();
const { t } = useI18n();

const localValue = ref('');

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

const filterQuery = ref(SearchMode.NAME);
const filterSchema = computed(() => (
  getNamespacedState(store.state, `${props.namespace}`)[filterQuery.value]));

function getValue(filter) {
  return store.getters[`${props.namespace}/GET_FILTER`](filter);
}

function setValue(payload) {
  return store.dispatch(`${props.namespace}/SET_FILTER`, payload);
}

function changeMode({ value }) {
  setValue({ filter: filterQuery.value, value: '' });
  filterQuery.value = value;
}

function restoreSearchMode() {
  // we need to wait until filters will restore so that we know what filter mode is set
  setTimeout(() => {
    const mode = searchModeOptions.value.find(({ value }) => !!getValue(value));
    if (mode) changeMode({ value: mode.value });
  }, 1000);
}

watch(() => filterSchema.value.value, () => {
  localValue.value = filterSchema.value.value;
}, { immediate: true });

onMounted(() => restoreSearchMode());
</script>

<style lang="scss" scoped>
</style>
