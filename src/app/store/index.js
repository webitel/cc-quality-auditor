import { createStore } from 'vuex';
import userinfo from '../../modules/userinfo/userinfo';
import appearance from '../../modules/appearance/store/appearance';
import scorecards from '../../modules/scorecards/store/scorecards';
import instance from '../api/instance';

export default createStore({
  state: {},
  getters: {},
  mutations: {
    SET_APP_STATE: (state, appState) => {
      state.state = appState;
    },
  },
  actions: {
    OPEN_SESSION: async (context) => {
      await context.dispatch('userinfo/OPEN_SESSION', { instance }, { root: true });
    },
    LOAD_DATA: (
      context,
      payload,
    ) => context.dispatch(`${context.state.state}/LOAD_DATA`, payload),
    SET_APP_STATE: (context, state) => context.commit('SET_APP_STATE', state),
    RESET_FILTERS: (context) => {
      context.dispatch('filters/RESET_FILTERS');
      context.dispatch(`${context.state.state}/RESET_FILTERS`);
    },
  },
  modules: {
    userinfo,
    appearance,
    scorecards,
  },
});
