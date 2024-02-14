<template>
  <div class="mb-4 d-flex align-items-center">
    <button type="button" @click="addProfile()" class="btn btn-primary">
      Add Laboratory Profile <i class="ti ti-plus"></i>
    </button>
  </div>
  <form-card
    title="Specimen Details"
    class="mt-4 position-relative"
    v-for="(l, index) in labProfile"
    :key="index"
  >
    <template v-slot:formInput>
      <!-- <button
        @click="removeLab(index)"
        class="btn btn-danger btn-sm reset-btn"
        v-if="index != 0"
      >
        Remove
      </button> -->
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Date Specimen Collected</Label>
              <input
                type="datetime-local"
                v-model="l.datetime_collection"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Specimen Type </Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="l.specimen_type"
              >
                <option value="">Please Select</option>
                <option v-for="(s, index) in specimens" :key="index" :value="s">
                  {{ s }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2 d-none">
            <div class="search">
              <Label class="mb-2">Specimen Sent to RITM / SNL? </Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="l.specimen_sent"
              >
                <option value="">Please Select</option>
                <option value="Y">YES</option>
                <option value="N">NO</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2 d-none">
            <div class="search">
              <Label class="mb-2">Date Sent to RITM/SNL</Label>
              <input
                type="date"
                v-model="l.date_sent"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="l.specimen_sent != 'Y'"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2 d-none">
            <div class="search">
              <Label class="mb-2">Date Received to RITM/SNL</Label>
              <input
                type="date"
                v-model="l.date_received"
                :max="currentDate"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="l.specimen_sent != 'Y'"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Type of Test Conducted</Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="l.test_conducted"
                disabled
              >
                <option value="">Please Select</option>
                <option v-for="(t, index) in tests" :key="index" :value="t">
                  {{ t }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Laboratory Test Result</Label>
              <select
                class="form-select form-control form-control-sm"
                v-model="l.lab_result"
                disabled
              >
                <option value="">Please Select</option>
                <option value="EQUIVOCAL">EQUIVOCAL</option>
                <option value="NEGATIVE">NEGATIVE</option>
                <option value="PENDING">PENDING</option>
                <option value="POSITIVE">POSITIVE</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Type of Organism Detected</Label>
              <input
                type="text"
                v-model="l.organism_detected"
                class="form-control form-control-sm w-100 custom-font"
                :disabled="l.lab_result != 'POSITIVE'"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Interpretation</Label>
              <input
                type="text"
                v-model="l.interpretation"
                class="form-control form-control-sm w-100 custom-font"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </form-card>
  {{ labProfile }}
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
  name: "LaboratoryProfile",
  props: {
    saveSubmitted: {
      type: Boolean,
    },
    validationStatus: {
      type: Object,
    },
    specimens: Array,
    type: String,
    tests: Array,
  },
  components: {
    FormCard,
  },
  setup(props) {
    const swal = inject("$swal");
    const store = useStore();
    const labProfile = computed(() => store.getters.getMeaseLabProfile);
    const formMease = computed(() => store.getters.getMease);
    const currentDate = moment(Date.now()).format("yyyy-MM-DD");

    const validateData = () => {
      return labProfile.value.some((profile) => {
        return (
          profile.datetime_collection.trim() == "" ||
          profile.specimen_type.trim() == ""
        );
      });
    };

    const pushNewData = async () => {
      await store.commit("addLaboratory", {
        ...formMease.value,
        disease_type: props.type,
      });
      store.commit("updateLabProfile", {
        ...formMease.value,
        disease_type: props.type,
      });
    };

    const addProfile = async () => {
      console.log(validateData());
      // if (labProfile.value.length > 2) {

      // }else{
      //     swalMessage(swal, 'Warning', 'Maximum of 2 Sp')
      // }
      // if (condition) {
      // }

      if (labProfile.value.length === 0) {
        await pushNewData();
      } else if (!validateData() && labProfile.value.length < 2) {
        await pushNewData();
      } else if (labProfile.value.length === 2) {
        alert("Maximum of 2 specimen is allowed");
      } else {
        alert("pleas fill before adding new");
      }
    };

    const removeLab = async (index) => {
      await store.commit("removeLabProfile", index);
    };

    return {
      NumericOnly,
      fnMease,
      formMease,
      labProfile,
      currentDate,
      addProfile,
      removeLab,
    };
  },
});
</script>

<style scoped></style>
