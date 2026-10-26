import {
	AuditorSections,
	WtApplication,
	WtObject,
} from '@webitel/ui-sdk/enums';
import {
	createRouter,
	createWebHistory,
	type RouteRecordRaw,
} from 'vue-router';
import startPageRoutes from '../../modules/start-page/router';
import StartPageRouteNames from '../../modules/start-page/router/internals/start-page-route-names';
import RoutePaths from './_internals/RoutePaths.enum';
import ScorerecordTabName from './_internals/ScorerecordTabNames.enum';
import { createAuthGuard } from './authGuard';

const TheAuditorWorkspace = () =>
	import('../components/the-auditor-workspace.vue');
const OpenedScorecard = () =>
	import('../../modules/scorecards/components/opened-scorecard.vue');
const Scorecards = () =>
	import('../../modules/scorecards/components/the-scorecards.vue');
const AccessDenied = () =>
	import('../components/utils/access-denied-component.vue');

const Criteria = () =>
	import('../../modules/scorecards/components/opened-scorecard-criteria.vue');
const General = () =>
	import('../../modules/scorecards/components/opened-scorecard-general.vue');
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
			{
				path: RoutePaths.Scorecards,
				name: AuditorSections.Scorecards,
				component: Scorecards,
				meta: {
					WtObject: WtObject.AuditForm,
					UiSection: AuditorSections.Scorecards,
				},
			},
			{
				path: `${RoutePaths.Scorecards}/:id`,
				name: `${AuditorSections.Scorecards}-card`,
				component: OpenedScorecard,
				redirect: {
					name: ScorerecordTabName.GENERAL,
				},
				meta: {
					WtObject: WtObject.AuditForm,
					UiSection: AuditorSections.Scorecards,
				},
				children: [
					{
						path: 'general',
						name: ScorerecordTabName.GENERAL,
						component: General,
					},
					{
						path: 'criteria',
						name: ScorerecordTabName.CRITERIA,
						component: Criteria,
					},
				],
			},
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
