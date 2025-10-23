import { useCardStore } from '@webitel/ui-sdk/src/modules/CardStoreModule/composables/useCardStore';
import { onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// eslint-disable-next-line import/prefer-default-export
export const useCardPage = (namespace) => {
  const router = useRouter();
  const route = useRoute();
  const errorRedirectMap = {
    404: '/404',
  }

  const {
    id,
    itemInstance,

    loadItem,
    addItem,
    updateItem,
    setId,
    resetState,
    setItemProp,
  } = useCardStore(namespace);

  function redirectToEdit() {
    const routeName = route.name.replace('-new', '-edit');
    return router.replace({
      name: routeName,
      params: { id: id.value },
      hash: route.hash,
    });
  }

  async function save() {
    if (id.value) {
      await updateItem();
    } else {
      try {
        await addItem();
        if (id.value) {
          await redirectToEdit();
        }
      } catch (err) {
        throw err;
      }
    }
  }

  async function initializeCard() {
    const { id: itemId } = route.params;
    await setId(itemId);
    try {
      return await loadItem();
    } catch (err) {
      if (errorRedirectMap[err.response.status])
        router.push(errorRedirectMap[err.response.status]);

    }
  }

  onMounted(() => initializeCard());
  onUnmounted(() => resetState());

  return {
    id,
    itemInstance,

    save,
    setId,
    setItemProp,
  };
};
