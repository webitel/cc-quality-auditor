import { createStore } from 'vuex';
import userinfo from '../../modules/userinfo/userinfo';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    OPEN_SESSION: async (context) => {
      await context.dispatch('userinfo/OPEN_SESSION', null, { root: true });
    },
  },
  modules: {
    userinfo,
  },
});
