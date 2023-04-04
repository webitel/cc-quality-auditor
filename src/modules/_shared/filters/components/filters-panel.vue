<template>
  <div class="content-header__actions-wrap">
    <wt-search-bar
      :value="search"
      debounce
      @enter="loadList"
      @input="setSearch"
      @search="loadList"
    ></wt-search-bar>

    <wt-table-actions
      :icons="['refresh']"
      @input="refreshList"
    >
      <wt-table-column-select
        :headers="props.headers"
        :static-headers="staticHeaders"
        @change="changeVisibleHeaders"
      ></wt-table-column-select>
    </wt-table-actions>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  namespace: {
    type: String,
  },
});

const route = useRoute();
const store = useStore();
const staticHeaders = ['name'];
const search = computed(() => store.state.scorecards.search);

function changeVisibleHeaders(payload) {
  store.dispatch(`${props.namespace}/SET_HEADERS`, payload);
}

async function refreshList() {
  await store.dispatch(`${props.namespace}/LOAD_DATA`);
}

function setSearch(payload) {
  store.dispatch(`${props.namespace}/SET_SEARCH`, payload);
}

async function loadList() {
  await store.dispatch(`${props.namespace}/LOAD_DATA_LIST`, route.query);
}

</script>
