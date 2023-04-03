<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :label="t('objects.name')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-textarea
        :value="itemInstance.description"
        :label="t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
      <wt-select
        :label="t('objects.team',2)"
        :value="itemInstance.teams"
        :search-method="teamLookupApi"
        required
        multiple
        @input="setItemProp({ prop: 'teams', value: $event })"
      ></wt-select>
      <wt-switcher
        :disabled="disableUserInput"
        :label="t('objects.state')"
        :value="itemInstance.state"
        @change="setItemProp({ prop: 'enable', value: $event })"
      ></wt-switcher>
    </div>
  </section>
</template>

<script setup>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import {computed} from "vue";
import teamLookupApi from "@/modules/_shared/lookups/api/teamLookupApi";

const store = useStore();
console.log(store.state.scorecards.itemInstance);
const itemInstance = computed(() => store.state.scorecards.itemInstance);
console.log(itemInstance)
const { t } = useI18n();
</script>

<style scoped>
</style>
