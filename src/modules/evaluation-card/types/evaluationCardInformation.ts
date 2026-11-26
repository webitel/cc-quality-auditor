export type EvaluationCardInformationFieldRow = {
	key: string;
	value: string;
	isAgent?: false;
};

export type EvaluationCardInformationAgentRow = {
	key: string;
	isAgent: true;
};

export type EvaluationCardInformationRow =
	| EvaluationCardInformationFieldRow
	| EvaluationCardInformationAgentRow;
