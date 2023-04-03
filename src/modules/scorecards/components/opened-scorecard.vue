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
          >{{ $t('objects.save') }}
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
        <input type="submit" hidden> <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script setup>
import General from './opened-scorecard-general.vue';
import { computed, onBeforeMount, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import ObjectHeader from '../../../app/components/utils/the-object-header.vue';
import Criterias from './open-scorecard-criterias.vue';
import {useRoute, useRouter} from "vue-router";

const namespace = '/audit/scorecard';
let currentTab = reactive({});


const { t } = useI18n();
const store = useStore();
const route = useRoute();
const router = useRouter();


const tabs = computed(() => {
  return [{
    text: t('objects.general'),
    value: 'general',
    namespace,
  }, {
    text: t('objects.criterias'),
    value: 'criteria',
    namespace: `${namespace}/criteria`,
  }];
});

console.log(tabs);


onBeforeMount( async () => {
    await store.dispatch('scorecards/LOAD_ITEM', id);
    setInitialTab();
});

const id = computed(() => store.state.scorecards.itemId);
console.log(id)
const pathName = computed(() => store.state.scorecards.itemInstance.name);
console.log(pathName)
const path = computed(() => {
  const baseUrl = 'audit/scorecards';

      return [
        { name: t('reusable.audit') },
        { name: t('scorecards.scorecards'), route: '/scorecards' },
        {
          name: id ? pathName.value.slice(0, pathName.value.lenght) : t('objects.new'),
          route: id.value ? `${baseUrl}/${id.value}` : `${baseUrl}/new`,
        },
      ];
    });

function close() {
  router.go(-1);
}

function updateItem(item) {
  store.dispatch('scorecards/UPDATE_ITEM', item);
}

function addItem(item) {
  store.dispatch('scorecards/ADD_ITEM', item);
}

async function redirectToEdit() {
  const routeName = route.name.replace('-new', '-edit');
  return router.replace({
    name: routeName,
    params: { id },
    hash: route.hash,
  });
}

async function save() {
  // if (!this.disabledSave) {
    if (id) {
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
  // }
}

function saveAs() {
  store.dispatch('scorecards/SET_ITEM_ID', { prop: 'name', value: '' });
  // setItemProp({ prop: 'stopCause', value: '' });
  // setItemProp({ prop: 'attempts', value: 0 });
  // setItemProp({ prop: 'id', value: '' });
  store.dispatch('scorecards/SET_ITEM_ID', null);
  save();
}

const saveOptions = computed(() => {
  const saveAsNew = {
    text: t('objects.saveAs'),
    callback: saveAs,
  };
  return [saveAsNew];
})

function changeTab(tab) {
  console.log(tab)
  // if (Object.keys(route.query).length) {
  //   router.replace({ query: null });
  // }
  currentTab.value = tab;
  console.log(currentTab);
}

const component = computed(() => {
  console.log(currentTab.value)
  if(currentTab.value) {
    if(currentTab.value.value = 'general') {
      return General;
    } else {
      return Criterias;
    }
  }

})

function setInitialTab() {
  console.log(tabs)
  if (tabs) changeTab(tabs[0]);
}
</script>

<style scope>

</style>
