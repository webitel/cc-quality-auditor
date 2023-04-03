<tempalate>
<div>
  <audit-form
    :questions="auditQuestions"
    v-model:result="auditResult"
    mode="fill"
  ></audit-form>
</div>
</tempalate>

<script setup>
import {computed, onBeforeMount, onMounted, reactive, ref} from 'vue';
import AuditForm from '@webitel/ui-sdk/src/modules/AuditForm/components/audit-form.vue';
import {useStore} from "vuex";

const store = useStore();
const itemInstance = computed(() => store.state.scorecards.itemInstance);
const questions = computed(() => itemInstance.value.questions);
const auditQuestions = ref([
  {
    required: true,
    text: 'My Anketa number 1',
    type: 'options',
    options: [
      {
        text: 'My first var!',
        score: 5,
      },
      {
        text: 'My lorem ipsum var!',
        score: 10,
      },
    ],
  },
  {
    required: true,
    text: 'My anketa number two!',
    type: 'score',
    min: 1,
    max: 5,
  },
]);

const auditResult = ref([]);

</script>

<style scoped>
</style>
