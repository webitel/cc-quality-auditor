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
            :disabled="!isSkipAvailable"
            color="secondary"
            @click="isSkipPopupOpened = true"
          >
            {{ t('evaluationCard.skip.action') }}
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
          @reload="loadRouteInteraction"
        />
        <evaluation-card-scorecard
          v-if="!isEvaluationPanelCollapsed"
          class="opened-evaluation__panel"
          @deleted="close"
        />
      </template>
      <evaluation-card-skip-popup
        v-if="isSkipPopupOpened"
        :evaluation-id="interaction.evaluation.id"
        @close="isSkipPopupOpened = false"
        @skipped="close"
      />
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { useLocalStorage, useToggle } from '@vueuse/core';
import { InteractionStatus } from '@webitel/api-services/enums';
import { useClose } from '@webitel/ui-sdk/composables';
import { WtApplication, WtObject } from '@webitel/ui-sdk/enums';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../app/composables/useUserAccessControl';
import RoutePaths from '../../../app/router/_internals/RoutePaths.enum';
import { InteractionType } from '../../interactions/enums/InteractionType.enum';
import { useUserinfoStore } from '../../userinfo/userInfoStore';
import { useEvaluationCardStore } from '../stores/evaluationCardStore';
import EvaluationCardScorecard from './evaluation-card-scorecard.vue';
import EvaluationCardSkipPopup from './evaluation-card-skip-popup.vue';
import OpenedEvaluationTabs from './opened-evaluation-tabs.vue';

const { t } = useI18n();
const route = useRoute();

const section = route.meta.UiSection as string;
const { close } = useClose(section);

const evaluationCardStore = useEvaluationCardStore();
const { interaction, isLoading } = storeToRefs(evaluationCardStore);
const { userId } = storeToRefs(useUserinfoStore());
const { hasCreateAccess } = useUserAccessControl(WtObject.AuditRating);

const isSkipPopupOpened = ref(false);

const isSkipAvailable = computed(
	() =>
		hasCreateAccess.value &&
		interaction.value?.status === InteractionStatus.Pending &&
		interaction.value.evaluation?.assignee?.id === userId.value,
);

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

const loadRouteInteraction = () =>
	evaluationCardStore.loadInteraction({
		type: InteractionType[route.params.type as string],
		id: route.params.id as string,
	});

loadRouteInteraction();
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
