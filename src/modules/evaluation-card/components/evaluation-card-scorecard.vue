<template>
  <section class="evaluation-card-scorecard">
    <h2 class="evaluation-card-scorecard__title typo-subtitle-1">
      {{ t('evaluationCard.evaluation') }}
    </h2>
    <template v-if="interaction">
      <opened-evaluation-unavailable
        v-if="isUnavailable"
        :interaction="interaction"
        @assign="isAssignPopupOpened = true"
      />
      <interactions-assign-popup
        v-if="isAssignPopupOpened"
        :interactions="[interaction]"
        @close="isAssignPopupOpened = false"
        @assigned="handleAssigned"
      />
    </template>
  </section>
</template>

<script setup lang="ts">
import { InteractionStatus } from '@webitel/api-services/enums';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import InteractionsAssignPopup from '../../interactions/components/interactions-assign-popup.vue';
import { useUserinfoStore } from '../../userinfo/userInfoStore';
import { useEvaluationCardStore } from '../stores/evaluationCardStore';
import OpenedEvaluationUnavailable from './opened-evaluation-unavailable.vue';

const { t } = useI18n();

const evaluationCardStore = useEvaluationCardStore();
const { interaction } = storeToRefs(evaluationCardStore);
const { userId } = storeToRefs(useUserinfoStore());

const isAssignPopupOpened = ref(false);

const isUnavailable = computed(() => {
	const { status, evaluation } = interaction.value ?? {};
	return (
		status === InteractionStatus.Skipped ||
		(status === InteractionStatus.Pending &&
			!!evaluation?.assignee &&
			evaluation.assignee.id !== userId.value)
	);
});

const handleAssigned = () => {
	isAssignPopupOpened.value = false;
	if (interaction.value) {
		evaluationCardStore.refreshInteraction(interaction.value);
	}
};
</script>

<style scoped>
.evaluation-card-scorecard {
  display: flex;
  flex-direction: column;
}
</style>
