<template>
  <form-card title="Exposure History">
    <template v-slot:formInput>
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted && !validationStatus.travel_history,
              }"
            >
              <Label class="mb-2"
                >With History of Travel Within 23 Days<button
                  type="button"
                  class="btn btn-sm btn-light-info text-info p-0 m-0"
                  v-tooltip.top="{
                    value: `<h6 class='text-white'>With History of Travel Within 23 Days Prior to Onset of Rash</h6>`,
                    escape: true,
                    class: 'bg-dark rounded p-1',
                  }"
                >
                  .....</button
                >? <span class="text-danger">*</span></Label
              >

              <select
                class="form-select form-control form-control-sm"
                v-model="formMease.travel_history"
                required
              >
                <option value="">PLEASE SELECT</option>
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.travel_place &&
                  formMease.travel_history == 'Y',
              }"
            >
              <Label class="mb-2"
                >Travel Place<span
                  v-if="formMease.travel_history == 'Y'"
                  class="text-danger"
                >
                  *</span
                ></Label
              >

              <input
                type="text"
                v-model="formMease.travel_place"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMease.travel_history != 'Y'"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.travel_date &&
                  formMease.travel_history == 'Y',
              }"
            >
              <Label class="mb-2"
                >Travel Date<span
                  v-if="formMease.travel_history == 'Y'"
                  class="text-danger"
                >
                  *</span
                ></Label
              >

              <input
                type="date"
                v-model="formMease.travel_date"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMease.travel_history != 'Y'"
                required
              />
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">{{ "< 7 Days From Rash Onset" }}</Label>

              <select
                class="form-select form-control form-control-sm"
                v-model="formMease.less_seven"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">7-23 Days from Rash Onset</Label>

              <select
                class="form-select form-control form-control-sm"
                v-model="formMease.more_seven"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted && !validationStatus.confirmed_measles,
              }"
            >
              <Label class="mb-2"
                >Was there Contact with a Confirmed Measles<button
                  type="button"
                  class="btn btn-sm btn-light-info text-info p-0 m-0"
                  v-tooltip.top="{
                    value: `<h6 class='text-white'>Was there Contact with a Confirmed Measles Case 7-23 Days Prior to Rash Onset?</h6>`,
                    escape: true,
                    class: 'bg-dark rounded p-1',
                  }"
                >
                  .....</button
                >? <span class="text-danger">*</span></Label
              >

              <select
                class="form-select form-control form-control-sm"
                @change="zxc"
                v-model="formMease.confirmed_measles"
                required
              >
                <option value="">PLEASE SELECT</option>
                <option value="Y">YES</option>
                <option value="N">NO</option>
                <option value="U">UNKNOWN</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted && !validationStatus.confirmed_rubella,
              }"
            >
              <Label class="mb-2"
                >Was there Contact with a Confirmed Rubella<button
                  type="button"
                  class="btn btn-sm btn-light-info text-info p-0 m-0"
                  v-tooltip.top="{
                    value: `<h6 class='text-white'>Was there Contact with a Confirmed Rubella Case 7-23 Days Prior to Rash Onset?</h6>`,
                    escape: true,
                    class: 'bg-dark rounded p-1',
                  }"
                >
                  .....</button
                >? <span class="text-danger">*</span></Label
              >

              <select
                class="form-select form-control form-control-sm"
                @change="zxc"
                v-model="formMease.confirmed_rubella"
                required
              >
                <option value="">PLEASE SELECT</option>
                <option value="Y">YES</option>
                <option value="N">NO</option>
                <option value="U">UNKNOWN</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">If Yes, Name of Contact</Label>
              <input
                type="text"
                v-model="formMease.confirmed_name"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="disabledContact"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Place of Contact</Label>
              <input
                type="text"
                v-model="formMease.confirmed_place"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="disabledContact"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Date of Contact </Label>
              <input
                type="date"
                v-model="formMease.date_contact"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="disabledContact"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </form-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, inject, watch } from "vue";
import {
  swalConfirmation,
  swalMessage,
  trimZeroes,
  decryptData,
  NumericOnly,
} from "@/composables";
import FormCard from "@/components/cards/FormCard.vue";
import * as fnMease from "../functions/measles";
import { useStore } from "vuex";
export default defineComponent({
  name: "MeaslesExposure",
  props: {
    saveSubmitted: {
      type: Boolean,
    },
    validationStatus: {
      type: Object,
    },
  },
  components: {
    FormCard,
  },
  setup() {
    const store = useStore();
    const formDiseaseHistory = computed(() => store.getters.getDiseaseHistory);
    const formMease = computed(() => store.getters.getMease);
    return {
      NumericOnly,
      fnMease,
      formDiseaseHistory,
      formMease,
    };
  },
});
</script>

<style scoped></style>
