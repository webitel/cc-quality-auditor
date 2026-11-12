import { InteractionStatus } from '@webitel/api-services/enums';
import { computed, ref } from 'vue';

import type {
	UseAssignActionOptions,
	UseAssignActionReturn,
} from '../types/assignAction';

export const useAssignAction = ({
	selected,
	onAssigned,
}: UseAssignActionOptions): UseAssignActionReturn => {
	const isAssignPopupOpened = ref(false);

	const isAssignDisabled = computed(
		() =>
			!selected.value.length ||
			selected.value.some(
				({ status }) => status === InteractionStatus.Completed,
			),
	);

	const handleAssigned = async () => {
		isAssignPopupOpened.value = false;
		await onAssigned();
	};

	return {
		isAssignPopupOpened,
		isAssignDisabled,
		handleAssigned,
	};
};
