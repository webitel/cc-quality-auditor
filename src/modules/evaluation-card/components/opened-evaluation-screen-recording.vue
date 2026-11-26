<template>
  <section class="opened-evaluation-screen-recording">
    <header class="opened-evaluation-screen-recording__header">
      <slot name="tabs" />
      <div class="opened-evaluation-screen-recording__actions">
        <wt-action-bar
          v-if="interaction?.call"
          :include="[IconAction.DOWNLOAD, IconAction.REFRESH, IconAction.DELETE]"
          :disabled:delete="!selected.length || !hasDeleteAccess"
          @click:download="downloadArchive"
          @click:refresh="loadDataList"
          @click:delete="
            askDeleteConfirmation({
              deleted: selected,
              callback: () => deleteRecordings(selected),
            })
          "
        >
          <template #download="{ action, onClick }">
            <wt-loader
              v-if="isDownloadingArchive"
              :size="ComponentSize.SM"
            />
            <wt-icon-action
              v-else
              :action="action"
              :disabled="!dataList.length"
              @click="onClick"
            />
          </template>
        </wt-action-bar>
        <slot name="panel-toggle" />
      </div>
    </header>
    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :callback="deleteCallback"
      :delete-count="deleteCount"
      @close="closeDelete"
    />
    <screen-recordings
      v-if="interaction?.call"
      v-model:selected="selected"
      :data-list="dataList"
      :is-loading="isLoading"
      :has-delete-access="hasDeleteAccess"
      copy-link
      @delete="
        askDeleteConfirmation({
          deleted: [$event],
          callback: () => deleteRecordings([$event]),
        })
      "
    />
  </section>
</template>

<script setup lang="ts">
import { useDownloadAction } from '@webitel/ui-sdk/composables';
import { ComponentSize, IconAction, WtObject } from '@webitel/ui-sdk/enums';
import {
	downloadScreenRecordingsArchive,
	ScreenRecordings,
	useCallScreenRecordings,
} from '@webitel/ui-sdk/modules/ScreenRecordings';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { computed } from 'vue';

import { useUserAccessControl } from '../../../app/composables/useUserAccessControl';
import type { InteractionResponseItem } from '../../interactions/types/interaction';

defineOptions({
	components: {
		ScreenRecordings,
	},
});

const { interaction } = defineProps<{
	interaction: InteractionResponseItem | null;
}>();

const { hasDeleteAccess } = useUserAccessControl(WtObject.ScreenRecordings);

const callId = computed(() =>
	interaction?.call ? String(interaction.call.id) : '',
);

const { dataList, isLoading, selected, loadDataList, deleteRecordings } =
	useCallScreenRecordings({
		callId,
	});

const { isLoading: isDownloadingArchive, runDownload } = useDownloadAction();

const downloadArchive = () =>
	runDownload(() =>
		downloadScreenRecordingsArchive({
			callId: callId.value,
			selected: selected.value,
		}),
	);

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,

	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();
</script>

<style scoped>
.opened-evaluation-screen-recording {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.opened-evaluation-screen-recording__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xs);
}

.opened-evaluation-screen-recording__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
