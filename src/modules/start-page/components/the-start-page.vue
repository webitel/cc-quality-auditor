<template>
  <wt-start-page
    :nav="navCards"
    :dark-mode="darkMode"
    :app-logo="logo"
  />
</template>

<script setup lang="ts">
import { WtStartPage } from '@webitel/ui-sdk/components';
import { storeToRefs } from 'pinia';

import { useAppearanceStore } from '../../appearance/stores/appearanceStore';
import LogoDark from '../assets/audit-logo-dark.svg';
import LogoLight from '../assets/audit-logo-light.svg';
import { useNavStore } from '../stores/navStore';

defineOptions({
	components: {
		WtStartPage,
	},
});

const logo = {
	light: LogoLight,
	dark: LogoDark,
};

const navStore = useNavStore();
const { navCards } = storeToRefs(navStore);

const appearanceStore = useAppearanceStore();
const { darkMode } = storeToRefs(appearanceStore);
</script>
