<template>
  <section class="evaluation-card-interaction">
    <header class="evaluation-card-interaction__header">
      <wt-tabs
        :current="currentTab"
        :tabs="Object.values(tabValues)"
        @change="currentTab = $event"
      />
      <wt-icon-btn
        :icon="`panel-${collapsed ? 'expand' : 'collapse'}`"
        @click="emit('toggle')"
      />
    </header>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { EvaluationCardTab } from '../enums/EvaluationCardTab.enum';

defineProps<{
	collapsed: boolean;
}>();

const emit = defineEmits<{
	toggle: [];
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
</script>

<style scoped>
.evaluation-card-interaction__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xs);
}
</style>
