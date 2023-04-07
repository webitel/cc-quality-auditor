import {
  SortSymbols,
  sortToQueryAdapter,
} from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';
import deepCopy from 'deep-copy';
import AuditAPI from '../../api/APIRepository';

const REQUIRED_DATA_FIELDS = ['name', 'enabled', 'id', 'question'];

const state = {
  dataList: [],
  headers: [],
  isLoading: false,
  search: '',
  page: 1,
  size: 10,
  sort: '',
  question: '',
  isNext: false,
};

const getters = {
  SELECTED_DATA_ITEMS: (state) => state.dataList.filter((item) => item._isSelected),

  DATA_SORT: (state) => {
    const header = state.headers.find((header) => header.sort);
    return header ? `${sortToQueryAdapter(header.sort) + header.field}` : null;
  },

  DATA_FIELDS: (state) => {
    let fields = state.headers
      .filter((header) => header.show)
      .map((header) => header.field);
    fields = [...new Set([...REQUIRED_DATA_FIELDS, ...fields])];
    return fields;
  },
};

const actions = {
  LOAD_DATA: (context, payload) => context.dispatch('LOAD_DATA_LIST', payload),
  LOAD_DATA_LIST: async (context) => {
    context.commit('SET_LOADING', true);
    const query = context.rootGetters['filters/GET_FILTERS'];
    const params = {
      ...query,
      search: context.state.search,
      sort: context.getters.DATA_SORT,
      fields: context.getters.DATA_FIELDS,
      page: context.state.page,
      size: context.state.size,
      skipParent: true,
      question: context.state.question,
    };
    try {
      const { items, next } = await AuditAPI.getList(params);
      context.commit('SET_DATA_LIST', items);
      context.commit('SET_NEXT_PAGE', next);
    } catch (err) {
      context.commit('SET_DATA_LIST', []);
      context.commit('SET_NEXT_PAGE', false);
      throw err;
    } finally {
      context.commit('SET_LOADING', false);
    }
  },
  SET_HEADERS: (context, headers) => {
    context.commit('SET_HEADERS', headers);
  },
  SET_PAGE: (context, page) => {
    context.commit('SET_PAGE', +page);
  },
  SET_SIZE: (context, size) => {
    if (size) context.commit('SET_SIZE', +size);
  },
  RESET_FILTERS: (context) => {
    context.dispatch('SET_PAGE', 1);
    context.dispatch('SET_SIZE', 10);
  },
  SET_VARIABLE_PROP: (context, { index, prop, value }) => {
    context.commit('SET_VARIABLE_PROP', { index, prop, value });
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },

  PREV_PAGE: (context) => {
    if (context.state.page > 1) {
      const page = context.state.page - 1;
      context.commit('SET_PAGE', page);
      context.dispatch('LOAD_DATA_LIST');
    }
  },

  PATCH_ITEM_PROPERTY: async (context, {
    item, index, prop, value,
  }) => {
    await context.commit('PATCH_ITEM_PROPERTY', { index, prop, value });
    const id = item?.id || context.state.dataList[index].id;
    const changes = { [prop]: value };
    try {
      await context.dispatch('PATCH_ITEM', { id, changes });
      context.commit('PATCH_ITEM_PROPERTY', {
        item, index, prop, value,
      });
    } catch {
    } finally {
      context.dispatch('LOAD_DATA_LIST');
    }
  },
  DELETE_ITEM: async (context, { id }) => {
    await AuditAPI.delete(id);
    context.dispatch('LOAD_DATA_LIST');
  },
  SORT: async (context, { header, nextSortOrder }) => {
    const sort = nextSortOrder
      ? `${sortToQueryAdapter(nextSortOrder)}${header.field}`
      : nextSortOrder;
    context.commit('SET_SORT', sort);
    context.dispatch('UPDATE_HEADER_SORT', { header, nextSortOrder });
    await context.dispatch('RESET_PAGE');
    return context.dispatch('LOAD_DATA_LIST');
  },
  UPDATE_HEADER_SORT: (context, { header, nextSortOrder }) => {
    const headers = context.state.headers.map((oldHeader) => {
      // eslint-disable-next-line no-prototype-builtins
      if (oldHeader.sort !== undefined) {
        return {
          ...oldHeader,
          sort: oldHeader.field === header.field
            ? nextSortOrder
            : SortSymbols.NONE,
        };
      }
      return oldHeader;
    });
    context.commit('SET_HEADERS', headers);
  },
  SET_SEARCH: async (context, search) => {
    context.commit('SET_SEARCH', search);
    await context.dispatch('RESET_PAGE');
  },
  RESET_PAGE: (context) => {
    const page = 1;
    context.commit('SET_PAGE', page);
  },
};

const mutations = {
  SET_DATA_LIST: (state, items) => {
    state.dataList = items;
  },
  SET_HEADERS: (state, headers) => {
    state.headers = headers;
  },
  SET_LOADING: (state, isLoading) => {
    state.isLoading = isLoading;
  },
  SET_NEXT_PAGE: (state, isNext) => {
    state.isNext = isNext;
  },
  SET_PAGE: (state, page) => {
    state.page = page;
  },
  SET_SIZE: (state, size) => {
    state.size = size;
  },
  PATCH_ITEM_PROPERTY: (state, { index, prop, value }) => {
    state.dataList[index][prop] = value;
  },
  SET_SEARCH: (state, search) => {
    state.search = search;
  },
};

export default {
  getActions: () => actions,
  getMutations: () => mutations,
  generateState: () => deepCopy(state),
};
