<template>
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
      <div class="d-flex align-items-center justify-content-between">
        <div></div>
        <div>
          <button
            class="btn btn-primary btn-sm m-1"
            @click="$emit('save-linelist')"
          >
            Save Linelist
          </button>
          <button
            class="btn btn-danger btn-sm m-1"
            @click="$emit('close-linelist')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-12 col-lg-1">
      <div class="row p-0 m-0">
        <div class="col-12">
          <qrcode-vue
            style="position: absolute; top: -200px"
            class="ml-2 mt-3"
            :value="formHeader.linelist_code"
            :size="100"
            ref="qrcode"
          />
          <div class="d-flex align-items-center text-align-center mt-4">
            <skeleton-placeholder
              height="100px"
              width="100px"
              v-if="!imageDataUrl"
            />
            <Image v-else :src="imageDataUrl" alt="Image" width="100" preview />
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-12 col-lg-11">
      <div class="row p-0 m-0">
        <div class="col-12">
          <div class="row m-2">
            <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
              <div class="search">
                <Label class="mb-2">DRU Reporting Unit</Label>
                <input
                  type="text"
                  v-model="formHeader.dru"
                  disabled
                  class="form-control form-control-sm w-100 custom-font"
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
              <div class="search">
                <Label class="mb-2">Disease Surveillance Officer</Label>
                <input
                  type="text"
                  v-model="formHeader.dru_officer"
                  disabled
                  class="form-control form-control-sm w-100 custom-font"
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
              <div class="search">
                <Label class="mb-2">Contact No</Label>
                <input
                  type="text"
                  v-model="formHeader.contact"
                  disabled
                  class="form-control form-control-sm w-100 custom-font"
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
              <div class="search">
                <Label class="mb-2">Region</Label>
                <input
                  type="text"
                  v-model="formHeader.region"
                  disabled
                  class="form-control form-control-sm w-100 custom-font"
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
              <div class="search">
                <Label class="mb-2">Province</Label>
                <input
                  type="text"
                  v-model="formHeader.province"
                  disabled
                  class="form-control form-control-sm w-100 custom-font"
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
              <div class="search">
                <Label class="mb-2">Email</Label>
                <input
                  type="text"
                  v-model="formHeader.email"
                  disabled
                  class="form-control form-control-sm w-100 custom-font"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="m-3 table-responsive p-0 m-0 border border-primary mb-4">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Option
          </th>
          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Date Received
          </th>
          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Name of Patient
          </th>
          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Accession Number
          </th>
          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Disease Reporting Unit
          </th>
          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Specimen Quality
          </th>
          <th
            colspan="3"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Adequacy
          </th>
          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Remarks
          </th>
        </tr>
        <tr>
          <th class="text-center bg-primary align-middle text-white p-0 m-0">
            Working
          </th>
          <th class="text-center bg-primary align-middle text-white p-0 m-0">
            Backup
          </th>
          <th class="text-center bg-primary align-middle text-white p-0 m-0">
            NPS/OPS
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(l, index) in linelistDetails" :key="index">
          <td class="text-center align-middle fw-bold p-1 m-0">
            <div class="d-flex gap-1">
              <button class="btn btn-success btn-sm">Accept</button>
              <button class="btn btn-danger btn-sm">Decline</button>
            </div>
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ l.date_received }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ l.lname }}, {{ l.fname }} {{ l.mname }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <span v-if="l.accession_no">l.accession_no</span>
            <button class="btn btn-dark btn-sm" v-else>Generate</button>
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ formHeader.dru }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <input
              type="text"
              class="form-control form-control-sm fw-semibold"
              v-model="l.specimen_quality"
            />
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <input
              type="text"
              class="form-control form-control-sm fw-semibold"
              v-model="l.mr_working"
            />
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <input
              type="text"
              class="form-control form-control-sm fw-semibold"
              v-model="l.mr_backup"
            />
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <input
              type="text"
              class="form-control form-control-sm fw-semibold"
              v-model="l.mr_npsops"
            />
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <textarea
              class="form-control form-control-sm fw-semibold"
              rows="2"
              v-model="l.remarks"
            ></textarea>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, watch } from "vue";
import QrcodeVue from "qrcode.vue";
import html2canvas from "html2canvas";
import Image from "primevue/image";
import SkeletonPlaceholder from "@/pages/loader/SkeletonPlaceholder.vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "LinelistDetails",
  props: {
    formHeader: Object,
    patients: Array,
    specimens: Array,
    flagChecker: Boolean,
    createList: Boolean,
    refresher: String,
  },
  components: {
    QrcodeVue,
    Image,
    SkeletonPlaceholder,
  },
  setup(props, { emit }) {
    const removePatient = (p) => {
      emit("remove-patient", p);
    };
    const store = useStore();
    const diseaseType = (type) => {
      let patientType = "";
      if (type == 1) {
        patientType = "Rota Virus";
      } else if (type == 2) {
        patientType = "Meningitis-Encephalitis";
      } else if (type == 3) {
        patientType = "Measles-Rubella";
      } else {
        patientType = "Unknown Type";
      }

      return patientType;
    };

    const qrcode = ref(null);
    const imageDataUrl = ref(null);
    const captureQR = () => {
      const qrCodeElement = qrcode.value.$el;
      html2canvas(qrCodeElement).then((canvas) => {
        imageDataUrl.value = canvas.toDataURL();
      });
    };

    const linelistDetails = computed(() => store.getters.getLinelistsDetails);

    watch(
      () => props.refresher,
      (newRefresher, oldRefresher) => {
        if (newRefresher) {
          setTimeout(() => {
            captureQR();
          }, 300);
        }
      }
    );

    return {
      removePatient,
      diseaseType,
      qrcode,
      imageDataUrl,
      captureQR,
      linelistDetails,
    };
  },
});
</script>

<style scoped>
.qr-container {
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
}
</style>
