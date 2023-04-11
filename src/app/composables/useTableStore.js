import { computed } from 'vue';
import { useStore } from 'vuex';
import getNamespacedState
  from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';

// eslint-disable-next-line import/prefer-default-export
export const useTableStore = (namespace) => {
  const store = useStore();

  const tableNamespace = `${namespace}/table`;

  const dataList = computed(() => getNamespacedState(store.state, tableNamespace).dataList);

  const isLoading = computed(() => getNamespacedState(store.state, tableNamespace).isLoading);

  const headers = computed(() => getNamespacedState(store.state, tableNamespace).headers);

  const isNext = computed(() => getNamespacedState(store.state, tableNamespace).isNext);

  const page = computed(() => getNamespacedState(store.state, tableNamespace).page);

  const size = computed(() => getNamespacedState(store.state, tableNamespace).size);

  const search = computed(() => getNamespacedState(store.state, tableNamespace).search);

  async function loadData() {
    await store.dispatch(`${tableNamespace}/LOAD_DATA_LIST`);
  }

  async function setSize(payload) {
    await store.dispatch(`${tableNamespace}/SET_SIZE`, payload);
  }

  async function nextPage() {
    await store.dispatch(`${tableNamespace}/SET_NEXT_PAGE`);
  }

  async function prevPage() {
    await store.dispatch(`${tableNamespace}/PREV_PAGE`);
  }

  async function patchProperty(payload) {
    await store.dispatch(`${tableNamespace}/PATCH_ITEM_PROPERTY`, payload);
  }

  async function deleteItem(payload) {
    await store.dispatch(`${tableNamespace}/DELETE_ITEM`, payload);
  }

  async function sort(...params) {
    await store.dispatch(`${tableNamespace}/SORT`, { header: params[0], nextSortOrder: params[1] });
  }

  async function setHeaders(payload) {
    await store.dispatch(`${tableNamespace}/SET_HEADERS`, payload);
  }

  async function setSearch(payload) {
    await store.dispatch(`${tableNamespace}/SET_SEARCH`, payload);
  }

  async function setLoading(payload) {
    await store.dispatch(`${tableNamespace}/SET_LOADING`, payload);
  }

  return {
    dataList,
    isLoading,
    headers,
    isNext,
    page,
    size,
    search,

    loadData,
    setSize,
    nextPage,
    prevPage,
    patchProperty,
    deleteItem,
    sort,
    setHeaders,
    setSearch,
    setLoading,
  };
};
