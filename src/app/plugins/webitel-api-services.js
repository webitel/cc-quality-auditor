import { setConfig } from '@webitel/api-services';
import { messages as apiServicesMessages } from '@webitel/api-services/locale';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';

import i18n from '../locale/i18n.js';

// Merge api-services locale messages into the app's i18n instance
Object.entries(apiServicesMessages).forEach(([locale, messages]) => {
  i18n.global.mergeLocaleMessage(locale, messages);
});

// Configure api-services
setConfig({
  eventBus,
  i18n,
});
