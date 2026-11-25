<template>
  <div class="evaluation-card-chips">
    <wt-chip
      v-if="interaction.agent"
      :color="ChipColor.SECONDARY"
    >
      <span class="evaluation-card-chips__item typo-body-2-bold">
        <wt-avatar
          :size="ComponentSize.XS"
          :username="interaction.agent.name"
        />
        {{ interaction.agent.name }}
      </span>
    </wt-chip>
    <wt-chip
      v-for="chip of chips"
      :key="chip.key"
      :color="ChipColor.SECONDARY"
    >
      <span class="evaluation-card-chips__item typo-body-2-bold">
        <wt-icon
          v-if="chip.icon"
          :icon="chip.icon"
          :size="ComponentSize.SM"
        />
        {{ chip.text }}
      </span>
    </wt-chip>
  </div>
</template>

<script setup lang="ts">
import { ChannelType } from '@webitel/api-services/enums';
import {
	ChipColor,
	ComponentSize,
	FormatDateMode,
	ProviderIconType,
} from '@webitel/ui-sdk/enums';
import { convertDuration } from '@webitel/ui-sdk/scripts';
import { formatDate } from '@webitel/ui-sdk/utils';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { InteractionType } from '../../interactions/enums/InteractionType.enum';
import { getCustomer } from '../../interactions/scripts/toInteractionsListItem';
import type { InteractionResponseItem } from '../../interactions/types/interaction';

const { interaction } = defineProps<{
	interaction: InteractionResponseItem;
}>();

const { t } = useI18n();

const chips = computed(() => {
	const isCall = interaction.type === InteractionType[ChannelType.Call];
	return [
		{
			key: 'customer',
			icon: isCall ? 'call' : ProviderIconType[interaction.from?.type],
			text: getCustomer(interaction),
		},
		{
			key: 'team',
			text: interaction.team?.name,
		},
		{
			key: 'direction',
			icon: `call-${interaction.direction}`,
			text: isCall && t(`calls.direction.${interaction.direction}`),
		},
		{
			key: 'createdAt',
			icon: 'calendar',
			text: formatDate(
				Number(interaction.createdAt),
				FormatDateMode.DATETIME_SHORT,
			),
		},
		{
			key: 'duration',
			icon: 'clock',
			text: isCall && convertDuration(interaction.duration),
		},
	].filter(({ text }) => text);
});
</script>

<style scoped>
.evaluation-card-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  --p-chip-secondary-background: var(--p-secondary-highlight-color);
}

.evaluation-card-chips__item {
  display: flex;
  align-items: center;
  min-height: var(--icon-md-size);
  gap: var(--spacing-xs);
}
</style>
