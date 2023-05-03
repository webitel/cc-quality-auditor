<template>
  <wt-page-wrapper class="scorecards" :actions-panel="false">
    <template v-slot:header>
      <wt-page-header
        :primary-action="create"
        :secondary-text="$t('reusable.delete')"
        :secondary-action="deleteSelectedItems"
      ><wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
    </template>
    <template v-slot:main>
      <delete-confirmation-popup
        v-show="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      ></delete-confirmation-popup>

      <div v-if="isEmptyData && !isLoading" class="scorecards__dummy">
        <the-dummy
          :entity="$t('scorecards.scorecards', 2)"
          @create="create"
        ></the-dummy>
      </div>

      <div v-else class="scorecards-main-section">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('reusable.all', { entity: $t('scorecards.scorecards', 2) }) }}
          </h3>
          <div class="content-header__actions-wrap">
            <filter-search :namespace="namespace"></filter-search>
            <wt-table-actions
              :icons="['refresh']"
              @input="loadData"
            >
              <wt-table-column-select
                :headers="headers"
                :static-headers="staticHeaders"
                @change="changeHeaders"
              ></wt-table-column-select>
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="isLoading"></wt-loader>

        <div v-show="!isLoading" class="table-wrapper">
          <wt-table
            :headers="headers"
            :data="dataList"
            sortable
            @sort="sort"
          >
            <template v-slot:name="{ item }">
              <span class="name-link" @click="openAuditView(item)">
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
                @change="patchProperty({ item, index, prop: 'enabled', value: $event })"
              ></wt-switcher>
            </template>
            <template v-slot:actions="{ item }">
              <wt-icon-action
                action="edit"
                :disabled="!item.editable"
                @click="openAuditView(item)"
              ></wt-icon-action>
              <wt-icon-action
                action="delete"
                :disabled="!item.editable"
                @click="askDeleteConfirmation({
                  deleted: [item],
                  callback: () => deleteData(item),
                })"
              ></wt-icon-action>
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
import { onMounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableStore } from '@webitel/ui-sdk/src/modules/TableStoreModule/composables/useTableStore';
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import TheDummy from '../../dummy/components/the-dummy.vue';
import FilterSearch from '../../_shared/filters/components/filter-search.vue';

const namespace = 'scorecards';
const staticHeaders = ['name'];
const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const {
  dataList,
  isLoading,
  headers,
  isNext,
  page,
  size,
  errors,

  loadData,
  setSize,
  nextPage,
  prevPage,
  patchProperty,
  deleteData,
  sort,
  setHeaders,
} = useTableStore(namespace);

const {
  isVisible: isDeleteConfirmationPopup,
  deleteCount,
  deleteCallback,

  askDeleteConfirmation,
  closeDelete,
} = useDeleteConfirmationPopup();

const query = computed(() => route.query);

const isEmptyData = computed(() => (!dataList.value.length && !errors) || (!dataList.value.length && !query.value));

/* selectedItems in the current implementation to include items for which there weren't ratings and they can be edited/deleted */
const selectedItems = computed(() => dataList.value.filter((item) => item._isSelected && item.editable));

const searchQuery = computed(() => (query.value.q ? { q: query.value.q } : { question: query.value.question }));

const path = computed(() => [
  { name: t('audit'), route: '/' },
  { name: t('scorecards.scorecards', 2), route: '/scorecards' },
]);

function prettifyDateTime(timestamp) {
  if (!timestamp) return '';
  return new Date(+timestamp).toLocaleString();
}

function openAuditView({ id }) {
  return router.push({ name: `${namespace}-edit`, params: { id } });
}

function create() {
  return router.push({ name: `${namespace}-new` });
}

function updateHeaders() {
  const headersValue = localStorage.getItem('filter-fields');
  if (!headersValue) return;
  const value = headers.value.map((header) => ({
    ...header,
    show: headersValue.includes(header.value),
  }));
  setHeaders(value);
}

function changeHeaders(value) {
  setHeaders(value);
  const visibleHeaders = value.filter((item) => item.show);
  const filter = visibleHeaders.map((item) => item.value);
  localStorage.setItem('filter-fields', filter);
}

function deleteSelectedItems() {
  return selectedItems.value.length && askDeleteConfirmation({
    deleted: selectedItems.value,
    callback: () => deleteData([...selectedItems.value]),
  });
}

onMounted(() => {
  loadData(searchQuery);
  updateHeaders();
});

watch(query, () => loadData(searchQuery), { immediate: true });

</script>

<style lang="scss" scoped>
.scorecards-main-section {
  width: 100%;
}

.scorecards__dummy {
  margin: auto;
}
</style>
