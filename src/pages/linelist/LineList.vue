<template>
  <div>
    <h1>Linelist</h1>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  inject,
  computed,
  onMounted,
  watch,
  watchEffect,
} from "vue";
import SearchCard from "@/components/cards/SearchCard.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import ModalForm from "./../../components/modals/ModalForm.vue";
import ModalSemiSm from "./../../components/modals/ModalSemiSm.vue";
import FormSkeleton from "@/pages/loader/FormSkeleton.vue";
import TableSkeleton from "@/pages/loader/TableSkeleton.vue";
import SkeletonPlaceholder from "@/pages/loader/SkeletonPlaceholder.vue";
import PaginationSkeleton from "@/pages/loader/PaginationSkeleton.vue";
import ModalMd from "@/components/modals/ModalMd.vue";
import Loader from "@/pages/loader/Loader.vue";
import { encryptData } from "@/composables";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import moment from "moment";
import {
  swalConfirmation,
  swalMessage,
  trimZeroes,
  decryptData,
  NumericOnly,
} from "@/composables";
import PrintMeasles from "@/pages/printable_forms/PrintMeasles.vue";

export default defineComponent({
  name: "Linelist",
  components: {
    SearchCard,
    Pagination,
    ModalForm,
    FormSkeleton,
    TableSkeleton,
    SkeletonPlaceholder,
    PaginationSkeleton,
    PrintMeasles,
    ModalSemiSm,
    ModalMd,
    Loader,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const swal = inject("$swal");
    const authUser = computed(() => store.getters.getAuthenticatedUser);
    const patients = computed(() => store.getters.getMeasePatients);
    const totalPatients = computed(() => store.getters.getMeaseTotal);
    const patientsPage = computed(() => store.getters.getMeasePaginated);
    const specimens = computed(() => store.getters.getMeaseSpecimens);

    const paginationData = ref({
      totalRecords: totalPatients.value,
      totalPages: patientsPage.value,
      perPage: 10,
      currentPage: 1,
    });

    return {};
  },
});
</script>

<style scoped></style>
