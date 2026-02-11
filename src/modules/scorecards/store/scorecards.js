import {
	createApiStoreModule,
	createBaseStoreModule,
	createCardStoreModule,
	createTableStoreModule,
} from '@webitel/ui-sdk/store';

import AuditFormsAPI from '../api/ScorecardsAPI';
import filters from '../modules/filters/store/filters';
import headers from './_internals/headers';

const resetCardState = {
	itemInstance: {
		name: '',
		description: '',
		teams: [],
		enabled: true,
		questions: [],
	},
};

const api = createApiStoreModule({
	state: {
		api: AuditFormsAPI,
	},
});

const table = createTableStoreModule({
	state: {
		headers,
	},
	modules: {
		filters,
		api,
	},
});

const card = createCardStoreModule({
	state: {
		_resettable: resetCardState,
		itemInstance: resetCardState.itemInstance,
	},
	modules: {
		api,
	},
});

const scorecards = createBaseStoreModule({
	modules: {
		table,
		card,
	},
});

export default scorecards;
