<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('reusable.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :label="$t('reusable.name')"
        :v="v.itemInstance.name"
        :disabled="!hasModifyAccess"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-textarea
        :value="itemInstance.description"
        :label="$t('vocabulary.description')"
        :disabled="!hasModifyAccess"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
      <wt-select
        :label="$t('objects.team',2)"
        :value="itemInstance.teams"
        :search-method="teamLookupApi"
        :disabled="!hasModifyAccess"
        multiple
        @input="setItemProp({ prop: 'teams', value: $event })"
      ></wt-select>
      <div></div>
      <wt-switcher
        :disabled="!hasModifyAccess"
        :label="$t('reusable.state')"
        :value="itemInstance.enabled"
        @change="setItemProp({ prop: 'enabled', value: $event })"
      ></wt-switcher>
    </div>
  </section>
</template>

<script setup>
import { useCardStore } from '@webitel/ui-sdk/src/modules/CardStoreModule/composables/useCardStore';
import { useAccess } from '../../../app/composables/useAccess';
import teamLookupApi from '../../_shared/lookups/api/teamLookupApi';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
  v: {
    type: Object,
  },
});

const {
  itemInstance,
  setItemProp,
} = useCardStore(props.namespace);

const {
  hasModifyAccess,
} = useAccess();

</script>

<style scoped>
</style>
