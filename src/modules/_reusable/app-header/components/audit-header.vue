<template v-slot:header>
  <wt-headline>
    <template v-slot:title>
      <wt-headline-nav
        :path="path"
      ></wt-headline-nav>
    </template>
    <template v-slot:actions>
      <wt-button
        color="secondary"
        class="add"
      >{{ $t('objects.add') }}
      </wt-button>
      <wt-button
        color="secondary"
      >{{ $t('objects.delete') }}
      </wt-button>
    </template>
  </wt-headline>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const path = computed(() => [
  { name: t('reusable.audit') },
  { name: t('scorecards.scorecards') },
]);
</script>

<style lang="scss" scoped>
.add {
  margin-right: var(--spacing-sm);
}
</style>
