import { AuditorSections, WtObject } from '@webitel/ui-sdk/enums';
import type { RouteRecordRaw } from 'vue-router';

import RouteNames from './internals/scorecards-route-names';
import RoutePaths from './internals/scorecards-route-paths';

const Scorecards = () => import('../components/the-scorecards.vue');
const OpenedScorecard = () => import('../components/opened-scorecard.vue');
const General = () => import('../components/opened-scorecard-general.vue');
const Criteria = () => import('../components/opened-scorecard-criteria.vue');

const scorecardsRoutes: RouteRecordRaw[] = [
	{
		path: RoutePaths.Scorecards,
		name: RouteNames.Scorecards,
		component: Scorecards,
		meta: {
			WtObject: WtObject.AuditForm,
			UiSection: AuditorSections.Scorecards,
		},
	},
	{
		path: `${RoutePaths.Scorecards}/:id`,
		name: RouteNames.Card,
		component: OpenedScorecard,
		redirect: {
			name: RouteNames.General,
		},
		meta: {
			WtObject: WtObject.AuditForm,
			UiSection: AuditorSections.Scorecards,
		},
		children: [
			{
				path: 'general',
				name: RouteNames.General,
				component: General,
			},
			{
				path: 'criteria',
				name: RouteNames.Criteria,
				component: Criteria,
			},
		],
	},
];

export default scorecardsRoutes;
