import type { Component } from 'vue';

import type { EvaluationCardTab } from '../enums/EvaluationCardTab.enum';

export type EvaluationCardTabItem = {
	text: string;
	value: EvaluationCardTab;
	component: Component;
};
