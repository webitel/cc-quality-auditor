<template>
  <wt-error-page
    type="404"
    @back="router.replace('/scorecards')"
  />
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style lang="scss" scoped>
</style>
