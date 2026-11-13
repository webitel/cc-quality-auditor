<template>
  <section class="evaluation-card-material">
    <header class="evaluation-card-material__header">
      <wt-tabs
        :current="currentTab"
        :tabs="tabs"
        @change="currentTabValue = $event.value"
      />
      <wt-icon-btn
        :class="{
          'evaluation-card-material__panel-toggle--collapsed': evaluationPanelCollapsed,
        }"
        class="evaluation-card-material__panel-toggle"
        icon="panel-collapse"
        @click="emit('toggle-evaluation-panel')"
      />
    </header>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { EvaluationCardTab } from '../enums/EvaluationCardTab.enum';

defineProps<{
	evaluationPanelCollapsed: boolean;
}>();

const emit = defineEmits<{
	'toggle-evaluation-panel': [];
}>();

const { t } = useI18n();

const tabs = computed(() => [
	{
		text: t('evaluationCard.conversation'),
		value: EvaluationCardTab.Conversation,
	},
	{
		text: t('evaluationCard.information'),
		value: EvaluationCardTab.Information,
	},
	{
		text: t('objects.screenRecordings', 1),
		value: EvaluationCardTab.ScreenRecording,
	},
]);

const currentTabValue = ref<EvaluationCardTab>(EvaluationCardTab.Conversation);

const currentTab = computed(() =>
	tabs.value.find(({ value }) => value === currentTabValue.value),
);
</script>

<style scoped>
.evaluation-card-material__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xs);
}

.evaluation-card-material__panel-toggle--collapsed {
  transform: scaleX(-1);
}
</style>
