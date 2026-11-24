<template>
  <div class="evaluation-card-search">
    <template v-if="isOpened">
      <wt-search-bar
        :value="query"
        class="evaluation-card-search__bar"
        @input="query = $event"
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
import { ref } from 'vue';

const query = defineModel<string>('query', {
	required: true,
});

const isOpened = ref(false);

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
</style>
