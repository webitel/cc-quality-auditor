import { AuditFormServiceApiFactory } from 'webitel-sdk';
import {
  SdkCreatorApiConsumer,
  SdkDeleterApiConsumer,
  SdkGetterApiConsumer,
  SdkListGetterApiConsumer,
  SdkPatcherApiConsumer,
  SdkUpdaterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import getDefaultGetListResponse from './defaults/getDefaultGetListResponse';
import getDefaultGetParams from './defaults/getDefaultGetParams';
import instance from './instance';
import configuration from './openAPIConfig';
import applyTransform, {
  log,
  merge,
  starToSearch,
  camelToSnake,
  snakeToCamel,
} from './transformers';

const auditService = new AuditFormServiceApiFactory(configuration, '', instance);

const fieldsToSend = [
  'name',
  'description',
  'enabled',
  'teams',
  'question',
];



const getAuditList = async (params) => {
  const {
    page,
    size,
    q,
    sort,
    fields,
    id,
    teamId,
    enabled,
    archive,
    editable,
    active,
    question,
  } = applyTransform(params, [
    // log,
    // sanitize
    merge(getDefaultGetParams()),
    starToSearch('q'),
    camelToSnake(),
    // ??? stringify -- if Serhii api
    // ?? OR get default params order to array (for spread without even destructuring) -- if Ihor api
  ]);
  try {
    const response = await auditService.searchAuditForm(
      page, size, q, sort, fields, id, teamId, enabled, archive, editable, active, question,
    );
    const { items, next } = applyTransform(response, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
      log,
    ]);
    return {
      items: applyTransform(items, [
        // merge -- with default schema object
        // custom transformer -- old listResponseHandler
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      // handle 401 -- throw to auth
      // notify -- show error
    ]);
  }
};
// const getAudit = (params) => itemGetter.getItem(params);
// const addAudit = (params) => itemCreator.createItem(params);
// const updateAudit = (params) => itemUpdater.updateItem(params);
// const patchAudit = (params) => itemPatcher.patchItem(params);
// const deleteAudit = (params) => itemDeleter.deleteItem(params);

const AuditAPI = {
  getList: getAuditList,
  // get: getAudit,
  // add: addAudit,
  // patch: patchAudit,
  // update: updateAudit,
  // delete: deleteAudit,
};

export default AuditAPI;
