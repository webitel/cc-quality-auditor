import { SpecialGlobalAction } from '@webitel/ui-sdk/modules/Userinfo';
import { computed } from 'vue';

import { useUserinfoStore } from '../../modules/userinfo/userInfoStore';

export const playbackActions = [
	SpecialGlobalAction.PlaybackRecordFile,
	SpecialGlobalAction.TimeLimitedRecordFile,
];

export const usePlaybackAccess = () => {
	const userinfoStore = useUserinfoStore();

	const hasPlaybackAccess = computed(() =>
		playbackActions.some((action) =>
			userinfoStore.hasSpecialGlobalActionAccess(action),
		),
	);

	return {
		hasPlaybackAccess,
	};
};
