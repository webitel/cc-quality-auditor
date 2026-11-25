import type { RouteRecordRaw } from 'vue-router';

import RouteNames from './internals/start-page-route-names';
import RoutePaths from './internals/start-page-route-paths';

const TheStartPage = () => import('../components/the-start-page.vue');

const startPageRoutes: RouteRecordRaw[] = [
	{
		path: RoutePaths.TheStartPage,
		name: RouteNames.TheStartPage,
		component: TheStartPage,
	},
];

export default startPageRoutes;
