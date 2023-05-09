<template>
  <div>
    <audit-form
      :questions="itemInstance.questions"
      :mode="hasModifyAccess ? 'create' : 'fill'"
      :readonly="!hasModifyAccess"
      @update:validation="emits('update:validation', $event)"
      @update:questions="setItemProp({ prop: 'questions', value: $event })"
    ></audit-form>
  </div>
</template>

<script setup>
import AuditForm from '@webitel/ui-sdk/src/modules/AuditForm/components/audit-form.vue';
import { useCardStore } from '@webitel/ui-sdk/src/modules/CardStoreModule/composables/useCardStore';
import { useAccess } from '../../../app/composables/useAccess';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
});

const emits = defineEmits([
  'update:validation',
]);

const {
  itemInstance,

  setItemProp,
} = useCardStore(props.namespace);

const {
  hasModifyAccess,
} = useAccess();

</script>

<style scoped>
.audit-form {
  margin-top: var(--spacing-sm);
}
</style>
