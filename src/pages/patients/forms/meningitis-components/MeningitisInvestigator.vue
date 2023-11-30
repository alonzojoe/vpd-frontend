<template>
  <form-card title="Details of Investigator">
    <template v-slot:formInput>
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted && !validationStatus.investigator_name,
              }"
            >
              <Label class="mb-2"
                >Name of Investigator <span class="text-danger">*</span></Label
              >

              <input
                type="text"
                v-model="formMenin.investigator_name"
                class="form-control form-control-sm w-100 custom-font"
                maxlength="255"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid': saveSubmitted && !validationStatus.position,
              }"
            >
              <Label class="mb-2"
                >Position / Designation
                <span class="text-danger">*</span></Label
              >
              <input
                type="text"
                v-model="formMenin.position"
                class="form-control form-control-sm w-100 custom-font"
                maxlength="255"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid': saveSubmitted && !validationStatus.contact,
              }"
            >
              <Label class="mb-2"
                >Contact No. <span class="text-danger">*</span></Label
              >
              <input
                type="text"
                v-model="formMenin.contact"
                maxlength="11"
                @keypress="NumericOnly()"
                class="form-control form-control-sm w-100 custom-font"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted && !validationStatus.investigation_date,
              }"
            >
              <Label class="mb-2"
                >Date of Investigation <span class="text-danger">*</span></Label
              >
              <input
                type="date"
                v-model="formMenin.investigation_date"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid': saveSubmitted && !validationStatus.report_date,
              }"
            >
              <Label class="mb-2"
                >Date of Report to CHD <span class="text-danger">*</span></Label
              >
              <input
                type="date"
                v-model="formMenin.report_date"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
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
  name: "MeningitisInvestigator",
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
