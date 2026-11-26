<template>
  <section class="opened-evaluation-information">
    <header class="opened-evaluation-information__header">
      <slot name="tabs" />
      <div class="opened-evaluation-information__actions">
        <evaluation-card-search v-model:query="searchQuery" />
        <wt-icon-action
          :action="IconAction.REFRESH"
          @click="emit('reload')"
        />
        <slot name="panel-toggle" />
      </div>
    </header>
    <wt-empty
      v-if="showEmpty"
      :image="emptyImage"
      :text="emptyText"
    />
    <template v-else>
      <div class="opened-evaluation-information__contact typo-body-1">
        <span>{{ t('vocabulary.contact', 1) }}</span>
        <a
          v-if="contact"
          :href="contact.link"
          class="opened-evaluation-information__contact-link"
          target="_blank"
        >
          {{ contact.name }}
          <wt-icon
            icon="link"
            :size="ComponentSize.SM"
          />
        </a>
        <span v-else>{{ t('evaluationCard.information.unknown') }}</span>
      </div>
      <div class="opened-evaluation-information__panels">
        <opened-evaluation-information-panel
          v-for="panel of panels"
          :key="panel.title"
          v-bind="panel"
        />
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ComponentSize, IconAction } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { InteractionResponseItem } from '../../interactions/types/interaction';
import type {
	EvaluationCardInformationFieldRow,
	EvaluationCardInformationRow,
} from '../types/evaluationCardInformation';
import EvaluationCardSearch from './evaluation-card-search.vue';
import OpenedEvaluationInformationPanel from './opened-evaluation-information-panel.vue';

const { interaction } = defineProps<{
	interaction: InteractionResponseItem | null;
}>();

const emit = defineEmits<{
	reload: [];
}>();

const { t } = useI18n();

const searchQuery = ref('');

const contact = computed(() =>
	interaction?.contact?.id
		? {
				name: interaction.contact.name,
				link: `${import.meta.env.VITE_CRM_URL}/contacts/${interaction.contact.id}`,
			}
		: null,
);

const normalizedQuery = computed(() => searchQuery.value.trim().toLowerCase());

const isMatched = (...texts: string[]) =>
	texts.join(' ').toLowerCase().includes(normalizedQuery.value);

const isFieldRowMatched = ({ key, value }: EvaluationCardInformationFieldRow) =>
	isMatched(key, value);

const toInformationRows = (
	fields?: Record<string, string>,
): EvaluationCardInformationFieldRow[] =>
	Object.entries(fields ?? {}).map(([key, value]) => ({
		key,
		value,
	}));

const variableRows = computed(() =>
	toInformationRows(interaction?.call?.variables).filter(isFieldRowMatched),
);

const postprocessingRows = computed<EvaluationCardInformationRow[]>(() =>
	(interaction?.call?.forms ?? []).flatMap(({ agent, form_fields }) => {
		const fieldRows = toInformationRows(form_fields);
		const matchedRows =
			agent?.name && isMatched(agent.name)
				? fieldRows
				: fieldRows.filter(isFieldRowMatched);
		if (!matchedRows.length) return [];
		return agent?.name
			? [
					{
						key: agent.name,
						isAgent: true,
					},
					...matchedRows,
				]
			: matchedRows;
	}),
);

const panels = computed(() =>
	[
		{
			title: t('vocabulary.variables', 2),
			rows: variableRows.value,
		},
		{
			title: t('evaluationCard.information.postprocessing'),
			rows: postprocessingRows.value,
		},
	].filter(({ rows }) => rows.length),
);

const {
	showEmpty,
	image: emptyImage,
	text: emptyText,
} = useTableEmpty(
	{
		dataList: panels,
		filters: computed(() => ({
			search: searchQuery.value,
		})),
	},
	() => ({
		text: {
			empty: t('evaluationCard.information.empty'),
		},
	}),
);
</script>

<style scoped>
.opened-evaluation-information {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  container-type: inline-size;
}

.opened-evaluation-information__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xs);
}

.opened-evaluation-information__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.opened-evaluation-information__contact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) 0;
  border-bottom: var(--divider-border) var(--divider-border-color);
}

.opened-evaluation-information__contact-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2xs);
  color: var(--text-link-color);
}

.opened-evaluation-information__panels {
  display: grid;
  align-items: start;
  gap: var(--spacing-sm);
}

@container (min-width: 688px) {
  .opened-evaluation-information__panels:has(> :nth-child(2)) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
