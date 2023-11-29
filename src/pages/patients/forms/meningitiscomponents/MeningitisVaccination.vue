<template>
  <form-card title="Vacination History">
    <template v-slot:formInput>
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">JE</Label>
              <select
                class="form-select form-control form-control-sm"
                @change="fnMenin.changeJe($event)"
                v-model="formMenin.je"
              >
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
                  !validationStatus.je_datedose &&
                  formMenin.je == 'Y',
              }"
            >
              <Label class="mb-2"
                >JE Date Last Dose
                <span v-if="formMenin.je == 'Y'" class="text-danger">*</span>
              </Label>
              <input
                type="date"
                v-model="formMenin.je_datedose"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.je != 'Y'"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.je_doses &&
                  formMenin.je == 'Y',
              }"
            >
              <Label class="mb-2"
                >JE No. of Doses
                <span v-if="formMenin.je == 'Y'" class="text-danger">*</span>
              </Label>
              <input
                type="text"
                v-model="formMenin.je_doses"
                class="form-control form-control-sm w-100 custom-font"
                @keypress="NumericOnly()"
                maxlength="2"
                :disabled="formMenin.je != 'Y'"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Penta-Hib</Label>
              <select
                class="form-select form-control form-control-sm"
                @change="fnMenin.changePenta($event)"
                v-model="formMenin.penta"
              >
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
                  !validationStatus.penta_datedose &&
                  formMenin.penta == 'Y',
              }"
            >
              <Label class="mb-2"
                >Penta-Hib Date Last Dose
                <span v-if="formMenin.penta == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formMenin.penta_datedose"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                maxlength="2"
                :disabled="formMenin.penta != 'Y'"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.penta_doses &&
                  formMenin.penta == 'Y',
              }"
            >
              <Label class="mb-2"
                >Penta-Hib No. of Doses
                <span v-if="formMenin.penta == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="text"
                v-model="formMenin.penta_doses"
                @keypress="NumericOnly()"
                maxlength="2"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.penta != 'Y'"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Measles</Label>
              <select
                class="form-select form-control form-control-sm"
                @change="fnMenin.changeMeasles($event)"
                v-model="formMenin.measles"
              >
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
                  !validationStatus.measles_datedose &&
                  formMenin.measles == 'Y',
              }"
            >
              <Label class="mb-2"
                >Measles Date Last Dose
                <span v-if="formMenin.measles == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="date"
                :max="currentDate"
                v-model="formMenin.measles_datedose"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.measles != 'Y'"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.measles_doses &&
                  formMenin.measles == 'Y',
              }"
            >
              <Label class="mb-2"
                >Measles No. of Doses
                <span v-if="formMenin.measles == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="text"
                v-model="formMenin.measles_doses"
                @keypress="NumericOnly()"
                maxlength="2"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.measles != 'Y'"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Meningococcal</Label>
              <select
                class="form-select form-control form-control-sm"
                @change="fnMenin.changeMeningo($event)"
                v-model="formMenin.meningo"
              >
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
                  !validationStatus.meningo_datedose &&
                  formMenin.meningo == 'Y',
              }"
            >
              <Label class="mb-2"
                >Meningococcal Date Last Dose
                <span v-if="formMenin.meningo == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formMenin.meningo_datedose"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.meningo != 'Y'"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.meningo_doses &&
                  formMenin.meningo == 'Y',
              }"
            >
              <Label class="mb-2"
                >Meningococcal No. of Doses
                <span v-if="formMenin.meningo == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="text"
                v-model="formMenin.meningo_doses"
                @keypress="NumericOnly()"
                maxlength="2"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.meningo != 'Y'"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Pneumococcal</Label>
              <select
                class="form-select form-control form-control-sm"
                @change="fnMenin.changePneumo($event)"
                v-model="formMenin.pneumo"
              >
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
                  !validationStatus.pneumo_datedose &&
                  formMenin.pneumo == 'Y',
              }"
            >
              <Label class="mb-2"
                >Pneumococcal Date Last Dose
                <span v-if="formMenin.pneumo == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formMenin.pneumo_datedose"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.pneumo != 'Y'"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.pneumo_doses &&
                  formMenin.pneumo == 'Y',
              }"
            >
              <Label class="mb-2"
                >Pneumococcal No. of Doses
                <span v-if="formMenin.pneumo == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="text"
                v-model="formMenin.pneumo_doses"
                @keypress="NumericOnly()"
                maxlength="2"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.pneumo != 'Y'"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">PCV10</Label>
              <select
                class="form-select form-control form-control-sm"
                @change="fnMenin.changePcv10($event)"
                v-model="formMenin.pcv10"
              >
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
                  !validationStatus.pcv10_datedose &&
                  formMenin.pcv10 == 'Y',
              }"
            >
              <Label class="mb-2"
                >PCV10 Date Last Dose
                <span v-if="formMenin.pcv10 == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formMenin.pcv10_datedose"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.pcv10 != 'Y'"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.pcv10_doses &&
                  formMenin.pcv10 == 'Y',
              }"
            >
              <Label class="mb-2"
                >PCV10 No. of Doses
                <span v-if="formMenin.pcv10 == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="text"
                v-model="formMenin.pcv10_doses"
                @keypress="NumericOnly()"
                maxlength="2"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.pcv10 != 'Y'"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">PCV13</Label>
              <select
                class="form-select form-control form-control-sm"
                @change="fnMenin.changePcv13($event)"
                v-model="formMenin.pcv13"
              >
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
                  !validationStatus.pcv13_datedose &&
                  formMenin.pcv13 == 'Y',
              }"
            >
              <Label class="mb-2"
                >PCV13 Date Last Dose
                <span v-if="formMenin.pcv13 == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formMenin.pcv13_datedose"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.pcv13 != 'Y'"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.pcv13_doses &&
                  formMenin.pcv13 == 'Y',
              }"
            >
              <Label class="mb-2"
                >PCV13 No. of Doses
                <span v-if="formMenin.pcv13 == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="text"
                v-model="formMenin.pcv13_doses"
                @keypress="NumericOnly()"
                maxlength="2"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.pcv13 != 'Y'"
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
