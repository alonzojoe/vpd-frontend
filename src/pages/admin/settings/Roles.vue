<template>
  <!-- <page-header title="Roles" class="my-0" /> -->
  <div class="card my-0">
    <div class="card-body py-4">
      <search-card title="Search Role">
        <template v-slot:formInput="pObject">
          <div class="col-sm-12 col-md-4 col-lg-4 mb-2">
            <div class="search">
              <Label class="mb-2">Role Description:</Label>
              <input
                type="text"
                v-model="roleDescription"
                @keyup.enter="searchRole"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-4 mb-2">
            <div class="d-flex justify-content-start mt-4">
              <button
                class="btn btn-primary m-1"
                @keyup.enter="searchRole"
                @click.prevent="searchRole"
              >
                Search
              </button>
              <button @click="refreshData()" class="btn btn-danger m-1">
                Refresh
              </button>
            </div>
          </div>
        </template>
      </search-card>
      <div class="d-flex justify-content-end">
        <button
          @click="addRole()"
          type="button"
          class="btn btn-info btn-rounded mb-2"
        >
          Add New Role
        </button>
      </div>
      <div class="">
        <div class="table-responsive p-0 m-0 border border-primary">
          <table id="smptable" class="table table-bordered table-hover">
            <thead>
              <tr>
                <th
                  class="text-center bg-primary text-white p-2 m-0"
                  style="width: 10%"
                >
                  ID
                </th>
                <th class="text-center bg-primary text-white p-2 m-0">
                  Role Description
                </th>
                <th class="text-center bg-primary text-white p-2 m-0">
                  Created at
                </th>
                <th class="text-center bg-primary text-white p-2 m-0">
                  Updated at
                </th>
                <th
                  class="text-center bg-primary text-white p-2 m-0"
                  style="width: 10%"
                >
                  Update
                </th>
                <th
                  class="text-center bg-primary text-white p-2 m-0"
                  style="width: 10%"
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in roles" :key="r.id">
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ r.id }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ r.role }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ r.created_at }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ r.updated_at }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <button @click="updateRole(r)" class="btn btn-info m-1">
                    Update
                  </button>
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <button @click="deleteRole(r)" class="btn btn-danger m-1">
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="!roles.length && !isLoadingRoles">
                <td
                  class="text-center align-middle fw-bold p-1 m-0"
                  colspan="6"
                >
                  No records found.
                </td>
              </tr>
              <tr v-if="isLoadingRoles">
                <td colspan="6">
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
        <pagination
          v-if="!isLoadingRoles"
          :data="paginationData"
          @update:currentPage="updateCurrentPage"
        />
      </div>
    </div>
  </div>
  <modal-sm :details="modalDetails" @close-modal="modalDetails.show = false">
    <form class="mt-2">
      <div class="mb-3" v-if="formModal.id != 0">
        <label for="recipient-name" class="control-label">ID:</label>
        <input
          type="text"
          v-model="formModal.id"
          class="form-control form-control-sm w-100 custom-font"
          id="recipient-name1"
          disabled
        />
      </div>
      <div class="mb-3">
        <label for="recipient-name" class="control-label">Role:</label>
        <input
          type="text"
          v-model="formModal.role"
          class="form-control form-control-sm w-100 custom-font"
          :class="{ 'is-invalid': flagvl == true && !formModal.role }"
          id="recipient-name1"
        />
        <div v-if="flagvl == true && !formModal.role" class="invalid-feedback">
          Please input role description
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button
          type="submit"
          @click.prevent="saveRole()"
          :disabled="flagvl == true"
          class="btn btn-success m-1"
        >
          Save
        </button>
        <button
          @click.prevent="modalDetails.show = false"
          class="btn btn-danger m-1"
        >
          Cancel
        </button>
      </div>
    </form>
  </modal-sm>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, inject, watch } from "vue";
import PageHeader from "../../../components/cards/PageHeader.vue";
import SearchCard from "../../../components/cards/SearchCard.vue";
import ModalSm from "../../../components/modals/ModalSM.vue";
import Pagination from "../../../components/pagination/Pagination.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { PageHeader, SearchCard, ModalSm, Pagination },
  setup() {
    const swal = inject("$swal");
    const pressMe = () => {
      swal({
        title: "Success",
        text: "test swal",
        icon: "success",
      });
    };

    const modalDetails = ref({
      show: false,
      title: "Add Role",
    });

    const formModal = ref({
      id: 0,
      role: "",
    });

    const addRole = () => {
      modalDetails.value.show = true;
      modalDetails.value.title = "Add New Role";
      formModal.value.id = 0;
      formModal.value.id = "";
    };

    const updateRole = (selected: any) => {
      modalDetails.value.show = true;
      modalDetails.value.title = "Update Role";
      formModal.value.id = selected.id;
      formModal.value.role = selected.role;
    };

    const store = useStore();
    const isLoadingRoles = ref(false);
    console.log("store", store);
    const roles = computed(() => store.getters.getRoles);
    const totalRoles = computed(() => store.getters.getTotalRoles);
    const pagesRoles = computed(() => store.getters.getPagesRoles);

    watch([totalRoles, pagesRoles], ([total, pages]) => {
      paginationData.value.totalRecords = total;
      paginationData.value.totalPages = pages;
    });

    const paginationData = ref({
      totalRecords: totalRoles.value,
      totalPages: pagesRoles.value,
      perPage: 10,
      currentPage: 1,
    });

    const fetchRoles = async (page, role) => {
      isLoadingRoles.value = true;
      await store.commit("setEmptyRoles");
      console.log("mounted role");
      await store.dispatch("fetchRoles", { page: page, role: role });
      isLoadingRoles.value = false;
    };

    const updateCurrentPage = (newPage: Number) => {
      paginationData.value.currentPage = newPage;
      fetchRoles(newPage, "");
    };

    const roleDescription = ref("");

    const searchRole = async () => {
      isLoadingRoles.value = true;
      await store.commit("setEmptyRoles");
      paginationData.value.currentPage = 1;
      await fetchRoles(1, roleDescription.value);
      isLoadingRoles.value = false;
    };

    const resetFormDataSearch = () => {
      roleDescription.value = "";
    };

    const refreshData = () => {
      resetFormDataSearch();
      searchRole();
    };

    const flagvl = ref(false);
    const validateInput = () => {
      if (formModal.value.role == "") {
        swal({
          title: "Warning",
          text: "Please input role description",
          icon: "warning",
        }).then(() => {
          flagvl.value = true;
        });
        return false;
      }

      return true;
    };

    const saveRole = async () => {
      if (!validateInput()) return;

      swal({
        title: "Confirmation",
        text: "Do you want to save the role?",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `Cancel`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await store.dispatch("saveRole", formModal.value);
          let message = formModal.value.id == 0 ? "Added" : " Updated";
          swal({
            title: "Information",
            text: `Role ${message} Successfully!`,
            icon: "success",
          }).then(() => {
            modalDetails.value.show = false;
            formModal.value.role = "";
            fetchRoles(1, "");
            flagvl.value = false;
          });
        }
      });
    };

    const deleteRole = async (role) => {
      swal({
        title: "Confirmation",
        text: `Do you want to delete ${role.role} role?`,
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Yes, Delete it",
        denyButtonText: `Cancel`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await store.dispatch("deleteRole", role.id);
          swal({
            title: "Success",
            text: `Role ${role.role} Deleted Successfully!`,
            icon: "success",
          }).then(() => {
            fetchRoles(1, "");
          });
        }
      });
    };

    onMounted(async () => {
      await fetchRoles(1, "");
    });

    return {
      modalDetails,
      addRole,
      updateRole,
      roles,
      totalRoles,
      pagesRoles,
      isLoadingRoles,
      pressMe,
      formModal,
      saveRole,
      flagvl,
      deleteRole,
      paginationData,
      updateCurrentPage,
      roleDescription,
      searchRole,
      refreshData,
    };
  },
});
</script>
