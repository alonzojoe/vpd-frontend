<template>
  <h5 class="card-title fw-bolder">Personal Information</h5>
  <div class="row p-0 m-0">
    <div class="col-sm-12 col-md-6 col-lg-4">
      <div class="mb-4">
        <label
          :class="{
            'text-validation': flagvl && !formData.lname,
          }"
          class="form-label fw-semibold"
          >Last Name</label
        >
        <input
          type="text"
          v-model="formData.lname"
          required
          :class="{ 'is-invalid': flagvl && !formData.lname }"
          class="form-control form-control-sm custom-font"
        />
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <div class="mb-4">
        <label
          :class="{
            'text-validation': flagvl && !formData.name,
          }"
          class="form-label fw-semibold"
          >First Name</label
        >
        <input
          type="text"
          v-model="formData.name"
          required
          :class="{ 'is-invalid': flagvl && !formData.name }"
          class="form-control form-control-sm custom-font"
        />
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <div class="mb-4">
        <label class="form-label fw-semibold">Middle Name</label>
        <input
          type="text"
          v-model="formData.mname"
          class="form-control form-control-sm custom-font"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserInformation",
  props: {
    flagvl: Boolean,
    flagemail: Boolean,
    formData: Object,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
