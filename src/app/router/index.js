import { createRouter, createWebHistory } from 'vue-router';
import AuditorSections
  from '@webitel/ui-sdk/src/enums/WebitelApplications/AuditorSections.enum';
import Auth from '@webitel/ui-sdk/src/modules/Userinfo/components/the-auth.vue';
import { useAccess } from '../composables/useAccess';
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
    path: '/auth',
    name: 'auth',
    component: Auth,
  },
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
      path: ':id',
      name: `${AuditorSections.SCORECARDS}-edit`,
      component: OpenedScorecard,
      beforeEnter: checkRouteAccess,
      meta: {
        modifyMode: 'edit',
      },
    },
    {
      path: 'new',
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
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access-token');
  if (!(to.fullPath === '/auth')) {
    if (!token) {
      next('/auth');
    }
  }
  next();
});

export default router;
