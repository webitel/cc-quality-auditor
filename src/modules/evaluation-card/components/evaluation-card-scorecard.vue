<template>
  <section class="evaluation-card-scorecard">
    <h2 class="evaluation-card-scorecard__title typo-subtitle-1">
      {{ t('evaluationCard.evaluation') }}
    </h2>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
