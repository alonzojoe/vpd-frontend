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

      <div>
        <div class="table-responsive p-0 m-0 border border-primary">
          <table-skeleton v-if="isSkeleton" />
          <table class="table table-bordered table-hover" v-else>
            <thead>
              <tr>
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
      style="overflow-y: hidden; box-shadow: "
    >
      <print-rota
        :patient="patientData"
        class="border"
        ref="printComponent"
        style="opacity: 1"
      />
    </div>
  </modal-form>
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
import SearchDisease from "@/pages/diseases/list/list-components/SearchDisease.vue";
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
import PrintRota from "@/pages/printable_forms/PrintRota.vue";

export default defineComponent({
  components: {
    SearchCard,
    Pagination,
    ModalForm,
    FormSkeleton,
    TableSkeleton,
    SkeletonPlaceholder,
    PaginationSkeleton,
    PrintRota,
    ModalSemiSm,
    SearchDisease,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const swal = inject("$swal");

    const patients = computed(() => store.getters.getRotaPatients);
    const totalPatients = computed(() => store.getters.getRotaTotalPatients);
    const patientsPage = computed(() => store.getters.getRotaPagesPatients);

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
      await store.commit("setRotaPatientsEmpty");
      isLoading.value = true;
      await store.dispatch("fetchAllRota", { page: page, ...form, mime: mime });
      isLoading.value = false;
    };

    const updateCurrentPage = async (newPage: number) => {
      paginationData.value.currentPage = newPage;
      fetchPatients(newPage, formData.value);
    };

    const searchpatient = async () => {
      isLoading.value = true;
      await store.commit("setRotaPatientsEmpty");
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
        rotavirusId: patientData.rotavirus_id,
        registry: false,
      };
      const patientId = encryptData(JSON.stringify(details));
      localStorage.setItem("patient", patientId);
      router.push({ name: "disease", params: { type: "rota" } });
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
        onset_diarrhea: p.onset_diarrhea
          ? moment(p.onset_diarrhea).format("MM DD YYYY")
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
        investigation_date: p.investigation_date
          ? moment(p.investigation_date).format("MM DD YYYY")
          : "",
        report_date: p.report_date
          ? moment(p.report_date).format("MM DD YYYY")
          : "",
        discharge_date: p.discharge_date
          ? moment(p.discharge_date).format("MM DD YYYY")
          : "",
        died_date: p.died_date ? moment(p.died_date).format("MM DD YYYY") : "",
      };

      printComponent.value.generatePDF();
    };

    const modalDetails = ref({
      show: false,
      title: "Disease Profile",
    });

    const viewDiseaseProfile = (p) => {
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
        onset_diarrhea: p.onset_diarrhea
          ? moment(p.onset_diarrhea).format("MM DD YYYY")
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
        investigation_date: p.investigation_date
          ? moment(p.investigation_date).format("MM DD YYYY")
          : "",
        report_date: p.report_date
          ? moment(p.report_date).format("MM DD YYYY")
          : "",
        discharge_date: p.discharge_date
          ? moment(p.discharge_date).format("MM DD YYYY")
          : "",
        died_date: p.died_date ? moment(p.died_date).format("MM DD YYYY") : "",
      };
      modalDetails.value.title = `${p.ep_id} - Disease Profile`;
      modalDetails.value.show = true;
    };

    onMounted(async () => {
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
    };
  },
});
</script>

<style scoped></style>
