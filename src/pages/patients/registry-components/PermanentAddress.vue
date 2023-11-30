<template>
  <form-card title="Patient's Permanent Address">
    <template v-slot:formInput>
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.per_street,
            }"
          >
            <Label class="mb-2"
              >Street <span class="text-danger">*</span></Label
            >
            <input
              type="text"
              v-model="formData.per_street"
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
              'group-invalid': saveSubmitted && !validationStatus.per_region,
            }"
          >
            <Label class="mb-2"
              >Region <span class="text-danger">*</span></Label
            >
            <select
              v-model="formData.per_region"
              @change="changePermRegion(sameAsPermanent.value)"
              class="form-select form-control form-control-sm"
              required
            >
              <option value="">Please Select Region</option>
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
              'group-invalid': saveSubmitted && !validationStatus.per_province,
            }"
          >
            <Label class="mb-2"
              >Province <span class="text-danger">*</span></Label
            >
            <select
              v-model="formData.per_province"
              @change="changePermProvince(sameAsPermanent.value)"
              class="form-select form-control form-control-sm"
              required
            >
              <option value="">Please Select Province</option>
              <option
                v-for="p in provinces"
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
                saveSubmitted && !validationStatus.per_municipality,
            }"
          >
            <Label class="mb-2"
              >Municipality <span class="text-danger">*</span></Label
            >
            <select
              v-model="formData.per_municipality"
              @change="changePermCity(sameAsPermanent.value)"
              class="form-select form-control form-control-sm"
              required
            >
              <option value="">Please Select Municipality</option>
              <option
                v-for="m in municipalities"
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
              'group-invalid': saveSubmitted && !validationStatus.per_barangay,
            }"
          >
            <Label class="mb-2"
              >Barangay <span class="text-danger">*</span></Label
            >
            <select
              v-model="formData.per_barangay"
              class="form-select form-control form-control-sm"
              required
            >
              <option value="">Please Select Barangay</option>
              <option v-for="b in barangays" :key="b.Id" :value="b.Id">
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
              v-model="formData.per_mobile"
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
  changePermRegion,
  changePermProvince,
  changePermCity,
} from "../registry/Address";
import { decryptData, NumericOnly } from "@/composables";
import { useStore } from "vuex";
import FormCard from "@/components/cards/FormCard.vue";

export default defineComponent({
  name: "PermanentAddress",
  props: {
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
    const provinces = computed(() => store.getters.getProvinces);
    const municipalities = computed(() => store.getters.getMunicipalities);
    const barangays = computed(() => store.getters.getBarangays);
    const calculateAges = async () => {
      const calculated = calculateAge(formData.value.dob);
      store.commit("setAge", calculated.age);
    };
    const sameAsPermanent = ref({
      show: true,
      title: "Same As Permanent Address",
      value: "false",
    });
    return {
      calculateAges,
      formData,
      resetIndigenous,
      currentDate,
      calculateAge,
      NumericOnly,
      regions,
      provinces,
      municipalities,
      barangays,
      changePermRegion,
      changePermProvince,
      changePermCity,
      sameAsPermanent,
    };
  },
});
</script>

<style scoped></style>
