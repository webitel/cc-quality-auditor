<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :label="t('reusable.name')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-textarea
        :value="itemInstance.description"
        :label="t('vocabulary.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
      <wt-select
        :label="t('objects.team',2)"
        :value="itemInstance.teams"
        :search-method="teamLookupApi"
        multiple
        @input="setItemProp({ prop: 'teams', value: $event })"
      ></wt-select>
      <wt-switcher
        :disabled="disableUserInput"
        :label="t('reusable.state')"
        :value="itemInstance.enabled"
        @change="setItemProp({ prop: 'enabled', value: $event })"
      ></wt-switcher>
    </div>
  </section>
</template>

<script setup>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import teamLookupApi from '@/modules/_shared/lookups/api/teamLookupApi';

const store = useStore();
const { t } = useI18n();

const itemInstance = computed(() => store.state.scorecards.itemInstance);

async function setItemProp(payload) {
  await store.dispatch('scorecards/SET_ITEM_PROPERTY', payload);
}

</script>

<style scoped>
</style>
