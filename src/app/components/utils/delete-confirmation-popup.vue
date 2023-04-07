<template>
  <wt-popup
    class="delete-confirmation-popup"
    min-width="480"
    @close="close"
  >
    <template v-slot:title>{{ $t('objects.deleteConfirmation.title') }}</template>
    <template v-slot:main>
      <p>
        {{ deleteMessage }}
        {{ $t('objects.deleteConfirmation.undoneActionAlert') }}
      </p>
    </template>
    <template v-slot:actions>
      <wt-button
        color="secondary"
        :disabled="isDeleting"
        @click="cancel"
      >{{ $t('reusable.cancel') }}
      </wt-button>
      <wt-button
        color="danger"
        :loading="isDeleting"
        @click="confirm"
      >{{ $t('reusable.delete') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  deleteCount: {
    type: Number,
    required: true,
  },
  callback: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits([
  'confirm',
  'cancel',
  'close',
]);

const { t, tc } = useI18n();

const isDeleting = ref(false);

const deleteMessage = computed(() => {
  if (props.deleteCount === 0) {
    return t(
      'objects.deleteConfirmation.askingAlert',
      2,
      null,
      { count: t('objects.deleteConfirmation.deleteAll') },
    );
  }
  return t(
    'objects.deleteConfirmation.askingAlert',
    props.deleteCount === 1 ? 1 : 2,
    null,
    { count: props.deleteCount },
  );
});

function close() {
  emit('close');
}

async function confirm() {
  try {
    isDeleting.value = true;
    emit('confirm');
    await props.callback();
  } finally {
    isDeleting.value = false;
    close();
  }
}

function cancel() {
  emit('cancel');
  close();
}
</script>

<style scoped>

</style>
