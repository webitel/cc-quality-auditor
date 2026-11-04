import type { EngineQuestion } from '@webitel/api-services/gen/models';
import { EngineAuditQuestionType } from '@webitel/api-services/gen/models';

export const hasPositiveMaxRequiredCriterion = (
	questions: EngineQuestion[] = [],
): boolean =>
	questions.some(({ required, type, max, options }) => {
		if (!required) return false;
		if (type === EngineAuditQuestionType.QuestionScore) return max > 0;
		if (type === EngineAuditQuestionType.QuestionOption)
			return options?.some(({ score }) => score > 0);
		return false;
	});
