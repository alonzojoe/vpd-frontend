<template>
  <div class="card w-100 position-relative overflow-hidden">
    <div class="card-body p-4">
      <h5 class="card-title fw-semibold mb-2">Account Credentials</h5>
      <div class="mb-2">
        <label
          :class="{
            'text-validation': (flagvl && !formData.email) || flagemail,
          }"
          class="form-label fw-semibold"
          >Email</label
        >
        <input
          type="email"
          v-model="formData.email"
          required
          :class="{
            'is-invalid': (flagvl && !formData.email) || flagemail,
          }"
          class="form-control form-control-sm custom-font"
        />
      </div>
      <div class="mb-2">
        <label
          :class="{
            'text-validation': flagvl && !formData.role_id,
          }"
          class="form-label fw-semibold"
          >Role</label
        >
        <select
          v-model="formData.role_id"
          required
          :class="{
            'custom-validation': flagvl && formData.role_id == 0,
          }"
          class="form-select form-control form-control-sm"
        >
          <option value="0">Please Select</option>
          <option v-for="r in roles" :key="r.id" :value="r.id">
            {{ r.role }}
          </option>
        </select>
      </div>
      <div class="mb-2">
        <label
          :class="{
            'text-validation': (flagvl && !formData.password) || flagpass,
          }"
          class="form-label fw-semibold"
          >Password</label
        >
        <input
          type="password"
          v-model="formData.password"
          required
          :class="{
            'is-invalid': (flagvl && !formData.password) || flagpass,
          }"
          class="form-control form-control-sm custom-font"
        />
      </div>
      <div class="">
        <label
          :class="{
            'text-validation':
              (flagvl && !formData.confirm_password) || flagpass,
          }"
          class="form-label fw-semibold"
          >Confirm Password</label
        >
        <input
          type="password"
          v-model="formData.confirm_password"
          required
          :class="{
            'is-invalid': (flagvl && !formData.confirm_password) || flagpass,
          }"
          class="form-control form-control-sm custom-font"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AccountCredentials",
  props: {
    flagvl: Boolean,
    flagemail: Boolean,
    formData: Object,
    roles: Array,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
