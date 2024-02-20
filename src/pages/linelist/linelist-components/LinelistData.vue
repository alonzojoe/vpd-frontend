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
    <div class="col-sm-12 col-md-12 col-lg-1" v-if="!createList">
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
    <div
      class="col-sm-12 col-md-12"
      :class="!createList ? 'col-lg-11' : 'col-lg-12'"
    >
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
          <th class="text-center bg-primary text-white p-0 m-0">No</th>
          <th class="text-center bg-primary text-white p-0 m-0">Last Name</th>
          <th class="text-center bg-primary text-white p-0 m-0">First Name</th>
          <th class="text-center bg-primary text-white p-0 m-0">Middle Name</th>
          <th class="text-center bg-primary text-white p-0 m-0">Age</th>
          <th class="text-center bg-primary text-white p-0 m-0">Gender</th>
          <th class="text-center bg-primary text-white p-0 m-0">
            Date of Birth
          </th>
          <th class="text-center bg-primary text-white p-0 m-0">Specimen</th>
          <th
            class="text-center bg-primary text-white p-0 m-0"
            style="width: 10%"
          >
            Date and Time Collection
          </th>
          <th
            class="text-center bg-primary text-white p-0 m-0"
            style="width: 10%"
          >
            Disease Case
          </th>
          <th class="text-center bg-primary text-white p-0 m-0">Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, index) in patients" :key="index">
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ index + 1 }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ p.lname }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ p.fname }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ p.mname }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ p.age_year }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ p.gender == 1 ? "MALE" : "FEMALE" }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ p.birthdate }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <select
              v-model="p.specimen_type"
              class="form-select form-control form-control-sm"
            >
              <option value="">Please Select</option>
              <option v-for="(s, index) in specimens" :value="s">
                {{ s }}
              </option>
            </select>
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <div
              :class="{
                'group-invalid': flagChecker && !p.datetime_collection,
              }"
            >
              <input
                type="datetime-local"
                v-model="p.datetime_collection"
                class="form-control form-control-sm custom-font"
              />
            </div>
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ diseaseType(p.type) }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <a href="javascript:void(0);" @click="removePatient(p)">
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
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, watch } from "vue";
import QrcodeVue from "qrcode.vue";
import html2canvas from "html2canvas";
import Image from "primevue/image";
import SkeletonPlaceholder from "@/pages/loader/SkeletonPlaceholder.vue";
export default defineComponent({
  name: "LinelistData",
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

    return { removePatient, diseaseType, qrcode, imageDataUrl, captureQR };
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
