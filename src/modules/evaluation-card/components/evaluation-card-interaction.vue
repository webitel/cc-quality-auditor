<template>
  <section class="evaluation-card-interaction">
    <header class="evaluation-card-interaction__header">
      <wt-tabs
        :current="currentTab"
        :tabs="Object.values(tabValues)"
        @change="currentTab = $event"
      />
      <wt-icon-btn
        :icon="`panel-${collapsed ? 'collapse' : 'expand'}`"
        @click="emit('toggle')"
      />
    </header>
    <evaluation-card-call-conversation
      v-if="isCallConversationShown"
      :call="interaction.call"
      @reload="emit('reload')"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { InteractionResponseItem } from '../../interactions/types/interaction';
import { EvaluationCardTab } from '../enums/EvaluationCardTab.enum';
import EvaluationCardCallConversation from './evaluation-card-call-conversation.vue';

const { interaction } = defineProps<{
	interaction: InteractionResponseItem | null;
	collapsed: boolean;
}>();

const emit = defineEmits<{
	toggle: [];
	reload: [];
}>();

const { t } = useI18n();

const tabValues = computed(() => ({
	[EvaluationCardTab.Conversation]: {
		text: t(`evaluationCard.tabs.${EvaluationCardTab.Conversation}`),
		value: EvaluationCardTab.Conversation,
	},
	[EvaluationCardTab.Information]: {
		text: t(`evaluationCard.tabs.${EvaluationCardTab.Information}`),
		value: EvaluationCardTab.Information,
	},
	[EvaluationCardTab.ScreenRecording]: {
		text: t(`evaluationCard.tabs.${EvaluationCardTab.ScreenRecording}`),
		value: EvaluationCardTab.ScreenRecording,
	},
}));

const currentTab = ref(tabValues.value[EvaluationCardTab.Conversation]);

const isCallConversationShown = computed(
	() =>
		currentTab.value.value === EvaluationCardTab.Conversation &&
		!!interaction?.call,
);
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
</style>
