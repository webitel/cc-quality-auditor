<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        v-bind="attrs"
        class="table-action"
        icon="bucket"
        @click="emits('click')"
      ></wt-icon-btn>
    </template>
    {{ $t('iconHints.delete') }}
  </wt-tooltip>
</template>

<script setup>
import { useAttrs } from 'vue';
//        @click="$emit('click')"
const attrs = useAttrs();

const emits = defineEmits([
  'click',
]);
</script>

<style scoped>

</style>
