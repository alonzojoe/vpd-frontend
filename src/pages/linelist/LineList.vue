<template>
  <div class="card my-0">
    <div class="card-body py-4">
      <search-linelist
        :formData="formData"
        @search-linelist="searchLinelist()"
        @refresh-data="refreshPatients()"
      />
      <pre>
        {{ selectedLn }}
      </pre>
      <div>
        <div class="table-responsive p-0 m-0 border border-primary">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th class="text-center bg-primary text-white p-1 m-0">ID</th>
                <th class="text-center bg-primary text-white p-1 m-0">View</th>
                <th class="text-center bg-primary text-white p-1 m-0">Code</th>
                <th class="text-center bg-primary text-white p-1 m-0">DRU</th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  DRU Officer
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Contact
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">Email</th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Created At
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Updated At
                </th>
                <th
                  class="text-center bg-primary text-white p-1 m-0"
                  style="width: 5%"
                >
                  Update
                </th>
                <th
                  class="text-center bg-primary text-white p-1 m-0"
                  style="width: 5%"
                >
                  Delete
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="l in linelists" :key="l.id">
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ l.id }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <a href="javascript:void(0);" @click="zxc">
                    <!-- <i class="scale-icon ti ti-file-invoice fs-6"></i> -->
                    <img
                      class="scale-icon"
                      src="./../../assets/images/icons/print.png"
                      height="30"
                      width="30"
                      v-tooltip.right="{
                        value: `<h6 class='text-white'>Print Form</h6>`,
                        escape: true,
                        class: 'bg-dark rounded p-1',
                      }"
                    />
                  </a>
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ l.linelist_code }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ l.dru }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ l.dru_officer }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ l.contact }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ l.email }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ l.created_at }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ l.updated_at }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <button
                    @click="updateLinelist(l)"
                    class="btn btn-sm btn-info m-1"
                  >
                    Update
                  </button>
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <button @click="zxc" class="btn btn-sm btn-danger m-1">
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="!linelists.length && !isLoading">
                <td
                  class="text-center align-middle fw-bold p-1 m-0"
                  colspan="11"
                >
                  No records found.
                </td>
              </tr>
              <tr v-if="isLoading">
                <td colspan="11">
                  <div class="d-flex align-items-center justify-content-center">
                    <div
                      class="spinner-border spinner-border-sm text-dark"
                      role="status"
                    ></div>
                    <span class="text-dark ml-4"
                      >&nbsp;&nbsp;&nbsp;Loading Please Wait...</span
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <pagination
        v-if="!isLoading"
        :data="paginationData"
        @update:currentPage="updateCurrentPage"
      />
    </div>
  </div>
  <modal-md :details="modalDetails" @close-modal="modalDetails.show = false">
    <linelist-data
      :formHeader="selectedLn"
      :patients="selectedLn.linelist_details"
    />
  </modal-md>
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
import ModalForm from "@/components/modals/ModalForm.vue";
import ModalSemiSm from "@/components/modals/ModalSemiSm.vue";
import FormSkeleton from "@/pages/loader/FormSkeleton.vue";
import TableSkeleton from "@/pages/loader/TableSkeleton.vue";
import SkeletonPlaceholder from "@/pages/loader/SkeletonPlaceholder.vue";
import PaginationSkeleton from "@/pages/loader/PaginationSkeleton.vue";
import ModalMd from "@/components/modals/ModalMd.vue";
import Loader from "@/pages/loader/Loader.vue";
import SearchLinelist from "@/pages/linelist/linelist-components/SearchLinelist.vue";
import LinelistData from "@/pages/linelist/linelist-components/LinelistData.vue";
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
    SearchLinelist,
    ModalMd,
    LinelistData,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const swal = inject("$swal");
    const authUser = computed(() => store.getters.getAuthenticatedUser);
    const linelists = computed(() => store.getters.getLnHeader);
    const totalLinelist = computed(() => store.getters.getLnTotal);
    const linelistPage = computed(() => store.getters.getLnPaginated);
    const measeSpecimens = computed(() => store.getters.getMeaseSpecimens);
    const meninSpecimens = computed(() => store.getters.getMeninSpecimens);
    const rotaSpecimens = computed(() => store.getters.getRotaSpecimens);
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
        if (key === "dateFrom" || key === "dateTo") {
          formData.value[key] = moment(dateToday.value).format("YYYY-MM-DD");
        } else {
          formData.value[key] = "";
        }
      });
    };

    const paginationData = ref({
      totalRecords: totalLinelist.value,
      totalPages: linelistPage.value,
      perPage: 10,
      currentPage: 1,
    });

    watch([totalLinelist, linelistPage], ([total, pages]) => {
      paginationData.value.totalRecords = total;
      paginationData.value.totalPages = pages;
    });

    const isLoading = ref(false);
    const fetchLinelist = async (page: number, form: any) => {
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

    const modalDetails = ref({
      show: false,
      title: "Upate Linelist",
    });

    const selectedLn = ref({});
    const updateLinelist = (linelist: Object) => {
      selectedLn.value = linelist;
      modalDetails.value.show = true;
    };

    onMounted(async () => {
      setTimeout(async () => {
        await fetchLinelist(1, formData.value);
      }, 500);
      // loadingSkeleton();
    });

    return {
      isLoading,
      linelists,
      paginationData,
      updateCurrentPage,
      formData,
      refreshPatients,
      searchLinelist,
      //update
      modalDetails,
      updateLinelist,
      selectedLn,
    };
  },
});
</script>

<style scoped></style>
