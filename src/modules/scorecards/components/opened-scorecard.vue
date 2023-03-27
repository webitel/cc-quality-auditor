<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header
        :primary-text="saveText"
        :primary-action="save"
        :hide-primary="!hasSaveActionAccess"
        :primary-disabled="disabledSave"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </object-header>
    </template>

    <template v-slot:main>
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        ></wt-tabs>
        <component
          :is="currentTab.value"
          :namespace="namespace"
        ></component>
        <input type="submit" hidden> <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import General from './opened-scorecard-general.vue';
import { useVuelidate } from '@vuelidate/core';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';


export default {
  //          :v="v$"
  name: 'opened-scorecard',
  components: { General },
  data: () => ({
    namespace: 'audit/scorecard',
  }),
  setup() {
    const currentTab = ref({
      value: 'general',
    });

    const { t } = useI18n();
    const store = useStore();
    console.log(store);
    const tabs = computed(() => {
      return [{
        text: t('scorecards.general'),
        value: 'general',
      }];
    });
    console.log(store.state.scorecards.itemInstance.id);
    const id = store.state.scorecards.itemInstance.id;
    const path = computed(() => {
      const baseUrl = '/audit/scorecards';
      return [
        { name: t('reusable.audit') },
        { name: t('scorecards.scorecards'), route: baseUrl },
        {
          name: id ? t('scorecards.scorecards') : t('objects.new'),
          route: id ? `${baseUrl}/${id}` : `${baseUrl}/new`,
        },
      ];
    });
    console.log(path);
    return { t, tabs, path, currentTab };
  },
};
</script>

<style scope>

</style>
