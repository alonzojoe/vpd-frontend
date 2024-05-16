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
              <Label class="mb-2">Method:</Label>
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
              <Label class="mb-2">Validated By:</Label>
              <select class="form-select form-control form-control-sm">
                <option value="">Please Select</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-2 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Pathologist:</Label>
              <select class="form-select form-control form-control-sm">
                <option value="">Please Select</option>
              </select>
            </div>
          </div>
        </template>
      </search-card>
      <!-- <pre>{{ poolInfo }}</pre> -->
      <div class="row mb-2">
        <div class="col-sm-12 col-md-8 col-md-8">
          <div class="d-flex gap-2 align-items-center">
            <div>
              <button
                class="btn btn-success"
                @click="exportToCSV"
                :disabled="flagExporting"
              >
                {{ flagExporting ? "Exporting Worksheet..." : "Export to CSV" }}
                <div
                  class="spinner-border spinner-border-sm text-white"
                  role="status"
                  v-if="flagExporting"
                ></div>
              </button>
            </div>

            <div class="input-group">
              <span class="input-group-text">Upload From Machine</span>
              <div class="custom-file">
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  @change="importExcel"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-sm-12 col-md-4 col-md-4 d-flex align-items-center justify-content-end"
        >
          <button
            class="btn btn-primary"
            @click="saveWorkSheet"
            :disabled="isLoading"
          >
            {{ isLoading ? "Saving Worksheet..." : "Save Worksheet" }}
            <div
              class="spinner-border spinner-border-sm text-white"
              role="status"
              v-if="isLoading"
            ></div>
          </button>
        </div>
      </div>
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
                    <a href="#" class="d-block mb-0" v-if="w.poolDetailID">
                      {{ w.poolDetailID.accession_no }}
                    </a>
                  </div>
                  <div v-else>
                    <div v-if="w.poolDetailID" class="p-0">
                      <a href="#" class="d-block mb-0">
                        {{ w.poolDetailID.accession_no }}
                      </a>
                      <span style="font-size: 8px"
                        >{{
                          `${w.poolDetailID.lname}, ${w.poolDetailID.fname} ${w.poolDetailID.mname} ${w.poolDetailID.suffix} `
                        }}
                        [{{ w.poolDetailID.specimen_type }}]</span
                      >
                    </div>
                  </div>
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <input
                    type="text"
                    v-model="w.OD"
                    class="form-control form-control-sm w-100 custom-font text-center"
                    :class="{
                      'invalid-input':
                        savingFlag &&
                        validateClass(w.wellNo) &&
                        w.OD.trim().length === 0,
                    }"
                  />
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <input
                    type="text"
                    v-model="w.Ratio"
                    class="form-control form-control-sm w-100 custom-font text-center"
                    :class="{
                      'invalid-input':
                        savingFlag &&
                        validateClass(w.wellNo) &&
                        w.Ratio.trim().length === 0,
                    }"
                  />
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <input
                    type="text"
                    v-model="w.Interpretation"
                    class="form-control form-control-sm w-100 custom-font text-center"
                    :class="{
                      'invalid-input':
                        savingFlag &&
                        validateClass(w.wellNo) &&
                        w.Interpretation.trim().length === 0,
                    }"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
  Ref,
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
import { useToast } from "primevue/usetoast";
import * as XLSX from "xlsx";

const toast = useToast();
const store = useStore();
const route = useRoute();
const uriParams = route.params.id;
const authUser = computed(() => store.getters.getAuthenticatedUser);
console.log("uriParams", uriParams);
const defaultWorksheet = [
  // {
  //   wellNo: "A1",
  //   poolDetailID: { acccession_no: "CAL", value: "0.4777" },
  //   OD: "",
  //   Ratio: "",
  //   Interpretation: "",
  // },
  // {
  //   wellNo: "B1",
  //   poolDetailID: { acccession_no: "PTC", value: "1.6537" },
  //   OD: "",
  //   Ratio: "",
  //   Interpretation: "",
  // },
  // {
  //   wellNo: "C1",
  //   poolDetailID: { acccession_no: "NTC", value: "0.0086" },
  //   OD: "",
  //   Ratio: "",
  //   Interpretation: "",
  // },
  { wellNo: "A1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "B1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "C1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
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
];
const worksheet = ref([
  // {
  //   wellNo: "A1",
  //   poolDetailID: { acccession_no: "CAL", value: "0.4777" },
  //   OD: "",
  //   Ratio: "",
  //   Interpretation: "",
  // },
  // {
  //   wellNo: "B1",
  //   poolDetailID: { acccession_no: "PTC", value: "1.6537" },
  //   OD: "",
  //   Ratio: "",
  //   Interpretation: "",
  // },
  // {
  //   wellNo: "C1",
  //   poolDetailID: { acccession_no: "NTC", value: "0.0086" },
  //   OD: "",
  //   Ratio: "",
  //   Interpretation: "",
  // },
  { wellNo: "A1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "B1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
  { wellNo: "C1", poolDetailID: null, OD: "", Ratio: "", Interpretation: "" },
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

const exceptIndex = [0, 1, 2];
const fitData = () => {
  poolInfo.value.pool_details.forEach((poolDetail) => {
    const index = worksheet.value.findIndex((w) => w.poolDetailID === null);
    console.log("pooll d", poolDetail.value);

    const poolDetailsDef = {
      accession_no: poolDetail.value,
    };

    if (index === 0 || index === 1 || index === 2) {
      worksheet.value[index] = {
        ...worksheet.value[index],
        id: poolDetail.id,
        value: poolDetail.value,
        poolDetailID: poolDetailsDef,
        OD: poolDetail.od,
        Ratio: poolDetail.ratio,
        Interpretation: poolDetail.interpretation,
      };
    } else {
      worksheet.value[index] = {
        ...worksheet.value[index],
        poolDetailID: poolDetail,
        OD: poolDetail.od,
        Ratio: poolDetail.ratio,
        Interpretation: poolDetail.interpretation,
      };
    }

    // const poolDetailsDef = { poolDetailID.value };

    // if (index !== -1 && !exceptIndex.includes(index)) {
    //   worksheet.value[index] = {
    //     ...worksheet.value[index],
    //     poolDetailID: poolDetail,
    //     OD: poolDetail.od,
    //     Ratio: poolDetail.ratio,
    //     Interpretation: poolDetail.interpretation,
    //   };
    // } else {
    //   console.log("wwwwwww", poolDetail);
    // }
  });
};

interface FilteredWorkSheet {
  wellNo: string;
  poolDetailID: Object;
  OD: string;
  Ratio: string;
  Interpretation: string;
}

const fsWorksheet: Ref<FilteredWorkSheet[]> = ref([]);
const filterWorksheet = () => {
  fsWorksheet.value = worksheet.value.filter(
    (a: FilteredWorkSheet) => a.poolDetailID != null
  );
};

const validateData = () => {
  const misingData: boolean = fsWorksheet.value.some(
    (item: FilteredWorkSheet) => {
      return !item.OD || !item.Ratio || !item.Interpretation;
    }
  );

  if (misingData) {
    toast.add({
      severity: "error",
      summary: "Validation",
      detail: `Some items have missing values for OD, Ratio, or Interpretation.`,
      life: 5000,
    });
    return false;
  }

  return true;
};

const isLoading = ref(false);
const savingFlag = ref(false);
const saveWorkSheet = async () => {
  console.log("savinggg");
  savingFlag.value = true;
  filterWorksheet();
  console.log("this is filtered worksheet", fsWorksheet.value);
  if (!validateData()) return;
  isLoading.value = true;
  console.log("saving data..");
  await store.dispatch("savePool", {
    ...poolInfo.value,
    pool_details: fsWorksheet.value.map((d: FilteredWorkSheet) => {
      const { poolDetailID, ...rest } = d;
      return {
        ...poolDetailID,
        ...rest,
        well_no: d.wellNo,
        medtech: authUser.value.id,
      };
    }),
  });
  console.log("saved");
  toast.add({
    severity: "success",
    summary: "Information",
    detail: `Worksheet saved successfully!`,
    life: 5000,
  });
  isLoading.value = false;
  // setTimeout(() => {
  //   window.location.href = "/main/pool";
  // }, 1000);
  return false;
};

const validateClass = (wellNo: string): boolean => {
  return fsWorksheet.value.some((item: FilteredWorkSheet) => {
    return item.wellNo === wellNo;
  });
};

const resetData = () => {
  savingFlag.value = false;
  isLoading.value = false;
};

const flagExporting = ref(false);

const exportToCSV = () => {
  flagExporting.value = true;
  // console.log(worksheet.value);
  // return;

  const filteredWorksheet = worksheet.value.filter(
    (item) => item.poolDetailID !== null
  );

  const csvContent =
    "data:text/csv;charset=utf-8," +
    "Hole No,Code\n" +
    filteredWorksheet
      .map(
        (row) =>
          `${row.wellNo},${
            row.poolDetailID.acccession_no || row.poolDetailID.accession_no
          }`
      )
      .join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "data.csv");
  document.body.appendChild(link);
  link.click();
  flagExporting.value = false;
};

const importExcel = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const result = jsonData
        .map((row, index) => {
          if (row.length === 3) {
            // Only process rows with exactly 3 columns
            return {
              well_no: row[0], // Use the first column for well_no
              accession_no: row[1], // Use the second column for accession_no
              od: row[2], // Use the third column for od
            };
          }
          return null; // Skip rows that don't have exactly 3 columns
        })
        .filter((item) => item !== null); // Filter out null values

      console.log(
        result.filter((item) => item.well_no && item.accession_no && item.od)
      );
    };
    reader.readAsArrayBuffer(file);
  }
};

onMounted(async () => {
  resetData();
  worksheet.value = defaultWorksheet;
  await store.dispatch("getPoolById", uriParams);
  fitData();
  console.table(worksheet.value);
});
</script>

<style scoped></style>
