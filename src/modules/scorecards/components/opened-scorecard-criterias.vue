<template>
  <div>
    <audit-form
      v-if="hasSaveActionAccess"
      :questions="itemInstance.questions"
      mode="create"
      @update:questions="setItemProp({ prop: 'questions', value: $event })"
    ></audit-form>
  </div>
</template>

<script setup>
import AuditForm from '@webitel/ui-sdk/src/modules/AuditForm/components/audit-form.vue';
import { useCardPage } from '../../../app/composables/useCardPage';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
});

const {
  itemInstance,
  hasSaveActionAccess,

  setItemProp,
} = useCardPage(props.namespace);
</script>

<style scoped>
.audit-form {
  margin-top: var(--spacing-sm);
}
</style>
