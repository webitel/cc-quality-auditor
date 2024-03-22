import { createRouter, createWebHistory } from 'vue-router';
import AuditorSections
  from '@webitel/ui-sdk/src/enums/WebitelApplications/AuditorSections.enum';
import store from '../store';
import TheAuditorWorkspace from '../components/the-auditor-workspace.vue';
import Scorecards from '../../modules/scorecards/components/the-scorecards.vue';
import OpenedScorecard
  from '../../modules/scorecards/components/opened-scorecard.vue';
import AccessDenied from '../components/utils/access-denied-component.vue';

const checkAppAccess = (to, from, next) => {
  const hasReadAccess = store.getters['userinfo/CHECK_APP_ACCESS'](store.getters['userinfo/THIS_APP']);
  if (hasReadAccess) {
    next();
  } else {
    next('/access-denied');
  }
};

const checkRouteAccess = ((to, from, next) => {
  const hasReadAccess = store.getters['userinfo/CHECK_OBJECT_ACCESS']({ route: to });
  if (hasReadAccess) {
    next();
  } else {
    next('/access-denied');
  }
});

const routes = [
  {
    path: '/',
    name: 'auditor-workspace',
    redirect: { name: AuditorSections.SCORECARDS },
    component: TheAuditorWorkspace,
    beforeEnter: checkAppAccess,
    children: [{
      path: 'scorecards',
      name: AuditorSections.SCORECARDS,
      component: Scorecards,
      beforeEnter: checkRouteAccess,
    },
    {
      path: 'scorecards/:id',
      name: `${AuditorSections.SCORECARDS}-edit`,
      component: OpenedScorecard,
      beforeEnter: checkRouteAccess,
      meta: {
        modifyMode: 'edit',
      },
    },
    {
      path: 'scorecards/new',
      name: `${AuditorSections.SCORECARDS}-new`,
      component: OpenedScorecard,
      beforeEnter: checkRouteAccess,
      meta: {
        modifyMode: 'create',
      },
    },
    ],
  },
  {
    path: '/access-denied',
    name: 'access-denied',
    component: AccessDenied,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes,
});

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('access-token') && !to.query.accessToken) {
    const desiredUrl =  encodeURIComponent(window.location.href);
    const authUrl = import.meta.env.VITE_AUTH_URL;
    window.location.href = `${authUrl}?redirectTo=${desiredUrl}`;
  } else if (to.query.accessToken) {
    // assume that access token was set from query before app initialization in main.js
    const newQuery = { ...to.query };
    delete newQuery.accessToken;
    next({ ...to, query: newQuery });
  } else {
    next();
  }
});

export default router;
