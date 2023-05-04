<template>
  <div>
    <audit-form
      :questions="itemInstance.questions"
      mode="create"
      :readonly="!hasModifyAccess"
      @update:questions="setItemProp({ prop: 'questions', value: $event })"
    ></audit-form>
  </div>
</template>

<script setup>
import AuditForm from '@webitel/ui-sdk/src/modules/AuditForm/components/audit-form.vue';
import { useAccess } from '../../../app/composables/useAccess';
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
} = useCardPage(props.namespace);

const {
  hasModifyAccess,
} = useAccess();
</script>

<style scoped>
.audit-form {
  margin-top: var(--spacing-sm);
}
</style>
