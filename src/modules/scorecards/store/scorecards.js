import { sortToQueryAdapter } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';
import AuditAPI from '../../../app/api/APIRepository';
import TableStoreModule
  from '../../../app/store/BaseStoreModules/TableStoreModule';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
    team: [],
    state: false,
    id: '',
  },
};

const getters = {

};
const actions = {

};
const mutations = {

};

const scorecards = new TableStoreModule({ resettableState, headers })
// .setChildModules({ filters })
  .attachAPIModule(AuditAPI)
  .generateAPIActions()
  .getModule({ getters });
export default scorecards;

// export default {
//   namespaced: true,
//   state,
//   getters,
//   actions,
//   mutations,
// };
