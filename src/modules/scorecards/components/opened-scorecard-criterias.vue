<template>
  <div>
    <audit-form
      v-model:questions="itemInstance.questions"
      mode="create"
      @update:questions="setItemProp({ prop: 'question', value: $event })"
    ></audit-form>
  </div>
</template>

<script setup>
import { useCardStore } from '@webitel/ui-sdk/src/modules/CardStoreModule/composables/useCardStore';
import AuditForm from '@webitel/ui-sdk/src/modules/AuditForm/components/audit-form.vue';

const props = defineProps({
  namespace: {
    type: String,
    required: true,
  },
});

const {
  itemInstance,
  setItemProp,
} = useCardStore(props.namespace);
</script>

<style scoped>
</style>
