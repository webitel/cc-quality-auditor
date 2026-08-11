<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="scorecards table-page"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :callback="deleteCallback"
        :delete-count="deleteCount"
        @close="closeDelete"
      />
      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title typo-heading-3">
            {{ t('reusable.all', { entity: t('scorecards.scorecards', 2) }) }}
          </h3>
          <wt-action-bar
            :include="[IconAction.REFRESH, IconAction.COLUMNS, IconAction.DELETE]"
            :disabled:delete="isDeleteDisabled"
            @click:refresh="loadDataList"
            @click:delete="
              askDeleteConfirmation({
                deleted: selectedItems,
                callback: () => deleteEls(selectedItems),
              })
            "
          >
            <template #search-bar>
              <DynamicFilterSearch
                :filters-manager="filtersManager"
                :is-filters-restoring="isFiltersRestoring"
                :search-mode="searchMode"
                :search-mode-options="searchModeOptions"
                @filter:add="addFilter"
                @filter:update="updateFilter"
                @filter:delete="deleteFilter"
                @update:search-mode="updateSearchMode"
              />
            </template>
            <template #columns>
              <wt-table-column-select
                :headers="headers"
                @change="updateShownHeaders"
              />
            </template>
          </wt-action-bar>
        </header>

        <div class="table-section__table-wrapper">
          <wt-empty
            v-show="showEmpty"
            :image="imageEmpty"
            :text="textEmpty"
          />
          <wt-loader v-show="isLoading" />
          <div
            v-show="dataList.length && !isLoading"
            class="table-section__table-wrapper"
          >
            <wt-table
              :data="dataList"
              :headers="shownHeaders"
              :selected="selected"
              sortable
              @sort="updateSort"
              @update:selected="updateSelected"
            >
              <template #name="{ item }">
                <wt-item-link :link="`${AuditorSections.Scorecards}/${item.id}`">
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
                  :disabled="!hasUpdateAccess"
                  :model-value="item.enabled"
                  @update:model-value="
                    patchItemProperty({
                      index,
                      path: 'enabled',
                      value: $event,
                    })
                  "
                />
              </template>
              <template #actions="{ item }">
                <div
                  v-tooltip="
                    showEditUsedTooltip(item) &&
                      t('scorecards.usedScorecardCantEdit')
                  "
                >
                  <wt-icon-action
                    :disabled="isEditDisabled(item)"
                    action="edit"
                    @click="edit(item)"
                  />
                </div>
                <div
                  v-tooltip="
                    showDeleteUsedTooltip(item) &&
                      t('scorecards.usedScorecardCantDelete')
                  "
                >
                  <wt-icon-action
                    :disabled="isDeleteActionDisabled(item)"
                    action="delete"
                    @click="
                      askDeleteConfirmation({
                        deleted: [item],
                        callback: () => deleteEls([item]),
                      })
                    "
                  />
                </div>
              </template>
            </wt-table>
            <wt-pagination
              :next="next"
              :prev="page > 1"
              :size="size"
              debounce
              @change="updateSize"
              @next="updatePage(page + 1)"
              @prev="updatePage(page - 1)"
            />
          </div>
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import type { EngineAuditForm } from '@webitel/api-services/gen/models';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import {
	AuditorSections,
	FormatDateMode,
	IconAction,
	WtObject,
} from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { formatDate } from '@webitel/ui-sdk/utils';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../app/composables/useUserAccessControl';
import { SearchMode } from '../enums/SearchMode.enum';
import { useScorecardsDatalistStore } from '../stores';

const { t } = useI18n();
const router = useRouter();

const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl(WtObject.AuditForm);

const tableStore = useScorecardsDatalistStore();

const {
	dataList,
	selected,
	error,
	isLoading,
	page,
	size,
	next,
	headers,
	shownHeaders,
	filtersManager,
	isFiltersRestoring,
	searchMode,
} = storeToRefs(tableStore);

const {
	initialize,
	loadDataList,
	updateSelected,
	updatePage,
	updateSize,
	updateSort,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
	updateSearchMode,
	updateShownHeaders,
	patchItemProperty,
} = tableStore;

initialize();

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const searchModeOptions = computed(() => [
	{
		value: SearchMode.NAME,
		text: t('reusable.name'),
	},
	{
		value: SearchMode.CRITERION,
		text: t('objects.criterion', 1),
	},
]);

const selectedItems = computed(() =>
	selected.value.filter((item: EngineAuditForm) => item.editable),
);

const isDeleteDisabled = computed(
	() =>
		!hasDeleteAccess.value ||
		!selected.value.length ||
		selected.value.some((item: EngineAuditForm) => !item.editable),
);

const isScorecardUsed = (item: EngineAuditForm) => !item.editable;

const showEditUsedTooltip = (item: EngineAuditForm) =>
	hasUpdateAccess.value && isScorecardUsed(item);

const isEditDisabled = (item: EngineAuditForm) =>
	!hasUpdateAccess.value || isScorecardUsed(item);

const showDeleteUsedTooltip = (item: EngineAuditForm) =>
	hasDeleteAccess.value && isScorecardUsed(item);

const isDeleteActionDisabled = (item: EngineAuditForm) =>
	!hasDeleteAccess.value || isScorecardUsed(item);

const path = computed(() => [
	{
		name: t('audit'),
		route: '/',
	},
	{
		name: t('scorecards.scorecards', 2),
		route: '/scorecards',
	},
]);

function prettifyDateTime(timestamp?: string) {
	if (!timestamp) return '';
	return formatDate(+timestamp, FormatDateMode.DATETIME);
}

function create() {
	return router.push({
		name: `${AuditorSections.Scorecards}-card`,
		params: {
			id: 'new',
		},
	});
}

function edit(item: EngineAuditForm) {
	return router.push({
		name: `${AuditorSections.Scorecards}-card`,
		params: {
			id: item.id,
		},
	});
}

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
} = useTableEmpty({
	dataList,
	error,
	filters: computed(() => filtersManager.value.getAllValues()),
	isLoading,
});
</script>

<style lang="scss" scoped>
.scorecards {
  width: 100%;
}
</style>
