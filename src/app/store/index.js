import { createStore } from 'vuex';

import appearance from '../../modules/appearance/store/appearance';

export default createStore({
	state: {
		router: null,
	},
	getters: {},
	mutations: {
		SET_ROUTER: (state, router) => {
			state.router = router;
		},
	},
	actions: {},
	modules: {
		appearance,
	},
});
