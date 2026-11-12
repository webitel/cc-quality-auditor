import { CallTranscriptAPI } from '@webitel/api-services/api';
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import { computed, ref } from 'vue';

import type {
	UseTranscribeActionOptions,
	UseTranscribeActionReturn,
} from '../types/transcribeAction';

export const useTranscribeAction = ({
	selected,
	fileIds,
	onTranscribed,
}: UseTranscribeActionOptions): UseTranscribeActionReturn => {
	const isTranscribing = ref(false);

	const isTranscribeDisabled = computed(
		() =>
			!selected.value.length ||
			selected.value.some(
				({ files, transcripts }) =>
					!files[EngineCallFileType.FileTypeAudio] || transcripts.length,
			),
	);

	const transcribe = async () => {
		try {
			isTranscribing.value = true;
			await CallTranscriptAPI.create({
				fileId: fileIds.value,
			});
		} finally {
			await onTranscribed();
			isTranscribing.value = false;
		}
	};

	return {
		isTranscribing,
		isTranscribeDisabled,
		transcribe,
	};
};
