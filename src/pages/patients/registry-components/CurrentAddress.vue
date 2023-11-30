<template>
  <form-card title="Patient's Current Address" :withCbo="sameAsPermanent">
    <template v-slot:formInput>
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.curr_street,
            }"
          >
            <Label class="mb-2"
              >Street <span class="text-danger">*</span></Label
            >
            <input
              type="text"
              v-model="formData.curr_street"
              class="form-control form-control-sm w-100 custom-font"
              required
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.curr_region,
            }"
          >
            <Label class="mb-2"
              >Region <span class="text-danger">*</span></Label
            >
            <select
              v-model="formData.curr_region"
              @change="changeCurrRegion()"
              class="form-select form-control form-control-sm"
              required
            >
              <option value="">Please Region</option>
              <option
                v-for="r in regions"
                :key="r.RegionID"
                :value="r.RegionID"
              >
                {{ r.Description }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.curr_province,
            }"
          >
            <Label class="mb-2"
              >Province <span class="text-danger">*</span></Label
            >
            <select
              v-model="formData.curr_province"
              @change="changeCurrProvince()"
              class="form-select form-control form-control-sm"
              required
            >
              <option value="">Please Province</option>
              <option
                v-for="p in currProvinces"
                :key="p.ProvinceID"
                :value="p.ProvinceID"
              >
                {{ p.Description }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid':
                saveSubmitted && !validationStatus.curr_municipality,
            }"
          >
            <Label class="mb-2"
              >Municipality <span class="text-danger">*</span></Label
            >
            <select
              v-model="formData.curr_municipality"
              @change="changeCurrCity()"
              class="form-select form-control form-control-sm"
              required
            >
              <option value="">Please Municipality</option>
              <option
                v-for="m in currMunicipalities"
                :key="m.MunicipalityID"
                :value="m.MunicipalityID"
              >
                {{ m.Description }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.curr_barangay,
            }"
          >
            <Label class="mb-2"
              >Barangay <span class="text-danger">*</span></Label
            >
            <select
              v-model="formData.curr_barangay"
              class="form-select form-control form-control-sm"
              required
            >
              <option value="">Please Barangay</option>
              <option v-for="b in currBarangays" :key="b.Id" :value="b.Id">
                {{ b.Name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
          <div class="search">
            <Label class="mb-2">Mobile No.</Label>
            <input
              type="text"
              v-model="formData.curr_mobile"
              class="form-control form-control-sm w-100 custom-font"
              maxlength="11"
              @keypress="NumericOnly()"
            />
          </div>
        </div>
      </div>
    </template>
  </form-card>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  inject,
  watchEffect,
  watch,
} from "vue";
import {
  calculateAge,
  currentDate,
  resetIndigenous,
} from "../registry/PatientInformation";
import {
  changeCurrRegion,
  changeCurrProvince,
  changeCurrCity,
  sameAddress,
} from "../registry/Address";
import { decryptData, NumericOnly } from "@/composables";
import { useStore } from "vuex";
import FormCard from "@/components/cards/FormCard.vue";

export default defineComponent({
  name: "CurrentAddress",
  props: {
    sameAsPermanent: Object,
    saveSubmitted: Boolean,
    validationStatus: Array,
  },
  components: {
    FormCard,
  },
  setup() {
    const store = useStore();
    const formData = computed(() => store.getters.getPatientFormData);
    const regions = computed(() => store.getters.getRegions);
    //permanent address
    const currProvinces = computed(() => store.getters.getCurrProvinces);
    const currMunicipalities = computed(
      () => store.getters.getCurrMunicipalities
    );
    const currBarangays = computed(() => store.getters.getCurrBarangays);
    const calculateAges = async () => {
      const calculated = calculateAge(formData.value.dob);
      store.commit("setAge", calculated.age);
    };

    return {
      calculateAges,
      formData,
      resetIndigenous,
      currentDate,
      calculateAge,
      NumericOnly,
      regions,
      currProvinces,
      currMunicipalities,
      currBarangays,
      changeCurrRegion,
      changeCurrProvince,
      changeCurrCity,
    };
  },
});
</script>

<style scoped></style>
