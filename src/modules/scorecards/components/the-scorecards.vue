<template>
  <wt-page-wrapper class="scorecards" :actions-panel="false">
    <template v-slot:header>
      <object-header
        :primary-action="create"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </object-header>
    </template>
    <template v-slot:main>
      <div class="scorecards-main-section">
        <header class="content-header">
          <h3 class="content-title">{{ t('objects.all', { entity: t('scorecards.scorecards', 2)}) }}</h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
            ></wt-search-bar>
            <wt-table-actions
              :icons="['refresh','column-select']"
            >
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="isLoaded"></wt-loader>

        <div v-if="isEmptyWorkspace" class="scorecards__dummy" >
          <the-dummy></the-dummy>
        </div>
        <div v-show="!isLoaded">
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="true"
            sortable
            @sort="sort"
          >
            <template v-slot:name="{ item }">
              <span class="name-link" @click="openAgentView(item.id)">
                {{ item.name }}
              </span>
            </template>
            <template v-slot:description="{ item }">
              {{ item.description }}
            </template>
            <template v-slot:createdAt="{ item }">
              {{ prettifyDateTime(item.createdAt) }}
            </template>
            <template v-slot:createdBy="{ item }">
              <div v-if="item.createdBy">
                {{ item.createdBy.name }}
              </div>
            </template>
            <template v-slot:modifiedAt="{ item }">
              {{ prettifyDateTime(item.updatedAt) }}
            </template>
            <template v-slot:modifiedBy="{ item }">
              <div v-if="item.updatedBy">
                {{ item.updatedBy.name }}
              </div>
            </template>
            <template v-slot:state="{ item, index }">
              <wt-switcher
                :value="item.enabled"
                @change="patchProperty({item, index, prop: 'enabled', value: $event})"
              ></wt-switcher>
            </template>
            <template v-slot:actions="{ item }">
              <edit-action
                class="scorecards-editing"
                @click="edit(item)"
              ></edit-action>
                <delete-action
                  @click="callDelete(item)"
                ></delete-action>
            </template>
          </wt-table>
          <wt-pagination
            :next="isNext"
            :prev="page > 1"
            :size="size"
            debounce
            @change="loadData"
            @input="setSize"
            @next="nextPage"
            @prev="prevPage"
          ></wt-pagination>
        </div>

        </div>
    </template>
  </wt-page-wrapper>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import TheDummy from '../../dummy/components/the-dummy.vue';
import ObjectHeader from '../../../app/components/utils/the-object-header.vue';
import EditAction from '../../../app/components/actions/edit-action.vue';
import DeleteAction from '../../../app/components/actions/delete-action.vue';

const { t, tc } = useI18n();
const store = useStore();
const router = useRouter();
const route = useRoute();

const namespace = 'scorecards';

const dataList = computed(() => store.state.scorecards.dataList);

async function loadData() {
  await store.dispatch(`${namespace}/LOAD_DATA`);
}

onMounted(() => loadData());

const isLoaded = computed(() => store.state.scorecards.isLoading);

const isEmptyWorkspace = computed(() => !dataList.value.length);

const headers = computed(() => {
  const headersValue = computed(() => store.state.scorecards.headers);
  if (!headersValue.value.length) return [];
  return headersValue.value.map((header) => ({
      ...header,
      text: typeof header.locale === 'string' ? t(header.locale) : tc(...header.locale)
    })
  );
})

const isNext = computed(() => store.state.scorecards.isNext);
const page = computed(() => store.state.scorecards.page);
const size = computed(() => store.state.scorecards.size);

async function setSize() {
  await store.dispatch(`${namespace}/SET_SIZE`);
}

async function nextPage() {
  await store.dispatch(`${namespace}/SET_NEXT_PAGE`);
}

async function prevPage() {
  await store.dispatch(`${namespace}/PREV_PAGE`);
}

function prettifyDateTime(timestamp) {
  if(!timestamp) return '';
  return new Date(+timestamp).toLocaleString();
}

async function openAgentView(id) {
    await store.dispatch('scorecards/SET_ITEM_ID', id);
  router.push({
    name: 'scorecards-edit',
    params: { id },
  });
}

const path = computed(() => {
return [
    { name: t('reusable.audit'), route: '' },
    { name: t('scorecards.scorecards'), route: '/' },
    // { name: `${this.$t('scorecards.scorecards')} (${this.callId})` },
  ]
})

function create() {
  router.push({
    name: 'scorecards-new',
  });
}

function close() {
  router.go(-1);
}

const id = computed(() => store.state.scorecards.itemId);
const pathName = store.state.scorecards.itemInstance.name;


async function edit({id}) {
  await store.dispatch('scorecards/SET_ITEM_ID', id);
  router.push({
    name: `${namespace}-edit`,
    params: { id },
  });
}

async function patchProperty (payload) {
  await store.dispatch(`${namespace}/PATCH_ITEM_PROPERTY`, payload);
}

</script>

<style lang="scss" scoped>
.content-header__actions-wrap {
  margin-left: auto;
}
</style>
