<template>
  <form-card title="Patient Information">
    <template v-slot:formInput>
      <div class="row">
        <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.patno,
            }"
          >
            <Label class="mb-2"
              >Patient No. <span class="text-danger">*</span></Label
            >
            <input
              type="text"
              v-model="formData.patno"
              @keypress="NumericOnly()"
              class="form-control form-control-sm w-100 custom-font"
              required
              :disabled="!patientInfo.registry"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.fname,
            }"
          >
            <Label class="mb-2"
              >First Name <span class="text-danger">*</span></Label
            >
            <input
              type="text"
              v-model="formData.fname"
              class="form-control form-control-sm w-100 custom-font"
              required
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.mname,
            }"
          >
            <Label class="mb-2"
              >Middle Name <span class="text-danger">*</span></Label
            >
            <input
              type="text"
              v-model="formData.mname"
              class="form-control form-control-sm w-100 custom-font"
              required
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.lname,
            }"
          >
            <Label class="mb-2"
              >Last Name <span class="text-danger">*</span></Label
            >
            <input
              type="text"
              v-model="formData.lname"
              class="form-control form-control-sm w-100 custom-font"
              required
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div class="search">
            <Label class="mb-2">Suffix</Label>
            <input
              type="text"
              v-model="formData.suffix"
              class="form-control form-control-sm w-100 custom-font"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.gender,
            }"
          >
            <Label class="mb-2"
              >Gender <span class="text-danger">*</span></Label
            >
            <select
              v-model="formData.gender"
              class="form-select form-control form-control-sm"
              required
            >
              <option value="">Please Select</option>
              <option value="1">MALE</option>
              <option value="2">FEMALE</option>
            </select>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div
            class="search"
            :class="{
              'group-invalid': saveSubmitted && !validationStatus.dob,
            }"
            required
          >
            <Label class="mb-2"
              >Date of Birth <span class="text-danger">*</span></Label
            >
            <input
              type="date"
              v-model="formData.dob"
              :max="currentDate"
              @change="calculateAges()"
              class="form-control form-control-sm w-100 custom-font"
              required
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div class="search">
            <Label class="mb-2">Age In Years</Label>
            <input
              type="text"
              v-model="formData.age_years"
              class="form-control form-control-sm w-100 custom-font"
              disabled
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div class="search">
            <Label class="mb-2">Age In Months</Label>
            <input
              type="text"
              v-model="formData.age_month"
              class="form-control form-control-sm w-100 custom-font"
              disabled
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div class="search">
            <Label class="mb-2">Age In Days</Label>
            <input
              type="text"
              v-model="formData.age_days"
              class="form-control form-control-sm w-100 custom-font"
              disabled
            />
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div class="search">
            <Label class="mb-2">Is Member of Indigenous People?</Label>
            <select
              v-model="formData.isIndigenous"
              @change="resetIndigenous()"
              class="form-select form-control form-control-sm"
            >
              <option value="0">NO</option>
              <option value="1">YES</option>
            </select>
          </div>
        </div>
        <div
          class="col-sm-12 col-md-6 col-lg-3 mb-2"
          v-if="formData.isIndigenous == 1"
        >
          <div
            class="search"
            :class="{
              'group-invalid':
                saveSubmitted && !validationStatus.indigenousOthers,
            }"
          >
            <Label class="mb-2"
              >Indigenous People Tribe <span class="text-danger">*</span></Label
            >
            <select
              v-model="formData.indigenousOthers"
              class="form-select form-control form-control-sm"
              required
            >
              <option value="">Please Select Tribe</option>
              <option value="00001">AETAS</option>
              <option value="00002">ATI</option>
              <option value="00003">BADJAOS</option>
              <option value="00004">BATAK</option>
              <option value="00005">BLAAN</option>
              <option value="00006">BONTOC</option>
              <option value="00007">BUKIDNON</option>
              <option value="00008">HIGAONON</option>
              <option value="00009">IBALOI</option>
              <option value="00010">IGOROT</option>
              <option value="00011">ILONGOTS</option>
              <option value="00012">ISNAG</option>
              <option value="00013">ISNEG</option>
              <option value="00014">KALINGA</option>
              <option value="00015">KANKANAEY</option>
              <option value="00016">LUMAD</option>
              <option value="00017">MAMANWA</option>
              <option value="00018">MANDAYA</option>
              <option value="00019">MANGYAN</option>
              <option value="00020">MANOBO</option>
              <option value="00021">MANSAKA</option>
              <option value="00022">PALAWANO</option>
              <option value="00023">PALAWEÑO</option>
              <option value="00024">SANGIR</option>
              <option value="00025">SUBANEN</option>
              <option value="00026">T`BOLI</option>
              <option value="00027">TAGABAWA</option>
              <option value="00028">TAGAKAULO</option>
              <option value="00029">TAGBANWA</option>
              <option value="00030">TASADAY</option>
              <option value="00031">TINGUIAN</option>
              <option value="00032">TUMANDOK</option>
              <option value="00033">OTHERS</option>
            </select>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
          <div class="search">
            <Label class="mb-2">Is Member of 4 P's?</Label>
            <select
              v-model="formData.isfourps"
              class="form-select form-control form-control-sm"
            >
              <option value="0">NO</option>
              <option value="1">YES</option>
            </select>
          </div>
        </div>
      </div>
    </template>
  </form-card>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  inject,
  watchEffect,
  watch,
} from "vue";
import {
  calculateAge,
  currentDate,
  resetIndigenous,
} from "../registry/PatientInformation";
import { decryptData, NumericOnly } from "@/composables";
import { useStore } from "vuex";
import FormCard from "@/components/cards/FormCard.vue";

export default defineComponent({
  name: "PatientInformation",
  props: {
    patientInfo: Object,
    saveSubmitted: Boolean,
    validationStatus: Array,
  },
  components: {
    FormCard,
  },
  setup() {
    const store = useStore();
    const formData = computed(() => store.getters.getPatientFormData);
    const calculateAges = async () => {
      const calculated = calculateAge(formData.value.dob);
      store.commit("setAge", calculated.age);
    };
    return {
      calculateAges,
      formData,
      resetIndigenous,
      currentDate,
      calculateAge,
      NumericOnly,
    };
  },
});
</script>

<style scoped></style>
