<template>
  <form-card title="Tick The Type of Place Where Exposure Probably Occur">
    <template v-slot:formInput>
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input primary check-outline outline-primary"
                  type="checkbox"
                  id="daycare"
                  v-model="formMease.day_care"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="daycare">Day Care</label>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input primary check-outline outline-primary"
                  type="checkbox"
                  id="barangay"
                  v-model="formMease.barangay"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="barangay">Barangay</label>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input primary check-outline outline-primary"
                  type="checkbox"
                  id="home"
                  v-model="formMease.home"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="home">Home</label>
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
                  id="school"
                  v-model="formMease.school"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="school">School</label>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="search">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input primary check-outline outline-primary"
                  type="checkbox"
                  id="hci"
                  v-model="formMease.hci"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="hci"
                  >Health Care Facility</label
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
                  id="dorm"
                  v-model="formMease.dorm"
                  true-value="1"
                  false-value="0"
                />
                <label class="form-check-label" for="dorm">Dormitory</label>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Others, Specify</Label>
              <input
                type="text"
                v-model="formMease.occur_specify"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2"
                >Are there other known cases with fever and rash<button
                  type="button"
                  class="btn btn-sm btn-light-info text-info p-0 m-0"
                  v-tooltip.top="{
                    value: `<h6 class='text-white'>(regardless of presence of 3 C’s)in the community?</h6>`,
                    escape: true,
                    class: 'bg-dark rounded p-1',
                  }"
                  required
                >
                  .....</button
                >?
              </Label>

              <select
                class="form-select form-control form-control-sm"
                v-model="formMease.known_case"
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
import * as fnMease from "../functions/measles";
import { useStore } from "vuex";
import moment from "moment";
export default defineComponent({
  name: "MeaslesOccurance",
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
