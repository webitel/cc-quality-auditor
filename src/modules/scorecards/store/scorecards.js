import CardStoreModule
  from '@webitel/ui-sdk/src/modules/CardStoreModule/store/CardStoreModule';
import TableStoreModule
  from '@webitel/ui-sdk/src/modules/TableStoreModule/store/TableStoreModule';
import ApiStoreModule
  from '@webitel/ui-sdk/src/store/BaseStoreModules/ApiStoreModule';
import BaseStoreModule
  from '@webitel/ui-sdk/src/store/BaseStoreModules/BaseStoreModule';
import AuditAPI from '../api/ScorecardsAPI';
import filters from '../modules/filters/store/filters';
import headers from './_internals/headers';

const cardState = {
  itemInstance: {
    name: '',
    description: '',
    teams: [],
    enabled: true,
    questions: [],
  },
};

const api = new ApiStoreModule()
  .generateAPIActions(AuditAPI)
  .getModule();

const table = new TableStoreModule({ headers })
  .setChildModules({ api, filters })
.getModule();

const card = new CardStoreModule()
  .setChildModules({ api })
  .getModule({ state: cardState });

const scorecards = new BaseStoreModule()
  .setChildModules({ table, card })
  .getModule();

export default scorecards;
