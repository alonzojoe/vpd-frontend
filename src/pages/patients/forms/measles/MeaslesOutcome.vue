<template>
  <form-card title="Outcome">
    <template v-slot:formInput>
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
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
                @change="fnMease.changeOutcomed($event)"
                v-model="formMease.outcome"
                required
              >
                <option value="">Please Select</option>
                <option value="A">Alive</option>
                <option value="D">Died</option>
                <option value="HAMA">HAMA</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.date_died &&
                  formMease.outcome == 'D',
              }"
            >
              <Label class="mb-2"
                >Date Died
                <span class="text-danger" v-if="formMease.outcome == 'D'"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formMease.date_died"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMease.outcome != 'D'"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Final Diagnosis</Label>
              <textarea
                class="form-control form-control-sm custom-font"
                v-model="formMease.final_diagnosis"
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
import * as fnMease from "../functions/measles";
import { useStore } from "vuex";
export default defineComponent({
  name: "MeaslesOutcome",
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
