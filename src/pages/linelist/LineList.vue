<template>
  <div class="card my-0">
    <div class="card-body py-4">
      <search-card title="Search Patient">
        <template v-slot:formInput="pObject">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Linelist Code:</Label>
              <input
                type="text"
                v-model="formData.code"
                @keyup.enter="searchLinelist()"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">DRU</Label>
              <input
                type="text"
                v-model="formData.dru"
                @keyup.enter="searchLinelist()"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">DRU Officer:</Label>
              <input
                type="text"
                v-model="formData.officer"
                @keyup.enter="searchLinelist()"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Date From</Label>
              <input
                type="date"
                v-model="formData.dateFrom"
                @keyup.enter="searchLinelist()"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Date To:</Label>
              <input
                type="date"
                v-model="formData.dateTo"
                @keyup.enter="searchLinelist()"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="d-flex justify-content-start mt-4">
              <button
                class="btn btn-primary m-1"
                @keyup.enter="searchLinelist()"
                @click.prevent="searchLinelist()"
              >
                Search
              </button>
              <button
                class="btn btn-danger m-1"
                @click.prevent="refreshPatients()"
              >
                Refresh
              </button>
            </div>
          </div>
        </template>
      </search-card>
    </div>
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
    const linelists = computed(() => store.getters.getLnHeader);
    const totalLinelist = computed(() => store.getters.getLnTotal);
    const linelistPage = computed(() => store.getters.getLnPaginated);
    const specimens = computed(() => store.getters.getMeaseSpecimens);
    const dateToday = ref(new Date());
    const formData = ref({
      code: "",
      dru: "",
      officer: "",
      dateFrom: moment(dateToday.value).format("YYYY-MM-DD"),
      dateTo: moment(dateToday.value).format("YYYY-MM-DD"),
    });

    const resetFormData = () => {
      Object.keys(formData.value).forEach((key) => {
        formData.value[key] = "";
      });
    };

    const paginationData = ref({
      totalRecords: totalLinelist.value,
      totalPages: linelistPage.value,
      perPage: 10,
      currentPage: 1,
    });

    watch([totalLinelist, linelistPage], (total, pages) => {
      paginationData.value.totalRecords = total;
      paginationData.value.totalPages = pages;
    });

    const isLoading = ref(false);
    const fetchLinelist = async (page, form) => {
      const mime =
        authUser.value.role == "Administrator" ? null : authUser.value.id;
      await store.commit("setLnHeaderEmpty");
      isLoading.value = true;
      await store.dispatch("fetchLinelist", {
        page: page,
        ...form,
        mime: mime,
      });
      isLoading.value = false;
    };

    const updateCurrentPage = async (newPage: number) => {
      paginationData.value.currentPage = newPage;
      fetchLinelist(newPage, formData.value);
    };

    const searchLinelist = async () => {
      isLoading.value = true;
      await fetchLinelist(1, formData.value);
    };

    const refreshPatients = async () => {
      resetFormData();
      searchLinelist();
    };

    onMounted(async () => {
      setTimeout(async () => {
        await fetchLinelist(1, formData.value);
      }, 500);
      // loadingSkeleton();
    });

    return {
      linelists,
      paginationData,
      updateCurrentPage,
      formData,
      refreshPatients,
      searchLinelist,
    };
  },
});
</script>

<style scoped></style>
