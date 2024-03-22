<template>
  <div class="card my-0">
    <div class="card-body py-4">
      <search-card title="Search Role">
        <template v-slot:formInput="pObject">
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Protocol No:</Label>
              <input
                type="text"
                v-model="formData.protocolno"
                @keyup.enter="searchData()"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Method:</Label>
              <input
                type="text"
                v-model="formData.method"
                @keyup.enter="searchData()"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Test Name:</Label>
              <input
                type="text"
                v-model="formData.testname"
                @keyup.enter="searchData()"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="d-flex justify-content-start mt-4">
              <button
                class="btn btn-primary m-1"
                @keyup.enter="searchData()"
                @click.prevent="searchData()"
              >
                Search
              </button>
              <button @click="refreshData()" class="btn btn-danger m-1">
                Refresh
              </button>
            </div>
          </div>
        </template>
      </search-card>
      <pre>{{ pools }}</pre>
      <div>
        <div class="table-responsive p-0 m-0 border border-primary">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Protocol No.
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Method
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Test Name
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Kit Name
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Expiry Date
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Room Temperature
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              <!-- <tr v-for="l in linelists" :key="l.id">
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ l.id }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <a href="javascript:void(0);" @click="zxc">
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
                  <button
                    class="btn btn-dark btn-sm"
                    @click="postLinelist(l)"
                    :disabled="l.status !== 1"
                  >
                    {{
                      l.status == 1
                        ? "Post"
                        : l.status == 2
                        ? "Posted"
                        : "Cancelled"
                    }}
                  </button>
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
                    :disabled="l.status !== 1"
                    class="btn btn-sm btn-info m-1"
                  >
                    Update
                  </button>
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <button
                    @click="deleteLinelist(l)"
                    :disabled="l.status !== 1"
                    class="btn btn-sm btn-danger m-1"
                  >
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
              </tr> -->
            </tbody>
          </table>
        </div>
      </div>
      <!-- <pagination
        v-if="!isLoading"
        :data="paginationData"
        @update:currentPage="updateCurrentPage"
      /> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
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
import PoolLinelist from "@/pages";
import { extractLnCode, randomMizer } from "@/composables";
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

const store = useStore();
const formData = ref({
  protocolno: "",
  method: "",
  testname: "",
});

const isLoading = ref(false);
const pools = computed(() => store.getters.getPools);
const totalPools = computed(() => store.getters.getTotalPools);
const pagesPools = computed(() => store.getters.getPoolsPages);

const paginationData = ref({
  totalRecords: totalPools.value,
  totalPages: pagesPools.value,
  perPage: 10,
  currentPage: 1,
});

const resetFormDataSearch = () => {
  Object.keys(formData.value).forEach((key) => {
    formData.value[key] = "";
  });
};

watch([totalPools, pagesPools], ([total, pages]) => {
  paginationData.value.totalRecords = total;
  paginationData.value.totalPages = pages;
});

const fetchData = async (page, formData) => {
  isLoading.value = true;
  await store.commit("setPoolList", []);
  await store.dispatch("fetchPools", { page: page, ...formData });
  isLoading.value = false;
};

const updateCurrentPage = (newPage: number) => {
  paginationData.value.currentPage = newPage;
  fetchData(newPage, formData.value);
};

const searchData = async () => {
  isLoading.value = true;
  await store.commit("setPoolList", []);
  paginationData.value.currentPage = 1;
  await fetchData(1, formData.value);
  isLoading.value = false;
};

const refreshData = () => {
  resetFormDataSearch();
  searchData();
};

onMounted(async () => {
  await fetchData(1, formData.value);
});
</script>

<style scoped></style>
