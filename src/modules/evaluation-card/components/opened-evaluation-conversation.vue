<template>
  <section class="opened-evaluation-conversation">
    <header class="opened-evaluation-conversation__header">
      <slot name="tabs" />
      <slot name="panel-toggle" />
    </header>
    <evaluation-card-chips
      v-if="interaction"
      :interaction="interaction"
    />
    <evaluation-card-call-conversation
      v-if="interaction?.call"
      :call="interaction.call"
      @reload="emit('reload')"
    />
  </section>
</template>

<script setup lang="ts">
import type { InteractionResponseItem } from '../../interactions/types/interaction';
import EvaluationCardCallConversation from './evaluation-card-call-conversation.vue';
import EvaluationCardChips from './evaluation-card-chips.vue';

defineProps<{
	interaction: InteractionResponseItem | null;
}>();

const emit = defineEmits<{
	reload: [];
}>();
</script>

<style scoped>
.opened-evaluation-conversation {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.opened-evaluation-conversation__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xs);
}
</style>
