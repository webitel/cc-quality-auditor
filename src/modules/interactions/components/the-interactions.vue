<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="interactions table-page"
  >
    <template #header>
      <wt-page-header hide-primary>
        <wt-breadcrumb :path="path" />
        <template #actions>
          <wt-button
            :disabled="isTranscribeDisabled"
            :loading="isTranscribing"
            color="secondary"
            @click="transcribe"
          >
            {{ t('interactions.transcribe') }}
          </wt-button>
          <wt-button
            color="secondary"
            disabled
          >
            {{ t('interactions.assign') }}
          </wt-button>
          <wt-button
            color="secondary"
            disabled
          >
            {{ t('reusable.export') }}
          </wt-button>
          <wt-button-select
            :options="[]"
            color="secondary"
            disabled
          >
            {{ t('reusable.download') }}
          </wt-button-select>
        </template>
      </wt-page-header>
    </template>
    <template #main>
      <section class="interactions-filters" />
      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title typo-heading-3">
            {{ t('interactions.allInteractions') }}
          </h3>
          <div class="table-title__actions-wrap">
            <wt-action-bar
              :include="[
                IconAction.REFRESH,
                IconAction.FILTERS,
                IconAction.COLUMNS,
              ]"
              @click:refresh="loadDataList"
            >
              <template #filters>
                <filters-actions-menu
                  :filters-manager="filtersManager"
                  :filter-options="filtersOptions"
                  @filter:reset-all="resetFilters"
                />
              </template>
              <template #columns>
                <wt-table-column-select
                  :headers="headers"
                  @change="updateShownHeaders"
                />
              </template>
            </wt-action-bar>
          </div>
        </header>

        <div class="table-section__table-wrapper">
          <wt-loader v-show="isLoading" />

          <wt-table
            v-show="!isLoading"
            :data="dataList"
            :headers="shownHeaders"
            :selected="selected"
            sortable
            resizable-columns
            reorderable-columns
            @sort="updateSort"
            @update:selected="updateSelected"
            @column-resize="columnResize"
            @column-reorder="columnReorder"
          >
            <template #interactionType="{ item }">
              {{ t(`channel.type.${item.interactionType}`) }}
            </template>
            <template #status="{ item }">
              <wt-indicator
                :color="InteractionStatusColor[item.status]"
                :text="t(`objects.interactionStatus.${item.status}`)"
              />
            </template>
            <template #dueDate="{ item }">
              <span
                class="interactions__due-date"
                :class="{ 'interactions__due-date--overdue': item.isOverdue }"
              >
                {{ item.dueDate }}
              </span>
            </template>
            <template #handledBy="{ item }">
              {{ t(`interactions.handledByTypes.${item.handledBy}`) }}
            </template>
            <template #column-filter="scope">
              <interactions-column-filter v-bind="scope" />
            </template>
            <template #empty>
              <wt-empty
                :image="imageEmpty"
                :headline="headlineEmpty"
                :title="titleEmpty"
                :text="textEmpty"
              />
            </template>
          </wt-table>

          <wt-pagination
            v-show="dataList.length"
            :next="next"
            :prev="page > 1"
            :size="size"
            debounce
            @change="updateSize"
            @next="updatePage(page + 1)"
            @prev="updatePage(page - 1)"
          />
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import { FiltersActionsMenuComponent as FiltersActionsMenu } from '@webitel/ui-datalist/filters';
import {
	AuditorSections,
	IconAction,
	WtApplication,
} from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import RoutePaths from '../../../app/router/_internals/RoutePaths.enum';
import InteractionsAPIRepository from '../api/InteractionsAPIRepository';
import { filtersOptions } from '../configs/filtersOptions';
import { InteractionStatusColor } from '../enums/InteractionStatusColor.enum';
import { useInteractionsDatalistStore } from '../stores';
import InteractionsColumnFilter from './interactions-column-filter.vue';

defineOptions({
	components: {
		FiltersActionsMenu,
		InteractionsColumnFilter,
	},
});

const { t } = useI18n();

const tableStore = useInteractionsDatalistStore();

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
} = storeToRefs(tableStore);

const {
	initialize,
	loadDataList,
	updateSelected,
	updatePage,
	updateSize,
	updateSort,
	updateShownHeaders,
	columnResize,
	columnReorder,
} = tableStore;

initialize();

const resetFilters = () => {
	filtersManager.value.reset();
};

const isTranscribing = ref(false);

const isTranscribeDisabled = computed(
	() =>
		!selected.value.length ||
		selected.value.some(
			({ files, transcripts }) =>
				!files[EngineCallFileType.FileTypeAudio] || transcripts.length,
		),
);

const transcribe = async () => {
	try {
		isTranscribing.value = true;
		await InteractionsAPIRepository.transcribe({
			callId: selected.value.map(({ id }) => id),
		});
	} finally {
		updateSelected([]);
		await loadDataList();
		isTranscribing.value = false;
	}
};

const path = computed(() => [
	{
		name: t('audit'),
		route: RoutePaths.StartPage,
	},
	{
		name: t(
			`WtApplication.${WtApplication.Audit}.sections.${AuditorSections.Interactions}`,
		),
		route: RoutePaths.Interactions,
	},
]);

const {
	image: imageEmpty,
	headline: headlineEmpty,
	title: titleEmpty,
	text: textEmpty,
} = useTableEmpty({
	dataList,
	error,
	filters: computed(() => filtersManager.value.getAllValues()),
	isLoading,
});
</script>

<style lang="scss" scoped>
.interactions {
  width: 100%;

  &__due-date--overdue {
    color: var(--error-color);
  }
}
</style>
