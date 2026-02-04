<template>
  <div class="opened-scorecard-criterias">
    <audit-form
      class="wt-scrollbar"
      :questions="itemInstance.questions"
      :mode="!disableUserInput ? 'create' : 'fill'"
      :readonly="disableUserInput"
      @update:validation="emits('update:validation', $event)"
      @update:questions="setItemProp({ prop: 'questions', value: $event })"
    />
  </div>
</template>

<script setup>
import { WtObject } from "@webitel/ui-sdk/enums";
import AuditForm from "@webitel/ui-sdk/src/modules/AuditForm/components/audit-form.vue";
import { useCardStore } from "@webitel/ui-sdk/src/modules/CardStoreModule/composables/useCardStore";

import { useUserAccessControl } from "../../../app/composables/useUserAccessControl";

const props = defineProps({
	namespace: {
		type: String,
		required: true,
	},
});

const emits = defineEmits(["update:validation"]);

const {
	itemInstance,

	setItemProp,
} = useCardStore(props.namespace);

const { disableUserInput } = useUserAccessControl(WtObject.Scorecard);
</script>

<style scoped>
.opened-scorecard-criterias {
  min-height: 0;
  display: flex;
  flex-direction: column;
  margin-top: var(--spacing-sm);
}

.audit-form {
  min-height: 0;
  overflow-y: scroll;
}
</style>
