<template>
  <section class="evaluation-card-interaction">
    <header class="evaluation-card-interaction__header">
      <wt-tabs
        :current="currentTab"
        :tabs="Object.values(tabValues)"
        @change="currentTab = $event"
      />
      <div class="evaluation-card-interaction__actions">
        <evaluation-card-search
          v-if="isCallConversationShown"
          v-model:query="searchQuery"
          v-model:active-match="activeMatch"
          :matches-count="matchesCount"
        />
        <wt-icon-btn
          :icon="`panel-${evaluationPanelCollapsed ? 'expand' : 'collapse'}`"
          @click="emit('toggle-evaluation-panel')"
        />
      </div>
    </header>
    <evaluation-card-call-conversation
      v-if="isCallConversationShown"
      :call="interaction.call"
      :search-query="searchQuery"
      :active-match="activeMatch"
      @reload="emit('reload')"
      @matches-change="matchesCount = $event"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { InteractionResponseItem } from '../../interactions/types/interaction';
import { EvaluationCardTab } from '../enums/EvaluationCardTab.enum';
import EvaluationCardCallConversation from './evaluation-card-call-conversation.vue';
import EvaluationCardSearch from './evaluation-card-search.vue';

const { interaction } = defineProps<{
	interaction: InteractionResponseItem | null;
	evaluationPanelCollapsed: boolean;
}>();

const emit = defineEmits<{
	'toggle-evaluation-panel': [];
	reload: [];
}>();

const { t } = useI18n();

const tabValues = computed(() => ({
	[EvaluationCardTab.Conversation]: {
		text: t('evaluationCard.conversation'),
		value: EvaluationCardTab.Conversation,
	},
	[EvaluationCardTab.Information]: {
		text: t('evaluationCard.information'),
		value: EvaluationCardTab.Information,
	},
	[EvaluationCardTab.ScreenRecording]: {
		text: t('objects.screenRecordings', 1),
		value: EvaluationCardTab.ScreenRecording,
	},
}));

const currentTab = ref(tabValues.value[EvaluationCardTab.Conversation]);

const searchQuery = ref('');

const activeMatch = ref(0);

const matchesCount = ref(0);

const isCallConversationShown = computed(
	() =>
		currentTab.value.value === EvaluationCardTab.Conversation &&
		!!interaction?.call,
);
</script>

<style scoped>
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
