<template>
  <form-card title="B. For Bacterial Meningitis">
    <template v-slot:formInput>
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted && !validationStatus.bcase_classification,
              }"
            >
              <Label class="mb-2"
                >B. Case Classification
                <span class="text-danger">*</span></Label
              >
              <select
                class="form-select form-control form-control-sm"
                @change="fnMenin.changeConfirmed($event)"
                v-model="formMenin.bcase_classification"
                required
              >
                <option value="">PLEASE SELECT</option>
                <option value="SUS">Suspected Meningitis</option>
                <option value="PROB">Probable Bacterial Meningitis</option>
                <option value="CON">Confirmed Meningitis</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.confirmed_case &&
                  formMenin.bcase_classification == 'CON',
              }"
            >
              <Label class="mb-2"
                >B. Confirmed,Confirmatory Test
                <span
                  v-if="formMenin.bcase_classification == 'CON'"
                  class="text-danger"
                  >*</span
                >
              </Label>
              <input
                type="text"
                v-model="formMenin.confirmed_case"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.bcase_classification != 'CON'"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-12 mb-2">
            <div class="search">
              <Label class="mb-2">B. Final Diagnosis</Label>
              <input
                type="text"
                v-model="formMenin.final_diagnosis"
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
import * as fnMenin from "../functions/meningitis";
import { useStore } from "vuex";
import moment from "moment";

export default defineComponent({
  name: "MeningitisBacterial",
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
