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
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import deepEqual from 'deep-equal';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import SearchMode from '../enums/SearchMode.enum';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
});

const store = useStore();
const router = useRouter();
const route = useRoute();
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

const filterNamespace = `${props.namespace}/filters`;
const filterQuery = ref(SearchMode.NAME);
const filterSchema = computed(() => {
  if (!store) throw new Error('Vuex is required for default filterSchema baseFilterMixin property');
  return getNamespacedState(store.state, `${filterNamespace}`)[filterQuery.value];
});

function setValue(payload) {
  if (!store) throw new Error('Vuex is required for default filterSchema baseFilterMixin property');
  return store.dispatch(`${filterNamespace}/SET_FILTER`, payload);
}

function changeRouteQuery({ filterQuery, value }) {
  const query = value ? { ...route.query } : {};
  if (value) query[filterQuery] = value;
  return router.replace({
    name: router.currentRoute.value.name,
    query,
  });
}

function setValueToQuery({ filterQuery, value, storedProp = 'id' }) {
  let newValue = '';
  if (Array.isArray(value)) {
    if (value.length && typeof value[0] !== 'object') {
      newValue = value;
    } else {
      newValue = value.map((item) => item[storedProp]);
    }
  } else if (typeof value === 'object' && value !== null) {
    newValue = value[storedProp];
  } else {
    newValue = value;
  }
  if (!deepEqual(route.query[filterQuery], newValue)) {
    changeRouteQuery({
      value: newValue,
      filterQuery,
    });
  }
}

function changeMode({ value }) {
  setValue({ filter: filterQuery.value, value: '' });
  setValueToQuery({ filterQuery: filterQuery.value, value: '' });
  filterQuery.value = value;
}

function getValueFromQuery({ filterQuery }) {
  return route.query[filterQuery];
}

function updateValueFromUrl() {
  const name = getValueFromQuery({ filterQuery: SearchMode.NAME });
  if (name) {
    filterQuery.value = SearchMode.NAME;
    setValue({ filter: SearchMode.NAME, value: name });
    return;
  }

  const criterion = getValueFromQuery({ filterQuery: SearchMode.CRITERION });
  if (criterion) {
    filterQuery.value = SearchMode.CRITERION;
    setValue({ filter: SearchMode.CRITERION, value: criterion });
  }
}

onMounted(() => updateValueFromUrl());
</script>

<style lang="scss" scoped>
.filter-search {
  position: relative;
  z-index: 1;

  .wt-context-menu {
    position: absolute;
    top: 50%;
    right: var(--spacing-xs);
    transform: translateY(-50%);
  }
}
</style>
