import type { Ref } from 'vue';

export type UseEvaluationPanelCollapseReturn = {
	isEvaluationPanelCollapsed: Ref<boolean>;
	toggleEvaluationPanel: () => void;
};
