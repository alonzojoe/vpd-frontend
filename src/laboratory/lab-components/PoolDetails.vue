<template>
  <Toast />
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
      <div class="d-flex align-items-center justify-content-between">
        <div></div>
        <div>
          <button class="btn btn-primary btn-sm m-1" @click="zxc">
            Save Linelist
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
</template>

<script setup lang="ts">
import { defineComponent, computed, ref, onMounted, watch, inject } from "vue";
import QrcodeVue from "qrcode.vue";
import html2canvas from "html2canvas";
import Image from "primevue/image";
import SkeletonPlaceholder from "@/pages/loader/SkeletonPlaceholder.vue";
import { useStore } from "vuex";
import { swalConfirmation, swalMessage } from "@/composables";
import { useToast } from "primevue/usetoast";
</script>

<style scoped></style>
