import { computed } from 'vue';
import { useStore } from 'vuex';

// eslint-disable-next-line import/prefer-default-export
export const useAccess = () => {
  const store = useStore();

  const hasCreateAccess = computed(() => store.getters['userinfo/HAS_CREATE_ACCESS']({ name: 'cc_audit_form' }));
  const hasEditAccess = computed(() => store.getters['userinfo/HAS_EDIT_ACCESS']({ name: 'cc_audit_form' }));
  const hasDeleteAccess = computed(() => store.getters['userinfo/HAS_DELETE_ACCESS']({ name: 'cc_audit_form' }));

  return {
    hasCreateAccess,
    hasEditAccess,
    hasDeleteAccess,
  };
};
