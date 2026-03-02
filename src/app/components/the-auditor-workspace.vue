<template>
  <main class="object-wrap">
    <section class="object">
      <wt-app-header>
        <wt-notifications-bar />
        <wt-navigation-bar
          :current-app="currentApp"
          :nav="nav"
          :dark-mode="darkMode"
          :logo-route="RoutePaths.Scorecards"
        />
        <wt-logo
          :dark-mode="darkMode"
          :logo-href="startPageHref"
        />
        <wt-dark-mode-switcher />
        <wt-app-navigator
          :apps="apps"
          :current-app="currentApp"
          :dark-mode="darkMode"
        />
        <wt-header-actions
          :build-info="{ release, build }"
          :user="userinfo"
          @logout="logoutUser"
          @settings="settings"
        />
      </wt-app-header>
      <div class="object-content-wrap">
        <router-view />
      </div>
    </section>
  </main>
</template>

<script setup>
import { AuditorSections, WtApplication } from '@webitel/ui-sdk/enums';
import WtDarkModeSwitcher from '@webitel/ui-sdk/src/modules/Appearance/components/wt-dark-mode-switcher.vue';
import { storeToRefs } from 'pinia';
import { computed, inject, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useUserinfoStore } from '../../modules/userinfo/userInfoStore';
import RoutePaths from '../router/_internals/RoutePaths.enum';
import packageJson from '../../../package.json' with { type: 'json' };

const release = packageJson.version;
const build = import.meta.env.VITE_BUILD_NUMBER;

const store = useStore();
const router = useRouter();

const userinfoStore = useUserinfoStore();
const { hasApplicationVisibility, logoutUser } = userinfoStore;
const { userinfo } = storeToRefs(userinfoStore);
const currentApp = computed(() => WtApplication.Audit);

const darkMode = computed(() => store.getters['appearance/DARK_MODE']);

const { t, locale, fallbackLocale } = useI18n();

const startPageHref = computed(() => import.meta.env.VITE_APPLICATION_HUB_URL);

const apps = computed(() => {
	const agent = {
		name: WtApplication.Agent,
		href: import.meta.env.VITE_AGENT_URL,
	};
	const supervisor = {
		name: WtApplication.Supervisor,
		href: import.meta.env.VITE_SUPERVISOR_URL,
	};
	const history = {
		name: WtApplication.History,
		href: import.meta.env.VITE_HISTORY_URL,
	};
	const audit = {
		name: WtApplication.Audit,
		href: import.meta.env.VITE_AUDIT_URL,
	};
	const admin = {
		name: WtApplication.Admin,
		href: import.meta.env.VITE_ADMIN_URL,
	};
	const grafana = {
		name: WtApplication.Analytics,
		href: import.meta.env.VITE_GRAFANA_URL,
	};
	const crm = {
		name: WtApplication.Crm,
		href: import.meta.env.VITE_CRM_URL,
	};

	const config = inject('$config');

	const allApps = [
		admin,
		supervisor,
		agent,
		history,
		audit,
		crm,
	];
	if (config?.ON_SITE) allApps.push(grafana);
	return allApps.filter(({ name }) => hasApplicationVisibility(name));
});

const nav = computed(() => {
	const scorecards = {
		value: AuditorSections.Scorecards,
		name: t(
			`WtApplication.${WtApplication.Audit}.sections.${AuditorSections.Scorecards}`,
		),
		route: '/scorecards',
	};
	const nav = [
		scorecards,
	];
	return nav.filter((nav) =>
		hasApplicationVisibility({
			name: nav.value,
		}),
	);
});

function settings() {
	const settingsUrl = import.meta.env.VITE_SETTINGS_URL;
	window.open(settingsUrl);
}

function setLanguage() {
	const lang = localStorage.getItem('lang');
	if (lang) locale.value = lang;

	const fallbackLang = localStorage.getItem('fallbackLang');
	if (fallbackLang) fallbackLocale.value = fallbackLang;
}

onMounted(() => {
	setLanguage();
});
</script>

<style
  lang="scss"
  scoped
>
.object-wrap {
  display: flex;
  width: 100%;
  height: 100%;
}

.object {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.object-content-wrap {
  flex: 1;
  min-height: 0;
}

.wt-dark-mode-switcher {
  margin-right: auto;
}
</style>
