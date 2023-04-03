import { sortToQueryAdapter } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';
import AuditAPI from '../../../app/api/APIRepository';
import BaseTableStoreModule
  from '../../../app/store/BaseStoreModules/BaseTableStoreModule';
import headers from './_internals/headers';
import BaseStoreModule from '@webitel/ui-sdk/src/store/BaseStoreModules/BaseStoreModule';
import proxy from '../../../app/utils/editProxy';
import ObjectStoreModule
  from '../../../app/store/BaseStoreModules/ObjectStoreModule';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
    team: [],
    enabled: false,
    id: '',
    questions: [],
  },
};

// const getters = {
//
// };
// const actions
// };
// const mutations = {
//   SET_ITEM: (state, item) => {
//     state.itemInstance = item;
//   },
//   SET_ITEM_PROPERTY: (state, { prop, value }) => {
//     state.itemInstance[prop] = value;
//   },
//   SET_ITEM_ID: (state, id) => {
//     state.itemId = id;
//   },
// };
console.log(ObjectStoreModule)
const scorecards = new ObjectStoreModule({ resettableState, headers })
// .setChildModules({ filters })
  .attachAPIModule(AuditAPI)
  .generateAPIActions()
  .getModule();
export default scorecards;

// export default {
//   namespaced: true,
//   state,
//   getters,
//   actions,
//   mutations,
// };
