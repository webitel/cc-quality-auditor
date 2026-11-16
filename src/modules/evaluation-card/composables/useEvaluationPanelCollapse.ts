import { ref } from 'vue';

import type { UseEvaluationPanelCollapseReturn } from '../types/evaluationPanelCollapse';

const evaluationPanelCollapsedKey = 'audit-evaluation-panel-collapsed';

export const useEvaluationPanelCollapse =
	(): UseEvaluationPanelCollapseReturn => {
		const isEvaluationPanelCollapsed = ref(
			localStorage.getItem(evaluationPanelCollapsedKey) === 'true',
		);

		const toggleEvaluationPanel = () => {
			isEvaluationPanelCollapsed.value = !isEvaluationPanelCollapsed.value;
			localStorage.setItem(
				evaluationPanelCollapsedKey,
				String(isEvaluationPanelCollapsed.value),
			);
		};

		return {
			isEvaluationPanelCollapsed,
			toggleEvaluationPanel,
		};
	};
