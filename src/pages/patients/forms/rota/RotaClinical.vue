<template>
  <form-card title="Clinical Data">
    <template v-slot:formInput>
      <div>
        <div class="row" v-if="!patient.registry">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Case ID </Label>
              <input
                type="text"
                v-model="formDiseaseHistory.case_id"
                class="form-control form-control-sm w-100 custom-font"
                disabled
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Ep ID </Label>
              <input
                type="text"
                v-model="formDiseaseHistory.ep_id"
                class="form-control form-control-sm w-100 custom-font"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Date of Onset Diarrhea</Label>
              <input
                type="date"
                v-model="formRota.onset_diarrhea"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted && !validationStatus.patient_admitted,
              }"
            >
              <Label class="mb-2"
                >Was the Patient Admitted at the Ward?
                <span class="text-danger">*</span></Label
              >
              <select
                class="form-select form-control form-control-sm"
                @change="validFn.changeAdmitted($event)"
                v-model="formRota.patient_admitted"
                required
              >
                <option value="">PLEASE SELECT</option>
                <option value="Y">YES</option>
                <option value="N">NO</option>
                <option value="U">UNKNOWN</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.admission_date &&
                  formRota.patient_admitted == 'Y',
              }"
            >
              <Label class="mb-2"
                >If Yes, Date of Admission
                <span
                  class="text-danger"
                  v-if="formRota.patient_admitted == 'Y'"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formRota.admission_date"
                :max="currentDate"
                :disabled="formRota.patient_admitted != 'Y'"
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
                'group-invalid':
                  saveSubmitted && !validationStatus.rehydration_therapy,
              }"
            >
              <Label class="mb-2"
                >Did Patient Receive IV Rehydration Therapy<button
                  type="button"
                  class="btn btn-sm btn-light-info text-info p-0 m-0"
                  v-tooltip.top="{
                    value: `<h6 class='text-white'>Did Patient Receive IV Rehydration Therapy while at the ER?</h6>`,
                    escape: true,
                    class: 'bg-dark rounded p-1',
                  }"
                  required
                >
                  .....</button
                >? <span class="text-danger">*</span></Label
              >
              <select
                class="form-select form-control form-control-sm"
                v-model="formRota.rehydration_therapy"
                required
              >
                <option value="">PLEASE SELECT</option>
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted && !validationStatus.prev_hospitalization,
              }"
            >
              <Label class="mb-2"
                >Did Patient Have Previous Hospitalization<button
                  type="button"
                  class="btn btn-sm btn-light-info text-info p-0 m-0"
                  v-tooltip.top="{
                    value: `<h6 class='text-white'>Did Patient Have Previous Hospitalization due to Diarrhea?</h6>`,
                    escape: true,
                    class: 'bg-dark rounded p-2',
                  }"
                >
                  .....</button
                >? <span class="text-danger">*</span></Label
              >
              <select
                class="form-select form-control form-control-sm"
                @change="validFn.changeHospitalization($event)"
                v-model="formRota.prev_hospitalization"
                required
              >
                <option value="">PLEASE SELECT</option>
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.date_hospitalization &&
                  formRota.prev_hospitalization == 'Y',
              }"
            >
              <Label class="mb-2"
                >If Yes, Date of Hospitalization
                <span
                  v-if="formRota.prev_hospitalization == 'Y'"
                  class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formRota.date_hospitalization"
                :max="currentDate"
                :disabled="formRota.prev_hospitalization != 'Y'"
                class="form-control form-control-sm w-100 custom-font"
                :required="formRota.prev_hospitalization == 'Y'"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid': saveSubmitted && !validationStatus.vomiting,
              }"
            >
              <Label class="mb-2"
                >Vomitting? <span class="text-danger">*</span></Label
              >
              <select
                class="form-select form-control form-control-sm"
                @change="validFn.changeVomitting($event)"
                v-model="formRota.vomiting"
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
                  !validationStatus.date_vomiting &&
                  formRota.vomiting == 'Y',
              }"
            >
              <Label class="mb-2"
                >Date of Onset Vomitting
                <span v-if="formRota.vomiting == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formRota.date_vomiting"
                :max="currentDate"
                :disabled="formRota.vomiting != 'Y'"
                :required="formRota.vomiting == 'Y'"
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
                  !validationStatus.degree_dehydration &&
                  formRota.vomiting == 'Y',
              }"
            >
              <Label class="mb-2"
                >Degree of Dehyrdation?
                <span v-if="formRota.vomiting == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <select
                class="form-select form-control form-control-sm"
                v-model="formRota.degree_dehydration"
                :disabled="formRota.vomiting != 'Y'"
                :required="formRota.vomiting == 'Y'"
              >
                <option value="">PLEASE SELECT</option>
                <option value="NO">NO DEHYDRATION</option>
                <option value="SOM">SOME DEHYDRATION</option>
                <option value="SEV">SEVERE DEHYDRATION</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid': saveSubmitted && !validationStatus.fever,
              }"
            >
              <Label class="mb-2"
                >Fever? <span class="text-danger">*</span></Label
              >
              <select
                class="form-select form-control form-control-sm"
                v-model="formRota.fever"
                required
              >
                <option value="">PLEASE SELECT</option>
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div class="search">
              <Label class="mb-2">Admitting Diagnosis</Label>
              <textarea
                class="form-control form-control-sm custom-font"
                v-model="formRota.admitting_diagnosis"
                rows="4"
              ></textarea>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div class="search">
              <Label class="mb-2">Final Diagnosis</Label>
              <textarea
                class="form-control form-control-sm custom-font"
                v-model="formRota.final_diagnosis"
                rows="4"
              ></textarea>
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
import * as validFn from "../functions/rota";
import { useStore } from "vuex";
import moment from "moment";
export default defineComponent({
  name: "RotaClinical",
  props: {
    patient: {
      type: Object,
    },
    formData: {
      type: Object,
    },
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
    const formRota = computed(() => store.getters.getRota);
    const currentDate = moment(Date.now()).format("yyyy-MM-DD");
    return { currentDate, formDiseaseHistory, formRota };
  },
});
</script>

<style scoped></style>
