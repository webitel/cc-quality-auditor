<template>
  <wt-error-page
    type="404"
    @back="$router.replace('/scorecards')"
  />
</template>

<script>
export default {
  name: 'TheNotFoundComponent',
};
</script>

<style lang="scss" scoped>
</style>
