<template>
  <form-card title="Source of Infection" class="position-relative">
    <template v-slot:formInput>
      <button
        @click="fnMease.resetInfection()"
        class="btn btn-danger btn-sm reset-btn"
      >
        Reset Selection
      </button>
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input primary"
                    type="radio"
                    id="si1"
                    value="Endemic"
                    v-model="formMease.source_infection"
                  />
                  <label class="form-check-label" for="si1">Endemic</label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input primary"
                    type="radio"
                    id="si2"
                    value="Imported"
                    v-model="formMease.source_infection"
                  />
                  <label class="form-check-label" for="si2">Imported</label>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-6 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input primary"
                    type="radio"
                    id="si3"
                    value="Import-related"
                    v-model="formMease.source_infection"
                  />
                  <label class="form-check-label" for="si3"
                    >Import-related</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input primary"
                    type="radio"
                    id="si4"
                    value="Unknown"
                    v-model="formMease.source_infection"
                  />
                  <label class="form-check-label" for="si4">Unknown</label>
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
import moment from "moment";
export default defineComponent({
  name: "MeaslesIncome",
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
    const currentDate = moment(Date.now()).format("yyyy-MM-DD");
    return {
      NumericOnly,
      fnMease,
      formDiseaseHistory,
      formMease,
      currentDate,
    };
  },
});
</script>

<style scoped></style>
