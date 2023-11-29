<template>
  <form-card title="Final Classification" class="position-relative">
    <template v-slot:formInput>
      <button
        @click="fnMease.resetClassification()"
        class="btn btn-danger btn-sm reset-btn"
      >
        Reset Selection
      </button>
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input primary"
                    type="radio"
                    id="ch1"
                    value="Laboratory Confirmed Measles"
                    v-model="formMease.final_classification"
                  />
                  <label class="form-check-label" for="ch1"
                    >Laboratory Confirmed Measles</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input primary"
                    type="radio"
                    id="ch2"
                    value="Epi-linked Confirmed Measles"
                    v-model="formMease.final_classification"
                  />
                  <label class="form-check-label" for="ch2"
                    >Epi-linked Confirmed Measles</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input primary"
                    type="radio"
                    id="ch3"
                    value="Clinically Compatible Measles"
                    v-model="formMease.final_classification"
                  />
                  <label class="form-check-label" for="ch3"
                    >Clinically Compatible Measles</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input primary"
                    type="radio"
                    id="ch4"
                    value="Laboratory Confirmed Rubella"
                    v-model="formMease.final_classification"
                  />
                  <label class="form-check-label" for="ch4"
                    >Laboratory Confirmed Rubella</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input primary"
                    type="radio"
                    id="ch5"
                    value="Epi-linked Confirmed Rubella"
                    v-model="formMease.final_classification"
                  />
                  <label class="form-check-label" for="ch5"
                    >Epi-linked Confirmed Rubella</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input primary"
                    type="radio"
                    id="ch6"
                    value="Non-Measles/Rubella Discarded Case"
                    v-model="formMease.final_classification"
                  />
                  <label class="form-check-label" for="ch6"
                    >Non-Measles/Rubella Discarded Case</label
                  >
                </div>
              </div>
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
  name: "Measles Final Classification",
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

<style scoped></style>
