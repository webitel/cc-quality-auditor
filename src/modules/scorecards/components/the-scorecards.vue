<template>
  <wt-page-wrapper class="scorecards" :actions-panel="false">
    <template v-slot:header>
      <audit-header/>
    </template>
    <template v-slot:main>
      <div class="scorecards-wrapper">
        <header>
          <h3 class="content-title">{{ t('objects.allScorecards') }}</h3>
<!--          <div>-->
<!--            <wt-search-bar-->
<!--              :value="search"-->
<!--              debounce-->
<!--            ></wt-search-bar>-->
<!--            <wt-table-actions-->
<!--              :icons="['refresh','column-select']"-->
<!--            >-->
<!--            </wt-table-actions>-->
<!--          </div>-->
        </header>

        <wt-loader v-show="isLoaded"></wt-loader>

        <div v-if="isEmptyWorkspace" class="scorecards__dummy" >
          <the-dummy></the-dummy>
        </div>
        <div v-show="!isLoaded">
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="false"
            sortable
            @sort="sort"
          >
            <template v-slot:name="{ item }">
                {{ item.name }}
            </template>
            <template v-slot:description="{ item }">
              {{ item.description }}
            </template>
            <template v-slot:createdAt="{ item }">
              {{ prettifyDateTime(item.createdAt) }}
            </template>
<!--            <template v-slot:createdBy="{ item }">-->
<!--              {{ item.createBy.name }}-->
<!--            </template>-->
            <template v-slot:modifiedAt="{ item }">
              {{ prettifyDateTime(item.modifiedAt) }}
            </template>
<!--            <template v-slot:modifiedBy="{ item }">-->
<!--              {{ item.modifiedBy.name }}-->
<!--            </template>-->
            <template v-slot:state="{ item, index }">
              <wt-switcher
                :value="item.enabled"
              ></wt-switcher>
            </template>
          </wt-table>
        </div>

        </div>
    </template>
  </wt-page-wrapper>
</template>

<script async setup>

import { onBeforeMount, onMounted, ref, computed, useSlots, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import AuditHeader from '../../_reusable/app-header/components/audit-header.vue';
import TheDummy from '../../dummy/components/the-dummy.vue';
import { useStore } from 'vuex';

// let dataList;
const { t } = useI18n();
const store = useStore();

const dataList = computed(() => store.state.scorecards.dataList);
console.log(store)
onMounted( async () => {
  await store.dispatch('scorecards/LOAD_DATA');
  // dataList = store.state.scorecards.dataList;
});
// console.log(dataList);
// const item = computed(() => dataList.value[0]);
// console.log(item);
// let test = store.state.scorecards.dataList;
// const dataList = store.state.scorecards.dataList;
// setTimeout(() => console.log(store.state.scorecards.dataList), 3000);
// const isLoaded = computed(() => store.getters['scorecards/IS_LOADING']);
const isLoaded = computed(() => store.state.scorecards.isLoading);
const isEmptyWorkspace = computed(() => !dataList.value.length);
console.log(isEmptyWorkspace);
const headers = store.state.scorecards.headers;
// setTimeout(() => dataList[0], 3000);
// const item  = dataList[0];
// console.log(item)

function prettifyDateTime(timestamp) {
  return new Date(+timestamp).toLocaleString();
}
</script>

<style lang="scss" scoped>
.scorecards {
  background-color: var(--page-bg-color) !important;

  &-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
}


</style>
