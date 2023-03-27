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
        >{{ $t('reusable.add') }}
        </wt-button>
        <wt-button
          color="secondary"
        >{{ $t('reusable.delete') }}
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
//.test {
//  border: 1px solid black;
//}
</style>
