<template>
  <Toast />
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
      <div class="d-flex align-items-center justify-content-between">
        <div></div>
        <div>
          <button class="btn btn-primary btn-sm m-1" @click="zxc">
            Create Pool
          </button>
          <button class="btn btn-danger btn-sm m-1" @click="zxc">Cancel</button>
        </div>
      </div>
    </div>

    <div class="col-sm-12 col-md-12 col-lg-12">
      <div class="row p-0 m-0 mx-3">
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div class="search">
            <Label class="mb-2">Protocol Number</Label>
            <input
              type="text"
              v-model="zxc"
              class="form-control form-control-sm w-100 custom-font"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-12 col-lg-12">
      <div class="row p-0 m-0 mx-3">
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div class="search">
            <Label class="mb-2">Date Performed</Label>
            <input
              type="date"
              v-model="zxc"
              class="form-control form-control-sm w-100 custom-font"
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div class="search">
            <Label class="mb-2">Name of Kit</Label>
            <input
              type="text"
              v-model="zxc"
              class="form-control form-control-sm w-100 custom-font"
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div class="search">
            <Label class="mb-2">Room Temperature</Label>
            <input
              type="text"
              v-model="zxc"
              class="form-control form-control-sm w-100 custom-font"
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div class="search">
            <Label class="mb-2">Method</Label>
            <input
              type="text"
              v-model="zxc"
              class="form-control form-control-sm w-100 custom-font"
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div class="search">
            <Label class="mb-2">Lot Number</Label>
            <input
              type="text"
              v-model="zcx"
              class="form-control form-control-sm w-100 custom-font"
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div class="search">
            <Label class="mb-2">Start</Label>
            <input
              type="text"
              v-model="zxc"
              class="form-control form-control-sm w-100 custom-font"
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div class="search">
            <Label class="mb-2">Name of Test</Label>
            <input
              type="text"
              v-model="zxc"
              class="form-control form-control-sm w-100 custom-font"
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div class="search">
            <Label class="mb-2">Expiry Date</Label>
            <input
              type="date"
              v-model="zcx"
              class="form-control form-control-sm w-100 custom-font"
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
          <div class="search">
            <Label class="mb-2">End</Label>
            <input
              type="text"
              v-model="zxc"
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


const store = useStore();
const poolDetails: Ref<PoolDetail[]> = computed(
  () => store.getters.getPoolCart
);

const formatter = (datetime: string): string => {
  return moment(datetime).format("lll");
};

</script>

<style scoped></style>
