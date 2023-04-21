import BaseFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import QueryFiltersStoreModule from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';

const state = {
  q: new BaseFilterSchema(),
  question: new BaseFilterSchema(),
};

export default new QueryFiltersStoreModule({ state }).getModule();
