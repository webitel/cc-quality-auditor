<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="evaluation-card"
  >
    <template #header>
      <wt-page-header
        :secondary-action="close"
        hide-primary
      >
        <wt-breadcrumb :path="path" />
        <template #actions>
          <wt-button
            color="secondary"
            disabled
          >
            {{ t('evaluationCard.skip') }}
          </wt-button>
        </template>
      </wt-page-header>
    </template>

    <template #main>
      <wt-loader v-if="isLoading" />
      <template v-else>
        <evaluation-card-interaction
          :interaction="interaction"
          :evaluation-panel-collapsed="isEvaluationPanelCollapsed"
          class="evaluation-card__panel"
          @toggle-evaluation-panel="toggleEvaluationPanel"
          @reload="loadInteraction"
        />
        <evaluation-card-scorecard
          v-if="!isEvaluationPanelCollapsed"
          class="evaluation-card__panel"
        />
      </template>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { useClose } from '@webitel/ui-sdk/composables';
import { WtApplication } from '@webitel/ui-sdk/enums';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import RoutePaths from '../../../app/router/_internals/RoutePaths.enum';
import InteractionsAPIRepository from '../../interactions/api/InteractionsAPIRepository';
import { InteractionTypeWire } from '../../interactions/enums/InteractionTypeWire.enum';
import type { InteractionResponseItem } from '../../interactions/types/interaction';
import { useEvaluationPanelCollapse } from '../composables/useEvaluationPanelCollapse';
import EvaluationCardInteraction from './evaluation-card-interaction.vue';
import EvaluationCardScorecard from './evaluation-card-scorecard.vue';

const { t } = useI18n();
const route = useRoute();

const section = route.meta.UiSection as string;
const { close } = useClose(section);

const interaction = ref<InteractionResponseItem | null>(null);
const isLoading = ref(false);

const { isEvaluationPanelCollapsed, toggleEvaluationPanel } =
	useEvaluationPanelCollapse();

const path = computed(() => [
	{
		name: t('audit'),
		route: RoutePaths.StartPage,
	},
	{
		name: t(`WtApplication.${WtApplication.Audit}.sections.${section}`),
		route: {
			name: section,
		},
	},
	{
		name: `#${route.params.type}-${route.params.id}`,
	},
]);

const loadInteraction = async () => {
	isLoading.value = true;
	try {
		interaction.value = await InteractionsAPIRepository.getInteraction({
			type: InteractionTypeWire[route.params.type as string],
			id: route.params.id as string,
		});
	} finally {
		isLoading.value = false;
	}
};

loadInteraction();
</script>

<style scoped>
.evaluation-card {
  height: 100%;
}

.evaluation-card :deep(.wt-page-wrapper__main) {
  min-height: 0;
  padding: 0;
  background: transparent;
  gap: var(--page-wrapper-section-gap);
}

.evaluation-card__panel {
  flex: 1 1 0;
  min-width: 0;
  overflow: auto;
  box-sizing: border-box;
  padding: var(--page-wrapper-section-padding);
  border-radius: var(--border-radius);
  background: var(--wt-page-wrapper-content-wrapper-color);
}
</style>
