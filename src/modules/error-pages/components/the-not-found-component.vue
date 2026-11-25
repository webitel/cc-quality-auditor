<template>
  <wt-error-page
    type="404"
    @back="router.replace(StartPageRoutePaths.TheStartPage)"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import StartPageRoutePaths from '../../start-page/router/internals/start-page-route-paths';

const router = useRouter();
</script>
