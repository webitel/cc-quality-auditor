<template>
  <section class="evaluation-card-call-conversation">
    <call-wave
      v-if="isPlayerShown"
      ref="wave"
      v-model:selected-file="selectedFile"
      :call="visualizationCall"
      @update:annotations="visualizationCall.annotations = $event"
      @timeupdate="currentTime = $event"
    />
    <call-recording-empty v-else-if="hasPlaybackAccess" />
    <template v-if="hasAudio">
      <wt-divider />
      <div class="evaluation-card-call-conversation__transcription">
        <h3
          class="evaluation-card-call-conversation__transcription-title typo-subtitle-1"
        >
          {{ t('objects.transcription') }}
        </h3>
        <call-transcript
          :call="visualizationCall"
          :file="selectedFile"
          :sync-with-playback="isPlayerShown"
          :current-time="currentTime"
          @row-click="wave?.seekTo($event)"
          @refresh="emit('reload')"
          @deleted="removeTranscript"
        />
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import type { EngineHistoryCall } from '@webitel/api-services/gen/models';
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import type {
	CallTranscriptItem,
	CallWaveFile,
} from '@webitel/ui-sdk/modules/CallVisualization';
import {
	CallRecordingEmpty,
	CallTranscript,
	CallWave,
	toCallVisualizationCall,
} from '@webitel/ui-sdk/modules/CallVisualization';
import { computed, ref, useTemplateRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { usePlaybackAccess } from '../../../app/composables/usePlaybackAccess';

defineOptions({
	components: {
		CallRecordingEmpty,
		CallTranscript,
		CallWave,
	},
});

const { call } = defineProps<{
	call: EngineHistoryCall;
}>();

const emit = defineEmits<{
	reload: [];
}>();

const { t } = useI18n();

const { hasPlaybackAccess } = usePlaybackAccess();

const visualizationCall = ref(toCallVisualizationCall(call));

const audioFiles = computed(
	() =>
		(visualizationCall.value.files[EngineCallFileType.FileTypeAudio] ??
			[]) as CallWaveFile[],
);

const hasAudio = computed(() => audioFiles.value.length > 0);

const isPlayerShown = computed(() => hasPlaybackAccess.value && hasAudio.value);

const selectedFile = ref<CallWaveFile>(audioFiles.value[0] ?? {});

watch(
	() => call,
	(value) => {
		visualizationCall.value = toCallVisualizationCall(value);
		if (!audioFiles.value.some(({ id }) => id === selectedFile.value.id)) {
			selectedFile.value = audioFiles.value[0] ?? {};
		}
	},
);

const currentTime = ref(0);

const wave = useTemplateRef<InstanceType<typeof CallWave>>('wave');

function removeTranscript(transcript: CallTranscriptItem) {
	visualizationCall.value.transcripts = (
		visualizationCall.value.transcripts ?? []
	).filter(({ id }) => id !== transcript.id);
}
</script>

<style scoped>
.evaluation-card-call-conversation {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: var(--spacing-sm);
}

.evaluation-card-call-conversation__transcription-title {
  margin-bottom: var(--spacing-sm);
}
</style>
