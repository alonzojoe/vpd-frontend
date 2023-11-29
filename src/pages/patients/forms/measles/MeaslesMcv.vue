<template>
  <form-card title="If Patient Did Not Received Any MCV, State Reason/s">
    <template v-slot:formInput>
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input primary check-outline outline-primary"
                  type="checkbox"
                  id="was-busy"
                  v-model="formMease.mom_busy"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="was-busy"
                  >Mother Was Busy</label
                >
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input primary check-outline outline-primary"
                  type="checkbox"
                  id="was-sick"
                  v-model="formMease.child_sick"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="was-sick"
                  >Child Was Sick</label
                >
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input primary check-outline outline-primary"
                  type="checkbox"
                  id="forgot-sched"
                  v-model="formMease.forgot_sched"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="forgot-sched"
                  >Forgot Schedule</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input primary check-outline outline-primary"
                  type="checkbox"
                  id="belief"
                  v-model="formMease.against_belief"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="belief"
                  >Against Belief</label
                >
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input primary check-outline outline-primary"
                  type="checkbox"
                  id="no-vaccine"
                  v-model="formMease.no_available"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="no-vaccine"
                  >No Vaccine Available</label
                >
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div
                class="form-check form-check-inline d-flex align-items-center gap-2"
              >
                <input
                  class="form-check-input primary check-outline outline-primary"
                  type="checkbox"
                  @change="fnMease.chnageOtherReason($event)"
                  id="specify"
                  v-model="formMease.other_reason"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="specify"
                  >Other reasons, Specify</label
                ><input
                  type="text"
                  v-model="formMease.other_reason_specify"
                  class="form-control form-control-sm w-50 custom-font"
                  :class="{
                    'other-reason-specify':
                      saveSubmitted &&
                      !validationStatus.other_reason_specify &&
                      formMease.other_reason == '1',
                  }"
                  :disabled="formMease.other_reason != '1'"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input primary check-outline outline-primary"
                  type="checkbox"
                  id="contra"
                  v-model="formMease.medical_counter"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="contra"
                  >Medical Contraindication</label
                >
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input primary check-outline outline-primary"
                  type="checkbox"
                  id="no-vaccinator"
                  v-model="formMease.no_vaccinator"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="no-vaccinator"
                  >Vaccinator Not Available
                </label>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input primary check-outline outline-primary"
                  type="checkbox"
                  id="fear"
                  v-model="formMease.side_effects"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="fear">
                  Fear of Side Effects
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input primary check-outline outline-primary"
                  type="checkbox"
                  id="ineligible"
                  v-model="formMease.not_eligible"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="ineligible"
                  >Not Eligible for Vaccination</label
                >
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <label class="form-check-label mb-3"
                >Was the Patient Given Vitamin A During this Illness?</label
              ><select
                class="form-select form-control form-control-sm"
                v-model="formMease.vitamin_illness"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
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
import * as fnMease from "../functions/measles";
import { useStore } from "vuex";
export default defineComponent({
  name: "Measles MCV",
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
