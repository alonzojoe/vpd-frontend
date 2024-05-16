<template>
  <div class="card my-0">
    <div class="card-body py-4">
      <search-card title="Search Pool">
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
                <th class="text-center bg-primary text-white p-1 m-0">Print</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(v, index) in pools" :key="v">
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ v.protocol_no }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ v.method }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ v.test_name }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ v.test_name }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ v.date_expiry }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ v.room_temp }}°C
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <button
                    @click="updatePool(v.id)"
                    class="btn btn-sm btn-danger m-1"
                  >
                    Update Pool
                  </button>
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <select
                    class="form-select form-control form-control-sm"
                    @change="selectPrint($event, v.id)"
                  >
                    <option value="">Please Select</option>
                    <option value="elisaplate">
                      Elisa Plate Setup Worksheet
                    </option>
                    <option value="elisareading">
                      Elisa Reading Worksheet
                    </option>
                  </select>
                </td>
              </tr>
              <tr v-if="!pools.length && !isLoading">
                <td
                  class="text-center align-middle fw-bold p-1 m-0"
                  colspan="8"
                >
                  No records found.
                </td>
              </tr>
              <tr v-if="isLoading">
                <td colspan="8">
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
  encryptData,
} from "@/composables";
import PrintMeasles from "@/pages/printable_forms/PrintMeasles.vue";
const router = useRouter();
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

const updatePool = (poolId) => {
  router.push({ name: "worksheet", params: { id: poolId } });
};

const selectPrint = (e: any, id: number) => {
  const { value: route } = e.target;
  if (route === "") return;
  window.open(`${import.meta.env.VITE_API_BASE_URL}/print/${route}/${id}`);
};

onMounted(async () => {
  await fetchData(1, formData.value);
});
</script>

<style scoped></style>
