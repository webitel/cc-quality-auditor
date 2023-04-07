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
      >{{ $t('reusable.add') }}
      </wt-button>
      <wt-button
        color="secondary"
      >{{ $t('reusable.delete') }}
      </wt-button>
    </template>
  </wt-headline>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const path = computed(() => [
  { name: t('webitelUI.appNavigator.audit') },
  { name: t('scorecards.scorecards') },
]);
</script>

<style lang="scss" scoped>
.add {
  margin-right: var(--spacing-sm);
}
</style>
