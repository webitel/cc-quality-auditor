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
        :primary-disabled="isCopyMode ? hasValidationErrors : disabledSave"
      >
        <template
          v-if="modelValue?.editable"
          #primary-action
        >
          <wt-button-select
            :options="saveOptions"
            :color="disabledSave && 'secondary'"
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

      <save-copy-popup
        :shown="isSaveCopyPopupShown"
        @close="closeSaveCopyPopup"
        @save="saveCopy"
      />
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { AuditFormsAPI } from '@webitel/api-services/api';
import type { EngineAuditForm } from '@webitel/api-services/gen/models';
import { useCardComponent, useCardTabs } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { AuditorSections, WtObject } from '@webitel/ui-sdk/enums';
import {
	SaveCopyPopup,
	useSaveCopyPopup,
} from '@webitel/ui-sdk/modules/SaveCopyPopup';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../app/composables/useUserAccessControl';
import ScorerecordTabNames from '../../../app/router/_internals/ScorerecordTabNames.enum';
import { useErrorRedirectHandler } from '../../error-pages/composable/useErrorRedirectHandler';
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
		pathName: ScorerecordTabNames.GENERAL,
	},
	{
		text: t('objects.criterion', 2),
		value: 'criteria',
		pathName: ScorerecordTabNames.CRITERIAS,
	},
]);

const { currentTab, changeTab } = useCardTabs(tabs);
const { close } = useClose(AuditorSections.Scorecards);

const path = computed(() => [
	{
		name: t('audit'),
	},
	{
		name: t('scorecards.scorecards', 2),
		route: '/scorecards',
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
	isCopyMode.value ? t('webitelUI.saveCopyPopup.title') : saveText.value,
);

const {
	isSaveCopyPopupShown,
	saveOptions,
	openSaveCopyPopup,
	closeSaveCopyPopup,
	saveCopy,
} = useSaveCopyPopup((name) => {
	if (!modelValue.value) return;

	return AuditFormsAPI.add({
		itemInstance: {
			...modelValue.value,
			name,
		},
	});
});

const saveAction = async () => {
	if (disabledSave.value) return;
	await save();
};

const saveChanges = computed(() =>
	isCopyMode.value ? openSaveCopyPopup : saveAction,
);

defineOptions({
	components: {
		SaveCopyPopup,
	},
});
</script>

<style lang="scss" scoped>
.main-container {
  width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
