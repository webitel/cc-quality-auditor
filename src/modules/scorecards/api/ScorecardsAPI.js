import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
  camelToSnake,
  log,
  merge,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import {
  AuditFormServiceApiFactory,
  EngineAuditQuestionType,
} from 'webitel-sdk';

import instance from '../../../app/api/instance.js';
import configuration from '../../../app/api/openAPIConfig.js';

const auditService = new AuditFormServiceApiFactory(configuration, '', instance);

const fieldsToSend = [
  'name',
  'description',
  'enabled',
  'teams',
  'questions',
];

const itemResponseHandler = (response) => ({
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
});

const getAuditList = async (params) => {
  const fieldsToSend = [
    'page',
    'size',
    'q',
    'sort',
    'fields',
    'id',
    'teamId',
    'enabled',
    'archive',
    'editable',
    'active',
    'question',
  ];
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
    starToSearch('question'),
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await auditService.searchAuditForm(
      page,
      size,
      q,
      sort,
      ['id', 'editable', ...fields],
      id,
      teamId,
      enabled,
      editable,
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
      notify,
    ]);
  }
};
const getAudit = async ({ itemId: id }) => {
  const defaultObject = {
    team: {},
    name: '',
    editable: false,
    enabled: false,
    questions: [],
  };
  try {
    const response = await auditService.readAuditForm(id);
    return applyTransform(response.data, [
      snakeToCamel(),
      merge(defaultObject),
      itemResponseHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};
const addAudit = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await auditService.createAuditForm(item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};
const updateAudit = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await auditService.updateAuditForm(id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
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
      notify,
    ]);
  }
};
const deleteAudit = async ({ id }) => {
  try {
    const response = await auditService.deleteAuditForm(id);
    return applyTransform(response.data, [
    ]);
  } catch (err) {
    throw applyTransform(err, [
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
