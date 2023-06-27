import { AuditFormServiceApiFactory, EngineAuditQuestionType } from 'webitel-sdk';
import applyTransform, {
  log,
  merge,
  starToSearch,
  camelToSnake,
  snakeToCamel,
  handleUnauthorized,
  notify,
  sanitize,
} from '@webitel/ui-sdk/src/api/transformers';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import instance from './instance';
import configuration from './openAPIConfig';

const auditService = new AuditFormServiceApiFactory(configuration, '', instance);

const fieldsToSend = [
  'name',
  'description',
  'enabled',
  'teams',
  'questions',
];

const itemResponseHandler = (response) => {
  const newResponseObject = {
    ...response,
    questions: response.questions.map((question) => {
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
    }),
  };

  return newResponseObject;
};

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
    merge(getDefaultGetParams()),
    starToSearch('q'),
    camelToSnake(),
  ]);
  try {
    const response = await auditService.searchAuditForm(
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
      handleUnauthorized,
      notify,
    ]);
  }
};
const getAudit = async ({ itemId: id }) => {
  const defaultObject = {
    team: {},
    data: {
      name: '',
      createdAt: '',
      createdBy: {},
      editable: false,
      enabled: false,
      questions: [],
      updatedAt: '',
      updatedBy: {},
    },
  };
  try {
    const response = await auditService.readAuditForm(id);
    return applyTransform(response.data, [
      merge(defaultObject),
      itemResponseHandler,
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};
const addAudit = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    log,
    sanitize(fieldsToSend),
    log,
    camelToSnake(),
    log,
  ]);
  try {
    const response = await auditService.createAuditForm(item);
    return applyTransform(response.data, [
      snakeToCamel(),
      log,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      log,
      handleUnauthorized,
      notify,
    ]);
  }
};
const updateAudit = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    log,
    sanitize(fieldsToSend),
    camelToSnake(),
    log,
  ]);
  try {
    const response = await auditService.updateAuditForm(id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
      log,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};
const patchAudit = async ({ changes, id }) => {
  const body = applyTransform(changes, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await auditService.patchAuditForm(id, body);
    return applyTransform(response.data, [
      snakeToCamel(),
      log,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};
const deleteAudit = async ({ id }) => {
  try {
    const response = await auditService.deleteAuditForm(id);
    return applyTransform(response.data, [
      log,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const AuditAPI = {
  getList: getAuditList,
  get: getAudit,
  add: addAudit,
  update: updateAudit,
  patch: patchAudit,
  delete: deleteAudit,
};

export default AuditAPI;
