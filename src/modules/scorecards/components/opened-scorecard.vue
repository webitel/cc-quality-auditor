<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <wt-page-header
        :primary-action="saveChanges"
        :primary-text="saveText"
        :secondary-action="close"
        :primary-disabled="isInvalidForm"
      >
        <template v-slot:primary-action v-if="itemInstance.editable">
          <wt-button-select
            :options="saveOptions"
            :color="isInvalidForm && 'secondary'"
            @click="save"
            @click:option="({ callback }) => callback()"
          >{{ saveText }}
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
          :v="v$"
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
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useClose } from '../../../app/composables/useClose';
import { useCardPage } from '../../../app/composables/useCardPage';
import Criterias from './opened-scorecard-criterias.vue';
import General from './opened-scorecard-general.vue';

const namespace = 'scorecards';
const currentTab = ref({});

const {
  id,
  itemInstance,

  save,
  setId,
  setItemProp,
} = useCardPage(namespace);

const { close } = useClose();
const { t } = useI18n();

const v$ = useVuelidate(computed(() => (
  {
    itemInstance: {
      name: { required },
    },
    $autoDirty: true,
  })), { itemInstance });

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
    { name: t('webitelUI.appNavigator.audit') },
    { name: t('scorecards.scorecards', 2), route: '/scorecards' },
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
  if (!itemInstance.value.editable && id.value) return t('reusable.saveAs');
  if (itemInstance.value._dirty) return t('reusable.save');
  return t('reusable.saved');
});

const isInvalidForm = computed(() => (itemInstance.value._dirty ? !!v$.value.$invalid : true));

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

onMounted(() => initializeTab());
</script>

<style lang="scss" scoped>
.main-container {
  width: 100%;
}
</style>
