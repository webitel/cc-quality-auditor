<template>
  <wt-popup
    class="delete-confirmation-popup"
    min-width="480"
    @close="close"
  >
    <template v-slot:title>{{ t('objects.deleteConfirmation.title') }}</template>
    <template v-slot:main>
      <p>
        {{ deleteMessage }}
        {{ t('objects.deleteConfirmation.undoneActionAlert') }}
      </p>
    </template>
    <template v-slot:actions>
      <wt-button
        color="secondary"
        :disabled="isDeleting"
        @click="cancel"
      >{{ t('reusable.cancel') }}
      </wt-button>
      <wt-button
        color="danger"
        :loading="isDeleting"
        @click="confirm"
      >{{ t('reusable.delete') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup>
import {useI18n} from "vue-i18n";

const { t, tc } = useI18n();

</script>

<style scoped>

</style>
