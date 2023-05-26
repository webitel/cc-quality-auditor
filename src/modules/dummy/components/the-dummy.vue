<template>
  <div class="dummy">
    <div class="dummy_pic">
      <img src="../assets/the-dummy.svg" alt="Workspace is empty" />
    </div>
    <h1 class="dummy_title">{{ dummyTitle }}</h1>
    <wt-button
      @click="emits('create')"
    >{{ $t('reusable.add') }}
    </wt-button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  entity: {
    type: String,
    required: true,
  },
});

const emits = defineEmits([
  'create',
]);

const { t } = useI18n();

const dummyTitle = computed(() => {
  const text = t('scorecards.dummy', { entity: props.entity.toLowerCase() });
  return text[0].toUpperCase() + text.slice(1);
});
</script>

<style lang="scss" scoped>
.dummy {
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &_title {
    @extend %typo-body-1;
    margin-bottom: var(--spacing-sm);
  }

  &_pic {
    width: 200px;
    height: 200px;
    margin-bottom: var(--spacing-md);
  }
}
</style>
