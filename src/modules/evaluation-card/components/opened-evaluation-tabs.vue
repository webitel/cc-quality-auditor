<template>
  <component
    :is="currentTab.component"
    :interaction="interaction"
    @reload="emit('reload')"
  >
    <template #tabs>
      <wt-tabs
        :current="currentTab"
        :tabs="Object.values(tabValues)"
        @change="changeTab"
      />
    </template>
    <template #panel-toggle>
      <wt-icon-btn
        :icon="`panel-${collapsed ? 'collapse' : 'expand'}`"
        @click="emit('toggle')"
      />
    </template>
  </component>
</template>

<script setup lang="ts">
import { SpecialGlobalAction } from '@webitel/ui-sdk/modules/Userinfo';
import { computed, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';

import type { InteractionResponseItem } from '../../interactions/types/interaction';
import { useUserinfoStore } from '../../userinfo/userInfoStore';
import { EvaluationCardTab } from '../enums/EvaluationCardTab.enum';
import type { EvaluationCardTabItem } from '../types/evaluationCardTab';
import OpenedEvaluationConversation from './opened-evaluation-conversation.vue';
import OpenedEvaluationInformation from './opened-evaluation-information.vue';
import OpenedEvaluationScreenRecording from './opened-evaluation-screen-recording.vue';

defineProps<{
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

const tabValues = computed(() => ({
	[EvaluationCardTab.Conversation]: {
		text: t(`evaluationCard.tabs.${EvaluationCardTab.Conversation}`),
		value: EvaluationCardTab.Conversation,
		component: OpenedEvaluationConversation,
	},
	[EvaluationCardTab.Information]: {
		text: t(`evaluationCard.tabs.${EvaluationCardTab.Information}`),
		value: EvaluationCardTab.Information,
		component: OpenedEvaluationInformation,
	},
	...(hasScreenRecordingAccess.value && {
		[EvaluationCardTab.ScreenRecording]: {
			text: t(`evaluationCard.tabs.${EvaluationCardTab.ScreenRecording}`),
			value: EvaluationCardTab.ScreenRecording,
			component: OpenedEvaluationScreenRecording,
		},
	}),
}));

const currentTab = shallowRef<EvaluationCardTabItem>(
	tabValues.value[EvaluationCardTab.Conversation],
);

function changeTab(tab: EvaluationCardTabItem) {
	currentTab.value = tab;
}
</script>
