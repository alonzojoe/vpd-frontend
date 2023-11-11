<template>
  <form-card title="Patient Information">
    <template v-slot:formInput>
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div class="search">
            <Label class="mb-2">Patient No.</Label>
            <input
              type="text"
              v-model="formData.patient_no"
              class="form-control form-control-sm w-100 custom-font"
              disabled
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div class="search">
            <Label class="mb-2">First Name</Label>
            <input
              type="text"
              v-model="formData.fname"
              class="form-control form-control-sm w-100 custom-font"
              disabled
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div class="search">
            <Label class="mb-2">Middle Name</Label>
            <input
              type="text"
              v-model="formData.mname"
              class="form-control form-control-sm w-100 custom-font"
              disabled
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div class="search">
            <Label class="mb-2">Last Name</Label>
            <input
              type="text"
              v-model="formData.lname"
              class="form-control form-control-sm w-100 custom-font"
              disabled
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div class="search">
            <Label class="mb-2">Suffix</Label>
            <input
              type="text"
              v-model="formData.suffix"
              class="form-control form-control-sm w-100 custom-font"
              disabled
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div class="search">
            <Label class="mb-2">Gender</Label>
            <select
              v-model="formData.gender"
              class="form-select form-control form-control-sm"
              disabled
            >
              <option value="">Please Select</option>
              <option value="1">MALE</option>
              <option value="2">FEMALE</option>
            </select>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div class="search">
            <Label class="mb-2">Date of Birth</Label>
            <input
              type="date"
              v-model="formData.birthdate"
              class="form-control form-control-sm w-100 custom-font"
              disabled
            />
          </div>
        </div>
      </div>
    </template>
  </form-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormCard from "./FormCard.vue";

export default defineComponent({
  props: {
    formData: Object,
  },
  components: {
    FormCard,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
