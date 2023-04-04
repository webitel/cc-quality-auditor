<template>
  <div>
    <audit-form
      v-model:questions="questions"
      mode="create"
    ></audit-form>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import AuditForm from '@webitel/ui-sdk/src/modules/AuditForm/components/audit-form.vue';

const store = useStore();

const itemInstance = computed(() => store.state.scorecards.itemInstance);
const questions = computed({
  get() {
    return itemInstance.value.questions || [];
  },
  set(newValue) {
    itemInstance.value.questions = newValue;
  },
});
</script>

<style scoped>
</style>
