import deepEqual from 'deep-equal';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import getNamespacedState
  from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import SearchMode
  from '../../modules/_shared/filters/enums/SearchMode.enum';

export const useFilterStore = (namespace) => {
  const store = useStore();
  const router = useRouter();
  const route = useRoute();
  const filterNamespace = `${namespace}/table/filters`;

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

  return {
    filterQuery,
    filterSchema,

    setValue,
    setValueToQuery,
    changeMode,
  };
};
