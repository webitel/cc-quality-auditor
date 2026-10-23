<template>
  <wt-error-page
    type="404"
    @back="router.replace(RoutePaths.StartPage)"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import RoutePaths from '../../../app/router/_internals/RoutePaths.enum';

const router = useRouter();
</script>
