<template>
  <registry-nav
    class="position-fixed z-3 mr-5"
    :tabs="tabs"
    :patient="patientInfo"
    :selectedTab="selectedTab"
    :profileRegistry="true"
    @save-data="savePatientProfile()"
  />

  <div class="card my-0">
    <div class="card-body profile-content py-4">
      <Toast />
      <div class="row">
        <div class="col-sm-12 col-lg-12">
          <div class="row">
            <div class="col-12 mb-2">
              <form-skeleton :data="skelPatientInfo" v-if="isLoading" />
              <patient-information
                v-else
                :patientInfo="patientInfo"
                :saveSubmitted="saveSubmitted"
                :validationStatus="validationStatus"
              />
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-lg-12">
          <div class="row">
            <div class="col-sm-12 col-md-6 mb-2">
              <form-skeleton :data="skelAddress" v-if="isLoading" />
              <permanent-address
                v-else
                :saveSubmitted="saveSubmitted"
                :validationStatus="validationStatus"
              />
            </div>
            <div class="col-sm-12 col-md-6 mb-2">
              <form-skeleton :data="skelAddress" v-if="isLoading" />
              <current-address
                v-else
                :sameAsPermanent="sameAsPermanent"
                :saveSubmitted="saveSubmitted"
                :validationStatus="validationStatus"
              />
            </div>
          </div>
        </div>
      </div>
      <switch-tab
        :details="switchTabDetails"
        @patient-list="backTo"
        @save-data="savePatientProfile()"
      />
    </div>
  </div>
  <!-- <div>
    <pre>{{ validationStatus }}</pre>
    <pre>{{ savingResponse }}</pre>
    <pre>{{ formData }}</pre>
    <pre>{{ patientInfo }}</pre>
  </div> -->
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
import RegistryNav from "@/components/pagination/RegistryNav.vue";
import SwitchTab from "@/components/pagination/SwitchTab.vue";
import PatientInformation from "./registry-components/PatientInformation.vue";
import PermanentAddress from "./registry-components/PermanentAddress.vue";
import CurrentAddress from "./registry-components/CurrentAddress.vue";
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
    RegistryNav,
    SwitchTab,
    PatientInformation,
    PermanentAddress,
    CurrentAddress,
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

    const tabs = ref([{ id: 1, name: "Patient Profile Registry" }]);
    const selectedTab = ref(1);

    const switchTabDetails = ref({
      currentTab: 1,
      maxTab: 1,
      title: "Patient Profile Registry",
    });

    const backTo = () => {
      router.push({ name: "patientlist" });
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
      //tabs
      tabs,
      selectedTab,
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

/*.nav-link.active {
    border: 0 2px 2px 0  solid #5d87ff;
}*/

.nav-pills {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.card {
  margin-right: 50px;
}

.profile-content {
  margin-top: 50px !important;
}

@media screen and (max-width: 991px) {
  .nav-pills {
    display: none !important;
  }
  .card {
    margin-right: 0;
  }
  .profile-content {
    margin-top: 0px !important;
  }
}
</style>
