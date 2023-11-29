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
            <div
              class="search"
              :class="{
                'group-invalid': saveSubmitted && !validationStatus.admitted,
              }"
            >
              <Label class="mb-2"
                >Admitted? <span class="text-danger">*</span></Label
              >
              <select
                class="form-select form-control form-control-sm"
                @change="fnMenin.changeAdmitted($event)"
                v-model="formMenin.admitted"
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
                  !validationStatus.date_admitted &&
                  formMenin.admitted == 'Y',
              }"
            >
              <Label class="mb-2"
                >Date Admitted
                <span v-if="formMenin.admitted == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formMenin.date_admitted"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.admitted != 'Y'"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid': saveSubmitted && !validationStatus.date_onset,
              }"
            >
              <Label class="mb-2"
                >Date of Onset of Illness
                <span class="text-danger">*</span></Label
              >
              <input
                type="date"
                v-model="formMenin.date_onset"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Fever </Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMenin.fever"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Change in Mental Status</Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMenin.mental_status"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">New-onset Seizures</Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMenin.onset_seizure"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Neck Stiffneess</Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMenin.neck_stiffness"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Meningeal Signs</Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMenin.meningeal_signs"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">CNS Infection </Label>
              <select
                class="form-select form-control form-control-sm"
                @change="fnMenin.changeCns($event)"
                v-model="formMenin.cns"
              >
                <option value="">PLEASE SELECT</option>
                <option value="SBM">Suspected Bacterial Meningitis</option>
                <option value="SE">Suspected Encephalitis</option>
                <option value="O">Others</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.cns_others &&
                  formMenin.cns == 'O',
              }"
            >
              <Label class="mb-2"
                >CNS Others Specify
                <span v-if="formMenin.cns == 'O'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="text"
                v-model="formMenin.cns_others"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.cns != 'O'"
                maxlength="255"
                required
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
import * as fnMenin from "../functions/meningitis";
import { useStore } from "vuex";
import moment from "moment";

export default defineComponent({
  name: "MeningitisClinical",
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
    const formMenin = computed(() => store.getters.getMenin);
    const currentDate = moment(Date.now()).format("yyyy-MM-DD");

    return { NumericOnly, fnMenin, formDiseaseHistory, currentDate, formMenin };
  },
});
</script>

<style scoped></style>
