<template>
  <form-card title="Vaccination History and Vitamin A Supplementation">
    <template v-slot:formInput>
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Working/Final Diagnosis</Label>
              <input
                type="text"
                v-model="formMease.working_diagnosis"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2"
                >Received Measles-Containing Vaccine(MCV)<button
                  type="button"
                  class="btn btn-sm btn-light-info text-info p-0 m-0"
                  v-tooltip.top="{
                    value: `<h6 class='text-white'>Patient Received Measles-Containing Vaccine(MCV) If, Yes, Indicate the Number of Doses Which is Applicable</h6>`,
                    escape: true,
                    class: 'bg-dark rounded p-1',
                  }"
                >
                  .....</button
                >?
              </Label>
              <select
                class="form-select form-control form-control-sm"
                @change="fnMease.changeMCV($event)"
                v-model="formMease.received_mcv"
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
                  saveSubmitted &&
                  !validationStatus.mcv_dose &&
                  formMease.received_mcv == 'Y',
              }"
            >
              <Label class="mb-2"
                >MV No. of Doses
                <span class="text-danger" v-if="formMease.received_mcv == 'Y'"
                  >*</span
                ></Label
              >
              <select
                class="form-select form-control form-control-sm"
                v-model="formMease.mcv_dose"
                :disabled="formMease.received_mcv != 'Y'"
                :required="formMease.received_mcv == 'Y'"
              >
                <option value="">Please Select</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="2">3</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.mr_dose &&
                  formMease.received_mcv == 'Y',
              }"
            >
              <Label class="mb-2"
                >MR No. of Doses
                <span class="text-danger" v-if="formMease.received_mcv == 'Y'"
                  >*</span
                ></Label
              >
              <select
                class="form-select form-control form-control-sm"
                v-model="formMease.mr_dose"
                :disabled="formMease.received_mcv != 'Y'"
                :required="formMease.received_mcv == 'Y'"
              >
                <option value="">Please Select</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="2">3</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.mmr_dose &&
                  formMease.received_mcv == 'Y',
              }"
            >
              <Label class="mb-2"
                >MMR No. of Doses
                <span class="text-danger" v-if="formMease.received_mcv == 'Y'"
                  >*</span
                ></Label
              >
              <select
                class="form-select form-control form-control-sm"
                v-model="formMease.mmr_dose"
                :disabled="formMease.received_mcv != 'Y'"
                :required="formMease.received_mcv == 'Y'"
              >
                <option value="">Please Select</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="2">3</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.date_last_mcv &&
                  formMease.received_mcv == 'Y',
              }"
            >
              <Label class="mb-2"
                >Date Last Dose Received MCV
                <span class="text-danger" v-if="formMease.received_mcv == 'Y'"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formMease.date_last_mcv"
                :max="currentDate"
                :disabled="formMease.received_mcv != 'Y'"
                :required="formMease.received_mcv == 'Y'"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.validated_through &&
                  formMease.received_mcv == 'Y',
              }"
            >
              <Label class="mb-2"
                >Measles Vaccine Recevied Validated Through
                <span class="text-danger" v-if="formMease.received_mcv == 'Y'"
                  >*</span
                ></Label
              >
              <select
                class="form-select form-control form-control-sm"
                v-model="formMease.validated_through"
                :disabled="formMease.received_mcv != 'Y'"
                :required="formMease.received_mcv == 'Y'"
              >
                <option value="">Please Select</option>
                <option value="VCARD">Vaccination Card</option>
                <option value="LOGSHEET">Log Sheet</option>
                <option value="RECALL">By Recall</option>
                <option value="OTHERS">Others</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.received_campaigns &&
                  formMease.received_mcv == 'Y',
              }"
            >
              <Label class="mb-2"
                >Was Vaccination Received During Campaigns<button
                  type="button"
                  class="btn btn-sm btn-light-info text-info p-0 m-0"
                  v-tooltip.top="{
                    value: `<h6 class='text-white'>Was Vaccination Received During Special Campaigns?</h6>`,
                    escape: true,
                    class: 'bg-dark rounded p-1',
                  }"
                  required
                >
                  .....</button
                >?
                <span class="text-danger" v-if="formMease.received_mcv == 'Y'"
                  >*</span
                ></Label
              >
              <select
                class="form-select form-control form-control-sm"
                v-model="formMease.received_campaigns"
                :disabled="formMease.received_mcv != 'Y'"
                :required="formMease.received_mcv == 'Y'"
              >
                <option value="">Please Select</option>
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
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
import moment from "moment";
export default defineComponent({
  name: "MeaslesVaccination",
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
    const currentDate = moment(Date.now()).format("yyyy-MM-DD");
    return {
      NumericOnly,
      fnMease,
      formDiseaseHistory,
      formMease,
      currentDate,
    };
  },
});
</script>

<style scoped></style>
