<template>
  <div class="card my-0">
    <div class="card-body py-4">
      <form-skeleton :data="skeletonData" v-if="isSkeleton" />
      <search-disease
        v-else
        :formData="formData"
        @search-data="searchpatient()"
        @refresh-data="refreshPatients()"
      />

      <!-- <form-skeleton :data="skeletonData" /> -->
      <div class="d-flex align-items-center justify-content-start my-2">
        <button
          class="btn btn-primary btn-sm"
          @click="toggleList = true"
          v-if="!toggleList"
        >
          Create Line List
        </button>
        <div class="d-flex gap-3" v-else>
          <button
            class="btn btn-success btn-sm position-relative"
            :disabled="!cart.length"
            @click="setFormHeader(authUser)"
          >
            Finalized Line List
            <span
              v-if="cart.length"
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {{ cart.length }}
            </span>
          </button>
          <button class="btn btn-danger btn-sm" @click="cartResetter()">
            Cancel
          </button>
        </div>
      </div>
      <div>
        <div class="table-responsive p-0 m-0 border border-primary">
          <table-skeleton v-if="isSkeleton" />
          <table class="table table-bordered table-hover" v-else>
            <thead>
              <tr>
                <th
                  class="text-center bg-primary text-white p-1 m-0"
                  v-if="toggleList"
                >
                  Select
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">Ep ID</th>
                <th class="text-center bg-primary text-white p-1 m-0">Print</th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Case ID
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Case Code
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Patient No.
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Patient Name
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
              <tr v-for="p in patients" :key="p.rotavirus_id">
                <td
                  class="text-center align-middle fw-bold p-1 m-0"
                  v-if="toggleList"
                >
                  <a
                    href="javascript:void(0);"
                    @click="removeToCart(p)"
                    v-if="
                      cart.some(
                        (patient) =>
                          patient.disease_history_id === p.disease_history_id
                      )
                    "
                  >
                    <i
                      class="fa fa-minus-circle scale-icon text-warning"
                      aria-hidden="true"
                      style="transition: all 300ms ease"
                      v-tooltip.right="{
                        value: `<h6 class='text-white'>Remove Patient</h6>`,
                        escape: true,
                        class: 'bg-dark rounded p-1',
                      }"
                    ></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    @click="addToCart(p)"
                    :class="{ 'pe-none': p.laboratory_profiles.length === 0 }"
                    v-else
                  >
                    <i
                      class="fa scale-icon text-success"
                      :class="
                        p.laboratory_profiles.length === 0
                          ? 'text-danger fa-ban'
                          : 'text-success fa-plus-circle '
                      "
                      aria-hidden="true"
                      style="transition: all 300ms ease"
                      v-tooltip.right="{
                        value: `<h6 class='text-white'>Select Patient</h6>`,
                        escape: true,
                        class: 'bg-dark rounded p-1',
                      }"
                    ></i>
                  </a>
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ p.ep_id }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <a href="javascript:void(0);" @click="viewDiseaseProfile(p)">
                    <!-- <i class="scale-icon ti ti-file-invoice fs-6"></i> -->
                    <img
                      class="scale-icon"
                      src="../../../assets/images/icons/print.png"
                      height="30"
                      width="30"
                      v-tooltip.right="{
                        value: `<h6 class='text-white'>Print Form</h6>`,
                        escape: true,
                        class: 'bg-dark rounded p-1',
                      }"
                    />
                  </a>
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ p.case_id }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ p.case_code }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ p.patient_no }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ p.lname }}, {{ p.fname }} {{ p.mname }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ p.date_created }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ p.date_updated }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ p.created_by }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <button
                    @click="updateData(p)"
                    class="btn btn-sm btn-info m-1"
                  >
                    Update
                  </button>
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <button @click="zxc" class="btn btn-sm btn-danger m-1">
                    Inactive
                  </button>
                </td>
              </tr>
              <tr v-if="!patients.length && !isLoading">
                <td
                  class="text-center align-middle fw-bold p-1 m-0"
                  colspan="11"
                >
                  No records found.
                </td>
              </tr>
              <!-- <pre>{{ cart }}</pre> -->
              <tr v-if="isLoading">
                <td colspan="11">
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
          <!-- {{ cart }} -->
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
  <!-- <pre>{{ cart }}</pre> -->
  <modal-form :details="modalDetails" @close-modal="modalDetails.show = false">
    <div class="row p-2 m-0">
      <div class="col-12">
        <div>
          <div class="d-flex align-items-center justify-content-end gap-2">
            <button
              type="submit"
              class="btn btn-sm btn-primary"
              @click="printComponent.generatePDF()"
            >
              <i class="ti ti-printer"></i> Print
            </button>
            <button
              type="submit"
              class="btn btn-sm btn-danger"
              @click="modalDetails.show = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="d-flex justify-content-center align-items-center mb-2"
      style="overflow-y: hidden"
    >
      <print-measles
        :patient="patientData"
        class="border"
        ref="printComponent"
        style="opacity: 1"
      />
    </div>
  </modal-form>
  <modal-md :details="modalLineList" @close-modal="modalLineList.show = false">
    <linelist-data
      :formHeader="formHeader"
      :patients="cart"
      :specimens="specimens"
      :flag-checker="flagChecker"
      :createList="true"
      @close-linelist="modalLineList.show = false"
      @save-linelist="saveLinelist()"
      @remove-patient="removeToCart($event)"
    />
  </modal-md>
  <loader
    title="Creating Measles-Rubella Linelist..."
    :subTitle="subTitle"
    :counts="patientCount"
    :warning="true"
    :create="true"
    v-if="savingFlag"
  />
  <!-- <pre>{{ patientData }}</pre> -->
  <!-- <print-rota :patient="patientData" ref="printComponent" style="opacity: 1; border: 1px solid red"/> -->
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
import ModalForm from "@/components/modals/ModalForm.vue";
import ModalSemiSm from "@/components/modals/ModalSemiSm.vue";
import FormSkeleton from "@/pages/loader/FormSkeleton.vue";
import TableSkeleton from "@/pages/loader/TableSkeleton.vue";
import SkeletonPlaceholder from "@/pages/loader/SkeletonPlaceholder.vue";
import PaginationSkeleton from "@/pages/loader/PaginationSkeleton.vue";
import ModalMd from "@/components/modals/ModalMd.vue";
import Loader from "@/pages/loader/Loader.vue";
import SearchDisease from "@/pages/diseases/list/list-components/SearchDisease.vue";
import LinelistData from "@/pages/linelist/linelist-components/LinelistData.vue";
import { encryptData } from "@/composables";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { tribes } from "@/composables";
import moment from "moment";
import {
  isSkeleton,
  skeletonData,
  loadingSkeleton,
  formData,
  resetFormData,
} from "./actions/RotaVirus";
import {
  swalConfirmation,
  swalMessage,
  trimZeroes,
  decryptData,
  NumericOnly,
} from "@/composables";
import PrintMeasles from "@/pages/printable_forms/PrintMeasles.vue";

export default defineComponent({
  components: {
    SearchCard,
    Pagination,
    ModalForm,
    FormSkeleton,
    TableSkeleton,
    SkeletonPlaceholder,
    PaginationSkeleton,
    PrintMeasles,
    ModalSemiSm,
    ModalMd,
    Loader,
    SearchDisease,
    LinelistData,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const swal = inject("$swal");
    const authUser = computed(() => store.getters.getAuthenticatedUser);
    const patients = computed(() => store.getters.getMeasePatients);
    const totalPatients = computed(() => store.getters.getMeaseTotal);
    const patientsPage = computed(() => store.getters.getMeasePaginated);
    const specimens = computed(() => store.getters.getMeaseSpecimens);

    const paginationData = ref({
      totalRecords: totalPatients.value,
      totalPages: patientsPage.value,
      perPage: 10,
      currentPage: 1,
    });

    isSkeleton.value = true;

    watch([totalPatients, patientsPage], ([total, pages]) => {
      paginationData.value.totalRecords = total;
      paginationData.value.totalPages = pages;
    });

    const currentAuth = computed(() => store.getters.getAuthenticatedUser);

    const isLoading = ref(false);
    const fetchPatients = async (page, form) => {
      let mime =
        currentAuth.value.role == "Administrator" ? null : currentAuth.value.id;
      await store.commit("setMeasePatientsEmpty");
      isLoading.value = true;
      await store.dispatch("fetchAllMease", {
        page: page,
        ...form,
        mime: mime,
      });
      isLoading.value = false;
    };

    const updateCurrentPage = async (newPage: number) => {
      paginationData.value.currentPage = newPage;
      fetchPatients(newPage, formData.value);
    };

    const searchpatient = async () => {
      isLoading.value = true;
      await store.commit("setMeasePatientsEmpty");
      paginationData.value.currentPage = 1;
      await fetchPatients(1, formData.value);
    };

    const refreshPatients = async () => {
      resetFormData();
      searchpatient();
    };

    const updateData = (patientData) => {
      let details = {
        patientId: patientData.patientInfo_id,
        diseaseId: patientData.diseasehistory_id,
        measlesId: patientData.measles_id,
        registry: false,
      };
      const patientId = encryptData(JSON.stringify(details));
      localStorage.setItem("patient", patientId);
      router.push({ name: "disease", params: { type: "measles" } });
    };

    const printComponent = ref(null);
    const patientData = ref({});
    const printForm = async (p) => {
      const tribe = tribes.find((tribe) => {
        tribe.id == p.indigenousOthers;

        return tribe;
      });

      patientData.value = {
        ...p,
        birthdate: moment(p.birthdate).format("MM DD YYYY"),
        curr_address:
          `${p.curr_street}, ${p.curr_barangay}, ${p.curr_city}, ${p.curr_province} ${p.curr_region}`.toUpperCase(),
        perm_address:
          `${p.perm_street}, ${p.perm_barangay}, ${p.perm_city}, ${p.perm_province} ${p.perm_region}`.toUpperCase(),
        tribe: tribe.name,
        date_admitted: p.date_admitted
          ? moment(p.date_admitted).format("MM DD YYYY")
          : "",
        admission_date: p.admission_date
          ? moment(p.admission_date).format("MM DD YYYY")
          : "",
        date_hospitalization: p.date_hospitalization
          ? moment(p.date_hospitalization).format("MM DD YYYY")
          : "",
        date_vomiting: p.date_vomiting
          ? moment(p.date_vomiting).format("MM DD YYYY")
          : "",
        first_dose: p.first_dose
          ? moment(p.first_dose).format("MM DD YYYY")
          : "",
        second_dose: p.second_dose
          ? moment(p.second_dose).format("MM DD YYYY")
          : "",
        investigate_date: p.investigate_date
          ? moment(p.investigate_date).format("MM DD YYYY")
          : "",
        reporter_date: p.reporter_date
          ? moment(p.reporter_date).format("MM DD YYYY")
          : "",
        fever_date: p.fever_date
          ? moment(p.fever_date).format("MM DD YYYY")
          : "",
        rash_date: p.rash_date ? moment(p.rash_date).format("MM DD YYYY") : "",
        died_date: p.died_date ? moment(p.died_date).format("MM DD YYYY") : "",
        date_last_mcv: p.date_last_mcv
          ? moment(p.date_last_mcv).format("MM DD YYYY")
          : "",
        travel_date: p.travel_date
          ? moment(p.travel_date).format("MM DD YYYY")
          : "",
        date_contact: p.date_contact
          ? moment(p.date_contact).format("MM DD YYYY")
          : "",
        date_died: p.date_died ? moment(p.date_died).format("MM DD YYYY") : "",
      };

      printComponent.value.generatePDF();
    };

    const modalDetails = ref({
      show: false,
      title: "Disease Profile",
    });

    const viewDiseaseProfile = (p) => {
      console.log("pp", p);
      const tribe = tribes.find((tribe) => {
        tribe.id == p.indigenousOthers;

        return tribe;
      });
      patientData.value = {
        ...p,
        birthdate: moment(p.birthdate).format("MM DD YYYY"),
        curr_address:
          `${p.curr_street}, ${p.curr_barangay}, ${p.curr_city}, ${p.curr_province} ${p.curr_region}`.toUpperCase(),
        perm_address:
          `${p.perm_street}, ${p.perm_barangay}, ${p.perm_city}, ${p.perm_province} ${p.perm_region}`.toUpperCase(),
        tribe: tribe.name,
        date_admitted: p.date_admitted
          ? moment(p.date_admitted).format("MM DD YYYY")
          : "",
        admission_date: p.admission_date
          ? moment(p.admission_date).format("MM DD YYYY")
          : "",
        date_hospitalization: p.date_hospitalization
          ? moment(p.date_hospitalization).format("MM DD YYYY")
          : "",
        date_vomiting: p.date_vomiting
          ? moment(p.date_vomiting).format("MM DD YYYY")
          : "",
        first_dose: p.first_dose
          ? moment(p.first_dose).format("MM DD YYYY")
          : "",
        second_dose: p.second_dose
          ? moment(p.second_dose).format("MM DD YYYY")
          : "",
        investigate_date: p.investigate_date
          ? moment(p.investigate_date).format("MM DD YYYY")
          : "",
        reporter_date: p.reporter_date
          ? moment(p.reporter_date).format("MM DD YYYY")
          : "",
        fever_date: p.fever_date
          ? moment(p.fever_date).format("MM DD YYYY")
          : "",
        rash_date: p.rash_date ? moment(p.rash_date).format("MM DD YYYY") : "",
        died_date: p.died_date ? moment(p.died_date).format("MM DD YYYY") : "",
        date_last_mcv: p.date_last_mcv
          ? moment(p.date_last_mcv).format("MM DD YYYY")
          : "",
        travel_date: p.travel_date
          ? moment(p.travel_date).format("MM DD YYYY")
          : "",
        date_contact: p.date_contact
          ? moment(p.date_contact).format("MM DD YYYY")
          : "",
        date_died: p.date_died ? moment(p.date_died).format("MM DD YYYY") : "",
      };
      modalDetails.value.title = `${p.ep_id} - Disease Profile`;
      modalDetails.value.show = true;
    };

    const cart = ref([]);
    const addToCart = (patient) => {
      console.log("patient", patient.laboratory_profiles);

      const cartValues = patient.laboratory_profiles.map((item) => {
        return {
          ...item,
          laboratory_profile_id: item.id,
          disease_history_id: patient.disease_history_id,
          lname: patient.lname,
          fname: patient.fname,
          mname: patient.mname,
          age_year: patient.age_year,
          gender: patient.gender,
          birthdate: patient.birthdate,
          type: patient.type,
        };
      });

      cart.value.push(...cartValues);
      // cart.value = cart.value.map((c) => {
      //   return {
      //     ...c,
      //     datetime_collection: "",
      //     specimen: "",
      //   };
      // });
    };

    const removeToCart = (patient) => {
      console.log(patient);
      // const index = cart.value.findIndex(
      //   (c) => c.disease_history_id === patient.disease_history_id
      // );

      // if (index !== -1) {
      //   cart.value.splice(index, 1);
      // }

      cart.value = cart.value.filter(
        (c) => c.disease_history_id !== patient.disease_history_id
      );
    };

    const toggleList = ref(false);

    const cartResetter = () => {
      cart.value = [];
      toggleList.value = false;
      flagChecker.value = false;
    };

    const modalLineList = ref({
      show: false,
      title: "Finalize Linelist",
    });

    const formHeader = ref({
      id: 0,
      linelist_code: "MEA",
      dru: "",
      dru_officer: "",
      contact: "",
      region: "",
      province: "",
      email: "",
    });

    const setFormHeader = (payload) => {
      modalLineList.value.show = true;
      (formHeader.value.dru = payload.institution),
        (formHeader.value.dru_officer = payload.fullname),
        (formHeader.value.contact = payload.mobile),
        (formHeader.value.region = payload.address.region),
        (formHeader.value.province = payload.address.province),
        (formHeader.value.email = payload.email);
    };

    const cancelHeader = () => {
      modalLineList.value.show = false;
      flagChecker.value = false;
    };

    const saveLinelistHeader = async () => {
      await store.dispatch("saveLinelist", {
        ...formHeader.value,
        linelist_details: cart.value,
        created_by: authUser.value.id,
        updated_by: authUser.value.id,
      });
      savingFlag.value = false;
    };
    const headerResponse = computed(() => store.getters.getLnhResponse);

    const currentCount = ref(1);
    const patientCount = ref("");
    const subTitle = ref("");
    const savingFlag = ref(false);
    const flagChecker = ref(false);

    const resetResource = () => {
      cart.value = [];
      currentCount.value = 1;
      subTitle.value = "";
      patientCount.value = "";
      flagChecker.value = false;
      modalLineList.value.show = false;
    };

    const validateLinelist = () => {
      flagChecker.value = true;
      const hasError = cart.value.some((c) => {
        if (!c.specimen || !c.datetime_collection) {
          swalMessage(
            swal,
            "Validation Failed",
            "Please fill out required fields.",
            "error"
          );
          return true;
        }
        return false;
      });

      return hasError;
    };

    const saveLinelistDetails = async () => {
      for (let i = 0; i < cart.value.length; i++) {
        subTitle.value = `Patient ${cart.value[i].lname}, ${cart.value[i].fname} ${cart.value[i].mname} has been added to the Linelist`;
        patientCount.value = `${currentCount.value} out of ${cart.value.length} Patient/s`;
        await store.dispatch("saveLinelistDetails", {
          idd: 0,
          linelist_header_id: headerResponse.value.id,
          ...cart.value[i],
        });

        if (currentCount.value < cart.value.length) {
          currentCount.value += 1;
        }

        if (i === cart.value.length - 1) {
          savingFlag.value = false;
          swalMessage(
            swal,
            "Information",
            `Linelist ${headerResponse.value.linelist_code} has been Created Successfully`,
            "success"
          ).then(() => {
            resetResource();
            router.push({ name: "linelists" });
          });
        }
      }
    };

    const saveLinelist = async () => {
      if (!cart.value.length) {
        swalMessage(
          swal,
          "Warning",
          "Please Add Patient/s Before Saving",
          "warning"
        );
        return;
      }

      // const hasError = validateLinelist();

      // if (hasError) {
      //   return;
      // }

      swalConfirmation(
        swal,
        "Confirmation",
        `Are you sure to save Line list?`,
        "question"
      ).then(async (res) => {
        if (res.isConfirmed) {
          savingFlag.value = true;
          await saveLinelistHeader();
          // await saveLinelistDetails();

          swalMessage(
            swal,
            "Information",
            `Linelist ${headerResponse.value.linelist_code} has been Created Successfully`,
            "success"
          ).then(() => {
            resetResource();
            router.push({ name: "linelists" });
          });
        }
      });
    };

    onMounted(async () => {
      cartResetter();
      setTimeout(async () => {
        await fetchPatients(1, formData.value);
      }, 500);
      loadingSkeleton();
    });

    return {
      //search
      formData,
      //fetch
      patients,
      paginationData,
      searchpatient,
      refreshPatients,
      updateCurrentPage,
      //loader
      isSkeleton,
      skeletonData,
      loadingSkeleton,
      //update
      updateData,
      //print
      printComponent,
      printForm,
      patientData,
      viewDiseaseProfile,
      modalDetails,
      isLoading,

      //cart
      cart,
      addToCart,
      removeToCart,
      toggleList,
      cartResetter,
      modalLineList,
      authUser,
      setFormHeader,
      formHeader,
      specimens,
      saveLinelist,
      //cart saving
      savingFlag,
      currentCount,
      subTitle,
      flagChecker,
      patientCount,
      cancelHeader,
    };
  },
});
</script>

<style scoped></style>
