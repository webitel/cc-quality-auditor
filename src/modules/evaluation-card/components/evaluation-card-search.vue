<template>
  <div class="evaluation-card-search">
    <template v-if="isOpened">
      <wt-search-bar
        :value="query"
        class="evaluation-card-search__bar"
        @input="query = $event"
      />
      <span class="evaluation-card-search__counter typo-body-2">
        {{ t('evaluationCard.matchesCount', { current: matchesCount ? activeMatch + 1 : 0, total: matchesCount }) }}
      </span>
      <wt-icon-btn
        :disabled="!matchesCount"
        icon="arrow-up"
        @click="showPreviousMatch"
      />
      <wt-icon-btn
        :disabled="!matchesCount"
        icon="arrow-down"
        @click="showNextMatch"
      />
      <wt-icon-btn
        icon="close"
        @click="close"
      />
    </template>
    <wt-icon-btn
      v-else
      icon="search"
      @click="isOpened = true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { matchesCount } = defineProps<{
	matchesCount: number;
}>();

const query = defineModel<string>('query', {
	required: true,
});

const activeMatch = defineModel<number>('activeMatch', {
	required: true,
});

const { t } = useI18n();

const isOpened = ref(false);

watch(query, () => {
	activeMatch.value = 0;
});

function showNextMatch() {
	activeMatch.value = (activeMatch.value + 1) % matchesCount;
}

function showPreviousMatch() {
	activeMatch.value = (activeMatch.value - 1 + matchesCount) % matchesCount;
}

function close() {
	query.value = '';
	isOpened.value = false;
}
</script>

<style scoped>
.evaluation-card-search {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.evaluation-card-search__bar {
  width: 240px;
}

.evaluation-card-search__counter {
  white-space: nowrap;
}
</style>
