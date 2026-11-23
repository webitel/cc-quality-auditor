import type { ComputedRef, Ref } from 'vue';

import type { InteractionsListItem } from './interaction';

export type UseAssignActionOptions = {
	selected: Ref<InteractionsListItem[]>;
	hasAccess?: Ref<boolean>;
	onAssigned: () => Promise<void>;
};

export type UseAssignActionReturn = {
	isAssignPopupOpened: Ref<boolean>;
	isAssignDisabled: ComputedRef<boolean>;
	handleAssigned: () => Promise<void>;
};
