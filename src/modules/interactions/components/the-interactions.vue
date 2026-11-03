<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="interactions table-page"
  >
    <template #header>
      <wt-page-header hide-primary>
        <wt-breadcrumb :path="path" />
        <template #actions>
          <wt-button
            color="secondary"
            disabled
          >
            {{ t('interactions.transcribe') }}
          </wt-button>
          <wt-button
            color="secondary"
            disabled
          >
            {{ t('interactions.assign') }}
          </wt-button>
          <wt-button
            color="secondary"
            disabled
          >
            {{ t('reusable.export') }}
          </wt-button>
          <wt-button-select
            :options="[]"
            color="secondary"
            disabled
          >
            {{ t('reusable.download') }}
          </wt-button-select>
        </template>
      </wt-page-header>
    </template>
    <template #main>
      <section class="interactions-filters" />
      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title typo-heading-3">
            {{ t('interactions.allInteractions') }}
          </h3>
        </header>

        <div class="table-section__table-wrapper">
          <wt-table
            :data="dataList"
            :headers="headers"
          >
            <template #empty>
              <wt-empty
                :image="imageEmpty"
                :text="textEmpty"
              />
            </template>
          </wt-table>
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import { AuditorSections, WtApplication } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import RoutePaths from '../../../app/router/_internals/RoutePaths.enum';
import { headers } from '../stores/datalist/_internals/headers';

const { t } = useI18n();

const dataList = computed(() => []);

const path = computed(() => [
	{
		name: t('audit'),
		route: RoutePaths.StartPage,
	},
	{
		name: t(
			`WtApplication.${WtApplication.Audit}.sections.${AuditorSections.Interactions}`,
		),
		route: RoutePaths.Interactions,
	},
]);

const { image: imageEmpty, text: textEmpty } = useTableEmpty({
	dataList,
});
</script>

<style lang="scss" scoped>
.interactions {
  width: 100%;
}
</style>
