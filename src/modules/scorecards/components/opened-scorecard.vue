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
            :disabled="disabledSave"
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
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import type { EngineAuditForm } from '@webitel/api-services/gen/models';
import { useCardComponent } from '@webitel/ui-datalist/card';
import { useCardTabs, useClose } from '@webitel/ui-sdk/composables';
import { AuditorSections, WtObject } from '@webitel/ui-sdk/enums';
import { storeToRefs } from 'pinia';
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

const cardStore = useScorecardsCardStore();
const { itemId } = storeToRefs(cardStore);

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

const primarySaveText = computed(() => {
	if (!modelValue.value?.editable && !isNew.value) {
		return t('reusable.saveAs');
	}
	return saveText.value;
});

const saveAs = async () => {
	if (disabledSave.value || !modelValue.value) return;

	modelValue.value.createdAt = undefined;
	modelValue.value.createdBy = undefined;
	modelValue.value.updatedAt = undefined;
	modelValue.value.updatedBy = undefined;
	modelValue.value.id = undefined;
	itemId.value = null;

	await save();
};

const saveAction = async () => {
	if (disabledSave.value) return;
	await save();
};

const saveChanges = computed(() =>
	!modelValue.value?.editable && !isNew.value ? saveAs : saveAction,
);

const saveOptions = computed(() => [
	{
		text: t('reusable.saveAs'),
		callback: saveAs,
	},
]);
</script>

<style lang="scss" scoped>
.main-container {
  width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
