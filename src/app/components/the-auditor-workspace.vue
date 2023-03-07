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
import { computed } from 'vue';
import { useStore } from 'vuex';

const release = process.env.VUE_APP_PACKAGE_VERSION;
const build = process.env.VUE_APP_BUILD_NUMBER;

const store = useStore();
const userinfo = store.state.userinfo;
const currentApp = userinfo.thisApp;

const apps = {
  agent: {
    name: WebitelApplications.AGENT,
    href: process.env.VUE_APP_AGENT_URL,
  };
  supervisor: {
    name: WebitelApplications.SUPERVISOR,
    href: process.env.VUE_APP_SUPERVISOR_URL,
  };
  history: {
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
  const apps = [admin, supervisor, agent, history, audit];
  if (this.$config?.ON_SITE) apps.push(grafana);
  return apps.filter(({ name }) => this.checkAccess(name));
},


</script>

<style lang="scss" scoped>

</style>
