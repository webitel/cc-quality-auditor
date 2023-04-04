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
      <delete-confirmation-popup
        v-show="isDeleteConfirmationPopup"
        :namespace="namespace"
        :id="id"
        @close="closePopup"
      ></delete-confirmation-popup>

      <div class="scorecards-main-section">
        <header class="content-header">
          <h3 class="content-title">{{ t('objects.all', { entity: t('scorecards.scorecards', 2) }) }}</h3>
          <filters-panel
            :headers="headers"
            :namespace="namespace"
          ></filters-panel>
        </header>

        <wt-loader v-show="isLoaded"></wt-loader>

        <div v-if="isEmptyWorkspace" class="scorecards__dummy">
          <the-dummy :namespace="namespace"></the-dummy>
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
              <span class="name-link" @click="openAuditView(item.id)">
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
                @click="openAuditView(item)"
              ></edit-action>
              <delete-action
                @click="openPopup(item)"
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
import { onMounted, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import TheDummy from '../../dummy/components/the-dummy.vue';
import ObjectHeader from '../../../app/components/utils/the-object-header.vue';
import EditAction from '../../../app/components/actions/edit-action.vue';
import DeleteAction from '../../../app/components/actions/delete-action.vue';
import DeleteConfirmationPopup from '../../../app/components/utils/delete-confirmation-popup.vue';
import FiltersPanel from '../../_shared/filters/components/filters-panel.vue';

const { t, tc } = useI18n();
const store = useStore();
const router = useRouter();
const namespace = 'scorecards';
const isDeleteConfirmationPopup = ref(false);

const dataList = computed(() => store.state.scorecards.dataList);
const isLoaded = computed(() => store.state.scorecards.isLoading);
const isEmptyWorkspace = computed(() => !dataList.value.length);
const headersValue = computed(() => store.state.scorecards.headers);
const isNext = computed(() => store.state.scorecards.isNext);
const page = computed(() => store.state.scorecards.page);
const size = computed(() => store.state.scorecards.size);
const id = computed(() => store.state.scorecards.itemId);
const headers = computed(() => {
  if (!headersValue.value.length) return [];
  return headersValue.value.map((header) => ({
    ...header,
    text: typeof header.locale === 'string' ? t(header.locale) : tc(...header.locale),
  }));
});
const path = computed(() => [
  { name: t('reusable.audit'), route: '' },
  { name: t('scorecards.scorecards'), route: '/' },
]);

async function loadData() {
  await store.dispatch(`${namespace}/LOAD_DATA`);
}

async function setSize(payload) {
  await store.dispatch(`${namespace}/SET_SIZE`, payload);
}

async function nextPage() {
  await store.dispatch(`${namespace}/SET_NEXT_PAGE`);
}

async function prevPage() {
  await store.dispatch(`${namespace}/PREV_PAGE`);
}

async function setItemId(payload) {
  await store.dispatch(`${namespace}/SET_ITEM_ID`, payload);
}

async function patchProperty(payload) {
  await store.dispatch(`${namespace}/PATCH_ITEM_PROPERTY`, payload);
}

function prettifyDateTime(timestamp) {
  if (!timestamp) return '';
  return new Date(+timestamp).toLocaleString();
}

function openAuditView(id) {
  setItemId(id);
  router.push({ name: `${namespace}-edit`, params: { id } });
}

function create() {
  router.push({ name: `${namespace}-new` });
}

function close() {
  router.go(-1);
}

function openPopup(item) {
  setItemId(item.id);
  isDeleteConfirmationPopup.value = true;
}

function closePopup() {
  isDeleteConfirmationPopup.value = false;
}

onMounted(() => loadData());

</script>

<style lang="scss" scoped>
.content-header__actions-wrap {
  margin-left: auto;
}
</style>
