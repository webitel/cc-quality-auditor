<template>
  <wt-page-wrapper class="scorecards" :actions-panel="false">
    <template v-slot:header>
      <audit-header/>
    </template>
    <template v-slot:main>
      <div class="scorecards-wrapper">
<!--        <div class="scorecards__dummy" >-->
<!--          <the-dummy></the-dummy>-->
<!--        </div>-->
        <wt-table
          :data="dataList"
          :headers="headers"
          sortable
          :grid-actions="false"
        >
        </wt-table>
        </div>
    </template>
<!--                <div class="wrap">-->
<!--                  <wt-search-bar-->
<!--                    debounce-->
<!--                  ></wt-search-bar>-->
<!--                  <wt-table-actions-->
<!--                    :icons="['refresh','column-select']"-->
<!--                  ></wt-table-actions>-->
<!--                </div>-->
<!--          <section>-->
<!--&lt;!&ndash;            <wt-loader v-show="isLoading"></wt-loader>&ndash;&gt;-->
<!--            <div>-->



  </wt-page-wrapper>
</template>

<script setup>

import { onMounted, ref, computed, useSlots } from 'vue';
import AuditHeader from '../../_reusable/app-header/components/audit-header.vue';
import TheDummy from '../../dummy/components/the-dummy.vue';
import { useStore } from 'vuex';
     const store = useStore();
     const slots = useSlots();

    let dataList = store.state.scorecards.dataList;
    const isEmptyWorkspace = computed(() => { return !dataList.length });
    const headers = store.state.scorecards.headers;

    onMounted(async () => {
        await store.dispatch('scorecards/LOAD_DATA');
    });
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
