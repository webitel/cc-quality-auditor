<template>
  <footer class="opened-evaluation-rate-actions">
    <wt-button
      color="secondary"
      disabled
    >
      {{ t('reusable.edit') }}
    </wt-button>
    <wt-button
      :disabled="!hasDeleteAccess"
      color="error"
      @click="emit('delete')"
    >
      {{ t('reusable.delete') }}
    </wt-button>
  </footer>
</template>

<script setup lang="ts">
import { WtObject } from '@webitel/ui-sdk/enums';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../app/composables/useUserAccessControl';

const emit = defineEmits<{
	delete: [];
}>();

const { t } = useI18n();

const { hasDeleteAccess } = useUserAccessControl(WtObject.AuditRating);
</script>

<style scoped>
.opened-evaluation-rate-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xs);
  margin-top: auto;
}
</style>
