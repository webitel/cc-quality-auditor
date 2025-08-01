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
import AuditorSections from '@webitel/ui-sdk/src/enums/WebitelApplications/AuditorSections.enum';
import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';
import WtDarkModeSwitcher from '@webitel/ui-sdk/src/modules/Appearance/components/wt-dark-mode-switcher.vue';
import { computed, inject, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import RoutePaths from '../router/_internals/RoutePaths.enum';

const release = process.env.npm_package_version;
const build = import.meta.env.VITE_BUILD_NUMBER;

const store = useStore();
const router = useRouter();

const userinfo = computed(() => store.state.userinfo);
const currentApp = userinfo.value.thisApp;

const checkAccess = computed(() => store.getters['userinfo/CHECK_APP_ACCESS']);
const darkMode = computed(() => store.getters['appearance/DARK_MODE']);

const { t, locale, fallbackLocale } = useI18n();

const startPageHref = computed(() => import.meta.env.VITE_START_PAGE_URL);

const apps = computed(() => {
  const agent = {
    name: WebitelApplications.AGENT,
    href: import.meta.env.VITE_AGENT_URL,
  };
  const supervisor = {
    name: WebitelApplications.SUPERVISOR,
    href: import.meta.env.VITE_SUPERVISOR_URL,
  };
  const history = {
    name: WebitelApplications.HISTORY,
    href: import.meta.env.VITE_HISTORY_URL,
  };
  const audit = {
    name: WebitelApplications.AUDIT,
    href: import.meta.env.VITE_AUDIT_URL,
  };
  const admin = {
    name: WebitelApplications.ADMIN,
    href: import.meta.env.VITE_ADMIN_URL,
  };
  const grafana = {
    name: WebitelApplications.ANALYTICS,
    href: import.meta.env.VITE_GRAFANA_URL,
  };
  const crm = {
    name: WebitelApplications.CRM,
    href: import.meta.env.VITE_CRM_URL,
  };

  const config = inject('$config');

  const allApps = [admin, supervisor, agent, history, audit, crm];
  if (config?.ON_SITE) allApps.push(grafana);
  return allApps.filter(({ name }) => checkAccess.value(name));
});

const nav = computed(() => {
  const scorecards = {
    value: AuditorSections.SCORECARDS,
    name: t(`WebitelApplications.${WebitelApplications.AUDIT}.sections.${AuditorSections.SCORECARDS}`),
    route: '/scorecards',
  };
  const nav = [scorecards];
  return nav.filter((nav) => checkAccess.value({ name: nav.value }));
});

function settings() {
  const settingsUrl = import.meta.env.VITE_SETTINGS_URL;
  window.open(settingsUrl);
}

function logout() {
  return store.dispatch('userinfo/LOGOUT');
}

async function logoutUser() {
  return logout();
}

function openSession() {
  return store.dispatch('OPEN_SESSION');
}

function setLanguage() {
  const lang = localStorage.getItem('lang');
  if (lang) locale.value = lang;

  const fallbackLang = localStorage.getItem('fallbackLang');
  if (fallbackLang) fallbackLocale.value = fallbackLang;
}

onMounted(() => {
  openSession();
  setLanguage();
});

</script>

<style lang="scss" scoped>
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
