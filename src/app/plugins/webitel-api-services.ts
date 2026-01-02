import { setConfig } from '@webitel/api-services';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';

import i18n from '../locale/i18n.js';

// Configure api-services
// Note: Locale messages are automatically merged by setConfig when i18n is provided
setConfig({
  eventBus,
  i18n,
});

