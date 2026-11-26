<template>
  <wt-expansion-panel>
    <template #title>
      {{ title }}
    </template>
    <ul>
      <li
        v-for="(row, idx) of rows"
        :key="idx"
        :class="{ 'opened-evaluation-information-panel__row--agent': row.isAgent }"
        class="opened-evaluation-information-panel__row typo-body-1"
      >
        <template v-if="row.isAgent">
          <wt-icon icon="agent" />
          <span class="opened-evaluation-information-panel__key">{{ row.key }}</span>
        </template>
        <template v-else>
          <span class="opened-evaluation-information-panel__key">{{ row.key }}</span>
          <span class="opened-evaluation-information-panel__value">{{ row.value }}</span>
        </template>
      </li>
    </ul>
  </wt-expansion-panel>
</template>

<script setup lang="ts">
import type { EvaluationCardInformationRow } from '../types/evaluationCardInformation';

defineProps<{
	title: string;
	rows: EvaluationCardInformationRow[];
}>();
</script>

<style scoped>
.opened-evaluation-information-panel__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs);
  border-bottom: var(--divider-border) var(--divider-border-color);
}

.opened-evaluation-information-panel__row--agent {
  display: flex;
  align-items: center;
}

.opened-evaluation-information-panel__key,
.opened-evaluation-information-panel__value {
  min-width: 0;
  overflow-wrap: anywhere;
}
</style>
