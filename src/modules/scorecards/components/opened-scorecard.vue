<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <wt-page-header
        :primary-action="save"
        :secondary-action="close"
      >
        <template v-slot:primary-action>
          <wt-button-select
            :options="saveOptions"
            :color="disabledSave && 'secondary'"
            @click="save"
            @click:option="({ callback }) => callback()"
          >{{ t('reusable.save') }}
          </wt-button-select>
        </template>
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
    </template>

    <template v-slot:main>
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        ></wt-tabs>
        <component
          :is="component"
          :namespace="namespace"
        ></component>
        <input type="submit" hidden>
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script setup>
import {
  computed, onMounted, onUnmounted, reactive,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useCardStore } from '@webitel/ui-sdk/src/modules/CardStoreModule/composables/useCardStore';
import { useCardPage } from '../../../app/composables/useCardPage';
import Criterias from './opened-scorecard-criterias.vue';
import General from './opened-scorecard-general.vue';

const { t } = useI18n();
const namespace = 'scorecards';
const currentTab = reactive({});

const {
  setId,

  resetItem,
} = useCardStore(namespace);

const {
  id,
  itemInstance,

  save,
  close,
} = useCardPage(namespace);

const tabs = computed(() => [
  {
    text: t('objects.general'),
    value: 'general',
    namespace,
  }, {
    text: t('objects.criteria'),
    value: 'criteria',
    namespace: `${namespace}/criteria`,
  },
]);

const path = computed(() => {
  const baseUrl = 'audit/scorecards';

  return [
    { name: t('webitelUI.appNavigator.audit') },
    { name: t('scorecards.scorecards'), route: '/scorecards' },
    {
      name: id.value ? itemInstance.value.name : t('reusable.new'),
      route: id.value ? `/scorecards/${id.value}` : `${baseUrl}/new`,
    },
  ];
});

const component = computed(() => {
  if (currentTab.value?.value === 'criteria') return Criterias;
  return General;
});

function saveAs() {
  setId(null);
  save();
}

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
});

// onUnmounted(() => resetItem());
</script>

<style scope>

</style>
