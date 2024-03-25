<template>
  <Toast />
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
      <div class="d-flex align-items-center justify-content-between">
        <div></div>
        <div>
          <button
            class="btn btn-primary btn-sm m-1"
            @click="$emit('save-linelist')"
          >
            Save Linelist
          </button>
          <button
            class="btn btn-danger btn-sm m-1"
            @click="$emit('close-linelist')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-12 col-lg-1">
      <div class="row p-0 m-0">
        <div class="col-12">
          <qrcode-vue
            style="position: absolute; top: -200px"
            class="ml-2 mt-3"
            :value="formHeader.linelist_code"
            :size="100"
            ref="qrcode"
          />
          <div class="d-flex align-items-center text-align-center mt-4">
            <skeleton-placeholder
              height="100px"
              width="100px"
              v-if="!imageDataUrl"
            />
            <Image v-else :src="imageDataUrl" alt="Image" width="100" preview />
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-12 col-lg-11">
      <div class="row p-0 m-0">
        <div class="col-12">
          <div class="row m-2">
            <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
              <div class="search">
                <Label class="mb-2">DRU Reporting Unit</Label>
                <input
                  type="text"
                  v-model="formHeader.dru"
                  disabled
                  class="form-control form-control-sm w-100 custom-font"
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
              <div class="search">
                <Label class="mb-2">Disease Surveillance Officer</Label>
                <input
                  type="text"
                  v-model="formHeader.dru_officer"
                  disabled
                  class="form-control form-control-sm w-100 custom-font"
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
              <div class="search">
                <Label class="mb-2">Contact No</Label>
                <input
                  type="text"
                  v-model="formHeader.contact"
                  disabled
                  class="form-control form-control-sm w-100 custom-font"
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
              <div class="search">
                <Label class="mb-2">Region</Label>
                <input
                  type="text"
                  v-model="formHeader.region"
                  disabled
                  class="form-control form-control-sm w-100 custom-font"
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
              <div class="search">
                <Label class="mb-2">Province</Label>
                <input
                  type="text"
                  v-model="formHeader.province"
                  disabled
                  class="form-control form-control-sm w-100 custom-font"
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
              <div class="search">
                <Label class="mb-2">Email</Label>
                <input
                  type="text"
                  v-model="formHeader.email"
                  disabled
                  class="form-control form-control-sm w-100 custom-font"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="m-3 table-responsive p-0 m-0 border border-primary mb-4">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
            v-if="enableCreate"
          >
            Select
          </th>
          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Specimen Status
            <div
              class="d-flex my-2 align-items-center justify-content-center"
              v-if="batchSelection.length > 1"
            >
              <button
                class="btn btn-success btn-sm"
                @click="batchAccept(batchSelection)"
              >
                Batch Accept
              </button>
            </div>
          </th>

          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Accession Number
          </th>
          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Date Received
          </th>
          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Name of Patient
          </th>
          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Specimen
          </th>
          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Date & Time Collection
          </th>
          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Disease Reporting Unit
          </th>
          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Specimen Quality
          </th>
          <th
            colspan="3"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Adequacy
          </th>
          <th
            rowspan="2"
            class="text-center bg-primary align-middle text-white p-0 m-0"
          >
            Remarks
          </th>
        </tr>
        <tr>
          <th class="text-center bg-primary align-middle text-white p-0 m-0">
            Working
          </th>
          <th class="text-center bg-primary align-middle text-white p-0 m-0">
            Backup
          </th>
          <th class="text-center bg-primary align-middle text-white p-0 m-0">
            NPS/OPS
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(l, index) in linelistDetails" :key="index">
          <td
            class="text-center align-middle fw-bold p-1 m-0"
            v-if="enableCreate"
          >
            <a
              href="javascript:void(0);"
              @click="$emit('remove-to-pool', l)"
              v-if="poolCart.some((pool) => pool.detail_id === l.detail_id)"
            >
              <i
                class="fa fa-minus-circle scale-icon text-warning"
                aria-hidden="true"
                style="transition: all 300ms ease"
                v-tooltip.right="{
                  value: `<h6 class='text-white'>Remove to pool</h6>`,
                  escape: true,
                  class: 'bg-dark rounded p-1',
                }"
              ></i
            ></a>
            <a
              href="javascript:void(0);"
              @click="$emit('add-to-pool', l)"
              v-else
            >
              <i
                class="fa scale-icon text-success fa-plus-circle"
                aria-hidden="true"
                style="transition: all 300ms ease"
                v-tooltip.right="{
                  value: `<h6 class='text-white'>Add to pool</h6>`,
                  escape: true,
                  class: 'bg-dark rounded p-1',
                }"
              ></i
            ></a>
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <div
              class="d-flex align-items-center gap-1"
              v-if="l.specimen_status == 0"
            >
              <input
                class="form-check-input secondary"
                type="checkbox"
                :value="l.detail_id"
                v-model="batchSelection"
              />
              <button
                class="btn btn-success btn-sm"
                @click="updateSpecimen(l, 1)"
              >
                Accept
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="updateSpecimen(l, 2)"
              >
                Reject
              </button>
            </div>
            <div v-else>
              <span class="mb-1 badge bg-success" v-if="l.specimen_status == 1"
                >Accepted</span
              >
              <span
                v-if="l.specimen_status == 2"
                class="badge bg-danger d-flex align-items-center gap-2 justify-content-between"
                >Rejected
                <span
                  class="badge rounded-pill bg-dark fs-1"
                  style="cursor: pointer"
                  v-tooltip.right="{
                    value: `<h6 class='text-white fs-1'>${l.reject_reason}</h6>`,
                    escape: true,
                    class: 'bg-dark rounded p-1',
                  }"
                  >Reason</span
                ></span
              >
            </div>
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <span v-if="l.accession_no">{{ l.accession_no }}</span>
            <button
              class="btn btn-dark btn-sm"
              v-else
              :disabled="l.specimen_status != 1"
              @click="generateAccession(l)"
            >
              Generate
            </button>
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ l.date_received }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ l.lname }}, {{ l.fname }} {{ l.mname }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <!-- <select
              v-model="l.specimen_type"
              class="form-select form-control form-control-sm pe-none"
            >
              <option value="">Please Select</option>
              <option v-for="(s, index) in specimens" :value="s">
                {{ s }}
              </option>
            </select> -->
            {{ l.specimen_type }}
          </td>

          <td class="text-center align-middle fw-bold p-1 m-0">
            <input
              type="datetime-local"
              v-model="l.datetime_collection"
              class="form-control form-control-sm custom-font pe-none"
            />
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ formHeader.dru }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <input
              type="text"
              class="form-control form-control-sm fw-semibold"
              v-model="l.specimen_quality"
              :disabled="l.specimen_status != 1 || !l.accession_no"
            />
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <input
              type="text"
              class="form-control form-control-sm fw-semibold"
              v-model="l.mr_working"
              :disabled="l.specimen_status != 1 || !l.accession_no"
            />
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <input
              type="text"
              class="form-control form-control-sm fw-semibold"
              v-model="l.mr_backup"
              :disabled="l.specimen_status != 1 || !l.accession_no"
            />
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <input
              type="text"
              class="form-control form-control-sm fw-semibold"
              v-model="l.mr_npsops"
              :disabled="l.specimen_status != 1 || !l.accession_no"
            />
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <textarea
              class="form-control form-control-sm fw-semibold"
              rows="2"
              v-model="l.remarks"
              :disabled="l.specimen_status != 1 || !l.accession_no"
            ></textarea>
          </td>
        </tr>
        <tr v-if="isLoading">
          <td :colspan="enableCreate ? 11 : 10">
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

    {{ batchSelection }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, watch, inject } from "vue";
import QrcodeVue from "qrcode.vue";
import html2canvas from "html2canvas";
import Image from "primevue/image";
import SkeletonPlaceholder from "@/pages/loader/SkeletonPlaceholder.vue";
import { useStore } from "vuex";
import { swalConfirmation, swalMessage } from "@/composables";
import { useToast } from "primevue/usetoast";
export default defineComponent({
  name: "LinelistDetails",
  props: {
    formHeader: Object,
    patients: Array,
    specimens: Array,
    flagChecker: Boolean,
    createList: Boolean,
    refresher: String,
    isLoading: Boolean,
    headerId: Number,
    poolCart: Array,
    enableCreate: Boolean,
  },
  components: {
    QrcodeVue,
    Image,
    SkeletonPlaceholder,
  },
  setup(props, { emit }) {
    const removePatient = (p) => {
      emit("remove-patient", p);
    };
    const toast = useToast();
    const store = useStore();
    const swal = inject("$swal");
    const diseaseType = (type) => {
      let patientType = "";
      if (type == 1) {
        patientType = "Rota Virus";
      } else if (type == 2) {
        patientType = "Meningitis-Encephalitis";
      } else if (type == 3) {
        patientType = "Measles-Rubella";
      } else {
        patientType = "Unknown Type";
      }

      return patientType;
    };

    const qrcode = ref(null);
    const imageDataUrl = ref(null);
    const captureQR = () => {
      const qrCodeElement = qrcode.value.$el;
      html2canvas(qrCodeElement).then((canvas) => {
        imageDataUrl.value = canvas.toDataURL();
      });
    };

    const linelistDetails = computed(() => store.getters.getLinelistsDetails);
    const refreshData = async () => {
      await store.commit("setLinelistsDetailsEmpty");
      emit("update-loader", true);
      await store.dispatch("fetchLinelistDetails", props.headerId);
      emit("update-loader", false);
    };
    // generateAccessionNo
    const authUser = computed(() => store.getters.getAuthenticatedUser);
    const generateAccession = async (details) => {
      const patient = `${details.lname}, ${details.fname} ${details.mname}`;
      const type = details.type === 1 ? "RV" : details.type === 2 ? "JV" : "MR";
      swalConfirmation(
        swal,
        "Confirmation",
        `Are you sure to generate accession no.?`,
        "question"
      ).then(async (res) => {
        if (res.isConfirmed) {
          await store.dispatch("generateAccessionNo", {
            ...details,
            medtech: authUser.value.id,
            disease_type: type,
          });
          refreshData();
          toast.add({
            severity: "success",
            summary: `Patient ${patient}`,
            detail: `Accession No. Generated Successfully`,
            life: 3000,
          });
        }
      });
    };

    const batchAccept = async (payload) => {
      console.log(payload);

      swalConfirmation(
        swal,
        "Confirmation",
        `Are you sure you want to accept this batch of specimens?`,
        "question"
      ).then(async (res) => {
        await store.dispatch("batchAccept", payload);
        refreshData();
        toast.add({
          severity: "success",
          summary: `Message`,
          detail: `"Specimens Accepted Successfully.`,
          life: 3000,
        });
        batchSelection.value = [];
      });
    };

    const updateSpecimen = async (details, type) => {
      const patient = `${details.lname}, ${details.fname} ${details.mname}`;
      const question = type == 1 ? "accept" : "reject";
      const message = type == 1 ? "Accepted" : "Rejected";
      swalConfirmation(
        swal,
        "Confirmation",
        `Are you sure to ${question} ${patient} specimen?`,
        "question"
      ).then(async (res) => {
        if (res.isConfirmed) {
          if (type == 1) {
            await store.dispatch("acceptSpecimen", details);
            refreshData();
            toast.add({
              severity: type == 1 ? "success" : "error",
              summary: `Patient ${patient}`,
              detail: `Specimen ${message} Successfully`,
              life: 3000,
            });
          } else {
            swal({
              title: "Specimen Rejection Reason:",
              input: "text",
              showCancelButton: true,
              confirmButtonText: "Submit",
              showLoaderOnConfirm: true,
              preConfirm: async (reason) => {
                await store.dispatch("rejectSpecimen", {
                  reason: reason,
                  ...details,
                });
              },
              allowOutsideClick: () => swal.isLoading(),
            }).then((result) => {
              if (result.isConfirmed) {
                refreshData();
                toast.add({
                  severity: type == 1 ? "success" : "error",
                  summary: `Patient ${patient}`,
                  detail: `Specimen ${message} Successfully`,
                  life: 3000,
                });
              }
            });
          }
        }
      });
    };

    watch(
      () => props.refresher,
      (newRefresher, oldRefresher) => {
        if (newRefresher) {
          setTimeout(() => {
            captureQR();
          }, 300);
        }
      }
    );

    const batchSelection = ref([]);

    return {
      removePatient,
      diseaseType,
      qrcode,
      imageDataUrl,
      captureQR,
      linelistDetails,
      refreshData,
      updateSpecimen,
      generateAccession,
      batchSelection,
      batchAccept,
    };
  },
});
</script>

<style scoped>
.qr-container {
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
}
</style>
