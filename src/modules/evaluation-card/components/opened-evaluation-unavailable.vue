<template>
  <section class="opened-evaluation-unavailable">
    <ul class="opened-evaluation-unavailable__rows">
      <li
        v-for="row in rows"
        :key="row.title"
        class="opened-evaluation-unavailable__row typo-body-1"
      >
        <span>{{ row.title }}</span>
        <span>{{ row.value }}</span>
      </li>
      <li
        v-if="isSkipped"
        class="opened-evaluation-unavailable__row opened-evaluation-unavailable__row--reason typo-body-1"
      >
        <span>{{ t('cases.reason', 1) }}</span>
        <p>
          {{ interaction.evaluation?.skipReason }}
        </p>
      </li>
    </ul>
    <wt-empty
      :image="darkMode ? EvaluationUnavailableDark : EvaluationUnavailableLight"
      :text="t(`evaluationCard.unavailable.${interaction.status}`)"
      :secondary-action-text="t('interactions.assign')"
      :disabled-secondary-action="!hasCreateAccess"
      @click:secondary="emit('assign')"
    />
  </section>
</template>

<script setup lang="ts">
import { InteractionStatus } from '@webitel/api-services/enums';
import { FormatDateMode, WtObject } from '@webitel/ui-sdk/enums';
import { formatDate } from '@webitel/ui-sdk/utils';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../app/composables/useUserAccessControl';
import { useAppearanceStore } from '../../appearance/stores/appearanceStore';
import type { InteractionResponseItem } from '../../interactions/types/interaction';
import EvaluationUnavailableDark from '../assets/evaluation-unavailable-dark.svg';
import EvaluationUnavailableLight from '../assets/evaluation-unavailable-light.svg';

const props = defineProps<{
	interaction: InteractionResponseItem;
}>();

const emit = defineEmits<{
	assign: [];
}>();

const { t } = useI18n();

const { hasCreateAccess } = useUserAccessControl(WtObject.AuditRating);
const { darkMode } = storeToRefs(useAppearanceStore());

const isSkipped = computed(
	() => props.interaction.status === InteractionStatus.Skipped,
);

const rows = computed(() => {
	const { evaluation } = props.interaction;
	return isSkipped.value
		? [
				{
					title: t('objects.interaction.skippedBy'),
					value: evaluation?.skippedBy?.name,
				},
				{
					title: t('evaluationCard.date'),
					value: formatDate(evaluation?.skippedAt, FormatDateMode.DATE),
				},
			]
		: [
				{
					title: t('evaluationCard.assignedTo'),
					value: evaluation?.assignee?.name,
				},
			];
});
</script>

<style scoped>
.opened-evaluation-unavailable {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.opened-evaluation-unavailable__row {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) 0;
  border-bottom: var(--divider-border) var(--divider-border-color);
}

.opened-evaluation-unavailable__row--reason {
  flex-direction: column;
  white-space: pre-line;
}
</style>
