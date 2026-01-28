<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title typo-heading-3">
        {{ $t('reusable.generalInfo') }}
      </h3>
    </header>
    <div class="opened-card-input-grid">
      <wt-input-text
        :model-value="itemInstance.name"
        :label="$t('reusable.name')"
        :v="v.itemInstance.name"
        :disabled="!hasModifyAccess"
        required
        @update:model-value="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-textarea
        :model-value="itemInstance.description"
        :label="$t('vocabulary.description')"
        :disabled="!hasModifyAccess"
        @update:model-value="setItemProp({ prop: 'description', value: $event })"
      />
      <wt-select
        :label="$t('objects.team', 1)"
        :value="itemInstance.teams"
        :search-method="teamLookupApi"
        :disabled="!hasModifyAccess"
        multiple
        @input="setItemProp({ prop: 'teams', value: $event })"
      />
      <div />
      <wt-switcher
        :disabled="!hasModifyAccess"
        :label="$t('reusable.state')"
        :model-value="itemInstance.enabled"
        @update:model-value="setItemProp({ prop: 'enabled', value: $event })"
      />
    </div>
  </section>
</template>

<script setup>
import { useCardStore } from "@webitel/ui-sdk/src/modules/CardStoreModule/composables/useCardStore";

import { useAccess } from "../../../app/composables/useAccess";
import teamLookupApi from "../../_shared/lookups/api/teamLookupApi";

const props = defineProps({
	namespace: {
		type: String,
		required: true,
	},
	v: {
		type: Object,
	},
});

const { itemInstance, setItemProp } = useCardStore(props.namespace);

const { hasModifyAccess } = useAccess();
</script>

<style scoped>
</style>
