<template>
  <registry-nav
    class="position-fixed z-3 mr-5"
    :tabs="tabs"
    :patient="patient"
    :selectedTab="selectedTab"
    @save-data="saveData()"
    @select-tab="selectTab($event)"
  />
  <div class="card my-0" style="margin-right: 50px">
    <div class="card-body menin-content py-4">
      <Toast />
      <div class="tab-Item" v-if="selectedTab == 1">
        <div class="row">
          <div class="col-sm-12 mb-2 col-lg-12">
            <form-skeleton :data="skelPatientInfo" v-if="isLoading" />
            <form-patient-info :formData="formData" v-else />
          </div>
          <div class="col-sm-12 col-md-12 mb-2 col-lg-12">
            <form-skeleton :data="skelClinical" v-if="isLoading" />
            <meningitis-clinical
              v-else
              :patient="patient"
              :formData="formData"
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            />
          </div>
        </div>
      </div>
      <div class="tab-Item" v-if="selectedTab == 2">
        <div class="row">
          <div class="col-sm-12 mb-2 col-lg-12">
            <meningitis-investigator
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            />
          </div>
          <div class="col-sm-12 col-md-12 mb-2 col-lg-12">
            <meningitis-vaccination
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            />
          </div>
        </div>
      </div>
      <div class="tab-Item" v-if="selectedTab == 3">
        <div class="row">
          <div class="col-sm-12 col-md-12 mb-2 col-lg-12">
            <meningitis-exposure
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            />
          </div>
          <div class="col-sm-12 col-md-12 mb-2 col-lg-6">
            <meningitis-case
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            />
          </div>
          <div class="col-sm-12 col-md-12 mb-2 col-lg-6">
            <meningitis-syndrome
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            />
          </div>
          <div class="col-sm-12 col-md-6 mb-2 col-lg-6">
            <meningitis-bacterial
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            />
          </div>
          <div class="col-sm-12 col-md-6 mb-2 col-lg-6">
            <meningitis-outcome
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            />
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
  <!-- <pre>{{ formMenin }}</pre> -->
  <loader
    :title="
      !patient.registry
        ? 'Updating Acute Meningitis-Encephalitis Record'
        : 'Saving Acute Meningitis-Encephalitis Record'
    "
    subTitle="Please Wait...."
    warning="true"
    v-if="savingFlag"
  />
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
import api from "@/api/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import Loader from "@/pages/loader/Loader.vue";
import FormSkeleton from "@/pages/loader/FormSkeleton.vue";
import * as fnMenin from "./functions/meningitis";
import {
  validateFields,
  validationStatus,
  validateChecker,
} from "./functions/meningitisValidation";
import RegistryNav from "@/components/pagination/RegistryNav.vue";
import SwitchTab from "@/components/pagination/SwitchTab.vue";
import MeningitisClinical from "./meningitis-components/MeningitisClinical.vue";
import MeningitisInvestigator from "./meningitis-components/MeningitisInvestigator.vue";
import MeningitisVaccination from "./meningitis-components/MeningitisVaccination.vue";
import MeningitisExposure from "./meningitis-components/MeningitisExposure.vue";
import MeningitisCase from "./meningitis-components/MeningitisCase.vue";
import MeningitisSyndrome from "./meningitis-components/MeningitisSyndrome.vue";
import MeningitisBacterial from "./meningitis-components/MeningitisBacterial.vue";
import MeningitisOutcome from "./meningitis-components/MeningitisOutcome.vue";
export default defineComponent({
  components: {
    FormCard,
    FormPatientInfo,
    Loader,
    FormSkeleton,
    RegistryNav,
    SwitchTab,
    MeningitisClinical,
    MeningitisInvestigator,
    MeningitisVaccination,
    MeningitisExposure,
    MeningitisCase,
    MeningitisSyndrome,
    MeningitisBacterial,
    MeningitisOutcome,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const swal = inject("$swal");
    const toast = useToast();
    const patient = ref(decryptData(localStorage.getItem("patient")));
    const formData = ref({});
    const authUser = computed(() => store.getters.getAuthenticatedUser);
    const fetchPatientInfo = async () => {
      skeletonLoading();
      const response = await api.get(`/patients/${patient.value.patientId}`);
      formData.value = response.data.data;
      diseaseDetails.value.ep_id = `0038995-${caseName}-${epDate}-${trimZeroes(
        formData.value.patient_no
      )}`;
      diseaseDetails.value.case_id = `${caseDate}-`;
      if (patient.value.registry == false) {
        store.dispatch("fetchDiseaseHistory", patient.value.diseaseId);
        store.dispatch("fetchMenin", patient.value.meningitisId);
      } else {
        store.commit("setDiseaseHistoryEmpty");
        store.commit("setMeninEmpty");
      }
    };

    const tabs = ref([
      { id: 1, name: "Clinical Information" },
      { id: 2, name: "Investigator Details & Vaccination History" },
      { id: 3, name: "Exposure History & Other Information" },
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
      maxTab: 3,
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
    const formMenin = computed(() => store.getters.getMenin);
    const meninResponse = computed(() => store.getters.getMeninResponse);

    //registry
    //forRegistry Only
    const caseName = "AME";
    const epDate = moment(Date.now()).format("MMDDYY");
    const caseDate = moment(Date.now()).format("YYYY");
    const diseaseDetails = ref({
      id: 0,
      disease_date: currentDate,
      type: "2", //meningitis type 2
      case_code: "AMES", //default case code meningitis
      case_id: ``,
      ep_id: ``,
    });

    const saveDiseaseHistory = async (formRequest) => {
      await store.dispatch("saveDiseaseHistory", formRequest);
    };

    const saveMenin = async (formRequest) => {
      await store.dispatch("saveMenin", formRequest);
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

          await saveMenin({
            ...formMenin.value,
            disease_history_id: diseaseResponse.value.id,
            user_id: authUser.value.id,
          });

          savingFlag.value = false;
          let message = !patient.value.registry ? "Updated" : "Saved";
          swalMessage(
            swal,
            `Information`,
            `Patient AMES Record ${message} Successfully`,
            "success"
          ).then(() => {
            router.push({ name: "patients", params: { type: "meningitis" } });
          });
        }
      });
    };

    const saveSubmitted = ref(false);
    const saveData = async () => {
      saveSubmitted.value = true;
      const errors = await validateFields(toast, formMenin.value, 0);
      console.log("saving error", errors.value.errors, errors.value.tab);
      selectTab(errors.value.tab);

      if (errors.value.errors == 0) {
        await savingConfirmation();
      }
    };

    const resetter = () => {
      savingFlag.value = false;
      saveSubmitted.value = false;
      selectedTab.value = 1;
    };

    watch(
      () => {
        formMenin.value;
        if (saveSubmitted.value == true) {
          validateFields(toast, formMenin.value, 1);
        }
      },
      { deep: true }
    );

    const skelPatientInfo = { count: 3, perRow: 3, withButtons: false };
    const skelClinical = {
      count: !patient.registry ? 5 : 4,
      perRow: 3,
      withButtons: false,
    };

    const skelInvestigator = { count: 2, perRow: 3, withButtons: false };
    const skelVaccination = { count: 7, perRow: 3, withButtons: false };
    const skelExposure = { count: 4, perRow: 4, withButtons: false };
    const skelCase = { count: 1, perRow: 3, withButtons: false };
    const skelAClass = { count: 1, perRow: 2, withButtons: false };
    const skelBClass = { count: 2, perRow: 2, withButtons: false };
    const skelOutCome = { count: 2, perRow: 2, withButtons: false };

    const isLoading = ref(true);
    const skeletonLoading = async () => {
      setTimeout(() => {
        isLoading.value = false;
        console.log("isLoading:", isLoading.value);
      }, 1500);
    };

    onMounted(async () => {
      await fetchPatientInfo();
      console.log("onMounted", patient.value);
      resetter();
    });

    return {
      patient,
      formData,
      currentDate,
      selectedTab,
      selectTab,
      NumericOnly,

      formDiseaseHistory,
      diseaseResponse,
      formMenin,
      fnMenin,
      //saving
      savingFlag,
      savingConfirmation,
      saveData,
      //validation
      validationStatus,
      saveSubmitted,
      //loader
      isLoading,
      skelPatientInfo,
      skelClinical,
      skelInvestigator,
      skelVaccination,
      skelExposure,
      skelCase,
      skelAClass,
      skelBClass,
      skelOutCome,
      //tabs
      tabs,
      switchSelect,
      switchTabDetails,
      backTo,
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

/*.nav-pills{
  position: fixed;
  top: -10;
  z-index: 100;
  width: 100%;
}*/

.card {
  margin-right: 50px;
}

.menin-content {
  margin-top: 50px !important;
}

@media screen and (max-width: 991px) {
  .nav-pills {
    display: none !important;
  }
  .card {
    margin-right: 0;
  }
  .menin-content {
    margin-top: 0px !important;
  }
}
</style>
