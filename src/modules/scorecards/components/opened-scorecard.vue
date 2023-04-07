<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header
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
      </object-header>
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
import { computed, onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import ObjectHeader from '../../../app/components/utils/the-object-header.vue';
import Criterias from './opened-scorecard-criterias.vue';
import General from './opened-scorecard-general.vue';

const { t } = useI18n();
const store = useStore();
const route = useRoute();
const router = useRouter();
const namespace = '/audit/scorecard';
const currentTab = reactive({});

const id = computed(() => store.state.scorecards.card.itemId);
const pathName = computed(() => store.state.scorecards.card.itemInstance.name);
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
      name: id.value ? pathName.value : t('reusable.new'),
      route: id.value ? `/scorecards/${id.value}` : `${baseUrl}/new`,
    },
  ];
});
const component = computed(() => {
  if (currentTab.value) {
    if (currentTab.value.value === 'general') {
      return General;
    }
    return Criterias;
  }
});

function updateItem(payload) {
  store.dispatch('scorecards/card/UPDATE_ITEM', payload);
}

function addItem(payload) {
  store.dispatch('scorecards/card/ADD_ITEM', payload);
}

function loadItem(payload) {
  store.dispatch('scorecards/card/LOAD_ITEM', payload);
}

async function setItemId(payload) {
  await store.dispatch('scorecards/card/SET_ITEM_ID', payload);
}

function close() {
  router.go(-1);
}

function redirectToEdit() {
  const routeName = route.name.replace('-new', '-edit');
  return router.replace({
    name: routeName,
    params: { id },
    hash: route.hash,
  });
}

async function save() {
  if (id.value) {
    await updateItem();
  } else {
    try {
      await addItem();
      if (this.id) {
        await redirectToEdit();
      }
    } catch (err) {
      throw err;
    }
  }
}

function saveAs() {
  setItemId({ prop: 'name', value: '' });
  setItemId(null);
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

function setInitialTab() {
  if (tabs.value) changeTab(tabs.value[0]);
}

onMounted(() => {
  loadItem(id);
  setInitialTab();
});
</script>

<style scope>

</style>
