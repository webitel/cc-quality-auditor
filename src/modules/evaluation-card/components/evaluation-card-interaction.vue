<template>
  <section class="evaluation-card-interaction">
    <header class="evaluation-card-interaction__header">
      <wt-tabs
        :current="currentTab"
        :tabs="Object.values(tabValues)"
        @change="changeTab"
      />
      <div class="evaluation-card-interaction__actions">
        <evaluation-card-search
          v-if="isSearchShown"
          v-model:query="searchQuery"
        />
        <wt-icon-btn
          :icon="`panel-${evaluationPanelCollapsed ? 'collapse' : 'expand'}`"
          @click="emit('toggle-evaluation-panel')"
        />
      </div>
    </header>
    <evaluation-card-call-conversation
      v-if="isCallConversationShown"
      :call="interaction.call"
      :search-query="searchQuery"
      @reload="emit('reload')"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { InteractionResponseItem } from '../../interactions/types/interaction';
import { EvaluationCardTab } from '../enums/EvaluationCardTab.enum';
import type { EvaluationCardTabItem } from '../types/evaluationCardTab';
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

const currentTab = ref<EvaluationCardTabItem>(
	tabValues.value[EvaluationCardTab.Conversation],
);

const searchQuery = ref('');

function changeTab(tab: EvaluationCardTabItem) {
	currentTab.value = tab;
	searchQuery.value = '';
}

const isCallConversationShown = computed(
	() =>
		currentTab.value.value === EvaluationCardTab.Conversation &&
		!!interaction?.call,
);

const isSearchShown = computed(
	() =>
		isCallConversationShown.value && !!interaction?.call?.transcripts?.length,
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

.evaluation-card-interaction__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
