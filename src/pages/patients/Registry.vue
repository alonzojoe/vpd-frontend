<template>
  <ul
    class="nav nav-pills user-profile-tab justify-content-start bg-light-info d-flex"
    id="pills-tab"
    role="tablist"
  >
    <div class="d-flex justify-content-between align-items-center w-100">
      <div class="d-flex">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link position-relative rounded-0 active d-flex align-items-center justify-content-center bg-transparent fs-3 py-3"
            id="pills-account-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-account"
            type="button"
            role="tab"
            aria-controls="pills-account"
            aria-selected="true"
          >
            <span class="d-none d-md-block">Patient Profile Registry</span>
          </button>
        </li>
      </div>
      <div
        class="btn-container d-flex align-items-center gap-2 mx-3"
        v-if="isLoading"
      >
        <skeleton-placeholder
          height="37px"
          width="207px"
          radius="5px"
          bg="#2A3547"
        />
        <skeleton-placeholder
          height="37px"
          width="162px"
          radius="5px"
          bg="#539BFF"
        />
      </div>
      <div class="btn-container d-flex align-items-center gap-2 mx-3" v-else>
        <router-link
          :to="{ name: 'patientlist' }"
          class="btn waves-effect waves-light btn-rounded btn-dark"
        >
          Back to Patient Profile List
        </router-link>
        <button
          class="btn waves-effect waves-light btn-rounded btn-info"
          @click="savePatientProfile()"
        >
          {{
            patientInfo.registry == true || patientInfo.noRecord == true
              ? "Save Patient Profile"
              : "Update Patient Profile"
          }}
        </button>
      </div>
    </div>
  </ul>
  <div class="card my-0">
    <div class="card-body py-4">
      <Toast />
      <div class="row">
        <div class="col-sm-12 col-lg-12">
          <div class="row">
            <div class="col-12 mb-2">
              <form-skeleton :data="skelPatientInfo" v-if="isLoading" />
              <form-card title="Patient Information" v-else>
                <template v-slot:formInput>
                  <div class="row">
                    <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.patno,
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
                          'group-invalid':
                            saveSubmitted && !validationStatus.fname,
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
                          'group-invalid':
                            saveSubmitted && !validationStatus.mname,
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
                          'group-invalid':
                            saveSubmitted && !validationStatus.lname,
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
                          'group-invalid':
                            saveSubmitted && !validationStatus.gender,
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
                          'group-invalid':
                            saveSubmitted && !validationStatus.dob,
                        }"
                        required
                      >
                        <Label class="mb-2"
                          >Date of Birth
                          <span class="text-danger">*</span></Label
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
                        <Label class="mb-2"
                          >Is Member of Indigenous People?</Label
                        >
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
                          >Indigenous People Tribe
                          <span class="text-danger">*</span></Label
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
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-lg-12">
          <div class="row">
            <div class="col-sm-12 col-md-6 mb-2">
              <form-skeleton :data="skelAddress" v-if="isLoading" />
              <form-card title="Patient's Permanent Address" v-else>
                <template v-slot:formInput>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.per_street,
                        }"
                      >
                        <Label class="mb-2"
                          >Street <span class="text-danger">*</span></Label
                        >
                        <input
                          type="text"
                          v-model="formData.per_street"
                          class="form-control form-control-sm w-100 custom-font"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.per_region,
                        }"
                      >
                        <Label class="mb-2"
                          >Region <span class="text-danger">*</span></Label
                        >
                        <select
                          v-model="formData.per_region"
                          @change="changePermRegion(sameAsPermanent.value)"
                          class="form-select form-control form-control-sm"
                          required
                        >
                          <option value="">Please Region</option>
                          <option
                            v-for="r in regions"
                            :key="r.RegionID"
                            :value="r.RegionID"
                          >
                            {{ r.Description }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.per_province,
                        }"
                      >
                        <Label class="mb-2"
                          >Province <span class="text-danger">*</span></Label
                        >
                        <select
                          v-model="formData.per_province"
                          @change="changePermProvince(sameAsPermanent.value)"
                          class="form-select form-control form-control-sm"
                          required
                        >
                          <option value="">Please Province</option>
                          <option
                            v-for="p in provinces"
                            :key="p.ProvinceID"
                            :value="p.ProvinceID"
                          >
                            {{ p.Description }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.per_municipality,
                        }"
                      >
                        <Label class="mb-2"
                          >Municipality
                          <span class="text-danger">*</span></Label
                        >
                        <select
                          v-model="formData.per_municipality"
                          @change="changePermCity(sameAsPermanent.value)"
                          class="form-select form-control form-control-sm"
                          required
                        >
                          <option value="">Please Municipality</option>
                          <option
                            v-for="m in municipalities"
                            :key="m.MunicipalityID"
                            :value="m.MunicipalityID"
                          >
                            {{ m.Description }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.per_barangay,
                        }"
                      >
                        <Label class="mb-2"
                          >Barangay <span class="text-danger">*</span></Label
                        >
                        <select
                          v-model="formData.per_barangay"
                          class="form-select form-control form-control-sm"
                          required
                        >
                          <option value="">Please Barangay</option>
                          <option
                            v-for="b in barangays"
                            :key="b.Id"
                            :value="b.Id"
                          >
                            {{ b.Name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div class="search">
                        <Label class="mb-2">Mobile No.</Label>
                        <input
                          type="text"
                          v-model="formData.per_mobile"
                          class="form-control form-control-sm w-100 custom-font"
                          maxlength="11"
                          @keypress="NumericOnly()"
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </form-card>
            </div>
            <div class="col-sm-12 col-md-6 mb-2">
              <form-skeleton :data="skelAddress" v-if="isLoading" />
              <form-card
                title="Patient's Current Address"
                :withCbo="sameAsPermanent"
                v-else
              >
                <template v-slot:formInput>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.curr_street,
                        }"
                      >
                        <Label class="mb-2"
                          >Street <span class="text-danger">*</span></Label
                        >
                        <input
                          type="text"
                          v-model="formData.curr_street"
                          class="form-control form-control-sm w-100 custom-font"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.curr_region,
                        }"
                      >
                        <Label class="mb-2"
                          >Region <span class="text-danger">*</span></Label
                        >
                        <select
                          v-model="formData.curr_region"
                          @change="changeCurrRegion()"
                          class="form-select form-control form-control-sm"
                          required
                        >
                          <option value="">Please Region</option>
                          <option
                            v-for="r in regions"
                            :key="r.RegionID"
                            :value="r.RegionID"
                          >
                            {{ r.Description }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.curr_province,
                        }"
                      >
                        <Label class="mb-2"
                          >Province <span class="text-danger">*</span></Label
                        >
                        <select
                          v-model="formData.curr_province"
                          @change="changeCurrProvince()"
                          class="form-select form-control form-control-sm"
                          required
                        >
                          <option value="">Please Province</option>
                          <option
                            v-for="p in currProvinces"
                            :key="p.ProvinceID"
                            :value="p.ProvinceID"
                          >
                            {{ p.Description }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.curr_municipality,
                        }"
                      >
                        <Label class="mb-2"
                          >Municipality
                          <span class="text-danger">*</span></Label
                        >
                        <select
                          v-model="formData.curr_municipality"
                          @change="changeCurrCity()"
                          class="form-select form-control form-control-sm"
                          required
                        >
                          <option value="">Please Municipality</option>
                          <option
                            v-for="m in currMunicipalities"
                            :key="m.MunicipalityID"
                            :value="m.MunicipalityID"
                          >
                            {{ m.Description }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.curr_barangay,
                        }"
                      >
                        <Label class="mb-2"
                          >Barangay <span class="text-danger">*</span></Label
                        >
                        <select
                          v-model="formData.curr_barangay"
                          class="form-select form-control form-control-sm"
                          required
                        >
                          <option value="">Please Barangay</option>
                          <option
                            v-for="b in currBarangays"
                            :key="b.Id"
                            :value="b.Id"
                          >
                            {{ b.Name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div class="search">
                        <Label class="mb-2">Mobile No.</Label>
                        <input
                          type="text"
                          v-model="formData.curr_mobile"
                          class="form-control form-control-sm w-100 custom-font"
                          maxlength="11"
                          @keypress="NumericOnly()"
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </form-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <pre>{{ validationStatus }}</pre>
    <pre>{{ savingResponse }}</pre>
    <pre>{{ formData }}</pre>
    <pre>{{ patientInfo }}</pre>
  </div>
  <loader
    title="Saving Patient Profile"
    subTitle="Please Wait...."
    warning="true"
    v-if="flagSaving"
  />
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
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { decryptData, NumericOnly } from "@/composables";
import FormCard from "@/components/cards/FormCard.vue";
import {
  changePermRegion,
  changePermProvince,
  changePermCity,
  fetchPermanentAddress,
  changeCurrRegion,
  changeCurrProvince,
  changeCurrCity,
  fetchCurrentAddress,
  sameAddress,
} from "./registry/Address";
import {
  calculateAge,
  currentDate,
  resetIndigenous,
} from "./registry/PatientInformation";
import { swalConfirmation, swalMessage } from "../../composables/index";
import FormSkeleton from "../loader/FormSkeleton.vue";
import SkeletonPlaceholder from "../loader/SkeletonPlaceholder.vue";
import {
  validateFields,
  validationStatus,
  validateChecker,
} from "./registry/Validation";
import Loader from "../loader/Loader.vue";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  components: {
    FormCard,
    FormSkeleton,
    SkeletonPlaceholder,
    Loader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const swal = inject("$swal");
    const toast = useToast();

    const uriParams = decodeURIComponent(route.params.data);
    const patientInfo = ref({});

    const decrypURLparams = async () => {
      patientInfo.value = decryptData(uriParams);
    };

    const formData = computed(() => store.getters.getPatientFormData);

    const calculateAges = async () => {
      const calculated = calculateAge(formData.value.dob);
      store.commit("setAge", calculated.age);
    };

    const detectMutation = async () => {
      patientInfo.value.noRecord == true;
      const mutationCall =
        patientInfo.value.noRecord === true
          ? "setFormAddNew"
          : patientInfo.value.registry === true
          ? "setFormData"
          : "setFormDataUpdate";
      await store.commit(mutationCall, patientInfo.value);
    };

    const regions = computed(() => store.getters.getRegions);
    //permanent address
    const provinces = computed(() => store.getters.getProvinces);
    const municipalities = computed(() => store.getters.getMunicipalities);
    const barangays = computed(() => store.getters.getBarangays);
    //current address
    const currProvinces = computed(() => store.getters.getCurrProvinces);
    const currMunicipalities = computed(
      () => store.getters.getCurrMunicipalities
    );
    const currBarangays = computed(() => store.getters.getCurrBarangays);

    const currentAuth = computed(() => store.getters.getAuthenticatedUser);

    const permResponse = computed(() => store.getters.getPermResponse);
    const currResponse = computed(() => store.getters.getCurrResponse);

    const savingResponse = computed(() => store.getters.getSavingResponse);
    const flagSuccess = ref(false);

    const flagSaving = ref(false);
    const savingConfirmation = async () => {
      let message = patientInfo.value.registry == true ? "save" : "update";
      swalConfirmation(
        swal,
        "Confirmation",
        `Are you sure to ${message} Patient Profile?`,
        "question"
      ).then(async (res) => {
        if (res.isConfirmed) {
          flagSaving.value = true;

          await store.dispatch("savePermAddress", formData.value);
          await store.dispatch("saveCurrAddress", formData.value);

          console.log("perm insert", permResponse.value);
          console.log("curr insert", currResponse.value);

          await store.dispatch("savePatientProfile", {
            ...formData.value,
            userId: currentAuth.value.id,
            permId: permResponse.value.data.id,
            currmId: currResponse.value.data.id,
          });

          flagSuccess.value = true;
          flagSaving.value = false;
          swalMessage(
            swal,
            "Information",
            `${savingResponse.value.message}`,
            `success`
          ).then(() => {
            router.push({ name: "patientlist" });
          });
        }
      });
    };

    const saveSubmitted = ref(false);
    const savePatientProfile = async () => {
      saveSubmitted.value = true;
      const errors = await validateFields(toast, formData.value);
      console.log(errors);
      if (errors == 0) {
        await savingConfirmation();
      }
    };

    const isLoading = ref(true);
    const skelPatientInfo = ref({ count: 4, perRow: 4, withButtons: false });
    const skelAddress = ref({ count: 3, perRow: 3, withButtons: false });

    const skeletonLoading = async () => {
      setTimeout(() => {
        isLoading.value = false;
      }, 2000);
    };

    const loadResources = async () => {
      skeletonLoading();
      await decrypURLparams();
      await detectMutation();
      calculateAges();
      fetchPermanentAddress(formData.value);
      fetchCurrentAddress(formData.value);
    };

    watch(
      () => {
        formData.value;
        if (saveSubmitted.value == true) {
          validateChecker(formData.value);
          console.log("adssa");
        }
        console.log("asds");
      },
      { deep: true }
    );

    const sameAsPermanent = ref({
      show: true,
      title: "Same As Permanent Address",
      value: "false",
    });

    const triggerOnce = ref(false);
    const triggerSameAddress = async () => {
      await sameAddress();
    };

    watchEffect(async () => {
      if (sameAsPermanent.value.value === "true") {
        await triggerSameAddress();
        if (triggerOnce.value == false) {
          fetchCurrentAddress();
        }
        triggerOnce.value = true;
      } else {
        triggerOnce.value = false;
      }
    });

    const resetResponse = () => {
      store.commit("setResponseEmpty");
      store.commit("setResponseCurrEmpty");
    };

    const showError = () => {
      toast.add({
        severity: "warn",
        summary: "Error Message",
        detail: "Message Content",
        life: 100000,
      });
    };

    onMounted(async () => {
      await loadResources();
      resetResponse();
    });

    return {
      //fetch Data
      patientInfo,
      formData,
      calculateAges,
      regions,
      currentDate,
      NumericOnly,
      //permanent
      provinces,
      municipalities,
      barangays,
      changePermRegion,
      changePermProvince,
      changePermCity,
      //current
      currProvinces,
      currMunicipalities,
      currBarangays,
      changeCurrRegion,
      changeCurrProvince,
      changeCurrCity,
      fetchCurrentAddress,
      resetIndigenous,
      //saving
      savePatientProfile,
      savingResponse,
      //skeleton
      skelPatientInfo,
      skelAddress,
      isLoading,
      validationStatus,
      //validation
      saveSubmitted,
      sameAsPermanent,
      flagSaving,
      showError,
    };
  },
});
</script>

<style scoped>
.btn-container {
  background: #eaeff4;
  padding: 5px;
  border-radius: 5px;
}

/*.nav-link.active {
    border: 0 2px 2px 0  solid #5d87ff;
}*/

.nav-pills {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
