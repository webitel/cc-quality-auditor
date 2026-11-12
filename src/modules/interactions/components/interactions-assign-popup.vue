<template>
  <wt-popup
    class="interactions-assign-popup"
    overflow
    size="sm"
    @close="emit('close')"
  >
    <template #title>
      {{ t('interactions.assignInteractions', interactions.length) }}
    </template>
    <template #main>
      <wt-single-select
        v-model:model-value="assignee"
        :label="t('cases.assignee')"
        :search-method="getAssigneesOptions"
        required
      >
        <template #option="{ option, getOptionLabel }">
          {{ getOptionLabel(option) }}
          <template v-if="isCurrentUser(option)">
            {{ t('interactions.me') }}
          </template>
        </template>
      </wt-single-select>
    </template>
    <template #actions>
      <wt-button
        :disabled="!assignee?.id"
        :loading="isAssigning"
        @click="assign"
      >
        {{ t('interactions.assign') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="emit('close')"
      >
        {{ t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { UsersAPI } from '@webitel/api-services/api';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserinfoStore } from '../../userinfo/userInfoStore';
import InteractionsAPIRepository from '../api/InteractionsAPIRepository';
import type { InteractionKey } from '../types/interaction';

type Assignee = {
	id: string;
	name: string;
};

const props = defineProps<{
	interactions: InteractionKey[];
}>();

const emit = defineEmits<{
	close: [];
	assigned: [];
}>();

const { t } = useI18n();

const { userId, userInfo } = storeToRefs(useUserinfoStore());

const assignee = ref<Assignee | null>(null);
const isAssigning = ref(false);

const isCurrentUser = ({ id }: Assignee) => String(id) === String(userId.value);

const getAssigneesOptions = async (
	params: Parameters<typeof UsersAPI.getLookup>[0],
) => {
	const response = await UsersAPI.getLookup(params);
	const items = (response.items as Assignee[]).filter(
		(item) => !isCurrentUser(item),
	);
	return {
		...response,
		items:
			(params?.page ?? 1) === 1
				? [
						{
							id: String(userId.value),
							name: userInfo.value?.name,
						},
						...items,
					]
				: items,
	};
};

const assign = async () => {
	if (!assignee.value) return;
	try {
		isAssigning.value = true;
		await InteractionsAPIRepository.assign({
			interactions: props.interactions,
			assigneeId: assignee.value.id,
		});
		emit('assigned');
	} finally {
		isAssigning.value = false;
	}
};
</script>
