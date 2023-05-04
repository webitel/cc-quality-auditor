<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('reusable.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :label="$t('reusable.name')"
        :disabled="!hasSaveActionAccess"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-textarea
        :value="itemInstance.description"
        :label="$t('vocabulary.description')"
        :disabled="!hasSaveActionAccess"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
      <wt-select
        :label="$t('objects.team',2)"
        :value="itemInstance.teams"
        :search-method="teamLookupApi"
        :disabled="!hasSaveActionAccess"
        multiple
        @input="setItemProp({ prop: 'teams', value: $event })"
      ></wt-select>
      <div></div>
      <wt-switcher
        :disabled="!hasSaveActionAccess"
        :label="$t('reusable.state')"
        :value="itemInstance.enabled"
        @change="setItemProp({ prop: 'enabled', value: $event })"
      ></wt-switcher>
    </div>
  </section>
</template>

<script setup>
import teamLookupApi from '../../_shared/lookups/api/teamLookupApi';
import { useCardPage } from '../../../app/composables/useCardPage';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
});

const {
  itemInstance,
  setItemProp,
  hasSaveActionAccess,
} = useCardPage(props.namespace);

</script>

<style scoped>
</style>
