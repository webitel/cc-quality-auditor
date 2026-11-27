import { defineStore } from 'pinia';
import { ref } from 'vue';

import InteractionsAPIRepository from '../../interactions/api/InteractionsAPIRepository';
import type {
	InteractionKey,
	InteractionResponseItem,
} from '../../interactions/types/interaction';

export const useEvaluationCardStore = defineStore(
	'audit/evaluation-card',
	() => {
		const interaction = ref<InteractionResponseItem | null>(null);
		const isLoading = ref(false);

		const refreshInteraction = async (key: InteractionKey) => {
			interaction.value = await InteractionsAPIRepository.getInteraction(key);
		};

		const loadInteraction = async (key: InteractionKey) => {
			isLoading.value = true;
			try {
				await refreshInteraction(key);
			} finally {
				isLoading.value = false;
			}
		};

		return {
			interaction,
			isLoading,
			loadInteraction,
			refreshInteraction,
		};
	},
);
