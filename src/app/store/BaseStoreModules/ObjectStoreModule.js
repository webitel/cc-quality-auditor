import deepCopy from 'deep-copy';
import BaseStoreModule
  from '@webitel/ui-sdk/src/store/BaseStoreModules/BaseStoreModule';
import BaseTableModule from './BaseTableStoreModule';
import BaseOpenedInstanceStoreModule from './BaseOpenedInstanceStoreModule';

export default class ObjectStoreModule extends BaseStoreModule {
  getters = {};

  actions = {
    ...BaseTableModule.getActions(),
    ...BaseOpenedInstanceStoreModule.getActions(),

    ADD_ITEM: async (context) => {
      if (!context.state.itemId) {
        const { id } = await context.dispatch('POST_ITEM');
        await context.dispatch('SET_ITEM_ID', id);
        context.dispatch('LOAD_ITEM');
      }
    },
    UPDATE_ITEM: async (context) => {
      if (context.state.itemInstance._dirty) {
        await context.dispatch('UPD_ITEM');
        context.dispatch('LOAD_ITEM');
      }
    },
  };

  mutations = {
    ...BaseTableModule.getMutations(),
    ...BaseOpenedInstanceStoreModule.getMutations(),

    RESET_ITEM_STATE: (state) => {
      Object.assign(state, this._resettableState());
    },
  };

  modules = {};

  constructor({ resettableState, headers } = {}) {
    super();
    this._resettableState = () => deepCopy({
      ...BaseOpenedInstanceStoreModule.generateState(),
      ...resettableState,
    });
    this.state = {
      ...BaseTableModule.generateState(),
      headers,
      ...this._resettableState(),
    };
  }
}
