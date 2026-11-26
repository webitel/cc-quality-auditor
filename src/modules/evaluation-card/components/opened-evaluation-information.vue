<template>
  <section class="opened-evaluation-information">
    <header class="opened-evaluation-information__header">
      <slot name="tabs" />
      <slot name="panel-toggle" />
    </header>
  </section>
</template>

<script setup lang="ts">
import type { InteractionResponseItem } from '../../interactions/types/interaction';

defineProps<{
	interaction: InteractionResponseItem | null;
}>();
</script>

<style scoped>
.opened-evaluation-information {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.opened-evaluation-information__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xs);
}
</style>
