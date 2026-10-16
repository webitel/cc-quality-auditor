<template>
  <div class="opened-scorecard-criteria">
    <audit-form
      class="wt-scrollbar"
      :questions="modelValue.questions"
      mode="create"
      :readonly="disableUserInput"
      @update:validation="emits('update:validation', $event)"
      @update:questions="modelValue.questions = $event"
    />
    <wt-message
      v-if="!hasPositiveMaxRequiredCriterion(modelValue.questions)"
      :color="MessageColor.ERROR"
      :variant="MessageVariant.SIMPLE"
      :size="ComponentSize.SM"
    >
      {{ $t('scorecards.noPositiveRequiredCriterion') }}
    </wt-message>
  </div>
</template>

<script setup lang="ts">
import type { EngineAuditForm } from '@webitel/api-services/gen/models';
import {
	ComponentSize,
	MessageColor,
	MessageVariant,
	WtObject,
} from '@webitel/ui-sdk/enums';
import AuditForm from '@webitel/ui-sdk/src/modules/AuditForm/components/audit-form.vue';

import { useUserAccessControl } from '../../../app/composables/useUserAccessControl';
import { hasPositiveMaxRequiredCriterion } from '../scripts/hasPositiveMaxRequiredCriterion';

const modelValue = defineModel<EngineAuditForm>({
	required: true,
});

const emits = defineEmits<{
	'update:validation': [
		{
			invalid: boolean;
		},
	];
}>();

const { disableUserInput } = useUserAccessControl(WtObject.AuditForm);
</script>

<style scoped>
.opened-scorecard-criteria {
  min-height: 0;
  display: flex;
  flex-direction: column;
  margin-top: var(--spacing-sm);
}

.audit-form {
  min-height: 0;
  overflow-y: auto;
}
</style>
