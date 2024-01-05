<template>
  <wt-page-wrapper class="scorecards" :actions-panel="false">
    <template v-slot:header>
      <wt-page-header
        :primary-action="create"
        :secondary-text="$t('reusable.delete')"
        :secondary-action="deleteSelectedItems"
        :hide-primary="!hasCreateAccess"
        :hide-secondary="!hasDeleteAccess"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
    </template>
    <template v-slot:main>
      <delete-confirmation-popup
        v-show="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      ></delete-confirmation-popup>
      <wt-dummy
        v-if="isEmptyData && !isLoading"
        :src="darkMode ? dummyDark : dummyLight"
        :text="$t('scorecards.emptyWorkspace')"
        show-action
        @create="create"
        class="scorecards__dummy"
      ></wt-dummy>
      <div v-else class="scorecards-main-section">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('reusable.all', { entity: $t('scorecards.scorecards', 2) }) }}
          </h3>
          <div class="content-header__actions-wrap">
            <filter-search
              :namespace="filtersNamespace"
            ></filter-search>
            <wt-table-actions
              :icons="['refresh']"
              @input="loadData"
            >
              <filter-fields
                :namespace="filtersNamespace"
                :headers="headers"
                :static-headers="['name']"
                @change="setHeaders"
              ></filter-fields>
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="isLoading"></wt-loader>

        <div v-show="!isLoading" class="table-wrapper">
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="hasEditAccess || hasDeleteAccess"
            sortable
            @sort="sort"
          >
            <template v-slot:name="{ item }">
              <wt-item-link
                :id="item.id"
                :route-name="AuditorSections.SCORECARDS"
              >{{ item.name }}
              </wt-item-link>
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
                :disabled="!hasEditAccess"
                @change="patchProperty({ item, index, prop: 'enabled', value: $event })"
              ></wt-switcher>
            </template>
            <template v-slot:actions="{ item }">
              <wt-item-link
                :id="item.id"
                :route-name="AuditorSections.SCORECARDS"
                :disabled="!item.editable"
              >
                <wt-icon-action
                  v-if="hasEditAccess"
                  :disabled="!item.editable"
                  action="edit"
                ></wt-icon-action>
              </wt-item-link>
              <wt-icon-action
                v-if="hasDeleteAccess"
                action="delete"
                :disabled="!item.editable"
                @click="askDeleteConfirmation({
                  deleted: [item],
                  callback: () => deleteData(item),
                })"
              ></wt-icon-action>
            </template>
          </wt-table>
          <filter-pagination
            :namespace="filtersNamespace"
            :is-next="isNext"
          ></filter-pagination>
        </div>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import {
  useDeleteConfirmationPopup,
} from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableStore } from '@webitel/ui-sdk/src/modules/TableStoreModule/composables/useTableStore';
import { useTableFilters } from '@webitel/ui-sdk/src/modules/Filters/composables/useTableFilters';
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import AuditorSections from '@webitel/ui-sdk/src/enums/WebitelApplications/AuditorSections.enum';
import FilterFields from '@webitel/ui-sdk/src/modules/QueryFilters/components/filter-table-fields.vue';
import FilterPagination from '@webitel/ui-sdk/src/modules/Filters/components/filter-pagination.vue';
import FilterSearch from '../modules/filters/components/filter-search.vue';
import { useAccess } from '../../../app/composables/useAccess';
import dummyLight from '../../../app/assets/dummy-light.svg';
import dummyDark from '../../../app/assets/dummy-dark.svg';

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

  loadData,
  patchProperty,
  deleteData,
  sort,
  setHeaders,
} = useTableStore(baseNamespace);

const {
  filtersNamespace,
} = useTableFilters(namespace);

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

/*
selectedItems in the current implementation to include items
 for which there weren't ratings and they can be edited/deleted
  */
const selectedItems = computed(() => (
  dataList.value.filter((item) => item._isSelected && item.editable)));
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
  return router.push({ name: `${AuditorSections.SCORECARDS}-new` });
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
