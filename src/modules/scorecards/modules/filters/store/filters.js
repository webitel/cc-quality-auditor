import BaseFilterSchema
  from '@webitel/ui-sdk/src/modules/Filters/classes/BaseFilterSchema';
import FiltersStoreModule
  from '@webitel/ui-sdk/src/modules/Filters/store/FiltersStoreModule';
import filterFieldsRestore
  from '@webitel/ui-sdk/src/modules/Filters/restores/filterFieldsRestore';
import router from '../../../../../app/router';

const state = {
  page: new BaseFilterSchema({
    value: 1,
    defaultValue: 1,
  }),
  size: new BaseFilterSchema({
    value: 10,
    defaultValue: 10,
  }),
  sort: new BaseFilterSchema(),
  fields: new BaseFilterSchema({
    localStorageKey: 'audit/scorecards/fields',
    restore: filterFieldsRestore('audit/scorecards/fields'),
  }),
  q: new BaseFilterSchema(),
  question: new BaseFilterSchema(),
};

const getters = {
  ROUTER: () => router,
  TABLE_NAMESPACE: () => 'scorecards/table',
};

export default new FiltersStoreModule().getModule({ state, getters });
