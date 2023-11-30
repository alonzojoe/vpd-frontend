<template>
  <div class="card my-0">
    <div class="card-body py-4">
      <search-card title="Search User">
        <template v-slot:formInput="pObject">
          <div class="col-sm-12 col-md-4 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Last Name:</Label>
              <input
                type="text"
                v-model="formDataSearch.lname"
                @keyup.enter="searchUser"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">First Name:</Label>
              <input
                type="text"
                v-model="formDataSearch.fname"
                @keyup.enter="searchUser"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Middle Name:</Label>
              <input
                type="text"
                v-model="formDataSearch.mname"
                @keyup.enter="searchUser"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-3 mb-2">
            <div class="search">
              <Label class="mb-2">Institution:</Label>
              <input
                type="text"
                v-model="formDataSearch.hci"
                @keyup.enter="searchUser"
                class="form-control form-control-sm w-100 custom-font"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-3 mb-2">
            <div class="d-flex justify-content-start mt-4">
              <button
                class="btn btn-primary m-1"
                @keyup.enter="searchUser"
                @click.prevent="searchUser"
              >
                Search
              </button>
              <button class="btn btn-danger m-1" @click.prevent="refreshData">
                Refresh
              </button>
            </div>
          </div>
        </template>
      </search-card>
      <div class="d-flex justify-content-end">
        <button
          @click.prevent="addUser"
          type="button"
          class="btn btn-info btn-rounded mb-2"
        >
          Create New User
        </button>
      </div>
      <div>
        <div class="table-responsive p-0 m-0 border border-primary">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th
                  class="text-center bg-primary text-white p-2 m-0"
                  style="width: 5%"
                >
                  ID
                </th>
                <th class="text-center bg-primary text-white p-2 m-0">
                  Full Name
                </th>
                <th class="text-center bg-primary text-white p-2 m-0">
                  Institution
                </th>
                <th class="text-center bg-primary text-white p-2 m-0">Role</th>
                <th class="text-center bg-primary text-white p-2 m-0">
                  Created At
                </th>
                <th class="text-center bg-primary text-white p-2 m-0">
                  Updated At
                </th>
                <th class="text-center bg-primary text-white p-2 m-0">
                  Created By
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
              <tr v-for="u in users" :key="u.id">
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ u.id }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ u.fullname }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ u.institution }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ u.role }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ u.created_at }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ u.updated_at }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  {{ u.updated_by_fullname }}
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <button @click="updateUser(u)" class="btn btn-info m-1">
                    Update
                  </button>
                </td>
                <td class="text-center align-middle fw-bold p-1 m-0">
                  <button @click="deleteRole(u)" class="btn btn-danger m-1">
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="!users.length && !isLoadingUsers">
                <td
                  class="text-center align-middle fw-bold p-1 m-0"
                  colspan="9"
                >
                  No records found.
                </td>
              </tr>
              <tr v-if="isLoadingUsers">
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
        <pagination
          v-if="!isLoadingUsers"
          :data="paginationData"
          @update:currentPage="updateCurrentPage"
        />
      </div>
    </div>
  </div>
  <modal-md :details="modalDetails" @close-modal="modalDetails.show = false">
    <div class="card-body m-2">
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-account"
          role="tabpanel"
          aria-labelledby="pills-account-tab"
          tabindex="0"
        >
          <form enctype="multipart/form-data">
            <div class="row p-0 m-0">
              <div class="col-lg-6 d-flex align-items-stretch">
                <div>
                  <input
                    type="file"
                    @change="validateImage"
                    accept="image/jpeg, image/jpg, image/png, image/gif"
                    style="display: none"
                    ref="imageInput"
                  />
                  <input
                    type="file"
                    @change="validateSign"
                    accept="image/jpeg, image/jpg, image/png, image/gif"
                    style="display: none"
                    ref="signInput"
                  />
                </div>

                <photo-signature
                  :formData="formData"
                  :modalDetails="modalDetails"
                  :imageUrl="imageUrl"
                  :signatureURL="signatureURL"
                  :signInput="signInput"
                  :imageInput="imageInput"
                  :userProfileImage="userProfileImage"
                  :userSignImage="userSignImage"
                  @change-photo="$refs.imageInput.click()"
                  @validate-image="validateImage"
                  @reset-image="resetImage"
                  @change-signature="$refs.signInput.click()"
                  @validate-sign="validateSign"
                  @reset-signature="resetSign"
                />
              </div>
              <div class="col-lg-6 d-flex align-items-stretch">
                <account-credentials
                  :flagvl="flagvl"
                  :flagemail="flagemail"
                  :formData="formData"
                  :roles="roles"
                />
              </div>
              <!-- <pre>
                {{ formData }}
              </pre> -->
              <div class="col-12">
                <div class="card w-100 position-relative overflow-hidden mb-0">
                  <div class="card-body p-4">
                    <user-information
                      :flagvl="flagvl"
                      :flagemail="flagemail"
                      :formData="formData"
                    />
                    <hci-information
                      :flagvl="flagvl"
                      :flagemail="flagemail"
                      :formData="formData"
                      @change-region="changePermRegion()"
                      @change-province="changePermProvince()"
                      @change-city="changePermCity()"
                      @save-user="saveUser()"
                      @close-modal="modalDetails.show = false"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <!-- <pre>{{ formData }}</pre> -->
        </div>
      </div>
    </div>
  </modal-md>
  <loader
    :title="
      formData.id == 0
        ? 'Registering User Information'
        : 'Updating User Information'
    "
    subTitle="Please Wait...."
    warning="true"
    v-if="saveSubmitted"
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

import { useStore } from "vuex";
import {
  swalMessage,
  swalConfirmation,
  deCrypto,
  NumericOnly,
} from "@/composables";
import SearchCard from "@/components/cards/SearchCard.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import ModalMd from "@/components/modals/ModalMd.vue";
import AccountCredentials from "./users-components/AccountCredentials.vue";
import UserInformation from "./users-components/UserInformation.vue";
import HciInformation from "./users-components/HciInformation.vue";
import PhotoSignature from "./users-components/PhotoSignature.vue";
import Loader from "../../loader/Loader.vue";

export default defineComponent({
  components: {
    Pagination,
    SearchCard,
    ModalMd,
    Loader,
    AccountCredentials,
    UserInformation,
    HciInformation,
    PhotoSignature,
  },

  setup() {
    const modal = ref(false);
    const swal = inject("$swal");

    const btnSave = () => {
      swalConfirmation(swal, "Information", "Are you sure", "question").then(
        (result) => {
          if (result.isConfirmed) {
            alert("saveed");
          } else {
            alert("cancelled");
          }
        }
      );
    };

    const btnCancel = () => {
      swalMessage(swal, "Information", "Test Composables", "error").then(() => {
        alert("this is dot then");
      });
    };

    const formDataSearch = ref({
      lname: "",
      fname: "",
      mname: "",
      hci: "",
    });

    const resetFormDataSearch = () => {
      Object.keys(formDataSearch.value).forEach((key) => {
        formDataSearch.value[key] = "";
      });
    };

    const store = useStore();
    const users = computed(() => store.getters.getUsers);
    const totalUsers = computed(() => store.getters.getTotalUsers);
    const usersPages = computed(() => store.getters.getUsersPages);

    watch([totalUsers, usersPages], ([total, pages]) => {
      paginationData.value.totalRecords = total;
      paginationData.value.totalPages = pages;
    });

    const paginationData = ref({
      totalRecords: totalUsers.value,
      totalPages: usersPages.value,
      perPage: 10,
      currentPage: 1,
    });

    const isLoadingUsers = ref(false);
    const fetchUsers = async (page, form) => {
      await store.commit("setEmptyUsers");
      isLoadingUsers.value = true;
      await store.dispatch("fetchUsers", { page: page, ...form });
      isLoadingUsers.value = false;
    };

    const updateCurrentPage = (newPage: Number) => {
      paginationData.value.currentPage = newPage;
      fetchUsers(newPage, formDataSearch.value);
    };

    const searchUser = async () => {
      isLoadingUsers.value = true;
      await store.commit("setEmptyUsers");
      paginationData.value.currentPage = 1;
      await fetchUsers(1, formDataSearch.value);
    };

    const refreshData = () => {
      resetFormDataSearch();
      searchUser();
    };

    const formData = ref({
      id: 0,
      name: "",
      lname: "",
      mname: "",
      email: "",
      password: "",
      confirm_password: "",
      mobile: "",
      img: "",
      signature: "",
      type: "",
      institution: "",
      role_id: 0,
      address_id: 0,
      street: "",
      region: "",
      province: "",
      city: "",
      barangay: "",
    });

    const changePermRegion = async () => {
      if (formData.value.region) {
        await store.commit("resetPermAddress");
        await store.dispatch("fetchProvinces", formData.value.region);
      } else {
        formData.value.province = "";
        formData.value.city = "";
        formData.value.barangay = "";
        store.commit("setProvincesEmpty");
        store.commit("setMunicipalitiesEmpty");
        store.commit("setBarangaysEmpty");
      }
    };

    const changePermProvince = async () => {
      if (formData.value.province) {
        await store.commit("resetPermCityBarangay");
        store.dispatch("fetchMunicipalities", formData.value.province);
      } else {
        formData.value.city = "";
        formData.value.barangay = "";
        store.commit("setMunicipalitiesEmpty");
        store.commit("setBarangaysEmpty");
      }
    };

    const changePermCity = async () => {
      if (formData.value.city) {
        await store.commit("resetPermBarangay");
        store.dispatch("fetchBarangays", formData.value.city);
      } else {
        formData.value.barangay = "";
        store.commit("setBarangaysEmpty");
      }
    };

    const fetchPermanentAddress = async () => {
      await store.dispatch("fetchRegions");
      await store.dispatch("fetchProvinces", formData.value.region);
      await store.dispatch("fetchMunicipalities", formData.value.province);
      await store.dispatch("fetchBarangays", formData.value.city);
    };

    const setFormDate = (user) => {
      (formData.value.id = user.id),
        (formData.value.name = user.name),
        (formData.value.lname = user.lname),
        (formData.value.mname = user.mname),
        (formData.value.email = user.email),
        (formData.value.password = deCrypto(user.pw)),
        (formData.value.confirm_password = deCrypto(user.pw)),
        (formData.value.mobile = user.mobile),
        (formData.value.img = user.img),
        (formData.value.signature = user.signature),
        (formData.value.type = user.type),
        (formData.value.institution = user.institution),
        (formData.value.role_id = user.role_id),
        (formData.value.address_id = user.address_id ? user.address_id : 0),
        (formData.value.street = user.address ? user.address.street : ""),
        (formData.value.region = user.address ? user.address.region_id : ""),
        (formData.value.province = user.address
          ? user.address.province_id
          : ""),
        (formData.value.city = user.address
          ? user.address.municipality_id
          : ""),
        (formData.value.barangay = user.address
          ? user.address.barangay_id
          : "");

      console.log("formData w/ address", formData.value);
    };

    const resetFormData = () => {
      Object.keys(formData.value).forEach((key) => {
        formData.value[key] = key === "id" || key === "role_id" ? 0 : "";
      });
    };

    const regions = computed(() => store.getters.getRegions);
    const provinces = computed(() => store.getters.getProvinces);
    const municipalities = computed(() => store.getters.getMunicipalities);
    const barangays = computed(() => store.getters.getBarangays);
    const addResponse = computed(() => store.getters.getPermResponse);
    const modalDetails = ref({
      show: false,
      title: "Create New User",
    });

    const addUser = () => {
      resetFlag();
      resetFormData();
      resetImage();
      resetSign();
      signToBase64();
      imageToBase64();
      modalDetails.value.show = true;
      modalDetails.value.title = "Create New User";
    };

    const updateUser = async (user) => {
      fetchPermanentAddress();
      setFormDate(user);

      (modalDetails.value.show = true),
        (modalDetails.value.title = "Update User");
      imageUrl.value = formData.value.img;
      signatureURL.value = formData.value.signature;
    };

    const imageUrl = ref(
      new URL("/src/assets/images/profile/default-profile.jpg", import.meta.url)
    ); // Default image
    const base64Img = ref(null);

    const validateImage = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 2048000) {
          swalConfirmation(
            swal,
            "ImageFile too large",
            "Please Choose another image",
            "error"
          );
          return;
        }

        const reader = new FileReader();

        reader.onload = () => {
          const img = new Image();
          img.src = reader.result;

          img.onload = () => {
            const canvas = document.createElement("canvas");
            const maxWidth = 800;
            const maxHeight = 800;
            let newWidth = img.width;
            let newHeight = img.height;

            if (img.width > maxWidth) {
              newWidth = maxWidth;
              newHeight = (img.height * maxWidth) / img.width;
            }

            if (newHeight > maxHeight) {
              newHeight = maxHeight;
              newWidth = (img.width * maxHeight) / img.height;
            }

            canvas.width = newWidth;
            canvas.height = newHeight;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            const compressedBase64 = canvas.toDataURL("image/jpeg");

            imageUrl.value = reader.result;
            base64Img.value = compressedBase64;
            formData.value.img = compressedBase64;
          };
        };

        reader.readAsDataURL(file);
      }
    };

    const resetImage = () => {
      imageUrl.value = new URL(
        "/src/assets/images/profile/default-profile.jpg",
        import.meta.url
      );
      base64Img.value = null;
    };

    const userProfileImage = ref(null);

    const imageToBase64 = () => {
      const imgElement = userProfileImage.value;
      if (imgElement) {
        const imgSrc = imgElement.getAttribute("src");

        const image = new Image();
        image.crossOrigin = "anonymous";

        image.onload = () => {
          const maxWidth = 800;
          const maxHeight = 800;
          let newWidth = image.width;
          let newHeight = image.height;

          if (image.width > maxWidth) {
            newWidth = maxWidth;
            newHeight = (image.height * maxWidth) / image.width;
          }

          if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = (image.width * maxHeight) / image.height;
          }

          const canvas = document.createElement("canvas");
          canvas.width = newWidth;
          canvas.height = newHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, newWidth, newHeight);

          const compressedBase64 = canvas.toDataURL("image/jpeg");

          formData.value.img = compressedBase64;
          base64Img.value = compressedBase64;
          // console.log('Base64 Image Data:', compressedBase64);
        };

        image.src = imgSrc;
      }
    };

    const signatureURL = ref(
      new URL(
        "/src/assets/images/profile/default-signature.jpg",
        import.meta.url
      )
    );
    const base64Sign = ref(null);
    const userSignImage = ref(null);

    const validateSign = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 2048000) {
          swalConfirmation(
            swal,
            "Image file too large",
            "Please choose another image",
            "error"
          );
          return;
        }

        const reader = new FileReader();

        reader.onload = () => {
          const img = new Image();
          img.src = reader.result;

          img.onload = () => {
            const canvas = document.createElement("canvas");
            const maxWidth = 800;
            const maxHeight = 800;
            let newWidth = img.width;
            let newHeight = img.height;

            if (img.width > maxWidth) {
              newWidth = maxWidth;
              newHeight = (img.height * maxWidth) / img.width;
            }

            if (newHeight > maxHeight) {
              newHeight = maxHeight;
              newWidth = (img.width * maxHeight) / img.height;
            }

            canvas.width = newWidth;
            canvas.height = newHeight;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Preserve the original image format
            const format = file.type;
            const compressedBase64 = canvas.toDataURL(format);

            signatureURL.value = reader.result;
            base64Sign.value = compressedBase64;
            formData.value.signature = compressedBase64;
          };
        };

        reader.readAsDataURL(file);
      }
    };

    const resetSign = () => {
      signatureURL.value = new URL(
        "/src/assets/images/profile/default-signature.jpg",
        import.meta.url
      );
      base64Sign.value = null;
    };

    const compressedSign = (base64String) => {
      return base64String;
    };

    const signToBase64 = () => {
      const imgElement = userSignImage.value;
      if (imgElement) {
        const imgSrc = imgElement.getAttribute("src");

        const image = new Image();
        image.crossOrigin = "anonymous";

        image.onload = () => {
          const maxWidth = 800;
          const maxHeight = 800;
          let newWidth = image.width;
          let newHeight = image.height;

          if (image.width > maxWidth) {
            newWidth = maxWidth;
            newHeight = (image.height * maxWidth) / image.width;
          }

          if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = (image.width * maxHeight) / image.height;
          }

          const canvas = document.createElement("canvas");
          canvas.width = newWidth;
          canvas.height = newHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, newWidth, newHeight);

          // Preserve the original image format (e.g., 'image/jpeg' or 'image/png')
          const format = imgSrc.match(/^data:(image\/\w+);/);
          const compressedBase64 = canvas.toDataURL(
            format ? format[1] : "image/jpeg"
          );

          formData.value.signature = compressedBase64;
          base64Sign.value = compressedBase64;
        };

        image.src = imgSrc;
      }
    };

    const roles = computed(() => store.getters.getChoiceRoles);
    const fetchRoles = async () => {
      await store.dispatch("fetchChoiceRoles");
    };

    function validateMobile(mobile) {
      const mobileRegex = /^0[0-9]{10}$/;

      return mobileRegex.test(mobile);
    }

    const flagvl = ref(false);
    const flagemail = ref(false);
    const flagpass = ref(false);
    const flagmob = ref(false);

    const resetFlag = () => {
      flagvl.value = false;
      flagemail.value = false;
      flagpass.value = false;
      flagmob.value = false;
    };

    const validateFields = () => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (
        !formData.value.email ||
        formData.value.role_id == 0 ||
        !formData.value.password ||
        !formData.value.confirm_password ||
        !formData.value.lname ||
        !formData.value.name ||
        !formData.value.mobile ||
        !formData.value.institution ||
        !formData.value.street ||
        !formData.value.region ||
        !formData.value.province ||
        !formData.value.city ||
        !formData.value.barangay
      ) {
        swalMessage(
          swal,
          "Warning",
          "Please fill up the required fields.",
          "error"
        ).then(() => {
          flagvl.value = true;
        });

        return false;
      } else if (!emailRegex.test(formData.value.email)) {
        swalMessage(
          swal,
          "Warning",
          "Please Input a valid email.",
          "error"
        ).then(() => {
          flagvl.value = true;
          flagemail.value = true;
        });
        return false;
      } else if (formData.value.password.length < 6) {
        swalMessage(
          swal,
          "Error",
          "Password must be at least 6 characters long.",
          "error"
        ).then(() => {
          flagvl.value = true;
          flagpass.value = true;
        });
        return false;
      } else if (formData.value.password !== formData.value.confirm_password) {
        swalMessage(swal, "Error", "Password Mismatch", "error").then(() => {
          flagvl.value = true;
          flagpass.value = true;
        });
        return false;
      } else if (!validateMobile(formData.value.mobile)) {
        swalMessage(
          swal,
          "Error",
          "Please input a valid 11 digit mobile number.",
          "error"
        ).then(() => {
          flagvl.value = true;
          flagmob.value = true;
        });
        return false;
      }

      return true;
    };

    const saveSubmitted = ref(false);
    const saveUser = async () => {
      if (!validateFields()) return;

      let conf = formData.value.id == 0 ? "create" : "update";
      swalConfirmation(
        swal,
        "Confirmation",
        `Are you sure to ${conf} this user?`,
        "question"
      ).then(async (result) => {
        if (result.isConfirmed) {
          saveSubmitted.value = true;
          await store.dispatch("saveUserAddress", formData.value);
          // console.log("new", addResponse.value.data.id);
          // return;
          await store.dispatch("saveUser", {
            ...formData.value,
            address_idd: addResponse.value.data.id,
          });
          saveSubmitted.value = false;
          let message = formData.value.id == 0 ? "Created" : "Updated";
          swalMessage(
            swal,
            "Information",
            `User ${message} Successfully!`,
            "success"
          ).then(() => {
            (modalDetails.value.show = false), resetFlag();
            resetFormData();
            refreshData();
          });
        }
      });
    };

    onMounted(async () => {
      await fetchUsers(1, formDataSearch.value);
      fetchRoles();
    });

    return {
      modal,
      btnSave,
      btnCancel,
      formDataSearch,
      //pagination
      isLoadingUsers,
      paginationData,
      users,
      totalUsers,
      usersPages,
      updateCurrentPage,
      searchUser,
      refreshData,
      //Create / Update User
      formData,
      modalDetails,
      addUser,
      roles,
      fetchRoles,
      saveUser,
      updateUser,
      saveSubmitted,
      //Upload image
      imageUrl,
      base64Img,
      validateImage,
      resetImage,
      userProfileImage,
      //Upload signature
      signatureURL,
      base64Sign,
      validateSign,
      resetSign,
      userSignImage,
      //validate
      flagvl,
      flagemail,
      flagpass,
      flagmob,
      NumericOnly,

      //address
      regions,
      provinces,
      municipalities,
      barangays,
      changePermRegion,
      changePermProvince,
      changePermCity,
    };
  },
});
</script>

<style scoped></style>
