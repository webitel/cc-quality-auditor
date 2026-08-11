<template>
  <wt-notifications-bar />
  <router-view />
</template>

<script
  lang="ts"
  setup
>
import { storeToRefs } from 'pinia';
import { provide } from 'vue';

import { useAppearanceStore } from './modules/appearance/stores/appearanceStore';

const appearanceStore = useAppearanceStore();
const { darkMode } = storeToRefs(appearanceStore);

const cachedTheme = localStorage.getItem('theme');
if (cachedTheme) {
	appearanceStore.setTheme(cachedTheme);
}

provide('darkMode', darkMode);
</script>

<style>
#app {
  height: 100%;
}
</style>
