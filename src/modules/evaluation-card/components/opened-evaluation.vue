<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="opened-evaluation"
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
        <opened-evaluation-tabs
          :interaction="interaction"
          :collapsed="isEvaluationPanelCollapsed"
          class="opened-evaluation__panel"
          @toggle="toggleEvaluationPanel"
          @reload="loadInteraction"
        />
        <evaluation-card-scorecard
          v-if="!isEvaluationPanelCollapsed"
          class="opened-evaluation__panel"
        />
      </template>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { useLocalStorage, useToggle } from '@vueuse/core';
import { useClose } from '@webitel/ui-sdk/composables';
import { WtApplication } from '@webitel/ui-sdk/enums';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import RoutePaths from '../../../app/router/_internals/RoutePaths.enum';
import InteractionsAPIRepository from '../../interactions/api/InteractionsAPIRepository';
import { InteractionType } from '../../interactions/enums/InteractionType.enum';
import type { InteractionResponseItem } from '../../interactions/types/interaction';
import EvaluationCardScorecard from './evaluation-card-scorecard.vue';
import OpenedEvaluationTabs from './opened-evaluation-tabs.vue';

const { t } = useI18n();
const route = useRoute();

const section = route.meta.UiSection as string;
const { close } = useClose(section);

const interaction = ref<InteractionResponseItem | null>(null);
const isLoading = ref(false);

const isEvaluationPanelCollapsed = useLocalStorage(
	'audit-evaluation-panel-collapsed',
	false,
);
const toggleEvaluationPanel = useToggle(isEvaluationPanelCollapsed);

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
			type: InteractionType[route.params.type as string],
			id: route.params.id as string,
		});
	} finally {
		isLoading.value = false;
	}
};

loadInteraction();
</script>

<style scoped>
.opened-evaluation {
  height: 100%;
}

.opened-evaluation :deep(.wt-page-wrapper__main) {
  min-height: 0;
  padding: 0;
  background: transparent;
  gap: var(--page-wrapper-section-gap);
}

.opened-evaluation__panel {
  flex: 1 1 0;
  min-width: 0;
  overflow: auto;
  box-sizing: border-box;
  padding: var(--page-wrapper-section-padding);
  border-radius: var(--border-radius);
  background: var(--wt-page-wrapper-content-wrapper-color);
}
</style>
