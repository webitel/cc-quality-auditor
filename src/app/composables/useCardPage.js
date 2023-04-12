import { onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCardStore } from '@webitel/ui-sdk/src/modules/CardStoreModule/composables/useCardStore';
import { useClose } from './useClose';

// eslint-disable-next-line import/prefer-default-export
export const useCardPage = (namespace) => {
  const router = useRouter();
  const route = useRoute();

  const {
    id,
    itemInstance,

    loadItem,
    addItem,
    updateItem,
    setId,
    resetState,
  } = useCardStore(namespace);

  const { close } = useClose();

  function redirectToEdit() {
    const routeName = route.name.replace('-new', '-edit');
    return router.replace({
      name: routeName,
      params: { id },
      hash: route.hash,
    });
  }

  async function save() {
    if (id.value) {
      await updateItem();
    } else {
      await addItem();
      if (id.value) {
        await redirectToEdit();
      }
    }
  }

  async function initializeCard() {
    const { id: itemId } = route.params;
    await setId(itemId);
    return loadItem();
  }

  onMounted(() => initializeCard());
  onUnmounted(() => resetState());

  return {
    id,
    itemInstance,

    save,
    close,
  };
};
