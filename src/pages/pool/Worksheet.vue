<template>
  <div class="card my-0">
    <div class="card-body py-4">
      <search-card title="Pool Information" v-if="poolInfo">
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
                  accept=".xls,.xlsx"
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
                        w.Ratio.trim().length === 0 &&
                        index !== 0,
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
                        w.Interpretation.trim().length === 0 &&
                        index !== 0,
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
  onUnmounted,
  watch,
  watchEffect,
  Ref,
  toValue,
} from "vue";
import SearchCard from "@/components/cards/SearchCard.vue";

import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import {
  worksheet,
  defaultWorksheet,
  computeRatio,
  calculateInterpretation,
  calculateCriteria,
  resetWorkSheet,
} from "./states";
import * as XLSX from "xlsx";
import { Table } from "jspdf-autotable";

const toast = useToast();
const store = useStore();
const route = useRoute();
const uriParams = route.params.id;
const authUser = computed(() => store.getters.getAuthenticatedUser);
console.log("uriParams", uriParams);

const poolInfo = computed(() => store.getters.getPool);

const fitData = () => {
  resetWorkSheet();
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
    (item: FilteredWorkSheet, index: number) => {
      if (index !== 0) {
        return !item.OD || !item.Ratio || !item.Interpretation;
      }
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

const importedResults = ref([]);
const importExcel = (event: Event) => {
  const file = event.target.files[0];
  let results = [];
  if (file) {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        let calibrator = 0;
        const result = jsonData
          .map((row: any, index: number) => {
            if (index === 0) {
              calibrator = +row[2];
            }

            if (row.length === 3) {
              let calculatedRatio = computeRatio(calibrator, +row[2]);
              let computedResults = calculateInterpretation(calculatedRatio);
              return {
                well_no: row[0],
                accession_no: row[1],
                od: row[2],
                ratio: index !== 0 ? calculatedRatio : "",
                interpretation: index !== 0 ? computedResults : "",
              };
            }
            return null;
          })
          .filter((item) => item !== null);

        importedResults.value = result.filter(
          (item) => item.well_no && item.accession_no && item.od
        );
        console.table(importedResults.value);
        fetchToWorksheet();
        fulfilledCriteria();
        return result.filter(
          (item) => item.well_no && item.accession_no && item.od
        );
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.log("there was an error reading the file content", error);
    }
  }
};

const fetchToWorksheet = () => {
  importedResults.value.forEach((res) => {
    const index = worksheet.value.findIndex((w) => w.wellNo === res.well_no);

    if (worksheet.value[index].poolDetailID) {
      worksheet.value[index] = {
        ...worksheet.value[index],
        OD: res.od.toString(),
        Ratio: res.ratio.toString(),
        Interpretation: res.interpretation.toString(),
      };
    }
  });
};

const criteria = ref([
  {
    id: "cal",
    result: "",
    interpretation: "",
  },
  {
    id: "pos",
    result: "",
    interpretation: "",
  },
  {
    id: "neg",
    result: "",
    interpretation: "",
  },
]);

const filteredLegends = (data, index) => {
  return index === 0 || index === 1 || index === 2;
};

const fulfilledCriteria = () => {
  console.table(worksheet.value);
  const getLegends = worksheet.value.filter(filteredLegends);

  getLegends.forEach((item, index) => {
    if (index === 0) {
      criteria.value[index] = {
        ...criteria.value[index],
        result: item.OD,
        interpretation: calculateCriteria(parseFloat(item.OD), "Calibrator"),
      };
    } else if (index === 1) {
      criteria.value[index] = {
        ...criteria.value[index],
        result: item.Ratio,
        interpretation: calculateCriteria(
          parseFloat(item.Ratio),
          "PositiveControl"
        ),
      };
    } else if (index === 2) {
      criteria.value[index] = {
        ...criteria.value[index],
        result: item.Ratio,
        interpretation: calculateCriteria(
          parseFloat(item.Ratio),
          "NegativeControl"
        ),
      };
    } else {
      throw new Error("Index out of bounds");
    }
  });

  setTimeout(() => {
    console.log("last"), console.table(criteria.value);
  }, 5000);
};

onMounted(async () => {
  // worksheet.value = defaultWorksheet;

  await store.commit("resetPool");
  resetData();
  await store.dispatch("getPoolById", uriParams);
  console.log("poolinfo", poolInfo.value);

  fitData();
  console.table(worksheet.value);
});

onUnmounted(async () => {
  await store.commit("resetPool");
  worksheet.value = defaultWorksheet;
});
</script>

<style scoped></style>
