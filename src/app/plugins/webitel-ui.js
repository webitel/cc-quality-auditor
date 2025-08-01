import '@webitel/ui-sdk/dist/ui-sdk.css';

import WebitelUI from '@webitel/ui-sdk/dist/ui-sdk.js';
import * as locales from '@webitel/ui-sdk/locale';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus.js';

import i18n from '../locale/i18n.js';

const globals = {
  $baseURL: import.meta.env.BASE_URL,
};

Object.entries(locales).forEach(([locale, messages]) => {
  i18n.global.mergeLocaleMessage(locale, messages);
});

export default [WebitelUI, { eventBus, globals }];
