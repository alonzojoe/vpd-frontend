<template>
  <div
    class="page-wrapper"
    id="main-wrapper"
    data-layout="vertical"
    data-navbarbg="skin6"
    data-sidebartype="full"
    data-sidebar-position="fixed"
    data-header-position="fixed"
  >
    <div class="position-relative overflow-hidden radial-gradient min-vh-100">
      <div class="position-relative z-index-5">
        <div class="row">
          <div class="col-xl-7 col-xxl-8 left-screen">
            <a
              href="javascript:void(0);"
              class="text-nowrap logo-img d-block px-4 py-9 w-100"
            >
              <!-- <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/logos/dark-logo.svg" width="180" alt=""> -->
            </a>
            <div
              class="d-none d-xl-flex align-items-center justify-content-center"
              style="height: calc(100vh - 80px)"
            >
              <!-- <img src="../../assets/images/logo/vpd-logo.png" alt="" class="img-fluid" width="500"> -->
            </div>
          </div>
          <div class="col-xl-5 col-xxl-4 right-screen">
            <div
              class="authentication-login min-vh-100 bg-body row justify-content-center align-items-center p-4"
            >
              <div class="col-sm-8 col-md-6 col-xl-9">
                <h2 class="mb-3 fs-7 fw-bolder">Welcome to JBLMGH</h2>
                <p class="mb-9">
                  Vaccine-Preventable Diseases Referral Laboratory
                </p>
                <!-- <div class="row">
                    <div class="col-6 mb-2 mb-sm-0">
                      <a class="btn btn-white text-dark border fw-normal d-flex align-items-center justify-content-center rounded-2 py-8" href="javascript:void(0)" role="button">
                        <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/google-icon.svg" alt="" class="img-fluid me-2" width="18" height="18">
                        <span class="d-none d-sm-block me-1 flex-shrink-0">Sign in with</span>Google
                      </a>
                    </div>
                    <div class="col-6">
                      <a class="btn btn-white text-dark border fw-normal d-flex align-items-center justify-content-center rounded-2 py-8" href="javascript:void(0)" role="button">
                        <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/facebook-icon.svg" alt="" class="img-fluid me-2" width="18" height="18">
                        <span class="d-none d-sm-block me-1 flex-shrink-0">Sign in with</span>FB
                      </a>
                    </div>
                  </div>
                  <div class="position-relative text-center my-4">
                    <p class="mb-0 fs-4 px-3 d-inline-block bg-white text-dark z-index-5 position-relative">or sign in with</p>
                    <span class="border-top w-100 position-absolute top-50 start-50 translate-middle"></span>
                  </div> -->
                <!-- <img :src="'data:image/jpeg;base64,' + user.img" alt="na">
                  <pre>
                    {{user}}
                 
                  </pre> -->
                <!-- <button @click="alertMe()">Me</button> -->
                <form>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label"
                      >Email</label
                    >
                    <input
                      type="email"
                      v-model="formData.email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      required
                    />
                  </div>
                  <div class="mb-4">
                    <label for="exampleInputPassword1" class="form-label"
                      >Password</label
                    >
                    <input
                      type="password"
                      v-model="formData.password"
                      class="form-control"
                      id="exampleInputPassword1"
                      required
                    />
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between mb-4"
                  >
                    <div class="form-check">
                      <input
                        class="form-check-input primary"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked
                      />
                      <label
                        class="form-check-label text-dark"
                        for="flexCheckChecked"
                      >
                        Remeber this Device
                      </label>
                    </div>
                    <a
                      class="text-primary fw-medium"
                      href="javascript:void(0);"
                      @click="forgotPassword()"
                      >Forgot Password ?</a
                    >
                  </div>
                  <button
                    @click.prevent="login()"
                    type="submit"
                    class="btn btn-primary w-100 py-8 mb-4 rounded-2"
                    :disabled="isLoading"
                  >
                    <div
                      v-if="isLoading"
                      class="spinner-border spinner-border-sm text-light"
                      role="status"
                    ></div>
                    <span class="text-text-light ml-1">{{
                      isLoading ? "Logging In" : "Log In"
                    }}</span>
                  </button>
                  <!-- <div class="d-flex align-items-center justify-content-center">
                      <p class="fs-4 mb-0 fw-medium">New to Modernize?</p>
                      <a class="text-primary fw-medium ms-2" href="authentication-register.html">Create an account</a>
                    </div> -->
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <modal-sm :details="modalDetails" @close-modal="modalDetails.show = false">
    <div class="row my-5">
      <div class="col-12">
        <form class="mx-5" v-if="step == 1">
          <div class="mb-3">
            <label for="exampleInputEmail2" class="form-label">Email</label>
            <input
              type="email"
              v-model="forgotEmail"
              class="form-control"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
              required
            />
          </div>

          <button
            @click.prevent="sendOTP()"
            type="submit"
            class="btn btn-primary w-100 py-8 mb-4 rounded-2"
            :disabled="isLoadingOtp"
          >
            <div
              v-if="isLoadingOtp"
              class="spinner-border spinner-border-sm text-light"
              role="status"
            ></div>
            <span class="text-text-light ml-1">{{
              isLoadingOtp ? "Sending, Please Wait ...." : "Send OTP"
            }}</span>
          </button>
        </form>
        <form class="mx-5" v-else-if="step == 2">
          <div class="mb-3">
            <label for="exampleInputEmail2" class="form-label">Email</label>
            <input
              type="email"
              v-model="formChange.email"
              class="form-control"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
              disabled
              required
            />
          </div>
          <div class="mb-4">
            <label for="exampleInputPassword3" class="form-label"
              >New Password
              <span class="text-danger fs-2"
                >&nbsp;&nbsp;&nbsp;(minimum 6 characters)</span
              ></label
            >
            <div class="input-group">
              <input
                :type="eyed.fpass ? 'text' : 'password'"
                class="form-control"
                v-model="formChange.password"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
                required
              />
              <button
                class="btn btn-light-primary text-primary"
                type="button"
                @click="eyed.fpass = !eyed.fpass"
              >
                <i
                  class="ti fs-6"
                  :class="eyed.fpass ? 'ti-eye-off' : 'ti-eye'"
                ></i>
              </button>
            </div>
          </div>
          <div class="mb-4">
            <label for="exampleInputPassword3" class="form-label"
              >Confirm Password</label
            >
            <div class="input-group">
              <input
                :type="eyed.fconf ? 'text' : 'password'"
                class="form-control"
                v-model="formChange.confirm"
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
                required
              />
              <button
                class="btn btn-light-primary text-primary"
                type="button"
                @click="eyed.fconf = !eyed.fconf"
              >
                <i
                  class="ti fs-6"
                  :class="eyed.fconf ? 'ti-eye-off' : 'ti-eye'"
                ></i>
              </button>
            </div>
          </div>
          <div class="mb-4">
            <label for="exampleInputPassword3" class="form-label">OTP</label>
            <input
              type="text"
              v-model="formChange.otp"
              maxlength="6"
              class="form-control"
              id="exampleInputPassword3"
              required
            />
          </div>

          <button
            @click.prevent="changePassword()"
            type="submit"
            class="btn btn-primary w-100 py-8 mb-4 rounded-2"
            :disabled="isLoadingOtp || !enableChange"
          >
            <div
              v-if="isLoadingOtp"
              class="spinner-border spinner-border-sm text-light"
              role="status"
            ></div>
            <span class="text-text-light ml-1">{{
              isLoadingOtp ? "Loading ...." : "Change Password"
            }}</span>
          </button>
        </form>
      </div>
    </div>
  </modal-sm>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject, onMounted, watch } from "vue";
import api from "../../api/index";
import Cookies from "js-cookie";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CryptoJS from "crypto-js";
import ModalSm from "../../components/modals/ModalSM.vue";
import { swalMessage } from "@/composables";

export default defineComponent({
  components: {
    ModalSm,
  },
  setup() {
    const store = useStore();
    const swal = inject("$swal");
    const router = useRouter();

    const formData = ref({
      username: "",
      password: "",
    });

    const user = computed(() => store.getters.getAuthenticatedUser);

    const alertMe = () => {
      swal({
        title: "Success",
        text: "test swal",
        icon: "success",
      });
    };

    const isLoading = ref(false);

    const login = async () => {
      if (!formData.value.email || !formData.value.password) {
        swalMessage(
          swal,
          "Warning",
          "Email and Password are Required!",
          "warning"
        );
        return;
      }

      isLoading.value = true;
      try {
        const response = await api.post("/auth/login", {
          email: formData.value.email,
          password: formData.value.password,
        });

        if (response.data.authorization && response.data.authorization.token) {
          try {
            const token = response.data.authorization.token;
            const userData = JSON.stringify(response.data.user);

            const password = import.meta.env.VITE_CRYPTO_SECRET_KEY;
            const encryptedData = CryptoJS.AES.encrypt(
              userData,
              password
            ).toString();
            console.log(encryptedData);
            Cookies.set("auth_token", token, { expires: 365 });
            localStorage.setItem("ajioasdmianc8a79sdy0", token);
            localStorage.setItem("userData", encryptedData);
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            router.push({ name: "dashboard" });
            isLoading.value = false;
          } catch (error) {
            console.error("Error storing token in cookie:", error);
          }
        }
      } catch (error) {
        user.value = error.response.data.message;
        swal({
          title: "Login Failed",
          text: "Invalid email or password",
          icon: "error",
        }).then(() => {
          isLoading.value = false;
        });
      }
    };

    const eyed = ref({
      pass: false,
      fpass: false,
      fconf: false,
    });

    const resetEyed = () => {
      Object.keys(eyed.value).forEach((e) => (eyed.value[e] = false));
    };

    const modalDetails = ref({
      show: false,
      title: "Forgot Password",
    });

    const forgotEmail = ref("");
    const step = ref(1);
    const forgotPassword = () => {
      forgotResetter();
      modalDetails.value.show = true;
      step.value = 1;
      console.log(modalDetails.value);
    };

    const isLoadingOtp = ref(false);
    const sendOTP = async () => {
      if (!forgotEmail.value) {
        swalMessage(swal, "Warning", `Email is Required!`, `warning`);
        return;
      }

      isLoadingOtp.value = true;
      try {
        const response = await api.post("auth/forgot", {
          email: forgotEmail.value,
        });
        swalMessage(
          swal,
          "Information",
          `${response.data.message}`,
          `success`
        ).then(() => {
          step.value = 2;
          isLoadingOtp.value = false;
          formChange.value.email = forgotEmail.value;
        });
      } catch (error) {
        swalMessage(
          swal,
          "Warning",
          `${error.response.data.message}`,
          `warning`
        ).then(() => {
          isLoadingOtp.value = false;
        });
      }
    };

    const formChange = ref({
      email: "",
      password: "",
      confirm: "",
      otp: "",
    });

    const resetFormChange = () => {
      Object.keys(formChange.value).forEach((e) => {
        formChange.value[e] = "";
      });
    };

    const forgotResetter = () => {
      isLoadingOtp.value = false;
      step.value = 1;
      forgotEmail.value = "";
      resetFormChange();
    };

    const validator = () => {
      if (
        !formChange.value.password ||
        !formChange.value.confirm ||
        !formChange.value.otp
      ) {
        swalMessage(
          swal,
          "Warning",
          "Please fill all required fields.",
          "warning"
        );
        return false;
      } else if (formChange.value.password.length < 6) {
        swalMessage(
          swal,
          "Warning",
          "Password is too short, mininum 6 characters.",
          "warning"
        );
        return false;
      } else if (formChange.value.password != formChange.value.confirm) {
        swalMessage(swal, "Warning", `Password doesn't match`, "warning");
        return false;
      }

      return true;
    };

    const enableChange = ref(false);

    watch(() => {
      formChange.value;
      for (const key in formChange.value) {
        if (formChange.value[key] === "") {
          enableChange.value = false;
        } else {
          enableChange.value = true;
        }
      }
    });

    const changePassword = async () => {
      if (!validator()) return;
      isLoadingOtp.value = true;
      try {
        const response = await api.post("auth/reset", {
          email: formChange.value.email,
          password: formChange.value.password,
          otp: formChange.value.otp,
        });
        swalMessage(
          swal,
          "Information",
          `${response.data.message}, Please proceed to login`,
          `success`
        ).then(() => {
          isLoadingOtp.value = false;
          modalDetails.value.show = false;
        });
      } catch (error) {
        swalMessage(
          swal,
          "Warning",
          `${error.response.data.message}`,
          `warning`
        ).then(() => {
          isLoadingOtp.value = false;
        });
      }
    };

    onMounted(() => {
      resetEyed();
    });

    return {
      formData,
      user,
      login,
      alertMe,
      isLoading,
      modalDetails,
      forgotPassword,
      forgotEmail,
      sendOTP,
      isLoadingOtp,
      step,
      formChange,
      eyed,
      changePassword,
      enableChange,
    };
  },
});
</script>

<style scoped>
.left-screen {
  background-image: url("../../assets/images/logo/bg-new.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.authentication-login {
  /*background: linear-gradient(-45deg, #ffe2d3, #a6dee2, #cfc2fc);*/
}

@media (max-width: 1299px) {
  .left-screen {
    display: none;
  }
}
</style>
