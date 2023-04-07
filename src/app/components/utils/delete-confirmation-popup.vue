<template>
  <wt-popup
    class="delete-confirmation-popup"
    min-width="480"
    @close="close"
  >
    <template v-slot:title>{{ t('objects.deleteConfirmation.title') }}</template>
    <template v-slot:main>
      <p>
        {{ t('objects.deleteConfirmation.askingAlert') }}
      </p>
    </template>
    <template v-slot:actions>
      <wt-button
        color="secondary"
        @click="confirm"
      >{{ t('vocabulary.yes') }}
      </wt-button>
      <wt-button
        color="danger"
        @click="close"
      >{{ t('vocabulary.no') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

const { t } = useI18n();
const store = useStore();

const props = defineProps({
  namespace: {
    type: String,
  },
  id: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits([
  'close',
]);

async function deleteItem(payload) {
  await store.dispatch(`${props.namespace}/DELETE_ITEM`, payload);
}

function close() {
  emits('close');
}

function confirm() {
  if (props.id) {
    try {
      deleteItem(props.id);
    } catch (err) {
      throw err;
    } finally {
      close();
    }
  }
}
</script>

<style scoped>

</style>
