<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        v-bind="attrs"
        class="table-action"
        icon="plus"
      ></wt-icon-btn>
    </template>
    {{ $t('iconHints.add') }}
  </wt-tooltip>
</template>

<script setup>
///        @click="$emit('click')"
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<style scoped>

</style>
