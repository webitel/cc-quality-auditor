import { AuditFormsAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { ScorecardsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useScorecardsDatalistStore = createTableStore(
	`${ScorecardsNamespace}/datalist`,
	{
		apiModule: AuditFormsAPI,
		headers,
	},
);
