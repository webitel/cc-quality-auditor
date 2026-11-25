<template>
  <section class="evaluation-card-interaction">
    <header class="evaluation-card-interaction__header">
      <wt-tabs
        :current="currentTab"
        :tabs="Object.values(tabValues)"
        @change="changeTab"
      />
      <div class="evaluation-card-interaction__actions">
        <wt-action-bar
          v-if="isScreenRecordingShown"
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
        <wt-icon-btn
          :icon="`panel-${collapsed ? 'collapse' : 'expand'}`"
          @click="emit('toggle')"
        />
      </div>
    </header>
    <evaluation-card-call-conversation
      v-if="isCallConversationShown"
      :call="interaction.call"
      @reload="emit('reload')"
    />
    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :callback="deleteCallback"
      :delete-count="deleteCount"
      @close="closeDelete"
    />
    <screen-recordings
      v-if="isScreenRecordingShown"
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
import { SpecialGlobalAction } from '@webitel/ui-sdk/modules/Userinfo';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../app/composables/useUserAccessControl';
import type { InteractionResponseItem } from '../../interactions/types/interaction';
import { useUserinfoStore } from '../../userinfo/userInfoStore';
import { EvaluationCardTab } from '../enums/EvaluationCardTab.enum';
import type { EvaluationCardTabItem } from '../types/evaluationCardTab';
import EvaluationCardCallConversation from './evaluation-card-call-conversation.vue';

defineOptions({
	components: {
		ScreenRecordings,
	},
});

const { interaction } = defineProps<{
	interaction: InteractionResponseItem | null;
	collapsed: boolean;
}>();

const emit = defineEmits<{
	toggle: [];
	reload: [];
}>();

const { t } = useI18n();

const userinfoStore = useUserinfoStore();

const hasScreenRecordingAccess = computed(() =>
	userinfoStore.hasSpecialGlobalActionAccess(
		SpecialGlobalAction.ControlAgentScreen,
	),
);

const { hasDeleteAccess } = useUserAccessControl(WtObject.ScreenRecordings);

const tabValues = computed(() => ({
	[EvaluationCardTab.Conversation]: {
		text: t(`evaluationCard.tabs.${EvaluationCardTab.Conversation}`),
		value: EvaluationCardTab.Conversation,
	},
	[EvaluationCardTab.Information]: {
		text: t(`evaluationCard.tabs.${EvaluationCardTab.Information}`),
		value: EvaluationCardTab.Information,
	},
	...(hasScreenRecordingAccess.value && {
		[EvaluationCardTab.ScreenRecording]: {
			text: t(`evaluationCard.tabs.${EvaluationCardTab.ScreenRecording}`),
			value: EvaluationCardTab.ScreenRecording,
		},
	}),
}));

const currentTab = ref<EvaluationCardTabItem>(
	tabValues.value[EvaluationCardTab.Conversation],
);

function changeTab(tab: EvaluationCardTabItem) {
	currentTab.value = tab;
}

const isCallConversationShown = computed(
	() =>
		currentTab.value.value === EvaluationCardTab.Conversation &&
		!!interaction?.call,
);

const isScreenRecordingShown = computed(
	() =>
		currentTab.value.value === EvaluationCardTab.ScreenRecording &&
		!!interaction?.call,
);

const callId = computed(() =>
	isScreenRecordingShown.value ? String(interaction?.call?.id) : '',
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
.evaluation-card-interaction {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.evaluation-card-interaction__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xs);
}

.evaluation-card-interaction__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
