<template>
  <wt-page-wrapper class="scorecards" :actions-panel="false">
    <template v-slot:header>
      <wt-page-header
        :primary-action="create"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
    </template>
    <template v-slot:main>
      <delete-confirmation-popup
        v-show="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @confirm="confirmDelete"
        @close="closeDelete"
      ></delete-confirmation-popup>

      <div class="scorecards-main-section">
        <header class="content-header">
          <h3 class="content-title">
            {{ t('objects.all', { entity: t('scorecards.scorecards', 2) }) }}
          </h3>
          <filters-panel
            :headers="headers"
            :namespace="namespace"
          ></filters-panel>
        </header>

        <wt-loader v-show="isLoaded"></wt-loader>

        <div v-if="isEmptyWorkspace" class="scorecards__dummy">
          <the-dummy :namespace="namespace"></the-dummy>
        </div>
        <div v-show="!isLoaded">
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="true"
            sortable
            @sort="sort"
          >
            <template v-slot:name="{ item }">
              <span class="name-link" @click="openAuditView(item)">
                {{ item.name }}
              </span>
            </template>
            <template v-slot:description="{ item }">
              {{ item.description }}
            </template>
            <template v-slot:createdAt="{ item }">
              {{ prettifyDateTime(item.createdAt) }}
            </template>
            <template v-slot:createdBy="{ item }">
              <div v-if="item.createdBy">
                {{ item.createdBy.name }}
              </div>
            </template>
            <template v-slot:modifiedAt="{ item }">
              {{ prettifyDateTime(item.updatedAt) }}
            </template>
            <template v-slot:modifiedBy="{ item }">
              <div v-if="item.updatedBy">
                {{ item.updatedBy.name }}
              </div>
            </template>
            <template v-slot:state="{ item, index }">
              <wt-switcher
                :value="item.enabled"
                @change="patchProperty({ item, index, prop: 'enabled', value: $event })"
              ></wt-switcher>
            </template>
            <template v-slot:actions="{ item }">
              <edit-action
                class="scorecards-editing"
                @click="openAuditView(item)"
              ></edit-action>
              <delete-action
                @click="askDeleteConfirmation({
                  deleted: [item.id],
                  callback: deleteItem,
                })"
              ></delete-action>
            </template>
          </wt-table>
          <wt-pagination
            :next="isNext"
            :prev="page > 1"
            :size="size"
            debounce
            @change="loadData"
            @input="setSize"
            @next="nextPage"
            @prev="prevPage"
          ></wt-pagination>
        </div>

      </div>
    </template>
  </wt-page-wrapper>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableStore } from '@webitel/ui-sdk/src/modules/TableStoreModule/composables/useTableStore';
import TheDummy from '../../dummy/components/the-dummy.vue';
import EditAction from '../../../app/components/actions/edit-action.vue';
import DeleteAction from '../../../app/components/actions/delete-action.vue';
import FiltersPanel from '../../_shared/filters/components/filters-panel.vue';

const { t } = useI18n();
const router = useRouter();
const namespace = 'scorecards';

const {
  dataList,
  isLoaded,
  headers,
  isNext,
  page,
  size,

  loadData,
  setSize,
  nextPage,
  prevPage,
  patchProperty,
  deleteItem,
  sort,
} = useTableStore(namespace);

const {
  isVisible: isDeleteConfirmationPopup,
  deleteCount,
  deleteCallback,

  askDeleteConfirmation,
  confirmDelete,
  closeDelete,
} = useDeleteConfirmationPopup();

const isEmptyWorkspace = computed(() => !dataList.value.length);

const path = computed(() => [
  { name: t('webitelUI.appNavigator.audit'), route: '/' },
  { name: t('scorecards.scorecards'), route: '/scorecards' },
]);

function prettifyDateTime(timestamp) {
  if (!timestamp) return '';
  return new Date(+timestamp).toLocaleString();
}

function openAuditView({ id }) {
  return router.push({ name: `${namespace}-edit`, params: { id } });
}

function create() {
  return router.push({ name: `${namespace}-new` });
}

function close() {
  router.go(-1);
}

onMounted(() => loadData());

</script>

<style lang="scss" scoped>
.content-header__actions-wrap {
  margin-left: auto;
}
</style>
