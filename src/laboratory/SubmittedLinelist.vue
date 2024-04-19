<template>
  <div class="card my-0">
    <div class="card-body py-4">
      <search-linelist
        :formData="formData"
        @search-linelist="searchLinelist()"
        @refresh-data="refreshPatients()"
      />
      <!-- <pre>
          {{ selectedLn }}
        </pre> -->
      <div
        class="d-flex align-items-center justify-content-start gap-2 my-2"
        v-if="filterHesu == 3"
      >
        <button
          class="btn btn-primary btn-sm"
          @click="enableCreate = true"
          v-if="!enableCreate"
        >
          Create Pool
        </button>

        <div class="d-flex gap-3" v-else>
          <button
            class="btn btn-success btn-sm position-relative"
            :disabled="!poolCart.length"
            @click="modalPool.show = true"
          >
            Finalized Pool
            <span
              v-if="poolCart.length"
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {{ poolCart.length }}
            </span>
          </button>
          <button class="btn btn-danger btn-sm" @click="cancelPool()">
            Cancel
          </button>
        </div>
      </div>
      <div>
        <div class="table-responsive p-0 m-0 border border-primary">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th
                  class="text-center bg-primary text-white p-1 m-0"
                  v-if="filterHesu == 2"
                >
                  Options
                </th>
                <th class="text-center bg-primary text-white p-1 m-0" v="i">
                  Code
                </th>
                <th
                  class="text-center bg-primary text-white p-1 m-0"
                  v-if="filterHesu == 3"
                >
                  Print
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">DRU</th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  DRU Officer
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Contact
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">Email</th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Created At
                </th>
                <th class="text-center bg-primary text-white p-1 m-0">
                  Updated At
                </th>
                <th
                  class="text-center bg-primary text-white p-1 m-0"
                  style="width: 5%"
                  v-if="filterHesu == 3"
                >
                  Update
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="l in linelists" :key="l.id">
                <td
                  class="text-center align-middle fw-bold p-1 m-0"
                  v-if="filterHesu == 2"
                >
                  <div
                    class="d-flex gap-2 justify-content-center"
                    v-if="l.status == 2"
                  >
                    <button
                      class="btn btn-primary btn-sm"
                      @click="changeStatus(l, 'a')"
                    >
                      Accept
                    </button>
                    <button
                      class="btn btn-danger btn-sm"
                      @click="changeStatus(l, 'r')"
                    >
                      Reject&nbsp;
                    </button>
                  </div>

                  <span
                    class="bg-success text-white p-1 rounded"
                    v-else-if="l.status == 3"
                    >Approved</span
                  >

                  <div
                    class="d-flex justify-content-center gap-2"
                    v-else-if="l.status == 4"
                  >
                    <span
                      class="badge bg-danger d-flex align-items-center gap-2 justify-content-between"
                      >Rejected</span
                    >
                    <span
                      class="badge rounded-pill bg-dark fs-2 d-flex justify-content-center align-items-center"
                      style="cursor: pointer"
                      v-tooltip.right="{
                        value: `<h3 class='text-white fs-3 text-uppercase'>${l.reject_reason}</h3>`,
                        escape: true,
                        class: 'bg-dark rounded p-1',
                      }"
                      >Reason</span
                    >
                  </div>
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <a href="javascript:void(0);" @click="updateLinelist(l)">{{
                    l.linelist_code
                  }}</a>
                </td>
                <td
                  class="text-center align-middle fw-bold p-1 m-0"
                  v-if="filterHesu == 3"
                >
                  <a href="javascript:void(0);" @click="openPrint(l.id)"
                    ><!-- <i class="scale-icon ti ti-file-invoice fs-6"></i> --><img
                      class="scale-icon"
                      src="/src/assets/images/icons/print.png"
                      height="30"
                      width="30"
                      data-pd-tooltip="true"
                  /></a>
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ l.dru }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ l.dru_officer }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ l.contact }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ l.email }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ l.created_at }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ l.updated_at }}
                </td>
                <td
                  class="text-center align-middle fw-bold p-1 m-0"
                  v-if="filterHesu == 3"
                >
                  <button
                    @click="updateLinelist(l)"
                    class="btn btn-sm btn-info m-1"
                  >
                    Update
                  </button>
                </td>
              </tr>
              <tr v-if="!linelists.length && !isLoading">
                <td
                  class="text-center align-middle fw-bold p-1 m-0"
                  colspan="11"
                >
                  No records found.
                </td>
              </tr>
              <tr v-if="isLoading">
                <td colspan="8">
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
      </div>
      <pagination
        v-if="!isLoading"
        :data="paginationData"
        @update:currentPage="updateCurrentPage"
      />
    </div>
    {{ poolCart }}
  </div>
  <modal-lg :details="modalDetails" @close-modal="onCloseSendMail()">
    <linelist-details
      ref="emailedComponent"
      :formHeader="selectedLn"
      :refresher="refresher"
      :isLoading="loadingData"
      :headerId="headerId"
      :specimens="selectedSpecimen"
      :enableCreate="enableCreate"
      :poolCart="poolCart"
      @update-loader="updateLoader($event)"
      @save-linelist="saveLinelist()"
      @add-to-pool="addToPool($event)"
      @remove-to-pool="removeToPool($event)"
    />
  </modal-lg>
  <modal-lg :details="modalPool" @close-modal="modalPool.show = false">
    <pool-details />
  </modal-lg>
  <loader
    title="Updating Linelist..."
    :warning="true"
    :create="true"
    v-if="savingFlag"
  />
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
import ModalLg from "@/components/modals/ModalLg.vue";
import FormSkeleton from "@/pages/loader/FormSkeleton.vue";
import TableSkeleton from "@/pages/loader/TableSkeleton.vue";
import SkeletonPlaceholder from "@/pages/loader/SkeletonPlaceholder.vue";
import PaginationSkeleton from "@/pages/loader/PaginationSkeleton.vue";
import ModalMd from "@/components/modals/ModalMd.vue";
import Loader from "@/pages/loader/Loader.vue";
import SearchLinelist from "@/pages/linelist/linelist-components/SearchLinelist.vue";
import LinelistDetails from "@/laboratory/lab-components/LinelistDetails.vue";
import PoolDetails from "@/laboratory/lab-components/PoolDetails.vue";
import { extractLnCode, randomMizer, toPascalCase } from "@/composables";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import moment from "moment";
import {
  swalConfirmation,
  swalMessage,
  trimZeroes,
  decryptData,
  NumericOnly,
} from "@/composables";
import PrintMeasles from "@/pages/printable_forms/PrintMeasles.vue";
import api from "@/api";

export default defineComponent({
  name: "SubmittedLinelist",
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
    SearchLinelist,
    ModalMd,
    ModalLg,
    LinelistDetails,
    PoolDetails,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const swal = inject("$swal") as any;
    const authUser = computed(() => store.getters.getAuthenticatedUser);
    const linelists = computed(() => store.getters.getLinelists);
    const totalLinelist = computed(() => store.getters.getTotalLinelists);
    const linelistPage = computed(() => store.getters.getPaginatedLinelists);

    const dateToday = ref(new Date());
    const formData = ref({
      code: "",
      dru: "",
      officer: "",
      dateFrom: moment(dateToday.value).format("YYYY-MM-DD"),
      dateTo: moment(dateToday.value).format("YYYY-MM-DD"),
    });

    const resetFormData = () => {
      Object.keys(formData.value).forEach((key) => {
        if (key === "dateFrom" || key === "dateTo") {
          formData.value[key] = moment(dateToday.value).format("YYYY-MM-DD");
        } else {
          formData.value[key] = "";
        }
      });
    };

    const paginationData = ref({
      totalRecords: totalLinelist.value,
      totalPages: linelistPage.value,
      perPage: 10,
      currentPage: 1,
    });

    watch([totalLinelist, linelistPage], ([total, pages]) => {
      paginationData.value.totalRecords = total;
      paginationData.value.totalPages = pages;
    });

    const isLoading = ref(false);
    const fetchLinelist = async (page: number, form: any) => {
      const mime =
        authUser.value.role == "Administrator" ? null : authUser.value.id;
      await store.commit("setLinelistsEmpty");
      isLoading.value = true;
      await store.dispatch("fetchSubmittedLinelist", {
        page: page,
        ...form,
        mime: mime,
        status: filterHesu.value,
      });
      isLoading.value = false;
    };

    const updateCurrentPage = async (newPage: number) => {
      paginationData.value.currentPage = newPage;
      fetchLinelist(newPage, formData.value);
    };

    const searchLinelist = async () => {
      isLoading.value = true;
      await fetchLinelist(1, formData.value);
    };

    const refreshPatients = async () => {
      resetFormData();
      searchLinelist();
    };

    const modalDetails = ref({
      show: false,
      title: "Upate Linelist",
    });

    const measeSpecimens = computed(() => store.getters.getMeaseSpecimens);
    const meninSpecimens = computed(() => store.getters.getMeninSpecimens);
    const rotaSpecimens = computed(() => store.getters.getRotaSpecimens);

    const selectedSpecimen = ref([]);
    const selectedLn = ref({});
    const refresher = ref(null);
    const loadingData = ref(false);
    const headerId = ref(0);
    const updateLinelist = async (linelist: Object) => {
      refresher.value = randomMizer(20);
      specimenType(linelist.linelist_code);
      selectedLn.value = linelist;
      headerId.value = linelist.id;
      modalDetails.value.show = true;
      loadingData.value = true;
      await store.dispatch("fetchLinelistDetails", linelist.id);
      loadingData.value = false;
    };

    const updateLoader = (bool) => {
      loadingData.value = bool;
    };

    const specimenType = (code) => {
      const type = extractLnCode(code);
      if (type == "MEA") {
        selectedSpecimen.value = measeSpecimens.value;
      } else if (type == "AMES") {
        selectedSpecimen.value = meninSpecimens.value;
      } else if (type == "ROTAVIRUS") {
        selectedSpecimen.value = rotaSpecimens.value;
      }
    };

    const savingFlag = ref(false);
    const headerResponse = computed(() => store.getters.getLnhResponse);
    const removedDetails = ref([]);
    const removeDetail = async (patient) => {
      if (selectedLn.value.linelist_details.length === 1) {
        swalMessage(
          swal,
          "Warning",
          "Linelist Details must have at least 1 Patient.",
          "warning"
        );
        return;
      }

      const index = selectedLn.value.linelist_details.findIndex(
        (c) => c.detail_id === patient.detail_id
      );

      if (index !== -1) {
        selectedLn.value.linelist_details.splice(index, 1);
        removedDetails.value.push(patient.detail_id);
      }

      console.log(removedDetails.value);
    };
    const flagChecker = ref(false);
    const validateLinelist = () => {
      flagChecker.value = true;
      const hasError = selectedLn.value.linelist_details.some((c) => {
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
    const linelistDetails = computed(() => store.getters.getLinelistsDetails);
    const saveLinelist = async () => {
      // const hasError = validateLinelist();

      // if (hasError) {
      //   return;
      // }

      savingFlag.value = true;
      await store.dispatch("updateMeaslesDetails", linelistDetails.value);
      savingFlag.value = false;
      swalMessage(
        swal,
        "Information",
        "Linelist Updated Successfully",
        "success"
      ).then(() => {
        console.log("tes");
        window.location.reload();
        // location.reload();
      });

      // Reload the page immediately
    };

    const deleteLinelist = async (linelist) => {
      swalConfirmation(
        swal,
        "Confirmation",
        `Are you sure to delete this Line list?`,
        "question"
      ).then(async (res) => {
        if (res.isConfirmed) {
          await await store.dispatch("deleteLinelist", linelist.id);

          swalMessage(
            swal,
            "Information",
            `Linelist ${linelist.linelist_code} Deleted Successfully`,
            "success"
          ).then(() => {
            // router.go();
            location.href = "/laboratory";
          });
        }
      });
    };

    const postLinelist = async (linelist) => {
      swalConfirmation(
        swal,
        "Confirmation",
        `Once you post this, it will be submitted to the Molecular Laboratory, and you won't be able to edit it. Do you wish to proceed?`,
        "question"
      ).then(async (res) => {
        if (res.isConfirmed) {
          await await store.dispatch("postLinelist", {
            ...linelist,
            updated_by: authUser.value.id,
          });

          swalMessage(
            swal,
            "Information",
            `Linelist ${linelist.linelist_code} Posted Successfully`,
            "success"
          ).then(() => {
            location.reload();
          });
        }
      });
    };

    const enableCreate = ref(false);
    const poolCart = computed(() => store.getters.getPoolCart);

    const addToPool = (detail) => {
      store.commit("addToPoolCart", detail);
    };

    const removeToPool = (detail) => {
      // poolCart.value = poolCart.value.filter(
      //   (pool) => pool.detail_id !== detail.detail_id
      // );
      store.commit("removeToPoolCart", detail);
    };

    const modalPool = ref({
      show: false,
      title: "Finalized Pool Creation",
    });

    const cancelPool = () => {
      enableCreate.value = false;
      store.commit("resetPoolCart");
    };

    const openPrint = (id: number) => {
      console.log(id);
      window.open(
        `${import.meta.env.VITE_API_BASE_URL}/print/validation/worksheet/${id}`
      );
    };

    const filterHesu = computed(() => {
      let status;
      if (route.params.type) {
        status = 2;
      } else {
        status = 3;
      }

      return status;
    });

    watch(filterHesu, async (newValue) => {
      resetFormData();
      await fetchLinelist(1, formData.value);
      console.log("filterh esu is being watch", newValue);
    });

    type swalRes = {
      isConfirmed: boolean;
    };

    const rejectLn = async <
      Linelist extends {
        linelist_code: string;
        dru_officer: string;
        email: string;
      }
    >(
      linelist: Linelist
    ) => {
      const mailPayload = {
        name: linelist.dru_officer,
        code: linelist.linelist_code,
        email: linelist.email,
      };
      swal({
        title: "Linelist Rejection Reason:",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Submit",
        showLoaderOnConfirm: true,
        preConfirm: async (reason: string) => {
          if (reason.trim().length === 0) {
            return rejectLn(linelist);
          } else {
            await store.dispatch("acceptRejectLinelist", {
              ...linelist,
              reject_reason: reason,
              status: 4,
              updated_by: authUser.value.id,
            });
            await sendEmail({ ...mailPayload, reason: reason });
          }
        },
        allowOutsideClick: () => swal.isLoading(),
      }).then(() => {
        swalMessage(
          swal,
          "Information",
          `Linelist ${linelist.linelist_code} has been Rejected!`,
          "success"
        ).then(() => {
          location.reload();
        });
      });
    };

    interface LinelistType {
      linelist_code: string;
    }

    const acceptLn = async <Linelist extends LinelistType>(
      linelist: Linelist
    ) => {
      await store.dispatch("acceptRejectLinelist", {
        ...linelist,
        status: 3,
        updated_by: authUser.value.id,
      });
      swalMessage(
        swal,
        "Information",
        `Linelist ${linelist.linelist_code} Approved Successfully!`,
        "success"
      ).then(() => {
        location.reload();
      });
    };

    const changeStatus = async <Linelist extends LinelistType>(
      linelist: Linelist,
      type: string
    ) => {
      let swalMessage =
        type === "a"
          ? "Once you accept this, it will be submitted to the Molecular Laboratory, and you won't be able to revert it. Do you wish to proceed?"
          : "Are you sure you want to reject this linelist?";
      swalConfirmation(swal, "Confirmation", `${swalMessage}`, "question").then(
        async (res: swalRes) => {
          if (res.isConfirmed) {
            if (type === "a") {
              await acceptLn(linelist);
              console.log(linelist);
            } else {
              await rejectLn(linelist);
            }
          }
        }
      );
    };

    // interface emailPayload {
    //   name: string;
    //   code: string;
    //   reason: string;
    //   email: string;
    // }

    const sendEmail = async <
      T extends {
        name: string;
        code: string;
        reason: string;
        email: string;
      }
    >(
      emailPayload: T
    ) => {
      console.log("email payload", emailPayload);
      await api.post("/mail/rejected", {
        name: toPascalCase(emailPayload.name),
        code: emailPayload.code,
        reason: emailPayload.reason.toUpperCase(),
        email: emailPayload.email,
      });
    };

    const emailedComponent = ref(null);

    const onCloseSendMail = () => {
      modalDetails.value.show = false;
      if (emailedComponent.value) {
        emailedComponent.value.sendEmail();
      }
    };

    onMounted(async () => {
      setTimeout(async () => {
        await fetchLinelist(1, formData.value);
        console.log("Current Status", filterHesu.value);
      }, 500);
      // loadingSkeleton();
    });

    return {
      isLoading,
      linelists,
      paginationData,
      updateCurrentPage,
      formData,
      refreshPatients,
      searchLinelist,
      //update
      modalDetails,
      updateLinelist,
      selectedLn,
      selectedSpecimen,
      randomMizer,
      refresher,
      removeDetail,
      savingFlag,
      saveLinelist,
      flagChecker,
      deleteLinelist,
      postLinelist,
      loadingData,
      headerId,
      updateLoader,
      poolCart,
      enableCreate,
      cancelPool,
      addToPool,
      removeToPool,
      modalPool,
      openPrint,
      filterHesu,
      changeStatus,
      onCloseSendMail,
      emailedComponent,
    };
  },
});
</script>

<style scoped></style>
