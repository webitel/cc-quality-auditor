import type { ComputedRef, Ref } from 'vue';

import type { InteractionsListItem } from './interaction';

export type UseTranscribeActionOptions = {
	selected: Ref<InteractionsListItem[]>;
	fileIds: Ref<string[]>;
	hasAccess?: Ref<boolean>;
	onTranscribed: () => Promise<void>;
};

export type UseTranscribeActionReturn = {
	isTranscribing: Ref<boolean>;
	isTranscribeDisabled: ComputedRef<boolean>;
	transcribe: () => Promise<void>;
};
