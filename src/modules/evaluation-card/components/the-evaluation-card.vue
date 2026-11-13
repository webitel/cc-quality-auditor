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
      <div
        v-else
        class="evaluation-card__panels"
      >
        <evaluation-card-material
          :evaluation-panel-collapsed="isEvaluationPanelCollapsed"
          class="evaluation-card__panel"
          @toggle-evaluation-panel="toggleEvaluationPanel"
        />
        <evaluation-card-evaluation
          v-if="!isEvaluationPanelCollapsed"
          class="evaluation-card__panel"
        />
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { WtApplication } from '@webitel/ui-sdk/enums';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { RouteLocationNormalized } from 'vue-router';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

import RoutePaths from '../../../app/router/_internals/RoutePaths.enum';
import InteractionsAPIRepository from '../../interactions/api/InteractionsAPIRepository';
import { InteractionTypeWire } from '../../interactions/enums/InteractionTypeWire.enum';
import type { InteractionResponseItem } from '../../interactions/types/interaction';
import EvaluationCardEvaluation from './evaluation-card-evaluation.vue';
import EvaluationCardMaterial from './evaluation-card-material.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const section = route.meta.UiSection as string;
const interactionId = computed(() => route.params.id as string);

const interaction = ref<InteractionResponseItem | null>(null);
const isLoading = ref(false);

const isEvaluationPanelCollapsed = useStorage(
	'audit-evaluation-panel-collapsed',
	false,
);

const toggleEvaluationPanel = () => {
	isEvaluationPanelCollapsed.value = !isEvaluationPanelCollapsed.value;
};

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
		name: `#${interactionId.value}`,
	},
]);

const close = () => {
	if (window.history.state?.back) {
		router.back();
		return;
	}
	router.push({
		name: section,
	});
};

const loadInteraction = async ({ params }: RouteLocationNormalized) => {
	isLoading.value = true;
	try {
		interaction.value = await InteractionsAPIRepository.getInteraction({
			type: InteractionTypeWire[params.type as string],
			id: params.id as string,
		});
	} catch {
		interaction.value = null;
	} finally {
		isLoading.value = false;
	}
};

onBeforeRouteUpdate(loadInteraction);

loadInteraction(route);
</script>

<style scoped>
.evaluation-card {
  height: 100%;
}

.evaluation-card :deep(.wt-page-wrapper__main) {
  min-height: 0;
  padding: 0;
  background: transparent;
}

.evaluation-card__panels {
  display: flex;
  flex: 1;
  min-width: 0;
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
