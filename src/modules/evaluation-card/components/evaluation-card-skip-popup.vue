<template>
  <wt-popup
    class="evaluation-card-skip-popup"
    size="sm"
    @close="emit('close')"
  >
    <template #title>
      {{ t('evaluationCard.skipInteraction') }}
    </template>
    <template #main>
      <p>{{ t('evaluationCard.skipText') }}</p>
      <wt-textarea
        v-model:model-value="reason"
        :label="t('cases.reason', 1)"
        :placeholder="t('evaluationCard.skipReasonPlaceholder')"
        :rows="4"
        required
      />
    </template>
    <template #actions>
      <wt-button
        :disabled="!reason.trim()"
        :loading="isLoading"
        @click="skip"
      >
        {{ t('evaluationCard.skip') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="emit('close')"
      >
        {{ t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import InteractionsAPIRepository from '../../interactions/api/InteractionsAPIRepository';

const props = defineProps<{
	evaluationId: string;
}>();

const emit = defineEmits<{
	close: [];
	skipped: [];
}>();

const { t } = useI18n();

const reason = ref('');
const isLoading = ref(false);

const skip = async () => {
	try {
		isLoading.value = true;
		await InteractionsAPIRepository.skipEvaluation({
			id: props.evaluationId,
			reason: reason.value,
		});
		emit('skipped');
	} finally {
		isLoading.value = false;
	}
};
</script>
