<template>
  <div class="card my-0">
    <div class="card-body py-4">
      <search-card title="Pool Information">
        <template v-slot:formInput="pObject">
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Protocol No:</Label>
              <input
                type="text"
                v-model="poolInfo.protocol_no"
                disabled
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Date Performed:</Label>
              <input
                type="text"
                v-model="poolInfo.date_performed"
                disabled
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Date Performed:</Label>
              <input
                type="text"
                v-model="poolInfo.method"
                disabled
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Test Name:</Label>
              <input
                type="text"
                v-model="poolInfo.test_name"
                disabled
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Kit Name:</Label>
              <input
                type="text"
                v-model="poolInfo.kit_name"
                disabled
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Lot No:</Label>
              <input
                type="text"
                v-model="poolInfo.lot_no"
                disabled
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Date Expiry:</Label>
              <input
                type="text"
                v-model="poolInfo.date_expiry"
                disabled
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Room Temperature (°C):</Label>
              <input
                type="text"
                v-model="poolInfo.room_temp"
                disabled
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Start:</Label>
              <input
                type="text"
                v-model="poolInfo.start"
                disabled
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">End:</Label>
              <input
                type="text"
                v-model="poolInfo.end"
                disabled
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Performed By:</Label>
              <select class="form-select form-control form-control-sm">
                <option value="">Please Select</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Performed By:</Label>
              <select class="form-select form-control form-control-sm">
                <option value="">Please Select</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Performed By:</Label>
              <select class="form-select form-control form-control-sm">
                <option value="">Please Select</option>
              </select>
            </div>
          </div>
        </template>
      </search-card>
      <pre>{{ poolInfo }}</pre>
      <div>
        <div class="table-responsive p-0 m-0 border border-primary">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Well No.
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Accession No.
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">OD</th>
                <th class="text-center bg-primary text-white p-1 m-0">Ratio</th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Interpretation
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(w, index) in worksheet" :key="index">
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ w.wellNo }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <div
                    class="d-flex justify-content-center gap-2"
                    v-if="index === 0 || index === 1 || index === 2"
                  >
                    <span>{{ w.poolDetailID.acccession_no }}</span>
                    <span>{{ w.poolDetailID.value }}</span>
                  </div>
                  <div v-else>
                    <div v-if="w.poolDetailID" class="p-0">
                      <a href="#" class="d-block mb-0">
                        {{ w.poolDetailID.accession_no }}
                      </a>
                      <span style="font-size: 8px">{{
                        `${w.poolDetailID.lname}, ${w.poolDetailID.fname} ${w.poolDetailID.mname} ${w.poolDetailID.suffix}`
                      }}</span>
                    </div>
                  </div>
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <input
                    type="text"
                    v-model="w.OD"
                    class="form-control form-control-sm w-100 custom-font text-center"
                    :disabled="index === 0 || index === 1 || index === 2"
                  />
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <input
                    type="text"
                    v-model="w.Ratio"
                    class="form-control form-control-sm w-100 custom-font text-center"
                    :disabled="index === 0 || index === 1 || index === 2"
                  />
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <input
                    type="text"
                    v-model="w.Interpretation"
                    class="form-control form-control-sm w-100 custom-font text-center"
                    :disabled="index === 0 || index === 1 || index === 2"
                  />
                </td>
              </tr>
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
import { useRouter, useRoute } from "vue-router";
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
const route = useRoute();
const uriParams = route.params.id;

console.log("uriParams", uriParams);

const worksheet = ref([
  {
    wellNo: "A1",
    poolDetailID: { acccession_no: "CAL", value: "0.4777" },
    OD: "",
    Ratio: "",
    Interpretation: "",
  },
  {
    wellNo: "B1",
    poolDetailID: { acccession_no: "PTC", value: "1.6537" },
    OD: "",
    Ratio: "",
    Interpretation: "",
  },
  {
    wellNo: "C1",
    poolDetailID: { acccession_no: "NTC", value: "0.0086" },
    OD: "",
    Ratio: "",
    Interpretation: "",
  },
  { wellNo: "D1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "E1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "F1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "G1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "H1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "A2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "B2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "C2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "D2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "E2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "F2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "G2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "H2", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "A3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "B3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "C3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "D3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "E3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "F3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "G3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "H3", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "A4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "B4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "C4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "D4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "E4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "F4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "G4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "H4", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "A5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "B5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "C5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "D5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "E5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "F5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "G5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "H5", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "A6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "B6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "C6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "D6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "E6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "F6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "G6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "H6", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "A7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "B7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "C7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "D7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "E7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "F7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "G7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "H7", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "A8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "B8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "C8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "D8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "E8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "F8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "G8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "H8", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "A9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "B9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "C9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "D9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "E9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "F9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "G9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "H9", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "A10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "B10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "C10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "D10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "E10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "F10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "G10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "H10", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "A11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "B11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "C11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "D11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "E11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "F11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "G11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "H11", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "A12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "B12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "C12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "D12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "E12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "F12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "G12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "H12", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
]);

const poolInfo = computed(() => store.getters.getPool);

const fitData = () => {
  poolInfo.value.pool_details.forEach((poolDetail) => {
    const index = worksheet.value.findIndex((w) => w.poolDetailID === null);

    if (index !== -1) {
      worksheet.value[index] = {
        ...worksheet.value[index],
        poolDetailID: poolDetail,
      };
    }
  });
};

onMounted(async () => {
  await store.dispatch("getPoolById", uriParams);
  fitData();
  console.table(worksheet.value);
});
</script>

<style scoped></style>
