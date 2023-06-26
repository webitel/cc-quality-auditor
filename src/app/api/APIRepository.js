import { AuditFormServiceApiFactory, EngineAuditQuestionType } from 'webitel-sdk';
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

const itemResponseHandler = (response) => {
  const defaultSingleObject = {
    name: '',
    createdAt: '',
    createdBy: {},
    editable: false,
    enabled: false,
    questions: [],
    updatedAt: '',
    updatedBy: {},
  };

  response.questions = response.questions.map((question) => {
    if (question.type === EngineAuditQuestionType.Score) {
      return {
        ...question,
        max: question.max || 1,
        min: question.min || 0,
        required: question.required || false,
        question: question.question || '',
      };
    }
    if (question.type === EngineAuditQuestionType.Option) {
      return {
        ...question,
        options: question.options.map((option) => ({
          ...option,
          name: option.name || '',
          score: option.score || 0,
        })),
      };
    }
    return question;
  });
  return { ...defaultSingleObject, ...response };
};

const fieldsToSend = [
  'name',
  'description',
  'enabled',
  'teams',
  'question',
];

const _getAuditList = (getList) => function ({
  page = 1,
  size = 10,
  q,
  sort,
  fields = [],
  id,
  teamId,
  enabled,
  archive,
  editable,
  active,
  question,
}) {
  const params = [
    page, size, q, sort, fields, id, teamId, enabled, archive, editable, active,
    question];
  return getList(params);
};

const listGetter = new SdkListGetterApiConsumer(auditService.searchAuditForm).setGetListMethod(_getAuditList);
const itemGetter = new SdkGetterApiConsumer(auditService.readAuditForm, { itemResponseHandler });
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

const AuditAPI = {
  getList: getAuditList,
  get: getAudit,
  add: addAudit,
  patch: patchAudit,
  update: updateAudit,
  delete: deleteAudit,
};

export default AuditAPI;
