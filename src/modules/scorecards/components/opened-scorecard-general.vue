<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('scorecards.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :label="t('scorecards.name')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-textarea
        :value="itemInstance.description"
        :label="t('scorecards.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
      <wt-select
        :label="t('scorecards.team')"
        :value="itemInstance.team"
        required
        @input="setItemProp({ prop: 'provider', value: $event })"
      ></wt-select>
      <wt-switcher
        :disabled="disableUserInput"
        :label="t('scorecards.state')"
        :value="itemInstance.state"
        @change="setItemProp({ prop: 'isSupervisor', value: $event })"
      ></wt-switcher>
    </div>
  </section>
</template>

<script setup>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

const store = useStore();
console.log(store.state.scorecards.itemInstance);
const itemInstance = store.state.scorecards.itemInstance;
const { t } = useI18n();
</script>

<style scoped>
</style>
