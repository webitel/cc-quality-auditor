<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title typo-heading-3">
        {{ t('reusable.generalInfo') }}
      </h3>
    </header>
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :label="t('reusable.name')"
        :regle-validation="validationFields?.name"
        :disabled="disableUserInput"
        required
      />
      <wt-textarea
        v-model:model-value="modelValue.description"
        :label="t('vocabulary.description')"
        :disabled="disableUserInput"
      />
      <wt-multi-select
        v-model:model-value="modelValue.teams"
        :label="t('objects.team', 1)"
        :search-method="TeamsAPI.getLookup"
        :disabled="disableUserInput || !hasTeamsReadAccess"
      />
      <div />
      <wt-switcher
        v-model:model-value="modelValue.enabled"
        :disabled="disableUserInput"
        :label="t('reusable.state')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { RegleSchemaFieldStatus } from '@regle/schemas';
import { TeamsAPI } from '@webitel/api-services/api';
import type { EngineAuditForm } from '@webitel/api-services/gen/models';
import { WtObject } from '@webitel/ui-sdk/enums';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../app/composables/useUserAccessControl';

const modelValue = defineModel<EngineAuditForm>({
	required: true,
});

defineProps<{
	validationFields?: {
		[K in keyof EngineAuditForm]?: RegleSchemaFieldStatus<EngineAuditForm[K]>;
	};
}>();

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl();

const { hasReadAccess: hasTeamsReadAccess } = useUserAccessControl(
	WtObject.Team,
);
</script>
