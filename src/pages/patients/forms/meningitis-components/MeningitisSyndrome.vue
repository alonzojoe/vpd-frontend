<template>
  <form-card title="A. For Acute Encephalitis Syndrome">
    <template v-slot:formInput>
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted && !validationStatus.acase_classification,
              }"
            >
              <Label class="mb-2"
                >A. Case Classification
                <span class="text-danger">*</span></Label
              >
              <select
                class="form-select form-control form-control-sm"
                @change="fnMenin.changeAes($event)"
                v-model="formMenin.acase_classification"
                required
              >
                <option value="">PLEASE SELECT</option>
                <option value="SUS">Suspected</option>
                <option value="LAB">Laboratory confirmed JE</option>
                <option value="PROB">Probable JE</option>
                <option value="AESOTHER">AES other agent</option>
                <option value="U">Unknown</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.aes_other &&
                  formMenin.acase_classification == 'AESOTHER',
              }"
            >
              <Label class="mb-2"
                >A. AES Other Agent
                <span
                  v-if="formMenin.acase_classification == 'AESOTHER'"
                  class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="text"
                v-model="formMenin.aes_other"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.acase_classification != 'AESOTHER'"
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
  name: "MeningitisSyndrome",
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
