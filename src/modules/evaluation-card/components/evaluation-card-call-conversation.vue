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
    <call-transcript
      v-if="hasAudio"
      :call="visualizationCall"
      :file="selectedFile"
      :sync-with-playback="isPlayerShown"
      :current-time="currentTime"
      :search-query="searchQuery"
      :active-match="activeMatch"
      @row-click="wave?.seekTo($event)"
      @refresh="emit('reload')"
      @deleted="removeTranscript"
      @matches-change="emit('matches-change', $event)"
    />
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

import { useUserinfoStore } from '../../userinfo/userInfoStore';

defineOptions({
	components: {
		CallRecordingEmpty,
		CallTranscript,
		CallWave,
	},
});

const { call, searchQuery, activeMatch } = defineProps<{
	call: EngineHistoryCall;
	searchQuery: string;
	activeMatch: number;
}>();

const emit = defineEmits<{
	reload: [];
	'matches-change': [
		count: number,
	];
}>();

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
