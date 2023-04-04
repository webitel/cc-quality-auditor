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
    {{ t('objects.delete') }}
  </wt-tooltip>
</template>

<script setup>
import { useAttrs } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const attrs = useAttrs();

const emits = defineEmits([
  'click',
]);
</script>

<style scoped>
</style>
