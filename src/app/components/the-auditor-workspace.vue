<template>
  <main
    v-if="hasAccess"
  >
    <wt-notifications-bar></wt-notifications-bar>
    <wt-app-header>
      <wt-app-navigator :apps="apps" :current-app="currentApp"></wt-app-navigator>
      <wt-header-actions
        :build-info="{ release, build }"
        :user="userinfo"
        @logout="logoutUser"
        @settings="settings"
      />
    </wt-app-header>
  </main>
</template>

<script setup>
import { computed, inject, onMounted } from 'vue';
import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';
import authAPI from '@webitel/ui-sdk/src/modules/Userinfo/api/auth';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const release = process.env.VUE_APP_PACKAGE_VERSION;
const build = process.env.VUE_APP_BUILD_NUMBER;

const store = useStore();
const router = useRouter();

const userinfo = store.state.userinfo;
const currentApp = userinfo.thisApp;

const checkAccess = store.getters['userinfo/CHECK_APP_ACCESS'];

const hasAccess = computed(() => checkAccess(WebitelApplications.AUDIT));

const apps = computed(() => {
  const agent = {
    name: WebitelApplications.AGENT,
    href: process.env.VUE_APP_AGENT_URL,
  };
  const supervisor = {
    name: WebitelApplications.SUPERVISOR,
    href: process.env.VUE_APP_SUPERVISOR_URL,
  };
  const history = {
    name: WebitelApplications.HISTORY,
    href: process.env.VUE_APP_HISTORY_URL,
  };
  const audit = {
    name: WebitelApplications.AUDIT,
    href: process.env.VUE_APP_AUDIT_URL,
  };
  const admin = {
    name: WebitelApplications.ADMIN,
    href: process.env.VUE_APP_ADMIN_URL,
  };
  const grafana = {
    name: WebitelApplications.ANALYTICS,
    href: process.env.VUE_APP_GRAFANA_URL,
  };

  const config = inject('$config');

  const allApps = [admin, supervisor, agent, history, audit];
  if (config?.ON_SITE) allApps.push(grafana);

  return allApps.filter(({ name }) => checkAccess(name));
});

function settings() {
  const settingsUrl = process.env.VUE_APP_SETTINGS_URL;
  window.open(settingsUrl);
}

async function logoutUser() {
  await authAPI.logout();
  await router.replace('/auth');
}

function openSession() {
  return store.dispatch('OPEN_SESSION');
}

onMounted(() => {
  openSession();
});

</script>

<style lang="scss" scoped>

</style>
