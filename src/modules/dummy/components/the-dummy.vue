<template>
  <div class="dummy">
    <div class="dummy_pic">
      <img src="../assets/the-dummy.svg" alt="Workspace is empty" />
    </div>
    <h1 class="dummy_title">{{ $t('scorecards.dummy') }}</h1>
    <wt-button
      @click="create"
    >{{ $t('reusable.add') }}
    </wt-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  namespace: {
    type: String,
  },
});

function create() {
  return router.push({ name: `${props.namespace}-new` });
}
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
    @extend %typo-body-1;
    margin-bottom: var(--spacing-sm);
  }

  &_pic {
    width: 200px;
    height: 200px;
    margin-bottom: var(--spacing-md);
  }
}
</style>
