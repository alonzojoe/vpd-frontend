<template>
  <form-card title="Clinical Data">
    <template v-slot:formInput>
      <div>
        <div class="row">
          <div
            class="col-sm-12 col-md-6 col-lg-3 mb-2"
            v-if="!patient.registry"
          >
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
          <div
            class="col-sm-12 col-md-6 col-lg-3 mb-2"
            v-if="!patient.registry"
          >
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
          <div
            class="col-sm-12 col-md-6 col-lg-3 mb-2"
            v-if="formData.gender == 2"
          >
            <div
              class="search"
              :class="{
                'group-invalid': saveSubmitted && !validationStatus.pregnant,
              }"
            >
              <Label class="mb-2"
                >Pregnant <span class="text-danger">*</span></Label
              >
              <select
                class="form-select form-control form-control-sm"
                v-model="formMease.pregnant"
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
                'group-invalid': saveSubmitted && !validationStatus.admitted,
              }"
            >
              <Label class="mb-2"
                >Admitted <span class="text-danger">*</span></Label
              >
              <select
                class="form-select form-control form-control-sm"
                v-model="formMease.admitted"
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
                  saveSubmitted && !validationStatus.date_admitted,
              }"
            >
              <Label class="mb-2"
                >Date Admitted/Seen/Consulted
                <span class="text-danger">*</span></Label
              >
              <input
                type="date"
                v-model="formMease.date_admitted"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Name of Parent / Caregiver </Label>
              <input
                type="text"
                v-model="formMease.caregiver_name"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Contact No.</Label>
              <input
                type="text"
                v-model="formMease.caregiver_contact"
                maxlength="11"
                @keypress="NumericOnly()"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted && !validationStatus.reporter_date,
              }"
            >
              <Label class="mb-2"
                >Date of Report <span class="text-danger">*</span></Label
              >
              <input
                type="date"
                v-model="formMease.reporter_date"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Name of Reporter</Label>
              <input
                type="text"
                v-model="formMease.reporter_name"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Reporter Contact No. </Label>
              <input
                type="text"
                v-model="formMease.reporter_contact"
                maxlength="11"
                @keypress="NumericOnly()"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted && !validationStatus.investigate_date,
              }"
            >
              <Label class="mb-2"
                >Date of Investigation <span class="text-danger">*</span></Label
              >
              <input
                type="date"
                v-model="formMease.investigate_date"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Name of Investigator/s </Label>
              <input
                type="text"
                v-model="formMease.investigate_name"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Investigator Contact No. </Label>
              <input
                type="text"
                v-model="formMease.investigate_contact"
                maxlength="11"
                @keypress="NumericOnly()"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Fever</Label>
              <select
                class="form-select form-control form-control-sm"
                @change="fnMease.changeFever($event)"
                v-model="formMease.fever"
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
                  !validationStatus.fever_date &&
                  formMease.fever == 'Y',
              }"
            >
              <Label class="mb-2"
                >Date Onset (Fever)
                <span v-if="formMease.fever == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formMease.fever_date"
                :max="currentDate"
                :disabled="formMease.fever != 'Y'"
                :required="formMease.fever == 'Y'"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Rash</Label>
              <select
                class="form-select form-control form-control-sm"
                @change="fnMease.changeRash($event)"
                v-model="formMease.rash"
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
                  !validationStatus.rash_date &&
                  formMease.rash == 'Y',
              }"
            >
              <Label class="mb-2"
                >Date Onset (Rash)
                <span v-if="formMease.rash == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formMease.rash_date"
                :max="currentDate"
                :disabled="formMease.rash != 'Y'"
                :required="formMease.rash == 'Y'"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Cough</Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMease.cough"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Koplik Sign</Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMease.koplik"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Runny Nose/Coryza </Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMease.runny_nose"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Red Eyes/Conjunctivitis </Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMease.red_eyes"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Artharalgia/Arthritis </Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMease.artharalgia"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Swollen Lymphatic Nodules </Label>
              <select
                class="form-select form-control form-control-sm"
                @change="fnMease.changeLymph($event)"
                v-model="formMease.swollen_lymp"
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
                  !validationStatus.lym_location &&
                  formMease.swollen_lymp == 'Y',
              }"
            >
              <Label class="mb-2"
                >If, Yes Lymphatic Specify Location
                <span v-if="formMease.swollen_lymp == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <select
                class="form-select form-control form-control-sm"
                @change="fnMease.changeLymphLocation($event)"
                v-model="formMease.lym_location"
                :disabled="formMease.swollen_lymp != 'Y'"
                :required="formMease.swollen_lymp == 'Y'"
              >
                <option value="">PLEASE SELECT</option>
                <option value="CER">Cervical</option>
                <option value="SUB-OCCI">Sub-occipital</option>
                <option value="POST-AUR">Post-auricular</option>
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
                  !validationStatus.lymp_others &&
                  formMease.lym_location == 'OTHERS',
              }"
            >
              <Label class="mb-2"
                >Others Specify
                <span
                  class="text-danger"
                  v-if="formMease.lym_location == 'OTHERS'"
                  >*</span
                ></Label
              >
              <input
                type="text"
                v-model="formMease.lymp_others"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMease.lym_location != 'OTHERS'"
                :required="formMease.lym_location == 'OTHERS'"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Are there any Complications? </Label>
              <select
                class="form-select form-control form-control-sm"
                @change="fnMease.changeComplication($event)"
                v-model="formMease.complications"
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
                  !validationStatus.complications_specify &&
                  formMease.complications == 'Y',
              }"
            >
              <Label class="mb-2"
                >If Yes, Specify
                <span class="text-danger" v-if="formMease.complications == 'Y'"
                  >*</span
                ></Label
              >
              <input
                type="text"
                v-model="formMease.complications_specify"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMease.complications != 'Y'"
                :required="formMease.complications == 'Y'"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Others Symptoms </Label>
              <input
                type="text"
                v-model="formMease.other_symptoms"
                class="form-control form-control-sm w-100 custom-font"
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
  name: "Measles Clinical",
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
