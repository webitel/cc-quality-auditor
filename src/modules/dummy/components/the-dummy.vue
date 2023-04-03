<template>
  <div class="dummy">
    <div class="dummy_pic">
      <img src="../assets/the-dummy.svg" alt="Workspace is empty"/>
    </div>
    <h1 class="dummy_title">{{t('scorecards.dummy')}}</h1>
    <wt-button
      @click="add"
    >{{ t('objects.add') }}
    </wt-button>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';

export default {
  name: 'the-dummy',
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const routeName = ref('/audit/scorecards');
    function add(query) {
      router.push({
        name: 'scorecards-new',
        // query: {
        //   ...route.query,
        //   ...query,
        // },
      });
    }
    return { t, add };
  },
};
</script>

<style lang="scss" scoped>
.dummy {
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &_title {
    //@extend %typo-body-1;
    margin-bottom: var(--spacing-sm);
  }

  &_pic{
    width: 200px;
    height: 200px;
    margin-bottom: var(--spacing-md);
  }
}
</style>
