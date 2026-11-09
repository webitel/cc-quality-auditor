<template>
  <wt-confirm-dialog
    class="interactions-delete-evaluations-popup"
    :title="t('interactions.deleteEvaluations', ids.length)"
    :callback="deleteEvaluations"
    @close="emit('close')"
  >
    <template #main>
      <div class="interactions-delete-evaluations-popup__content">
        <p>{{ t('interactions.evaluationsWillBeDeleted', ids.length) }}</p>
        <p>{{ t('interactions.interactionReturnsToNotEvaluated') }}</p>
      </div>
    </template>
    <template #actions="{ isDeleting, confirm, close }">
      <wt-button
        :loading="isDeleting"
        color="error"
        @click="confirm"
      >
        {{ t('reusable.delete') }}
      </wt-button>
      <wt-button
        :disabled="isDeleting"
        color="secondary"
        @click="close"
      >
        {{ t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-confirm-dialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import InteractionsAPIRepository from '../api/InteractionsAPIRepository';

const props = defineProps<{
	ids: string[];
}>();

const emit = defineEmits<{
	close: [];
	deleted: [];
}>();

const { t } = useI18n();

const deleteEvaluations = async () => {
	await InteractionsAPIRepository.deleteEvaluations({
		ids: props.ids,
	});
	emit('deleted');
};
</script>

<style lang="scss" scoped>
.interactions-delete-evaluations-popup__content {
  text-align: center;
}
</style>
