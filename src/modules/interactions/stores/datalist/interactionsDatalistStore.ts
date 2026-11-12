import { createTableStore } from '@webitel/ui-datalist';

import InteractionsAPIRepository from '../../api/InteractionsAPIRepository';
import { InteractionsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useInteractionsDatalistStore = createTableStore(
	`${InteractionsNamespace}/datalist`,
	{
		apiModule: InteractionsAPIRepository,
		headers,
	},
);
