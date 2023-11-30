<template>
  <form-card title="Exposure History">
    <template v-slot:formInput>
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Day Care</Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMenin.daycare"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Barangay</Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMenin.barangay"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Home</Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMenin.home"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">School</Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMenin.school"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Dormitory</Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMenin.dormitory"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Health Care Facility</Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMenin.healthcare"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Work Place</Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="formMenin.workplace"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Other Exposure</Label>
              <select
                class="form-select form-control form-control-sm"
                @change="fnMenin.changeExposure($event)"
                v-model="formMenin.other"
              >
                <option value="">PLEASE SELECT</option>
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.other_specify &&
                  formMenin.other == 'Y',
              }"
            >
              <Label class="mb-2"
                >Other Exposure Specify
                <span v-if="formMenin.other == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="text"
                v-model="formMenin.other_specify"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.other != 'Y'"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2"
                >Did the Patient Travel Outside<button
                  type="button"
                  class="btn btn-sm btn-light-info text-info p-0 m-0"
                  v-tooltip.top="{
                    value: `<h6 class='text-white'>Did the Patient Travel Outside of the Province in 2 Weeks Prior to Illness?</h6>`,
                    escape: true,
                    class: 'bg-dark rounded p-1',
                  }"
                  required
                >
                  .....</button
                >?</Label
              >
              <select
                class="form-select form-control form-control-sm"
                @change="fnMenin.changeTravel($event)"
                v-model="formMenin.travel"
              >
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.travel_place &&
                  formMenin.travel == 'Y',
              }"
            >
              <Label class="mb-2"
                >If Yes, Specify Place
                <span v-if="formMenin.travel == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="text"
                v-model="formMenin.travel_place"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.travel != 'Y'"
                required
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.travel_from &&
                  formMenin.travel == 'Y',
              }"
            >
              <Label class="mb-2"
                >Date Travelled From:
                <span v-if="formMenin.travel == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formMenin.travel_from"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.travel != 'Y'"
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
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.travel_to &&
                  formMenin.travel == 'Y',
              }"
            >
              <Label class="mb-2"
                >Date Travelled To:
                <span v-if="formMenin.travel == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <input
                type="date"
                v-model="formMenin.travel_to"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="formMenin.travel != 'Y'"
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
  name: "MeningitisExposure",
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
