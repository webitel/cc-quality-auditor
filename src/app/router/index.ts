import {
	AuditorSections,
	WtApplication,
	WtObject,
} from '@webitel/ui-sdk/enums';
import { createRouter, createWebHistory } from 'vue-router';

import OpenedScorecard from '../../modules/scorecards/components/opened-scorecard.vue';
import Scorecards from '../../modules/scorecards/components/the-scorecards.vue';
import TheAuditorWorkspace from '../components/the-auditor-workspace.vue';
import AccessDenied from '../components/utils/access-denied-component.vue';
import RoutePaths from './_internals/RoutePaths.enum';
import ScorerecordTabName from './_internals/ScorerecordTabNames.enum';

const Criterias = import(
	'../../modules/scorecards/components/opened-scorecard-criterias.vue'
);
const General = import(
	'../../modules/scorecards/components/opened-scorecard-general.vue'
);
const NotFound = () =>
	import('../../modules/error-pages/components/the-not-found-component.vue');

const routes = [
	{
		path: '/',
		name: 'auditor-workspace',
		redirect: {
			name: AuditorSections.Scorecards,
		},
		component: TheAuditorWorkspace,
		meta: {
			WtApplication: WtApplication.Audit,
		},
		children: [
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
				path: 'scorecards/:id',
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
						path: 'criterias',
						name: ScorerecordTabName.CRITERIAS,
						component: Criterias,
					},
				],
			},
		],
	},
	{
		path: '/access-denied',
		name: 'access-denied',
		component: AccessDenied,
	},
	{
		// Added to render 404 pages with the common workspace layout (header)
		// https://webitel.atlassian.net/browse/WTEL-8140
		path: '/404',
		name: 'not-found',
		component: TheAuditorWorkspace,
		children: [
			{
				path: '',
				name: 'not-found-inner',
				component: NotFound,
			},
		],
	},
];

export let router = null;

export const initRouter = async ({ beforeEach = [] } = {}) => {
	router = createRouter({
		history: createWebHistory(import.meta.env.BASE_URL),
		scrollBehavior(to, from, savedPosition) {
			return {
				left: 0,
				top: 0,
			};
		},
		routes,
	});

	router.beforeEach((to, from, next) => {
		if (!localStorage.getItem('access-token') && !to.query.accessToken) {
			const desiredUrl = encodeURIComponent(window.location.href);
			const authUrl = import.meta.env.VITE_AUTH_URL;
			window.location.href = `${authUrl}?redirectTo=${desiredUrl}`;
		} else if (to.query.accessToken) {
			// assume that access token was set from query before app initialization in main.js
			const newQuery = {
				...to.query,
			};
			delete newQuery.accessToken;
			next({
				...to,
				query: newQuery,
			});
		} else {
			next();
		}
	});

	beforeEach.forEach((guard) => {
		router.beforeEach(guard);
	});

	return router;
};
