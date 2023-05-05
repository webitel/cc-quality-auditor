import TableStoreModule
  from '@webitel/ui-sdk/src/modules/TableStoreModule/store/TableStoreModule';
import CardStoreModule
  from '@webitel/ui-sdk/src/modules/CardStoreModule/store/CardStoreModule';
import BaseStoreModule
  from '@webitel/ui-sdk/src/store/BaseStoreModules/BaseStoreModule';
import ApiStoreModule
  from '@webitel/ui-sdk/src/store/BaseStoreModules/ApiStoreModule';
import AuditAPI from '../../../app/api/APIRepository';
import headers from './_internals/headers';
import filters from '../../_shared/filters/store/filters';

const cardState = {
  itemInstance: {
    name: '',
    description: '',
    team: [],
    enabled: true,
    questions: [],
  },
};

const tableGetters = {
  REQUIRED_FIELDS: () => ['id', 'editable'],
};

const api = new ApiStoreModule()
  .generateAPIActions(AuditAPI)
  .getModule();

const table = new TableStoreModule({ headers })
  .setChildModules({ api, filters })
  .getModule({ getters: tableGetters });

const card = new CardStoreModule()
  .setChildModules({ api })
  .getModule({ state: cardState });

const scorecards = new BaseStoreModule()
  .setChildModules({ table, card })
  .getModule();
export default scorecards;
