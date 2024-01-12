<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :primary-action="saveChanges"
        :primary-text="saveText"
        :secondary-action="close"
        :hide-primary="!hasModifyAccess"
        :primary-disabled="isInvalidForm"
      >
        <template
          v-if="itemInstance.editable"
          #primary-action
        >
          <wt-button-select
            :options="saveOptions"
            :disabled="isInvalidForm"
            :color="isInvalidForm && 'secondary'"
            @click="save"
            @click:option="({ callback }) => callback()"
          >
            {{ saveText }}
          </wt-button-select>
        </template>
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <component
          :is="component"
          :v="v$"
          :namespace="namespace"
          @update:validation="isInvalidFormQuestions = $event.invalid"
        />
        <input
          type="submit"
          hidden
        >
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref,
  watch,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { useAccess } from '../../../app/composables/useAccess';
import { useClose } from '../../../app/composables/useClose';
import { useCardPage } from '../../../app/composables/useCardPage';
import { usePathName } from '../../../app/composables/usePathName';
import Criterias from './opened-scorecard-criterias.vue';
import General from './opened-scorecard-general.vue';

const namespace = 'scorecards';
const currentTab = ref({});
const isInvalidFormQuestions = ref(false);

const {
  id,
  itemInstance,

  save,
  setId,
  setItemProp,
} = useCardPage(namespace);

const {
  hasModifyAccess,
} = useAccess();

const {
  pathName,
} = usePathName(itemInstance);

const { close } = useClose();
const { t } = useI18n();
/* When open the scorecard, we check for the presence of at least 1 question.
When open criteria tab, we use deeper validation from the library "@webitel/ui-sdk" */
const v$ = useVuelidate(computed(() => (
  {
    itemInstance: {
      name: {
        required,
        minLength: minLength(3),
      },
      questions: {
        required,
        minLength: minLength(1),
      },
    },
  })), { itemInstance }, { $autoDirty: true });

const tabs = computed(() => [
  {
    text: t('reusable.general'),
    value: 'general',
    namespace,
  }, {
    text: t('objects.criterion', 2),
    value: 'criteria',
    namespace: `${namespace}/criteria`,
  },
]);

const path = computed(() => {
  const baseUrl = 'audit/scorecards';

  return [
    { name: t('audit') },
    { name: t('scorecards.scorecards', 2), route: '/scorecards' },
    {
      name: id.value ? pathName.value : t('reusable.new'),
      route: id.value ? `/scorecards/${id.value}` : `${baseUrl}/new`,
    },
  ];
});

const component = computed(() => {
  if (currentTab.value?.value === 'criteria') return Criterias;
  return General;
});

const isInvalidForm = computed(() => (itemInstance.value._dirty
  ? (v$.value.$invalid || isInvalidFormQuestions.value)
  : true));

const saveText = computed(() => {
  if (!itemInstance.value.editable && id.value) return t('reusable.saveAs');
  if (!isInvalidForm.value) return t('reusable.save');
  return t('reusable.saved');
});

function saveAs() {
  setItemProp({ prop: 'createdAt', value: '' });
  setItemProp({ prop: 'createdBy', value: {} });
  setItemProp({ prop: 'updatedAt', value: '' });
  setItemProp({ prop: 'updatedBy', value: {} });
  setItemProp({ prop: 'id', value: '' });
  setId(null);
  save();
}

const saveChanges = computed(() => ((!itemInstance.value.editable && id.value) ? saveAs : save));

const saveOptions = computed(() => {
  const saveAsNew = {
    text: t('reusable.saveAs'),
    callback: saveAs,
  };
  return [saveAsNew];
});

function changeTab(tab) {
  currentTab.value = tab;
}

function initializeTab() {
  changeTab(tabs.value[0]);
}

onMounted(() => {
  initializeTab();
  v$.value.$touch();
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
