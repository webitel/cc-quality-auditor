import AuditAPI from '../../../app/api/APIRepository';
import headers from './_internals/headers';
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

const scorecards = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(AuditAPI)
  .generateAPIActions()
  .getModule();
export default scorecards;
