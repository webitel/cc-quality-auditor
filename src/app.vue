<template>
  <wt-notifications-bar />
  <router-view />
</template>

<script
  lang="ts"
  setup
>
import { storeToRefs } from 'pinia';
import { onMounted, provide } from 'vue';
import { useI18n } from 'vue-i18n';

import { useAppearanceStore } from './modules/appearance/stores/appearanceStore';
import { useUserinfoStore } from './modules/userinfo/userInfoStore';

const { locale, fallbackLocale } = useI18n();
const { showUserNotifications } = useUserinfoStore();

const appearanceStore = useAppearanceStore();
const { darkMode } = storeToRefs(appearanceStore);

provide('darkMode', darkMode);

function setLanguage() {
	const lang = localStorage.getItem('lang');
	if (lang) locale.value = lang;

	const fallbackLang = localStorage.getItem('fallbackLang');
	if (fallbackLang) fallbackLocale.value = fallbackLang;
}

onMounted(() => {
	setLanguage();
	showUserNotifications();
});
</script>

<style>
#app {
  height: 100%;
}
</style>
