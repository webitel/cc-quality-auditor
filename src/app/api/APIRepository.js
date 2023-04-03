import { AuditFormServiceApiFactory } from 'webitel-sdk';
import {
  SdkCreatorApiConsumer,
  SdkDeleterApiConsumer,
  SdkGetterApiConsumer,
  SdkListGetterApiConsumer,
  SdkPatcherApiConsumer,
  SdkUpdaterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from './instance';
import configuration from './interceptors/utils/openAPIConfig';


const auditService = new AuditFormServiceApiFactory(configuration, '', instance);

const fieldsToSend = [];
// const defaultListObject = {
//   // type: 0,
//   // enabled: false,
//   // active: 0,
//   // waiting: 0,
//   // priority: '0',
// };
//
const defaultListObject = { // default object prototype, to merge response with it to get all fields
  name: '',
  description: '',
  createdAt: 0,
  createdBy: {},
  updatedAt: 0,
  updatedBy: {},
  enabled: false,
};

const defaultSingleObject = {
  // type: 0,
  // formSchema: {},
  // taskProcessing: {},
};
const _getAuditLookup = (getList) => function ({
                                                 page = 1,
                                                 size= 10,
                                                 fields,
                                                 teamId = [209] }) {
  // const params = [page, size, q, sort, fields, id, teamId];
  const params = [page, size, undefined, undefined, fields, undefined, teamId, undefined, undefined, undefined, undefined];
  return getList(params);
};

const listGetter = new SdkListGetterApiConsumer(auditService.searchAuditForm, {defaultListObject});
const itemGetter = new SdkGetterApiConsumer(auditService.readAuditForm);
const itemCreator = new SdkCreatorApiConsumer(auditService.createAuditForm);
const itemUpdater = new SdkUpdaterApiConsumer(auditService.updateAuditForm);
const itemPatcher = new SdkPatcherApiConsumer(auditService.patchAuditForm);
const itemDeleter = new SdkDeleterApiConsumer(auditService.deleteAuditForm);
const getAuditList = (params) => listGetter.getList(params);
const getAudit = (params) => itemGetter.getItem(params);
const addAudit = (params) => itemCreator.createItem(params);
const updateAudit = (params) => itemUpdater.updateItem(params);
const patchAudit = (params) => itemPatcher.patchItem(params);
const deleteAudit = (params) => itemDeleter.deleteItem(params);
// const getAuditFormsLookup = (params) => lookupListGetter.getList(params);

const AuditAPI = {
  getList: getAuditList,
  get: getAudit,
  add: addAudit,
  patch: patchAudit,
  update: updateAudit,
  delete: deleteAudit,
  // getLookup: getAuditFormsLookup,
};

export default AuditAPI;
