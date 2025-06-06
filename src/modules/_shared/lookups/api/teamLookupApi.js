import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
  camelToSnake, merge, notify, snakeToCamel, starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import { AgentTeamServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../app/api/instance';
import configuration from '../../../../app/api/openAPIConfig';

const teamService = new AgentTeamServiceApiFactory(configuration, '', instance);

const getList = async (params) => {
  const {
    page,
    size,
    search,
    sort,
    fields = ['id', 'name'],
    id,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch(),
    camelToSnake(),
  ]);
  try {
    const response = await teamService.searchAgentTeam(
      page, size, search, sort, fields, id,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items,
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

export default getList;
