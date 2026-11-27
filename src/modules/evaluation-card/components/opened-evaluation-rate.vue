<template>
  <section class="opened-evaluation-rate">
    <wt-loader v-if="isLoading" />
    <template v-else-if="rate">
      <audit-rate-summary :rate="rate" />
      <audit-rate-answers :rate="rate" />
      <opened-evaluation-rate-actions
        @delete="
          askDeleteConfirmation({
            deleted: [rate],
            callback: deleteRate,
          })
        "
      />
    </template>
    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :callback="deleteCallback"
      :delete-count="deleteCount"
      @close="closeDelete"
    />
  </section>
</template>

<script setup lang="ts">
import { AuditRatesAPI } from '@webitel/api-services/api';
import type { EngineAuditRate } from '@webitel/api-services/gen/models';
import {
	AuditRateAnswers,
	AuditRateSummary,
} from '@webitel/ui-sdk/modules/AuditRate';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { ref } from 'vue';

import InteractionsAPIRepository from '../../interactions/api/InteractionsAPIRepository';
import OpenedEvaluationRateActions from './opened-evaluation-rate-actions.vue';

defineOptions({
	components: {
		AuditRateAnswers,
		AuditRateSummary,
	},
});

const props = defineProps<{
	evaluationId: string;
}>();

const emit = defineEmits<{
	deleted: [];
}>();

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const rate = ref<EngineAuditRate | null>(null);
const isLoading = ref(false);

const loadRate = async () => {
	isLoading.value = true;
	try {
		rate.value = await AuditRatesAPI.get(props.evaluationId);
	} finally {
		isLoading.value = false;
	}
};

const deleteRate = async () => {
	await InteractionsAPIRepository.deleteEvaluations({
		ids: [
			props.evaluationId,
		],
	});
	emit('deleted');
};

loadRate();
</script>

<style scoped>
.opened-evaluation-rate {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
