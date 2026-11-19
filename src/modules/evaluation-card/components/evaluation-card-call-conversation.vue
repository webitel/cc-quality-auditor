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
import { SpecialGlobalAction } from '@webitel/ui-sdk/modules/Userinfo';
import { computed, ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserinfoStore } from '../../userinfo/userInfoStore';

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

const userinfoStore = useUserinfoStore();

const hasPlaybackAccess = computed(() =>
	[
		SpecialGlobalAction.PlaybackRecordFile,
		SpecialGlobalAction.TimeLimitedRecordFile,
	].some((action) => userinfoStore.hasSpecialGlobalActionAccess(action)),
);

const visualizationCall = ref(toCallVisualizationCall(call));

const audioFiles = (visualizationCall.value.files[
	EngineCallFileType.FileTypeAudio
] ?? []) as CallWaveFile[];

const hasAudio = audioFiles.length > 0;

const isPlayerShown = computed(() => hasPlaybackAccess.value && hasAudio);

const selectedFile = ref<CallWaveFile>(audioFiles[0] ?? {});

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
