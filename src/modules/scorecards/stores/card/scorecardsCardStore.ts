import { AuditFormsAPI } from '@webitel/api-services/api';
import type { EngineAuditForm } from '@webitel/api-services/gen/models';
import { auditFormSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { ScorecardsNamespace } from '../namespace';

export const useScorecardsCardStore = createCardStore<EngineAuditForm>({
	namespace: `${ScorecardsNamespace}/card`,
	apiModule: AuditFormsAPI,
	standardValidationSchema,
});
