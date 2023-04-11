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

const fieldsToSend = [
  'name',
  'description',
  'id',
  'created_at',
  'created_by',
  'updated_at',
  'updated_by',
  'enabled',
  'question',
];

const defaultListObject = {
  createdAt: 0,
  createdBy: {},
  description: '',
  enabled: false,
  name: '',
  updatedAt: 0,
  updatedBy: {},
  question: '',
};

const defaultSingleObject = {
  enabled: false,
};

const listGetter = new SdkListGetterApiConsumer(auditService.searchAuditForm, { defaultListObject });
const itemGetter = new SdkGetterApiConsumer(auditService.readAuditForm, { defaultSingleObject });
const itemCreator = new SdkCreatorApiConsumer(auditService.createAuditForm);
const itemUpdater = new SdkUpdaterApiConsumer(auditService.updateAuditForm);
const itemPatcher = new SdkPatcherApiConsumer(auditService.patchAuditForm, { fieldsToSend });
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
};

export default AuditAPI;
