<template>
  <header class="app-header">
    <nav class="navbar navbar-expand-lg navbar-light align-items-center">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a
            class="nav-link sidebartoggler nav-icon-hover ms-n3"
            @click.prevent="$emit('toggle-sidebar')"
            id="headerCollapse"
            href="javascript:void(0)"
          >
            <i class="ti ti-menu-2 dark-color"></i>
          </a>
        </li>
        <ul class="navbar-nav quick-links d-none d-lg-flex">
          <li class="nav-item dropdown hover-dd d-none d-lg-block">
            <a
              class="nav-link fw-semibold fs-7 dark-color"
              href="javascript:void(0)"
              >{{ title }}</a
            >
            <div
              class="dropdown-menu dropdown-menu-nav dropdown-menu-animate-up py-0"
            ></div>
          </li>
        </ul>
      </ul>

      <div class="d-block d-lg-none">
        <router-link :to="{ name: 'dashboard' }" class="text-nowrap logo-img">
          <span class="d-flex align-items-center justify-content-start gap-2">
            <img
              class="rounded-circle"
              src="../../assets/images/logo/vpd-logo.png"
              height="35"
              width="35"
              alt="zxczxcxz"
            />
            <a class="fw-semibold fs-7 dark-color">JBLMGH - VPD</a>
          </span>
        </router-link>
        <!-- <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/logos/dark-logo.svg" v-if="theme == 'light-theme'" width="180" alt="" />
        <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/logos//light-logo.svg" v-else width="180" alt=""> -->
      </div>
      <button
        class="navbar-toggler p-0 border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="p-2">
          <i class="ti ti-dots fs-7"></i>
        </span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <div class="d-flex align-items-center justify-content-between">
          <a
            href="javascript:void(0)"
            class="nav-link d-flex d-lg-none align-items-center justify-content-center"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobilenavbar"
            aria-controls="offcanvasWithBothOptions"
          >
            <!-- <i class="ti ti-align-justified fs-7"></i> -->
          </a>
          <ul
            class="navbar-nav flex-row ms-auto align-items-center justify-content-center"
          >
            <li class="nav-item">
              <a
                class="nav-link nav-icon-hover"
                href="javascript:void(0)"
                @click="toggleDarkMode()"
              >
                <i
                  class="ti dark-color"
                  :class="
                    theme == 'light-theme' ? 'ti-sun-filled' : 'ti-moon-filled'
                  "
                ></i>
              </a>
            </li>
            <!-- <li class="nav-item dropdown">
              <a class="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="ti ti-bell-ringing"></i>
                <div class="notification bg-primary rounded-circle"></div>
              </a>
              <div class="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                <div class="d-flex align-items-center justify-content-between py-3 px-7">
                  <h5 class="mb-0 fs-5 fw-semibold">Notifications</h5>
                  <span class="badge bg-primary rounded-4 px-3 py-1 lh-sm">5 new</span>
                </div>
                <div class="message-body" data-simplebar>
                  <a href="javascript:void(0)" class="py-6 px-7 d-flex align-items-center dropdown-item">
                    <span class="me-3">
                      <img src="../../assets/images/profile/user-1.jpg" alt="user" class="rounded-circle" width="48" height="48" />
                    </span>
                    <div class="w-75 d-inline-block v-middle">
                      <h6 class="mb-1 fw-semibold">Roman Joined the Team!</h6>
                      <span class="d-block">Congratulate him</span>
                    </div>
                  </a>
                  <a href="javascript:void(0)" class="py-6 px-7 d-flex align-items-center dropdown-item">
                    <span class="me-3">
                      <img src="../../assets/images/profile/user-2.jpg" alt="user" class="rounded-circle" width="48" height="48" />
                    </span>
                    <div class="w-75 d-inline-block v-middle">
                      <h6 class="mb-1 fw-semibold">New message</h6>
                      <span class="d-block">Salma sent you new message</span>
                    </div>
                  </a>
                  <a href="javascript:void(0)" class="py-6 px-7 d-flex align-items-center dropdown-item">
                    <span class="me-3">
                      <img src="../../assets/images/profile/user-3.jpg" alt="user" class="rounded-circle" width="48" height="48" />
                    </span>
                    <div class="w-75 d-inline-block v-middle">
                      <h6 class="mb-1 fw-semibold">Bianca sent payment</h6>
                      <span class="d-block">Check your earnings</span>
                    </div>
                  </a>
                  <a href="javascript:void(0)" class="py-6 px-7 d-flex align-items-center dropdown-item">
                    <span class="me-3">
                      <img src="../../assets/images/profile/user-4.jpg" alt="user" class="rounded-circle" width="48" height="48" />
                    </span>
                    <div class="w-75 d-inline-block v-middle">
                      <h6 class="mb-1 fw-semibold">Jolly completed tasks</h6>
                      <span class="d-block">Assign her new tasks</span>
                    </div>
                  </a>
                  <a href="javascript:void(0)" class="py-6 px-7 d-flex align-items-center dropdown-item">
                    <span class="me-3">
                      <img src="../../assets/images/profile/user-5.jpg" alt="user" class="rounded-circle" width="48" height="48" />
                    </span>
                    <div class="w-75 d-inline-block v-middle">
                      <h6 class="mb-1 fw-semibold">John received payment</h6>
                      <span class="d-block">$230 deducted from account</span>
                    </div>
                  </a>
                  <a href="javascript:void(0)" class="py-6 px-7 d-flex align-items-center dropdown-item">
                    <span class="me-3">
                      <img src="../../assets/images/profile/user-1.jpg" alt="user" class="rounded-circle" width="48" height="48" />
                    </span>
                    <div class="w-75 d-inline-block v-middle">
                      <h6 class="mb-1 fw-semibold">Roman Joined the Team!</h6>
                      <span class="d-block">Congratulate him</span>
                    </div>
                  </a>
                </div>
                <div class="py-6 px-7 mb-1">
                  <button class="btn btn-outline-primary w-100"> See All Notifications </button>
                </div>
              </div>
            </li> -->
            <li class="nav-item">
              <a class="nav-link" href="javascript:void(0)">
                <h5 class="mt-2 fw-semibold">{{ user.fullname }}</h5>
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link pe-0"
                href="javascript:void(0)"
                @click="dropDownTick()"
                id="drop1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div class="d-flex align-items-center">
                  <div class="user-profile-img">
                    <img
                      :src="user.img"
                      class="rounded-circle"
                      width="35"
                      height="35"
                      alt=""
                    />
                  </div>
                </div>
              </a>
              <div
                class="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up"
                aria-labelledby="drop1"
              >
                <div
                  class="profile-dropdown position-relative"
                  data-simplebar
                  v-if="!isSkeleton"
                >
                  <div
                    class="d-flex justify-content-between align-items-center py-3 px-7 pb-0"
                  >
                    <h5 class="mb-0 fs-5 fw-semibold">User Profile</h5>
                    <button
                      type="button"
                      class="btn mb-1 waves-effect waves-light btn-outline-dark btn-sm"
                    >
                      <i class="ti ti-settings"></i>
                      Settings
                    </button>
                  </div>

                  <div
                    class="d-flex align-items-center py-9 mx-7 border-bottom"
                  >
                    <img
                      :src="user.img"
                      class="rounded-circle"
                      width="70"
                      height="70"
                      alt=""
                    />
                    <div class="ms-3">
                      <h5 class="mb-1 fs-3">{{ user.fullname }}</h5>
                      <span class="mb-1 d-block text-dark"
                        >{{
                          user.role == "Regular" ? "Regular User" : user.role
                        }}
                      </span>
                      <p
                        class="mb-0 d-flex text-dark align-items-center fs-2 gap-1"
                      >
                        <i class="ti ti-mail fs-3"></i> {{ user.email }}
                      </p>
                    </div>
                  </div>
                  <div class="d-grid py-4 px-7 pt-8">
                    <button
                      @click="logout"
                      class="btn btn-sm btn-outline-danger"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
                <profile-skeleton v-else />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <page-blank v-if="modalSwitch" :checkType="checkState"></page-blank>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import api from "@/api";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import ProfileSkeleton from "@/pages/loader/ProfileSkeleton.vue";
import PageBlank from "@/pages/loader/PageBlank.vue";
export default defineComponent({
  components: {
    ProfileSkeleton,
    PageBlank,
  },
  props: {
    title: String,
  },
  setup(props, { emit }) {
    console.log("this is default");

    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.getters.getAuthenticatedUser);

    const logout = async () => {
      try {
        const response = await api.post("/auth/logout");
        api.defaults.headers.common["Authorization"] = "";
        Cookies.remove("auth_token");
        localStorage.removeItem("userData");
        router.push({ name: "auth" });
        console.log(response);
      } catch (error) {
        router.push({ name: "auth" });
      }
    };

    const theme = ref("light-theme");
    const modalSwitch = ref(false);
    const checkState = ref(false);
    const toggleDarkMode = () => {
      modalSwitch.value = true;
      checkState.value = checkState.value === false ? true : false;
      theme.value =
        theme.value === "light-theme" ? "dark-theme" : "light-theme";
      emit("change-theme", theme.value);
      loaderLife();
    };

    const loaderLife = () => {
      setTimeout(() => {
        modalSwitch.value = false;
      }, 1000);
    };

    onMounted(() => {
      const currentTheme = localStorage.getItem("app-theme");
      theme.value = currentTheme;
      checkState.value = currentTheme == "light-theme" ? false : true;
    });

    const isSkeleton = ref(true);

    const dropDownTick = async () => {
      setTimeout(() => {
        isSkeleton.value = false;
      }, 1500);
    };

    return {
      user,
      logout,
      isSkeleton,
      dropDownTick,
      toggleDarkMode,
      theme,
      modalSwitch,
      checkState,
    };
  },
});
</script>

<style scoped>
.cst-text {
  text-transform: capitalize !important;
}

.app-header {
  border-bottom: 2px solid #e5e5e5; /* Adjust the color and thickness as needed */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Adjust the shadow properties as needed */
}
</style>
