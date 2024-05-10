<template>
  <Toast />
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
      <div class="d-flex align-items-center justify-content-between">
        <div></div>
        <div>
          <button
            :disabled="savingFlag"
            class="btn btn-primary btn-sm m-1"
            @click="savePool()"
          >
            {{ savingFlag ? "Creating Pool..." : "Create Pool" }}

            <div
              class="spinner-border spinner-border-sm text-white"
              role="status"
              v-if="savingFlag"
            ></div>
          </button>
          <button class="btn btn-danger btn-sm m-1" @click="zxc">Cancel</button>
        </div>
      </div>
    </div>
    <!-- <pre>{{ validationStatus }}</pre>
    <pre>{{ poolHeader }}</pre> -->

    <div class="col-sm-12 col-md-12 col-lg-12">
      <div class="row p-0 m-0 mx-3">
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.protocol_no,
            }"
          >
            <Label class="mb-2">Protocol Number</Label>
            <select
              class="form-select form-control form-control-sm"
              v-model="poolHeader.protocol_no"
              @change="changeProtocol"
            >
              <option value="">Please Select</option>
              <option value="poolMS">Measles [MS]</option>
              <option value="poolRB">Rubella [RB]</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-12 col-lg-12">
      <div class="row p-0 m-0 mx-3">
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid':
                saveSubmitted && !validationStatus.date_performed,
            }"
          >
            <Label class="mb-2">Date Performed</Label>
            <input
              type="date"
              v-model="poolHeader.date_performed"
              class="form-control form-control-sm w-100 custom-font"
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.kit_name,
            }"
          >
            <Label class="mb-2">Name of Kit</Label>
            <select
              class="form-select form-control form-control-sm"
              v-model="poolHeader.kit_name"
            >
              <option value="">Please Select</option>
              <option
                :value="m"
                v-for="(m, index) in kits"
                :key="index"
                :selected="index == 0"
              >
                {{ m }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.room_temp,
            }"
          >
            <Label class="mb-2">Room Temperature (°C)</Label>
            <input
              type="number"
              v-model="poolHeader.room_temp"
              class="form-control form-control-sm w-100 custom-font"
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.method,
            }"
          >
            <Label class="mb-2">Method</Label>
            <select
              class="form-select form-control form-control-sm"
              v-model="poolHeader.method"
            >
              <option value="">Please Select</option>
              <option :value="m" v-for="(m, index) in methods" :key="index">
                {{ m }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.lot_no,
            }"
          >
            <Label class="mb-2">Lot Number</Label>
            <input
              type="text"
              v-model="poolHeader.lot_no"
              class="form-control form-control-sm w-100 custom-font"
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.start,
            }"
          >
            <Label class="mb-2">Start</Label>
            <input
              type="text"
              v-model="poolHeader.start"
              class="form-control form-control-sm w-100 custom-font"
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.test_name,
            }"
          >
            <Label class="mb-2">Name of Test</Label>
            <select
              class="form-select form-control form-control-sm"
              v-model="poolHeader.test_name"
            >
              <option value="">Please Select</option>
              <option :value="t" v-for="(t, index) in tests" :key="index">
                {{ t }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.date_expiry,
            }"
          >
            <Label class="mb-2">Expiry Date</Label>
            <input
              type="date"
              v-model="poolHeader.date_expiry"
              class="form-control form-control-sm w-100 custom-font"
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.end,
            }"
          >
            <Label class="mb-2">End</Label>
            <input
              type="text"
              v-model="poolHeader.end"
              class="form-control form-control-sm w-100 custom-font"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="m-3 table-responsive p-0 m-0 border border-primary mb-4">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th class="text-center bg-primary align-middle text-white p-0 m-0">
            Accession No
          </th>
          <th class="text-center bg-primary align-middle text-white p-0 m-0">
            Patient Name
          </th>
          <th class="text-center bg-primary align-middle text-white p-0 m-0">
            Specimen
          </th>
          <th class="text-center bg-primary align-middle text-white p-0 m-0">
            Date and Time Collection
          </th>
          <th class="text-center bg-primary align-middle text-white p-0 m-0">
            Value
          </th>
          <th class="text-center bg-primary align-middle text-white p-0 m-0">
            OD
          </th>
          <th class="text-center bg-primary align-middle text-white p-0 m-0">
            Ratio
          </th>
          <th class="text-center bg-primary align-middle text-white p-0 m-0">
            Interpretation
          </th>
          <th class="text-center bg-primary align-middle text-white p-0 m-0">
            Remove
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, index) in poolDetails" :key="index">
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ p.accession_no }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ p.lname }}, {{ p.fname }} {{ p.mname }} {{ p.suffix }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ p.specimen_type }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ formatter(p.datetime_collection) }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0"></td>
          <td class="text-center align-middle fw-bold p-1 m-0"></td>
          <td class="text-center align-middle fw-bold p-1 m-0"></td>
          <td class="text-center align-middle fw-bold p-1 m-0"></td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <a href="javascript:void(0);" @click="removeItem(p)">
              <i
                class="fa fa-times-circle scale-icon text-danger"
                aria-hidden="true"
                style="transition: all 300ms ease"
                v-tooltip.right="{
                  value: `<h6 class='text-white'>Remove Patient</h6>`,
                  escape: true,
                  class: 'bg-dark rounded p-1',
                }"
              ></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <pre>{{ poolDetails }}</pre>
</template>

<script setup lang="ts">
import {
  defineComponent,
  computed,
  ref,
  Ref,
  onMounted,
  watch,
  inject,
} from "vue";
import QrcodeVue from "qrcode.vue";
import html2canvas from "html2canvas";
import Image from "primevue/image";
import SkeletonPlaceholder from "@/pages/loader/SkeletonPlaceholder.vue";
import { useStore } from "vuex";
import { swalConfirmation, swalMessage } from "@/composables";
import { useToast } from "primevue/usetoast";
import moment from "moment";
import { PoolDetail } from "./types/types";
import { validationStatus, validateFields } from "./poolValidaton";

const store = useStore();
const swal = inject("$swal");
const poolHeader = computed(() => store.getters.getPoolHeader);

const poolDetails: Ref<PoolDetail[]> = computed(
  () => store.getters.getPoolCart
);

const methods = ref([]);
const kits = ref([]);
const tests = ref([]);
const detectOptions = (type) => {
  if (type === 3) {
    methods.value = store.getters.getMeaslesMethod;
    kits.value = store.getters.getMeaslesKit;
    tests.value = store.getters.getMeaslesTest;
  }
};

watch(
  () => {
    poolDetails.value;
    if (poolDetails.value.length > 0) {
      const detectType = poolDetails.value[0].type;
      detectOptions(detectType);
    }
  },
  { deep: true }
);

const formatter = (datetime: string): string => {
  return moment(datetime).format("lll");
};

const removeItem = (detail) => {
  store.commit("removeToPoolCart", detail);
};

const savingFlag = ref(false);
const savePoolConfirmation = () => {
  if (!poolDetails.value.length) {
    swalMessage(
      swal,
      "Warning",
      "Please Add Patient/s Before Saving",
      "warning"
    );
    return;
  }

  swalConfirmation(
    swal,
    "Confirmation",
    `Are you sure to create new Pool`,
    "question"
  ).then(async (res) => {
    if (res.isConfirmed) {
      savingFlag.value = true;
      const response = await store.dispatch("savePool", {
        ...poolHeader.value,
        pool_details: poolDetails.value,
      });
      savingFlag.value = false;
      swalMessage(
        swal,
        `Information`,
        `Pool ${response.data.header.protocol_no} Created Successfully!`,
        "success"
      ).then(() => {
        console.log("api response", response.data.header.protocol_no);
        // router.push({ name: "patients", params: { type: "measles" } });
      });
    }
  });
};

const saveSubmitted = ref(false);
const savePool = async () => {
  saveSubmitted.value = true;
  const errors = await validateFields(poolHeader.value);
  if (errors === 0) {
    await savePoolConfirmation();
  }
  console.log("errors", errors);
};

watch(
  () => {
    poolHeader.value;
    if (saveSubmitted.value === true) {
      validateFields(poolHeader.value);
    }
  },
  { deep: true }
);

type Event = {
  target: HTMLInputElement & { checked?: boolean; value: string }; // Define the type for the target
};

const changeProtocol = (e: Event) => {
  const { value } = e.target;
  store.commit("sekectProtocolType", value);
};

onMounted(() => {
  saveSubmitted.value = false;
  savingFlag.value = false;
});
</script>

<style scoped></style>
