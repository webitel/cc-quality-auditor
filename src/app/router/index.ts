import { WtApplication } from '@webitel/ui-sdk/enums';
import {
	createRouter,
	createWebHistory,
	type RouteRecordRaw,
} from 'vue-router';
import scorecardsRoutes from '../../modules/scorecards/router';
import startPageRoutes from '../../modules/start-page/router';
import StartPageRouteNames from '../../modules/start-page/router/internals/start-page-route-names';
import { createAuthGuard } from './authGuard';

const TheAuditorWorkspace = () =>
	import('../components/the-auditor-workspace.vue');
const AccessDenied = () =>
	import('../components/utils/access-denied-component.vue');

const NotFound = () =>
	import('../../modules/error-pages/components/the-not-found-component.vue');

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'auditor-workspace',
		redirect: {
			name: StartPageRouteNames.TheStartPage,
		},
		component: TheAuditorWorkspace,
		meta: {
			WtApplication: WtApplication.Audit,
		},
		children: [
			...startPageRoutes,
			...scorecardsRoutes,
			{
				path: '/:pathMatch(.*)*',
				component: NotFound,
			},
			{
				path: '/404',
				name: 'not-found',
				component: NotFound,
			},
		],
	},
	{
		path: '/access-denied',
		name: 'access-denied',
		component: AccessDenied,
	},
];

export let router = null;

export const initRouter = async ({
	beforeEach = [],
	onUnauthorized = () => {},
} = {}) => {
	router = createRouter({
		history: createWebHistory(import.meta.env.BASE_URL),
		scrollBehavior() {
			return {
				left: 0,
				top: 0,
			};
		},
		routes,
	});

	router.beforeEach(
		createAuthGuard({
			onUnauthorized,
		}),
	);

	beforeEach.forEach((guard) => {
		router.beforeEach(guard);
	});

	return router;
};
