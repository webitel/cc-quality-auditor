<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="opened-card"
  >
    <template #header>
      <wt-page-header
        :primary-action="saveChanges"
        :primary-text="primarySaveText"
        :secondary-action="close"
        :hide-primary="disableUserInput"
        :primary-disabled="disabledSave"
      >
        <template
          v-if="modelValue?.editable"
          #primary-action
        >
          <wt-button-select
            :options="saveOptions"
            :color="disabledSave && 'secondary'"
            :disabled="disabledSave"
            @click="saveAction"
            @click:option="({ callback }) => callback()"
          >
            {{ primarySaveText }}
          </wt-button-select>
        </template>
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <wt-loader v-if="debouncedIsLoading" />
      <form
        v-else
        class="opened-card-form"
        @submit.prevent="saveAction"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <router-view v-slot="{ Component }">
          <component
            :is="Component"
            v-model="modelValue"
            :validation-fields="validationFields"
            @update:validation="isInvalidFormQuestions = $event.invalid"
          />
        </router-view>
        <input
          type="submit"
          hidden
        >
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { AuditFormsAPI } from '@webitel/api-services/api';
import type { EngineAuditForm } from '@webitel/api-services/gen/models';
import { useCardComponent, useCardTabs } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { AuditorSections, WtObject } from '@webitel/ui-sdk/enums';
import { useSaveCopy } from '@webitel/ui-sdk/modules/SaveCopy';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../app/composables/useUserAccessControl';
import { useErrorRedirectHandler } from '../../error-pages/composable/useErrorRedirectHandler';
import StartPageRoutePaths from '../../start-page/router/internals/start-page-route-paths';
import ScorecardsRouteNames from '../router/internals/scorecards-route-names';
import ScorecardsRoutePaths from '../router/internals/scorecards-route-paths';
import { useScorecardsCardStore } from '../stores';

const { t } = useI18n();
const { handleError } = useErrorRedirectHandler();
const { disableUserInput } = useUserAccessControl(WtObject.AuditForm);

const isInvalidFormQuestions = ref(false);

const {
	modelValue,
	debouncedIsLoading,
	originalItemInstance,
	isNew,
	saveText,
	hasValidationErrors,
	isAnyFieldEdited,
	validationFields,
	save,
} = useCardComponent<EngineAuditForm>({
	useCardStore: useScorecardsCardStore,
	onLoadErrorHandler: handleError,
});

const tabs = computed(() => [
	{
		text: t('reusable.general'),
		value: 'general',
		pathName: ScorecardsRouteNames.General,
	},
	{
		text: t('objects.criterion', 2),
		value: 'criteria',
		pathName: ScorecardsRouteNames.Criteria,
	},
]);

const { currentTab, changeTab } = useCardTabs(tabs);
const { close } = useClose(AuditorSections.Scorecards);

const path = computed(() => [
	{
		name: t('audit'),
		route: StartPageRoutePaths.TheStartPage,
	},
	{
		name: t('scorecards.scorecards', 2),
		route: ScorecardsRoutePaths.Scorecards,
	},
	{
		name: isNew.value ? t('reusable.new') : originalItemInstance.value?.name,
	},
]);

const disabledSave = computed(
	() =>
		!isAnyFieldEdited.value ||
		hasValidationErrors.value ||
		isInvalidFormQuestions.value,
);

const isCopyMode = computed(() => !modelValue.value?.editable && !isNew.value);

const primarySaveText = computed(() =>
	isCopyMode.value ? t('webitelUI.saveCopy.title') : saveText.value,
);

const { saveOptions, saveCopy } = useSaveCopy(async () => {
	try {
		return await AuditFormsAPI.add({
			itemInstance: modelValue.value,
		});
	} catch (err) {
		// [Claude] rethrow so useSaveCopy doesn't emit its success notification
		throw err;
	}
});

const saveAction = async () => {
	if (disabledSave.value) return;
	await save();
};

const saveChanges = computed(() => (isCopyMode.value ? saveCopy : saveAction));
</script>

<style lang="scss" scoped>
.main-container {
  width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
