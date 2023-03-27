<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('scorecards.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :v="v.itemInstance.name"
        :label="$t('scorecards.name')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-textarea
        :value="itemInstance.description"
        :label="$t('scorecards.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
      <wt-select
        :label="$t('scorecards.team')"
        :v="v.itemInstance.team"
        :value="itemInstance.team"
        required
        @input="setItemProp({ prop: 'provider', value: $event })"
      ></wt-select>
      <wt-switcher
        :disabled="disableUserInput"
        :label="$t('scorecards.state')"
        :value="itemInstance.state"
        @change="setItemProp({ prop: 'isSupervisor', value: $event })"
      ></wt-switcher>
    </div>
  </section>
</template>

<script>

export default {
  name: 'opened-scorecard-general',
};
</script>

<style scoped>

</style>
