import {
  createApiStoreModule,
  createBaseStoreModule,
  createCardStoreModule,
  createTableStoreModule,
} from '@webitel/ui-sdk/store';
import AuditAPI from '../api/ScorecardsAPI';
import filters from '../modules/filters/store/filters';
import headers from './_internals/headers';

const resetTableState = {
  dataList: [],
  selected: [],
  error: {},
  isLoading: false,
  isNextPage: false,
};

const resetCardState = {
  itemInstance: {
    name: '',
    description: '',
    teams: [],
    enabled: true,
    questions: [],
  },
};

const api = createApiStoreModule({
  state: {
    api: AuditAPI,
  },
});

const table = createTableStoreModule({
  state: { _resettable: resetTableState, headers },
  modules: {
    filters,
    api,
  },
});

const card = createCardStoreModule({
  state: { _resettable: resetCardState, itemInstance: resetCardState.itemInstance },
  modules: {
    api,
  },
});

const scorecards = createBaseStoreModule({
  modules: {
    table,
    card,
  },
});

export default scorecards;
