<template>
  <form-card title="Case Management">
    <template v-slot:formInput>
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <div class="search">
              <Label class="mb-2"
                >Where Blood/CSF Extracted<button
                  type="button"
                  class="btn btn-sm btn-light-info text-info p-0 m-0"
                  v-tooltip.top="{
                    value: `<h6 class='text-white'>Where Blood/CSF Extracted Before the First Dose of Antibiotics Was Given to the Patient?`,
                    escape: true,
                    class: 'bg-dark rounded p-1',
                  }"
                >
                  .....</button
                >?</Label
              >
              <select
                class="form-select form-control form-control-sm"
                v-model="formMenin.where_blood"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
                <option value="U">UNKNOWN</option>
              </select>
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
  name: "MeningitisCase",
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
