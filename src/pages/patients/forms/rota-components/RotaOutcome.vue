<template>
  <form-card title="Classification and Outcome">
    <template v-slot:formInput>
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted && !validationStatus.case_classification,
              }"
            >
              <Label class="mb-2"
                >Case Classification <span class="text-danger">*</span></Label
              >
              <select
                class="form-select form-control form-control-sm"
                v-model="formRota.case_classification"
                required
              >
                <option value="">PLEASE SELECT</option>
                <option value="SUS">SUSPECT</option>
                <option value="PROB">PROBABLE</option>
                <option value="CON">CONFIRMED</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid': saveSubmitted && !validationStatus.outcome,
              }"
            >
              <Label class="mb-2"
                >Outcome <span class="text-danger">*</span></Label
              >
              <select
                class="form-select form-control form-control-sm"
                @change="validFn.changeOutcome($event)"
                v-model="formRota.outcome"
                required
              >
                <option value="">PLEASE SELECT</option>
                <option value="A">ALIVE</option>
                <option value="D">DIED</option>
                <option value="HAMA">HOME AGAINST MEDICAL ADVICE</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.discharge_date &&
                  (formRota.outcome == 'A' || formRota.outcome == 'HAMA'),
              }"
            >
              <Label class="mb-2"
                >Date of Discharge
                <span
                  v-if="formRota.outcome == 'A' || formRota.outcome == 'HAMA'"
                  class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formRota.discharge_date"
                :max="currentDate"
                :disabled="formRota.outcome == '' || formRota.outcome == 'D'"
                :required="
                  formRota.outcome == 'A' || formRota.outcome == 'HAMA'
                "
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.died_date &&
                  formRota.outcome == 'D',
              }"
            >
              <Label class="mb-2"
                >Date Died
                <span v-if="formRota.outcome == 'D'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formRota.died_date"
                :max="currentDate"
                :disabled="formRota.outcome != 'D'"
                :required="formRota.outcome == 'D'"
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
import * as validFn from "../functions/rota";
import { useStore } from "vuex";
import moment from "moment";
export default defineComponent({
  name: "RotaOutcome",
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
    const formRota = computed(() => store.getters.getRota);
    const currentDate = moment(Date.now()).format("yyyy-MM-DD");
    return { NumericOnly, currentDate, formDiseaseHistory, formRota, validFn };
  },
});
</script>

<style scoped></style>
