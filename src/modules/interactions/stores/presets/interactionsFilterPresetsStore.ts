import { createFilterPresetsStore } from '@webitel/ui-datalist/presets';

import { InteractionsNamespace as namespace } from '../namespace';

export const useInteractionsFilterPresetsStore =
	createFilterPresetsStore(namespace);
