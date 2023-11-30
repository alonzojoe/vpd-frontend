<template>
  <h5 class="card-title fw-bolder">HCI Information</h5>
  <div class="row p-0 m-0">
    <div class="col-sm-12 col-md-6 col-lg-8">
      <div class="mb-4">
        <label
          :class="{
            'text-validation': flagvl && !formData.institution,
          }"
          class="form-label fw-semibold"
          >Name of Institution</label
        >
        <input
          type="text"
          v-model="formData.institution"
          :class="{
            'is-invalid': flagvl && !formData.institution,
          }"
          class="form-control form-control-sm custom-font"
        />
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <div class="mb-4">
        <label
          :class="{
            'text-validation': flagvl && !formData.street,
          }"
          class="form-label fw-semibold"
          >Street</label
        >
        <input
          type="text"
          v-model="formData.street"
          :class="{
            'is-invalid': flagvl && !formData.street,
          }"
          class="form-control form-control-sm custom-font"
        />
      </div>
    </div>
  </div>
  <div class="row p-0 m-0">
    <div class="col-sm-12 col-md-6 col-lg-4">
      <div class="mb-4">
        <label
          :class="{
            'text-validation': flagvl && !formData.region,
          }"
          class="form-label fw-semibold"
          >Region</label
        >
        <select
          v-model="formData.region"
          @change="$emit('change-region')"
          :class="{
            'is-invalid': flagvl && !formData.region,
          }"
          class="form-select form-control form-control-sm"
        >
          <option value="">Please Select Region</option>
          <option v-for="r in regions" :key="r.RegionID" :value="r.RegionID">
            {{ r.Description }}
          </option>
        </select>
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <div class="mb-4">
        <label
          :class="{
            'text-validation': flagvl && !formData.province,
          }"
          class="form-label fw-semibold"
          >Province</label
        >
        <select
          v-model="formData.province"
          @change="$emit('change-province')"
          :class="{
            'is-invalid': flagvl && !formData.province,
          }"
          class="form-select form-control form-control-sm"
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

    <div class="col-sm-12 col-md-6 col-lg-4">
      <div class="mb-4">
        <label
          :class="{
            'text-validation': flagvl && !formData.city,
          }"
          class="form-label fw-semibold"
          >Province</label
        >
        <select
          v-model="formData.city"
          @change="$emit('change-city')"
          :class="{ 'is-invalid': flagvl && !formData.city }"
          class="form-select form-control form-control-sm"
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
    <div class="col-sm-12 col-md-6 col-lg-4">
      <div class="mb-4">
        <label
          :class="{
            'text-validation': (flagvl && !formData.barangay) || flagmob,
          }"
          class="form-label fw-semibold"
          >Barangay</label
        >
        <select
          v-model="formData.barangay"
          :class="{
            'is-invalid': flagvl && !formData.barangay,
          }"
          class="form-select form-control form-control-sm"
        >
          <option value="">Please Select Barangay</option>
          <option v-for="b in barangays" :key="b.Id" :value="b.Id">
            {{ b.Name }}
          </option>
        </select>
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <div class="mb-4">
        <label
          :class="{
            'text-validation': (flagvl && !formData.mobile) || flagmob,
          }"
          class="form-label fw-semibold"
          >Mobile No.</label
        >
        <input
          type="text"
          v-model="formData.mobile"
          :class="{
            'is-invalid': (flagvl && !formData.mobile) || flagmob,
          }"
          maxlength="11"
          @keypress="NumericOnly()"
          class="form-control form-control-sm custom-font"
          placeholder="090XXXXXXXX"
        />
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <div class="mb-4">
        <div class="d-flex align-items-center justify-content-start mt-4 gap-2">
          <button
            @click.prevent="$emit('save-user')"
            type="button"
            class="btn btn-primary"
          >
            Save
          </button>
          <button @click.prevent="$emit('close-modal')" class="btn btn-danger">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { NumericOnly } from "@/composables";
export default defineComponent({
  name: "HciInformation",
  props: {
    flagvl: Boolean,
    flagemail: Boolean,
    formData: Object,
  },
  setup() {
    const store = useStore();
    const regions = computed(() => store.getters.getRegions);
    const provinces = computed(() => store.getters.getProvinces);
    const municipalities = computed(() => store.getters.getMunicipalities);
    const barangays = computed(() => store.getters.getBarangays);
    return {
      regions,
      provinces,
      municipalities,
      barangays,
      NumericOnly,
    };
  },
});
</script>

<style scoped></style>
