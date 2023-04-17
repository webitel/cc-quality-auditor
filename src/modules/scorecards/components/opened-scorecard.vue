<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <wt-page-header
        :primary-action="save"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <template v-slot:primary-action>
          <wt-button-select
            :options="saveOptions"
            @click="save"
            @click:option="({ callback }) => callback()"
          >{{ $t('reusable.save') }}
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
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCardStore } from '@webitel/ui-sdk/src/modules/CardStoreModule/composables/useCardStore';
import { useClose } from '../../../app/composables/useClose';
import { useCardPage } from '../../../app/composables/useCardPage';
import Criterias from './opened-scorecard-criterias.vue';
import General from './opened-scorecard-general.vue';

const { t } = useI18n();
const namespace = 'scorecards';
const currentTab = ref({});

const {
  id,
  itemInstance,

  save,
} = useCardPage(namespace);

const {
  setId,
} = useCardStore(namespace);

const { close } = useClose();

const tabs = computed(() => [
  {
    text: t('reusable.general'),
    value: 'general',
    namespace,
  }, {
    text: t('objects.criterion'),
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

const saveText = computed(() => {
  id.value ? t('reusable.saved') : t('reusable.save');
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

onMounted(() => initializeTab());
</script>

<style lang="scss" scoped>
.main-container {
  width: 100%;
}
</style>
