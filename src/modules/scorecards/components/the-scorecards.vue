<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="scorecards"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :hide-secondary="!hasDeleteAccess"
        :primary-action="create"
        :secondary-action="deleteSelectedItems"
        :secondary-text="$t('reusable.delete')"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :callback="deleteCallback"
        :delete-count="deleteCount"
        @close="closeDelete"
      />
      <wt-dummy
        v-if="isEmptyData && !isLoading"
        :src="darkMode ? dummyDark : dummyLight"
        :text="$t('scorecards.emptyWorkspace')"
        class="scorecards__dummy"
        show-action
        @create="create"
      />
      <div
        v-else
        class="scorecards-main-section"
      >
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('reusable.all', { entity: $t('scorecards.scorecards', 2) }) }}
          </h3>
          <div class="content-header__actions-wrap">
            <filter-search
              :namespace="filtersNamespace"
              :search-mode-opts="searchOpts"
              multisearch
            />
            <wt-table-actions
              :icons="['refresh']"
              @input="loadData"
            >
              <filter-fields
                :headers="headers"
                :namespace="filtersNamespace"
                :static-headers="['name']"
              />
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="isLoading" />

        <div
          v-show="!isLoading"
          class="table-wrapper"
        >
          <wt-table
            :data="dataList"
            :grid-actions="hasEditAccess || hasDeleteAccess"
            :headers="headers"
            :selected="selected"
            sortable
            @sort="sort"
            @update:selected="setSelected"
          >
            <template #name="{ item }">
              <wt-item-link
                :link="`${AuditorSections.SCORECARDS}/${item.id}`"
              >
                {{ item.name }}
              </wt-item-link>
            </template>
            <template #description="{ item }">
              {{ item.description }}
            </template>
            <template #createdAt="{ item }">
              {{ prettifyDateTime(item.createdAt) }}
            </template>
            <template #createdBy="{ item }">
              <div v-if="item.createdBy">
                {{ item.createdBy.name }}
              </div>
            </template>
            <template #modifiedAt="{ item }">
              {{ prettifyDateTime(item.updatedAt) }}
            </template>
            <template #modifiedBy="{ item }">
              <div v-if="item.updatedBy">
                {{ item.updatedBy.name }}
              </div>
            </template>
            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :value="item.enabled"
                @change="patchProperty({ item, index, prop: 'enabled', value: $event })"
              />
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                :disabled="!item.editable"
                action="edit"
                @click="edit(item)"
              />
              <wt-icon-action
                :disabled="!item.editable"
                action="delete"
                @click="askDeleteConfirmation({
                  deleted: [item],
                  callback: () => deleteData(item),
                })"
              />
            </template>
          </wt-table>
          <filter-pagination
            :is-next="isNext"
            :namespace="filtersNamespace"
          />
        </div>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script setup>
import AuditorSections from '@webitel/ui-sdk/src/enums/WebitelApplications/AuditorSections.enum.js';
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import {
  useDeleteConfirmationPopup,
} from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import FilterPagination from '@webitel/ui-sdk/src/modules/Filters/components/filter-pagination.vue';
import FilterSearch from '@webitel/ui-sdk/src/modules/Filters/components/filter-search.vue';
import FilterFields from '@webitel/ui-sdk/src/modules/Filters/components/filter-table-fields.vue';
import { useTableFilters } from '@webitel/ui-sdk/src/modules/Filters/composables/useTableFilters';
import { useTableStore } from '@webitel/ui-sdk/src/store/new/modules/tableStoreModule/useTableStore.js';
import {computed, onUnmounted} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import dummyDark from '../../../app/assets/dummy-dark.svg';
import dummyLight from '../../../app/assets/dummy-light.svg';
import { useAccess } from '../../../app/composables/useAccess';
import SearchMode from '../modules/filters/enums/SearchMode.enum.js';

const baseNamespace = 'scorecards';
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const store = useStore();

const {
  namespace,

  dataList,
  isLoading,
  headers,
  isNext,
  error,
  selected,

  loadData,
  patchProperty,
  deleteData,
  sort,
  setSelected,
  onFilterEvent,
} = useTableStore(baseNamespace);

const {
  namespace: filtersNamespace,

  subscribe,
  flushSubscribers,
  restoreFilters,
} = useTableFilters(namespace);

subscribe({
  event: '*',
  callback: onFilterEvent,
});

restoreFilters();

onUnmounted(() => {
  flushSubscribers();
});

const {
  hasCreateAccess,
  hasEditAccess,
  hasDeleteAccess,
} = useAccess();

const {
  isVisible: isDeleteConfirmationPopup,
  deleteCount,
  deleteCallback,

  askDeleteConfirmation,
  closeDelete,
} = useDeleteConfirmationPopup();

// FIXME: refactor me!
const isEmptyData = computed(() => {
  if (dataList.value.length) return false;
  if (error.value) return false;
  if (route.query.q && !dataList.value.length) return false;
  if (route.query.question && !dataList.value.length) return false;
  return true;
});

const searchOpts = computed(() => [
  {
    value: SearchMode.NAME,
    text: t('reusable.name'),
  },
  {
    value: SearchMode.CRITERION,
    text: t('objects.criterion', 1),
  },
]);

/*
selectedItems in the current implementation to include items
 for which there weren't ratings and they can be edited/deleted
  */
const selectedItems = computed(() => selected.value.filter((item) => item.editable));

const darkMode = computed(() => store.getters['appearance/DARK_MODE']);

const path = computed(() => [
  { name: t('audit'), route: '/' },
  { name: t('scorecards.scorecards', 2), route: '/scorecards' },
]);

function prettifyDateTime(timestamp) {
  if (!timestamp) return '';
  return new Date(+timestamp).toLocaleString();
}

function create() {
  return router.push({
    name: `${AuditorSections.SCORECARDS}-card`,
    params: { id: 'new' },
  });
}

function edit(item) {
  return router.push({
    name: `${AuditorSections.SCORECARDS}-card`,
    params: { id: item.id },
  });
}

function deleteSelectedItems() {
  return selectedItems.value.length && askDeleteConfirmation({
    deleted: selectedItems.value,
    callback: () => deleteData([...selectedItems.value]),
  });
}
</script>

<style lang="scss" scoped>
.scorecards {
  width: 100%;
}

.scorecards-main-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
}

.scorecards__dummy {
  margin: auto;
}
</style>
