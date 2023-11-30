<template>
  <form-card title="Outcome">
    <template v-slot:formInput>
      <div>
        <div class="row">
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
                @change="fnMenin.changeOutcome($event)"
                v-model="formMenin.outcome"
                required
              >
                <option value="">PLEASE SELECT</option>
                <option value="A">Alive</option>
                <option value="D">Died</option>
                <option value="HAMA">Home Against Medical Advice</option>
              </select>
            </div>
          </div>
          <div
            class="col-sm-12 col-md-6 col-lg-6 mb-2"
            v-if="formMenin.outcome == 'A'"
          >
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.date_discharge &&
                  formMenin.outcome == 'A',
              }"
            >
              <Label class="mb-2"
                >Date of Discharge <span class="text-danger">*</span></Label
              >
              <input
                type="date"
                v-model="formMenin.date_discharge"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                required
              />
            </div>
          </div>
          <div
            class="col-sm-12 col-md-6 col-lg-6 mb-2"
            v-if="formMenin.outcome == 'D'"
          >
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.date_died &&
                  formMenin.outcome == 'D',
              }"
            >
              <Label class="mb-2"
                >Date of Death <span class="text-danger">*</span></Label
              >
              <input
                type="date"
                v-model="formMenin.date_died"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                required
              />
            </div>
          </div>
          <div
            class="col-sm-12 col-md-6 col-lg-6 mb-2"
            v-if="formMenin.outcome == 'HAMA'"
          >
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.date_hama &&
                  formMenin.outcome == 'HAMA',
              }"
            >
              <Label class="mb-2"
                >Date if HAMA <span class="text-danger">*</span></Label
              >
              <input
                type="date"
                v-model="formMenin.date_hama"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div class="search">
              <Label class="mb-2"
                >Date of ff-up<button
                  type="button"
                  class="btn btn-sm btn-light-info text-info p-0 m-0"
                  v-tooltip.top="{
                    value: `<h6 class='text-white'>If JE, ff-up after 3 mos</h6>`,
                    escape: true,
                    class: 'bg-dark rounded p-1',
                  }"
                  required
                >
                  .....</button
                >?</Label
              >
              <input
                type="date"
                v-model="formMenin.date_follow"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div class="search">
              <Label class="mb-2">Status at ff-up</Label>
              <input
                type="text"
                v-model="formMenin.status_follow"
                class="form-control form-control-sm w-100 custom-font"
                maxlength="255"
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
  name: "MeningitisOutcome",
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
