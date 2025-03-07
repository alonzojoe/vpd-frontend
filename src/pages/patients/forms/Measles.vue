<template>
  <registry-nav
    class="position-fixed z-3 mr-5"
    :tabs="tabs"
    :patient="patient"
    :selectedTab="selectedTab"
    @save-data="saveData()"
    @select-tab="selectTab($event)"
  />
  <div class="card my-0">
    <div class="card-body measles-content py-4">
      <Toast />
      <div class="tab-Item" v-if="selectedTab == 1">
        <div class="row">
          <div class="col-sm-12 mb-2 col-lg-12">
            <form-skeleton :data="skelPatientInfo" v-if="isLoading" />
            <patient-info-card :formData="formData" v-else />
          </div>
          <div class="col-sm-12 mb-2 col-lg-12">
            <form-skeleton :data="skelClinical" v-if="isLoading" />
            <measles-clinical
              v-else
              :patient="patient"
              :formData="formData"
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            ></measles-clinical>
          </div>
        </div>
      </div>
      <div class="tab-Item" v-if="selectedTab == 2">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
            <measles-vaccination
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            >
            </measles-vaccination>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
            <measles-mcv
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            >
            </measles-mcv>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
            <measles-exposure
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            >
            </measles-exposure>
          </div>
        </div>
      </div>
      <div class="tab-item" v-if="selectedTab == 3">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
            <measles-occurance
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            >
            </measles-occurance>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-8 mb-2">
            <measles-classification
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            >
            </measles-classification>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-4 mb-2">
            <measles-infection
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            >
            </measles-infection>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
            <measles-outcome
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            >
            </measles-outcome>
          </div>
        </div>
      </div>
      <div class="tab-Item" v-if="selectedTab == 4">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
            {{ forAddition }}
            {{ patient }}
            <laboratory-profile
              :patient="patient"
              :formData="formData"
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
              :specimens="specimens"
              :type="diseaseDetails.type"
              :tests="conductedTests"
              @for-deletion="pushDeletion($event)"
            >
            </laboratory-profile>
          </div>
        </div>
      </div>
      <switch-tab
        :details="switchTabDetails"
        @switch-tab="switchSelect"
        @patient-list="backTo"
        @save-data="saveData()"
      />
    </div>
  </div>
  <loader
    :title="
      !patient.registry
        ? 'Updating Measles-Rubella Record'
        : 'Saving Measles-Rubella Record'
    "
    subTitle="Please Wait...."
    :warning="true"
    v-if="savingFlag"
  />
  <!-- <pre>{{ validationStatus }}</pre>
  <pre>{{ formMease }}</pre> -->
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
import FormPatientInfo from "@/components/cards/FormPatientInfo.vue";
import moment from "moment";
import api from "../../../api/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import * as validFn from "./functions/rota";
import {
  validateFields,
  validationStatus,
  validateChecker,
} from "./functions/measlesValidation";
import { useToast } from "primevue/usetoast";
import Loader from "@/pages//loader/Loader.vue";
import FormSkeleton from "@/pages//loader/FormSkeleton.vue";
import PatientInfoCard from "@/components/cards/PatientInfoCard.vue";
import RegistryNav from "@/components/pagination/RegistryNav.vue";
import SwitchTab from "@/components/pagination/SwitchTab.vue";
import * as fnMease from "./functions/measles";
import MeaslesClinical from "./measles-components/MeaslesClinical.vue";
import MeaslesVaccination from "./measles-components/MeaslesVaccination.vue";
import MeaslesMcv from "./measles-components/MeaslesMcv.vue";
import MeaslesExposure from "./measles-components/MeaslesExposure.vue";
import MeaslesOccurance from "./measles-components/MeaslesOccurance.vue";
import MeaslesClassification from "./measles-components/MeaslesClassification.vue";
import MeaslesInfection from "./measles-components/MeaslesInfection.vue";
import MeaslesOutcome from "./measles-components/MeaslesOutcome.vue";
import LaboratoryProfile from "./global-components/LaboratoryProfile.vue";
export default defineComponent({
  components: {
    FormCard,
    PatientInfoCard,
    Loader,
    FormSkeleton,
    RegistryNav,
    SwitchTab,
    MeaslesClinical,
    MeaslesVaccination,
    MeaslesMcv,
    MeaslesExposure,
    MeaslesOccurance,
    MeaslesClassification,
    MeaslesInfection,
    MeaslesOutcome,
    LaboratoryProfile,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const swal = inject("$swal");
    const toast = useToast();
    const patient = ref(decryptData(localStorage.getItem("patient")));
    const formData = ref({});
    const authUser = computed(() => store.getters.getAuthenticatedUser);
    const specimens = computed(() => store.getters.getMeaseSpecimens);
    const conductedTests = computed(() => store.getters.getMeaseTests);
    const fetchPatientInfo = async () => {
      skeletonLoading();
      const response = await api.get(`/patients/${patient.value.patientId}`);
      formData.value = response.data.data;
      diseaseDetails.value.ep_id = `0038995-${caseName}-${epDate}-${trimZeroes(
        formData.value.patient_no
      )}`;
      diseaseDetails.value.case_id = `${caseDate}-`;
      if (patient.value.registry == false) {
        await store.dispatch("fetchDiseaseHistory", patient.value.diseaseId);
        store.dispatch("fetchMease", patient.value.measlesId);
        console.log("type", formDiseaseHistory.value);
        store.dispatch("fetchLaboratoryProfile", {
          disease_id: patient.value.measlesId,
          type: formDiseaseHistory.value.type,
        });
      } else {
        store.commit("setDiseaseHistoryEmpty");
        store.commit("setMeaseEmpty");
        store.commit("resetLabProfile");
      }
    };

    const tabs = ref([
      { id: 1, name: "Clinical Information" },
      { id: 2, name: "Vaccination Information & Exposure History" },
      { id: 3, name: "Exposure Occurence & Other Information" },
      { id: 4, name: "Laboratory Profile" },
    ]);

    const selectedTab = ref(1);
    const selectTab = (tab: Number) => {
      selectedTab.value = tab;
    };

    const switchSelect = (type: Number) => {
      if (type == 0) {
        selectedTab.value--;
      } else {
        selectedTab.value++;
      }
    };

    const switchTabDetails = ref({
      currentTab: 1,
      maxTab: 4,
      title: "",
    });

    const modifyTab = (tab: number) => {
      switchTabDetails.value.currentTab = tab;

      const selectedTab = tabs.value.find((t) => t.id === tab);

      if (selectedTab) {
        switchTabDetails.value.title = selectedTab.name;
      }
    };

    watch(
      () => {
        selectedTab.value;
        if (selectedTab.value) {
          modifyTab(selectedTab.value);
        }
      },
      { deep: true }
    );

    const backTo = () => {
      router.push({ name: "patientlist" });
    };

    const currentDate = moment(Date.now()).format("yyyy-MM-DD");

    const formDiseaseHistory = computed(() => store.getters.getDiseaseHistory);
    const diseaseResponse = computed(() => store.getters.getDiseaseResponse);
    const formMease = computed(() => store.getters.getMease);
    const measeResponse = computed(() => store.getters.getMeaseResponse0);

    //forRegistry Only
    const caseName = "MEA";
    const epDate = moment(Date.now()).format("MMDDYY");
    const caseDate = moment(Date.now()).format("YYYY");
    const diseaseDetails = ref({
      id: 0,
      disease_date: currentDate,
      type: "3", //measles 3
      case_code: "MEASLES", //default case code for measles
      case_id: ``,
      ep_id: ``,
    });

    const saveDiseaseHistory = async (formRequest) => {
      console.log(formRequest);
      await store.dispatch("saveDiseaseHistory", formRequest);
    };

    const labProfile = computed(() => store.getters.getMeaseLabProfile);

    const validateData = () => {
      return labProfile.value.some((profile) => {
        return (
          profile.datetime_collection.trim() == "" ||
          profile.specimen_type.trim() == ""
        );
      });
    };

    const saveMeasles = async (formRequest) => {
      await store.dispatch("saveMeasles", {
        ...formRequest,
        laboratory_profiles: labProfile.value,
      });
    };

    const savingFlag = ref(false);
    const savingConfirmation = async () => {
      let message = !patient.value.registry ? "update" : "save";
      swalConfirmation(
        swal,
        "Confirmation",
        `Are you sure to ${message} Patient Disease?`,
        "question"
      ).then(async (res) => {
        if (res.isConfirmed) {
          savingFlag.value = true;
          await saveDiseaseHistory({
            ...diseaseDetails.value,
            patientInfo_id: patient.value.patientId,
            user_id: authUser.value.id,
            gender: formData.value.gender,
            age_year: formData.value.age_year,
            fname: formData.value.fname[0].toUpperCase(),
            lname: formData.value.lname[0].toUpperCase(),
          });

          await saveMeasles({
            ...formMease.value,
            disease_history_id: diseaseResponse.value.id,
            user_id: authUser.value.id,
          });

          await updateLabProfile();

          savingFlag.value = false;
          let message = !patient.value.registry ? "Updated" : "Saved";
          swalMessage(
            swal,
            `Information`,
            `Patient Measles-Rubella Record ${message} Successfully`,
            "success"
          ).then(() => {
            router.push({ name: "patients", params: { type: "measles" } });
          });
        }
      });
    };

    const forAddition = ref([]);
    watch(
      labProfile,
      () => {
        forAddition.value = labProfile.value.filter((lab) => lab.id === 0);
      },
      { deep: true }
    );

    const forDeletion = ref([]);
    const pushDeletion = (profiles) => {
      forDeletion.value = profiles;
    };

    const updateLabProfile = async () => {
      if (patient.value.registry == false && forDeletion.value.length > 0) {
        await store.dispatch("deleteLaboratoryProfile", forDeletion.value);
      }

      if (patient.value.registry == false && forAddition.value.length > 0) {
        await store.dispatch("storeAdditionalLab", forAddition.value);
      }
    };

    const saveSubmitted = ref(false);
    const newLaboratoryUpdate = ref([]);
    const saveData = async () => {
      newLaboratoryUpdate.value = labProfile.value.filter(
        (lab) => lab.id === 0
      );

      console.log("test new", newLaboratoryUpdate.value);
      saveSubmitted.value = true;
      const errors = await validateFields(
        toast,
        {
          ...formMease.value,
          gender: formData.value.gender,
          labs: labProfile.value,
          labArray: validateData(),
        },
        0
      );
      selectTab(errors.value.tab);
      if (errors.value.errors == 0) {
        await savingConfirmation();
      }
    };

    const disabledContact = computed(() => {
      return formMease.value.confirmed_rubella == "Y" ||
        formMease.value.confirmed_measles == "Y"
        ? false
        : true;
    });

    const resetter = () => {
      savingFlag.value = false;
      saveSubmitted.value = false;
      selectedTab.value = 1;
    };

    watch(
      () => {
        formMease.value;
        if (saveSubmitted.value == true) {
          validateFields(
            toast,
            {
              ...formMease.value,
              gender: formData.value.gender,
              labs: labProfile.value,
              labArray: validateData(),
            },
            1
          );
        }
      },
      { deep: true }
    );

    watch(() => {
      disabledContact.value;
      if (disabledContact.value) {
        fnMease.changeExposed();
      }
    });

    const skelPatientInfo = { count: 2, perRow: 4, withButtons: false };
    const skelClinical = {
      count: 7,
      perRow: 4,
      withButtons: false,
    };

    const isLoading = ref(true);
    const skeletonLoading = async () => {
      setTimeout(() => {
        isLoading.value = false;
        console.log("isLoading:", isLoading.value);
      }, 1500);
    };

    const navlink = document.getElementById("navlink");

    onMounted(async () => {
      await fetchPatientInfo();
      resetter;
      console.log("navlink", navlink);
    });

    return {
      patient,
      formData,
      currentDate,
      tabs,
      selectTab,
      selectedTab,
      formDiseaseHistory,
      formMease,
      diseaseResponse,
      measeResponse,
      NumericOnly,
      diseaseDetails,
      validFn,
      validationStatus,
      switchTabDetails,
      switchSelect,
      backTo,
      savingConfirmation,
      fnMease,
      disabledContact,
      saveData,
      saveSubmitted,
      savingFlag,
      pushDeletion,
      forDeletion,

      // skeleton Loader
      isLoading,
      skelPatientInfo,
      skelClinical,
      authUser,
      specimens,
      conductedTests,
      forAddition,
    };
  },
});
</script>

<style>
.btn-container {
  background: #eaeff4;
  padding: 5px;
  border-radius: 5px;
}
/*.nav-pills{
  position: fixed;
  top: -10;
  z-index: 100;
  width: 100%;
}*/
.reset-btn {
  position: absolute;
  top: 0;
  right: 0;
  margin: 3px 3px 0 0;
}

.card {
  margin-right: 50px;
}

.measles-content {
  margin-top: 50px !important;
}

@media screen and (max-width: 991px) {
  .nav-pills {
    display: none !important;
  }
  .card {
    margin-right: 0;
  }
  .measles-content {
    margin-top: 0px !important;
  }
}
</style>
