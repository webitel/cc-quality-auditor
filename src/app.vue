<template>
  <wt-notifications-bar />
  <router-view />
</template>

<script
  lang="ts"
  setup
>
import { computed, provide } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const darkMode = computed(() => store.getters['appearance/DARK_MODE']);
provide('darkMode', darkMode);
</script>

<style>
#app {
  height: 100%;
}
</style>
