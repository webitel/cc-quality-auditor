<template>
  <wt-page-wrapper
    :actions-panel="showActionsPanel"
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
            :disabled="isAssignDisabled"
            color="secondary"
            @click="isAssignPopupOpened = true"
          >
            {{ t('interactions.assign') }}
          </wt-button>
          <export-action
            :loading="isExporting"
            @export="exportFile"
          />
          <download-action
            :selected="selected"
            :types="downloadTypes"
            :disabled="!selected.length"
            filename="interactions"
            @downloaded="handleDownloaded"
          />
        </template>
      </wt-page-header>
    </template>
    <template #actions-panel>
      <interactions-filters @hide="showActionsPanel = false" />
    </template>
    <template #main>
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
                IconAction.DELETE,
              ]"
              :disabled:delete="isDeleteDisabled"
              @click:refresh="loadDataList"
              @click:filters="showActionsPanel = !showActionsPanel"
              @click:delete="isDeleteEvaluationsPopupOpened = true"
            >
              <template #search-bar>
                <dynamic-filter-search
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
              <template #filters="{ action, onClick }">
                <wt-badge :hidden="!anyFiltersOnFiltersPanel">
                  <wt-icon-action
                    :action="action"
                    @click="onClick"
                  />
                </wt-badge>
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
            fixed-actions
            sortable
            resizable-columns
            reorderable-columns
            @sort="updateSort"
            @update:selected="updateSelected"
            @column-resize="columnResize"
            @column-reorder="columnReorder"
          >
            <template #interactionType="{ item }">
              {{ t(`interactions.interactionTypes.${item.interactionType}`) }}
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
              {{ t(`objects.interactionHandledBy.${item.handledBy}`) }}
            </template>
            <template #column-filter="scope">
              <interactions-column-filter v-bind="scope" />
            </template>
            <template #actions="{ item }">
              <wt-call-media-action
                :playing-file-id="currentlyMediaPlaying"
                :files="item.files"
                @play="play"
                @stop="closePlayer"
              />
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
      <interactions-assign-popup
        v-if="isAssignPopupOpened"
        :interactions="selected"
        @close="isAssignPopupOpened = false"
        @assigned="handleAssigned"
      />
      <interactions-delete-evaluations-popup
        v-if="isDeleteEvaluationsPopupOpened"
        :interactions="selected"
        @close="isDeleteEvaluationsPopupOpened = false"
        @deleted="handleEvaluationsDeleted"
      />
    </template>
  </wt-page-wrapper>

  <wt-player
    v-if="audioData"
    :src="audioData.src"
    :id="audioData.id"
    position="fixed"
    @close="closePlayer"
    @play="isMediaPlayingNow = true"
  />

  <wt-vidstack-player
    v-if="videoData"
    closable
    :src="videoData.src"
    :title="videoData.text"
    :size="ComponentSize.MD"
    @close="closePlayer"
  />
</template>

<script setup lang="ts">
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import {
	DynamicFilterSearchComponent as DynamicFilterSearch,
	FilterOption,
} from '@webitel/ui-datalist/filters';
import {
	WtCallMediaAction,
	WtPlayer,
	WtVidstackPlayer,
} from '@webitel/ui-sdk/components';
import { usePlayMedia } from '@webitel/ui-sdk/composables';
import {
	AuditorSections,
	ComponentSize,
	IconAction,
	WtApplication,
} from '@webitel/ui-sdk/enums';
import { DownloadType } from '@webitel/ui-sdk/modules/FilesExport';
import ExportAction from '@webitel/ui-sdk/src/modules/CSVExport/components/export-action.vue';
import { useExportFile } from '@webitel/ui-sdk/src/modules/CSVExport/composables/useExportFile';
import DownloadAction from '@webitel/ui-sdk/src/modules/FilesExport/components/download-action.vue';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import RoutePaths from '../../../app/router/_internals/RoutePaths.enum';
import InteractionsAPIRepository from '../api/InteractionsAPIRepository';
import { useAssignAction } from '../composables/useAssignAction';
import { useTranscribeAction } from '../composables/useTranscribeAction';
import { InteractionStatusColor } from '../enums/InteractionStatusColor.enum';
import { SearchMode } from '../enums/SearchMode.enum';
import { useInteractionsDatalistStore } from '../stores';
import InteractionsAssignPopup from './interactions-assign-popup.vue';
import InteractionsColumnFilter from './interactions-column-filter.vue';
import InteractionsDeleteEvaluationsPopup from './interactions-delete-evaluations-popup.vue';
import InteractionsFilters from './interactions-filters.vue';

defineOptions({
	components: {
		DownloadAction,
		DynamicFilterSearch,
		ExportAction,
		InteractionsAssignPopup,
		InteractionsColumnFilter,
		InteractionsDeleteEvaluationsPopup,
		InteractionsFilters,
		WtCallMediaAction,
		WtPlayer,
		WtVidstackPlayer,
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
	fields,
	sort,
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
	updateShownHeaders,
	columnResize,
	columnReorder,
	addFilter,
	updateFilter,
	deleteFilter,
	updateSearchMode,
} = tableStore;

initialize();

const filters = computed(() => filtersManager.value.getAllValues());

const showActionsPanel = ref(true);

const anyFiltersOnFiltersPanel = computed(() =>
	filtersManager.value
		.getAllKeys()
		.some(
			(name) =>
				name !== FilterOption.CreatedAt &&
				!Object.values(SearchMode).some((mode) => mode === name),
		),
);

const searchModeOptions = computed(() =>
	Object.values(SearchMode).map((mode) => ({
		value: mode,
		text: t(`interactions.searchModes.${mode}`),
	})),
);

const selectedAudioFileIds = computed(() => [
	...new Set(
		selected.value
			.flatMap(({ files }) => files[EngineCallFileType.FileTypeAudio] ?? [])
			.map(({ id }) => id),
	),
]);

const { isTranscribing, isTranscribeDisabled, transcribe } =
	useTranscribeAction({
		selected,
		fileIds: selectedAudioFileIds,
		onTranscribed: async () => {
			updateSelected([]);
			await loadDataList();
		},
	});

const selectedInteractionKeys = computed(() =>
	selected.value.map(({ type, id }) => ({
		type,
		id,
	})),
);

const { isAssignPopupOpened, isAssignDisabled, handleAssigned } =
	useAssignAction({
		selected,
		onAssigned: async () => {
			updateSelected([]);
			await loadDataList();
		},
	});

const { isExporting, exportFile } = useExportFile({
	exportMethod: (options) =>
		InteractionsAPIRepository.exportData({
			...filters.value,
			sort: sort.value,
			fields: fields.value,
			...options,
			...(selected.value.length && {
				interactions: selectedInteractionKeys.value,
			}),
		}),
	filename: 'interactions',
});

const isDeleteEvaluationsPopupOpened = ref(false);

const isDeleteDisabled = computed(
	() =>
		!selected.value.length ||
		selected.value.some(({ evaluationId }) => !evaluationId),
);

const handleEvaluationsDeleted = async () => {
	updateSelected([]);
	await loadDataList();
};

const downloadTypes = [
	DownloadType.AudioRecordings,
	DownloadType.ScreenRecordings,
	DownloadType.Transcriptions,
];

const handleDownloaded = async () => {
	updateSelected([]);
	await loadDataList();
};

const {
	audioData,
	videoData,
	currentlyMediaPlaying,
	isMediaPlayingNow,

	play,
	closePlayer,
} = usePlayMedia();

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
	filters,
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

.wt-player {
  right: var(--spacing-xs);
  left: var(--spacing-xs);
  bottom: var(--spacing-xs);
}
</style>
