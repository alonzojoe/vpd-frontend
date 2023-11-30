<template>
  <div class="card my-0">
    <div class="card-body py-4">
      <form-skeleton :data="skeletonData" v-if="isSkeleton" />
      <search-profile
        v-else
        :formDataSearch="formDataSearch"
        @reset-search="refreshData()"
        @search-patient="searchPatient()"
      />

      <!-- <form-skeleton :data="skeletonData" /> -->
      <div class="d-flex justify-content-end">
        <skeleton-placeholder
          class="mb-2"
          v-if="isSkeleton"
          height="39px"
          width="150px"
          bg="#5D87FF"
          radius="5px"
        />
        <button
          @click.prevent="createProfile()"
          type="button"
          class="btn btn-info btn-rounded mb-2"
          v-else
        >
          Add New Patient
        </button>
      </div>
      <div>
        <div class="table-responsive p-0 m-0 border border-primary">
          <table-skeleton v-if="isSkeleton" />
          <table class="table table-bordered table-hover" v-else>
            <thead>
              <tr>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Patient No.
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Patient Name
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Institution
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Birthdate
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Created At
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Updated At
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Created By
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Disease
                </th>
                <th
                  class="text-center bg-primary text-white p-1 m-0"
                  style="width: 5%"
                >
                  Update
                </th>
                <th
                  class="text-center bg-primary text-white p-1 m-0"
                  style="width: 5%"
                >
                  Inactive
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in patients" :key="p.id">
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ p.patient_no }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ p.lname }}, {{ p.fname }} {{ p.mname }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ p.user.institution }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ p.birthdate }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ p.created_at }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ p.updated_at }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ p.created_by }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <button
                    @click="addDisease(p)"
                    class="btn btn-sm btn-warning m-1"
                  >
                    Add Disease
                  </button>
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <button
                    @click="updatePatient(p)"
                    class="btn btn-sm btn-info m-1"
                  >
                    Update
                  </button>
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <button
                    @click="setInactive(p)"
                    class="btn btn-sm btn-danger m-1"
                  >
                    Inactive
                  </button>
                </td>
              </tr>
              <tr v-if="!patients.length && !isLoading">
                <td
                  class="text-center align-middle fw-bold p-1 m-0"
                  colspan="9"
                >
                  No records found.
                </td>
              </tr>
              <tr v-if="isLoading">
                <td colspan="9">
                  <div class="d-flex align-items-center justify-content-center">
                    <div
                      class="spinner-border spinner-border-sm text-dark"
                      role="status"
                    ></div>
                    <span class="text-dark ml-4"
                      >&nbsp;&nbsp;&nbsp;Loading Please Wait...</span
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <pagination-skeleton class="mt-4" v-if="isSkeleton" />
        <pagination
          v-if="!isLoading && !isSkeleton"
          :data="paginationData"
          @update:currentPage="updateCurrentPage"
        />
      </div>
    </div>
  </div>
  <modal-md :details="modalDetails" @close-modal="modalDetails.show = false">
    <div class="row mt-2">
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">Patient No:</Label>
          <input
            type="text"
            v-model="formRegistry.patientNo"
            @keyup.enter="searchRegistry()"
            @keypress="NumericOnly()"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">Last Name</Label>
          <input
            type="text"
            v-model="formRegistry.lastName"
            @keyup.enter="searchRegistry()"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">First Name:</Label>
          <input
            type="text"
            v-model="formRegistry.firstName"
            @keyup.enter="searchRegistry()"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">Middle Name:</Label>
          <input
            type="text"
            v-model="formRegistry.middleName"
            @keyup.enter="searchRegistry()"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
        <div class="d-flex justify-content-end mt-2">
          <button
            class="btn btn-primary m-1"
            @keyup.enter="searchRegistry()"
            @click.prevent="searchRegistry()"
          >
            Search
          </button>
          <button class="btn btn-danger m-1" @click.prevent="resetSearch()">
            Refresh
          </button>
        </div>
      </div>
    </div>
    <div class="table-responsive p-0 m-0 border border-primary mb-4">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th class="text-center bg-primary text-white p-0 m-0">
              Patient Number
            </th>
            <th class="text-center bg-primary text-white p-0 m-0">Last Name</th>
            <th class="text-center bg-primary text-white p-0 m-0">
              First Name
            </th>
            <th class="text-center bg-primary text-white p-0 m-0">
              Middle Name
            </th>
            <th class="text-center bg-primary text-white p-0 m-0">Birthdate</th>
            <th
              class="text-center bg-primary text-white p-0 m-0"
              style="width: 10%"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in patientSearch" :key="p.id">
            <td class="text-center align-middle fw-bold p-0 m-0">
              {{ p.patients.PatientNo }}
            </td>
            <td class="text-center align-middle fw-bold p-0 m-0">
              {{ p.patientinfo.LastName }}
            </td>
            <td class="text-center align-middle fw-bold p-0 m-0">
              {{ p.patientinfo.FirstName }}
            </td>
            <td class="text-center align-middle fw-bold p-0 m-0">
              {{ p.patientinfo.MiddleName }}
            </td>
            <td class="text-center align-middle fw-bold p-0 m-0">
              {{ p.Birthday }}
            </td>
            <td class="text-center align-middle fw-bold p-0 m-0">
              <button
                class="btn btn-sm btn-info m-1"
                @click="registerPatient(p)"
              >
                Register Patient
              </button>
            </td>
          </tr>
          <tr v-if="!patientSearch.length && !isLoadingRegistry">
            <td class="text-center align-middle fw-bold p-1 m-0" colspan="9">
              No records found.
            </td>
          </tr>
          <tr v-if="isLoadingRegistry">
            <td colspan="9">
              <div class="d-flex align-items-center justify-content-center">
                <div
                  class="spinner-border spinner-border-sm text-dark"
                  role="status"
                ></div>
                <span class="text-dark ml-4"
                  >&nbsp;&nbsp;&nbsp;Loading Please Wait...</span
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="noRecord">
      <p class="mb-1">
        No similar matches for {{ formRegistry.lastName }},
        {{ formRegistry.firstName }} ?
        <button
          class="btn btn-sm btn-primary m-1"
          @click.prevent="registerNoRecordPatient(formRegistry)"
        >
          Add New Patient
        </button>
      </p>
    </div>
  </modal-md>
  <modal-semi-sm
    :details="modalDetailsSM"
    @close-modal="modalDetailsSM.show = false"
  >
    <div class="row mt-4">
      <div class="col-sm-12 col-md-12 col-lg-4">
        <div
          class="card text-center alert-dismissible fade show alert p-0 card-hover bg-white"
          role="alert"
        >
          <div class="p-2 d-block mt-3">
            <img
              src="../../assets/images/disease/rubella.png"
              width="75"
              class="rounded-circle img-fluid"
            />
            <h5 class="card-title mt-3">Measles-Rubella</h5>
            <span class="badge bg-light-success text-success rounded-pill mb-3"
              >active</span
            >
            <button
              @click="selectDiease('measles')"
              class="btn btn-danger d-block w-100"
            >
              Select Disease
            </button>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-4">
        <div
          class="card text-center alert-dismissible fade show alert p-0 card-hover bg-white"
          role="alert"
        >
          <div class="p-2 d-block mt-3">
            <img
              src="../../assets/images/disease/rota.png"
              width="75"
              class="rounded-circle img-fluid"
            />
            <h5 class="card-title mt-3">Rota Virus</h5>
            <span class="badge bg-light-success text-success rounded-pill mb-3"
              >active</span
            >
            <button
              @click="selectDiease('rota')"
              class="btn btn-success d-block w-100"
            >
              Select Disease
            </button>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-4">
        <div
          class="card text-center alert-dismissible fade show alert p-0 card-hover bg-white"
          role="alert"
        >
          <div class="p-2 d-block mt-3">
            <img
              src="../../assets/images/disease/meningitis.png"
              width="75"
              class="rounded-circle img-fluid"
            />
            <h5 class="card-title mt-3">Meningitis-Encephalitis</h5>
            <span class="badge bg-light-success text-success rounded-pill mb-3"
              >active</span
            >
            <button
              @click="selectDiease('meningitis')"
              class="btn btn-warning d-block w-100"
            >
              Select Disease
            </button>
          </div>
        </div>
      </div>
    </div>
  </modal-semi-sm>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  inject,
  computed,
  onMounted,
  watch,
  watchEffect,
} from "vue";
import SearchCard from "@/components/cards/SearchCard.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import ModalMd from "@/components/modals/ModalMd.vue";
import FormSkeleton from "../loader/FormSkeleton.vue";
import TableSkeleton from "../loader/TableSkeleton.vue";
import SkeletonPlaceholder from "../loader/SkeletonPlaceholder.vue";
import PaginationSkeleton from "../loader/PaginationSkeleton.vue";
import ModalSemiSm from "@/components/modals/ModalSemiSm.vue";
import SearchProfile from "./profiles-components/SearchProfile.vue";
import { useStore } from "vuex";
import {
  swalMessage,
  swalConfirmation,
  NumericOnly,
  encryptData,
} from "@/composables";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    SearchCard,
    Pagination,
    ModalMd,
    FormSkeleton,
    TableSkeleton,
    SkeletonPlaceholder,
    PaginationSkeleton,
    ModalSemiSm,
    SearchProfile,
  },

  setup() {
    const formDataSearch = ref({
      patno: "",
      lname: "",
      fname: "",
      mname: "",
      year: "",
      dateFrom: "",
      dateTo: "",
    });

    const resetFormDataSearch = () => {
      Object.keys(formDataSearch.value).forEach((key) => {
        formDataSearch.value[key] = "";
      });
    };

    const swal = inject("$swal");
    const currentAuth = computed(() => store.getters.getAuthenticatedUser);
    const store = useStore();
    const patients = computed(() => store.getters.getPatientProfiles);
    const totalPatients = computed(() => store.getters.getTotalPatients);
    const patientsPage = computed(() => store.getters.getPagesPatients);

    const paginationData = ref({
      totalRecords: totalPatients.value,
      totalPages: patientsPage.value,
      perPage: 10,
      currentPage: 1,
    });

    watch([totalPatients, patientsPage], ([total, pages]) => {
      paginationData.value.totalRecords = total;
      paginationData.value.totalPages = pages;
    });

    const isLoading = ref(false);
    const fetchPatients = async (page, form) => {
      console.log("daasd", currentAuth.value);
      let mime =
        currentAuth.value.role == "Administrator" ? null : currentAuth.value.id;
      await store.commit("setEmptyPatients");
      isLoading.value = true;
      await store.dispatch("fetchPatients", {
        page: page,
        ...form,
        mime: mime,
      });
      isLoading.value = false;
      console.log("asdsaasdasdsad");
    };

    const updateCurrentPage = (newPage: Number) => {
      paginationData.value.currentPage = newPage;
      fetchPatients(newPage, formDataSearch.value);
    };

    const searchPatient = async () => {
      isLoading.value = true;
      await store.commit("setEmptyPatients");
      paginationData.value.currentPage = 1;
      await fetchPatients(1, formDataSearch.value);
    };

    const refreshData = () => {
      resetFormDataSearch();
      searchPatient();
    };

    const modalDetails = ref({
      show: false,
      title: "Patient Profile Registration",
    });

    const formRegistry = ref({
      patientNo: "",
      lastName: "",
      firstName: "",
      middleName: "",
    });

    const createProfile = () => {
      resetformRegistry();
      store.commit("setPatientSearchEmpty");
      modalDetails.value.show = true;
    };

    const resetformRegistry = () => {
      Object.keys(formRegistry.value).forEach((key) => {
        formRegistry.value[key] = "";
      });
    };

    const router = useRouter();

    const registerPatient = (patientData) => {
      patientData.registry = true;
      const patientInfo = encryptData(JSON.stringify(patientData));
      router.push({
        name: "registry",
        params: { data: encodeURIComponent(patientInfo) },
      });
    };

    const registerNoRecordPatient = (formRegistry) => {
      formRegistry.noRecord = true;
      const patientInfo = encryptData(JSON.stringify(formRegistry));
      router.push({
        name: "registry",
        params: { data: encodeURIComponent(patientInfo) },
      });
    };

    const updatePatient = (patientData) => {
      patientData.registry = false;
      const patientInfo = encryptData(JSON.stringify(patientData));
      router.push({
        name: "registry",
        params: { data: encodeURIComponent(patientInfo) },
      });
    };

    const validateSearchObject = (object) => {
      for (const key in object) {
        if (object[key]) {
          return true;
        }
      }
      swalMessage(swal, "Warning", "Seach fields are empty", "warning");
      return false;
    };

    const patientSearch = computed(() => store.getters.getPatientSearch);
    const isLoadingRegistry = ref(false);
    const noRecord = ref(false);
    const searchRegistry = async () => {
      if (!validateSearchObject(formRegistry.value)) return;
      noRecord.value = false;
      isLoadingRegistry.value = true;
      store.commit("setPatientSearchEmpty");
      await store.dispatch("fetchPatientSearch", formRegistry.value);
      noRecord.value = !patientSearch.value.length ? true : false;
      isLoadingRegistry.value = false;
    };

    const resetSearch = async () => {
      await store.commit("setPatientSearchEmpty");
      resetformRegistry();
    };

    const skeletonData = ref({
      count: 2,
      perRow: 4,
      withButtons: true,
    });

    const isSkeleton = ref(true);

    const loadingSkeleton = () => {
      setTimeout(() => {
        isSkeleton.value = false;
      }, 2000);
    };

    const setInactive = async (patient) => {
      let selected = `${patient.lname}, ${patient.fname} ${patient.mname}`;
      swalConfirmation(
        swal,
        "Confirmation",
        `Are you sure to Inactive Patient: ${selected} ?`,
        "question"
      ).then(async (res) => {
        if (res.isConfirmed) {
          await store.dispatch("setPatientInactive", patient.id);
          swalMessage(
            swal,
            "Information",
            `Patient: ${selected} has been set to inactive.`,
            "success"
          ).then(() => {
            refreshData();
          });
        }
      });
    };

    const modalDetailsSM = ref({
      show: false,
      title: "Select Disease",
    });

    const selectedPatient = ref({});

    const addDisease = (patient) => {
      selectedPatient.value = patient;
      modalDetailsSM.value.show = true;
    };

    const selectDiease = (disease) => {
      let details = {
        patientId: selectedPatient.value.id,
        registry: true,
      };
      const patientId = encryptData(JSON.stringify(details));
      localStorage.setItem("patient", patientId);
      router.push({ name: "disease", params: { type: disease } });
    };

    onMounted(async () => {
      setTimeout(async () => {
        await fetchPatients(1, formDataSearch.value);
      }, 500);
      loadingSkeleton();
    });

    return {
      //fetch
      NumericOnly,
      formDataSearch,
      patients,
      totalPatients,
      patientsPage,
      paginationData,
      isLoading,
      updateCurrentPage,
      searchPatient,
      refreshData,
      currentAuth,
      //registry
      modalDetails,
      formRegistry,
      patientSearch,
      searchRegistry,
      isLoadingRegistry,
      noRecord,
      createProfile,
      registerPatient,
      skeletonData,
      isSkeleton,
      resetSearch,
      updatePatient,
      setInactive,
      registerNoRecordPatient,
      modalDetailsSM,
      addDisease,
      selectDiease,
    };
  },
});
</script>

<style scoped></style>
