<template>
  <form-card title="Immunization History">
    <template v-slot:formInput>
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted && !validationStatus.received_rota,
              }"
            >
              <Label class="mb-2"
                >Received Rotavirus Vaccine?
                <span class="text-danger">*</span></Label
              >
              <select
                class="form-select form-control form-control-sm"
                @change="validFn.changeDose($event)"
                v-model="formRota.received_rota"
                required
              >
                <option value="">PLEASE SELECT</option>
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.dose_received &&
                  formRota.received_rota == 'Y',
              }"
            >
              <Label class="mb-2"
                >If Yes, Total dose received
                <span v-if="formRota.received_rota == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="text"
                v-model="formRota.dose_received"
                @keypress="NumericOnly()"
                :disabled="formRota.received_rota != 'Y'"
                :required="formRota.received_rota == 'Y'"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div class="search">
              <Label class="mb-2">Date First Dose received</Label>
              <input
                type="date"
                v-model="formRota.first_dose"
                :max="currentDate"
                :disabled="formRota.received_rota != 'Y'"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div class="search">
              <Label class="mb-2">Date Second Dose received</Label>
              <input
                type="date"
                v-model="formRota.second_dose"
                :max="currentDate"
                :disabled="formRota.received_rota != 'Y'"
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
  name: "RotaImmuniation",
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
    return { currentDate, formDiseaseHistory, formRota, validFn };
  },
});
</script>

<style scoped></style>
