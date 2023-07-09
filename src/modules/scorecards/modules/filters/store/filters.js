import BaseFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import FiltersStoreModule from '@webitel/ui-sdk/src/modules/Filters/store/FiltersStoreModule';
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
  fields: new BaseFilterSchema(),
  q: new BaseFilterSchema(),
  question: new BaseFilterSchema(),
};

const getters = {
  ROUTER: () => router,
};

export default new FiltersStoreModule().getModule({ state, getters });
