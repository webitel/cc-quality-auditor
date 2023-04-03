<template v-slot:header >
    <wt-headline class="test">
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

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'
export default {
  name: 'audit-header',
  setup() {
    const { t } = useI18n();
    const path = computed(() => {
      return [
      { name: t('reusable.audit') },
        { name: t('scorecards.scorecards') },
      // { name: `${this.$t('scorecards.scorecards')} (${this.callId})` },
    ]})
    return { path, t };
  },
};

</script>

<style lang="scss" scoped>
.add {
  margin-right: var(--spacing-sm);
}
</style>
