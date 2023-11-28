<template>
  <aside class="left-sidebar">
    <!-- Sidebar scroll-->
    <div>
      <div class="brand-logo d-flex align-items-center justify-content-between">
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
          <!-- <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/logos/light-logo.svg" v-if="theme == 'dark-theme'" class="light-logo" width="180" alt="">
          <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/logos/dark-logo.svg" v-else class="dark-logo" width="180" alt=""> -->
        </router-link>
        <div
          class="close-btn d-lg-none d-block sidebartoggler cursor-pointer"
          id="sidebarCollapse"
        >
          <i
            class="ti ti-x fs-8 text-muted dark-color"
            @click.prevent="$emit('toggle-sidebar')"
          ></i>
        </div>
      </div>
      <!-- Sidebar navigation-->
      <nav class="sidebar-nav scroll-sidebar" data-simplebar="init">
        <div class="simplebar-wrapper selected" style="margin: 0px -24px">
          <div class="simplebar-height-auto-observer-wrapper">
            <div class="simplebar-height-auto-observer"></div>
          </div>
          <div class="simplebar-mask selected">
            <div
              class="simplebar-offset selected"
              style="right: 0px; bottom: 0px"
            >
              <div
                class="simplebar-content-wrapper selected"
                tabindex="0"
                role="region"
                aria-label="scrollable content"
                style="height: 100%; overflow: hidden scroll"
              >
                <div
                  class="simplebar-content selected"
                  style="padding: 0px 24px"
                >
                  <ul id="sidebarnav" class="in">
                    <!-- ============================= -->
                    <!-- Home -->
                    <!-- ============================= -->
                    <li class="nav-small-cap">
                      <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                      <span class="hide-menu">Home</span>
                    </li>
                    <!-- =================== -->
                    <!-- Dashboard -->
                    <!-- =================== -->
                    <li
                      class="sidebar-item"
                      :class="{ selected: route.name === 'dashboard' }"
                    >
                      <router-link
                        :to="{ name: 'dashboard' }"
                        class="sidebar-link"
                        aria-expanded="false"
                      >
                        <span>
                          <i class="ti ti-dashboard"></i>
                        </span>
                        <span class="hide-menu">Dashboard</span>
                      </router-link>
                    </li>
                    <li
                      class="sidebar-item"
                      :class="{
                        selected: [
                          'patientlist',
                          'registry',
                          'disease',
                        ].includes(route.name),
                      }"
                    >
                      <router-link
                        :to="{ name: 'patientlist' }"
                        class="sidebar-link"
                        aria-expanded="false"
                      >
                        <span>
                          <i class="ti ti-user"></i>
                        </span>
                        <span class="hide-menu">Patient Profiles</span>
                      </router-link>
                    </li>
                    <li class="sidebar-item">
                      <a
                        class="sidebar-link sidebar-link has-arrow"
                        :class="{ active: epidemShow }"
                        @click="showItems('epidem')"
                        href="javascript:void(0)"
                        :aria-expanded="epidemShow ? true : false"
                      >
                        <span class="d-flex">
                          <i class="ti ti-virus"></i>
                        </span>
                        <span class="hide-menu">Epidemic Diseases</span>
                      </a>
                      <ul
                        aria-expanded="false"
                        class="collapse first-level"
                        :class="{ in: epidemShow }"
                      >
                        <li
                          class="sidebar-item"
                          :class="{
                            selected:
                              route.name == 'patients' &&
                              route.params.type == 'measles',
                          }"
                        >
                          <router-link
                            :to="{
                              name: 'patients',
                              params: { type: 'measles' },
                            }"
                            class="sidebar-link"
                          >
                            <div
                              class="round-16 d-flex align-items-center justify-content-center"
                            >
                              <i class="ti ti-circle"></i>
                            </div>
                            <span class="hide-menu">Measles-Rubella</span>
                          </router-link>
                        </li>
                        <li
                          class="sidebar-item"
                          :class="{
                            selected:
                              route.name == 'patients' &&
                              route.params.type == 'rota',
                          }"
                        >
                          <router-link
                            :to="{ name: 'patients', params: { type: 'rota' } }"
                            class="sidebar-link"
                          >
                            <div
                              class="round-16 d-flex align-items-center justify-content-center"
                            >
                              <i class="ti ti-circle"></i>
                            </div>
                            <span class="hide-menu">Rota Virus</span>
                          </router-link>
                        </li>
                        <li
                          class="sidebar-item"
                          :class="{
                            selected:
                              route.name == 'patients' &&
                              route.params.type == 'meningitis',
                          }"
                        >
                          <router-link
                            :to="{
                              name: 'patients',
                              params: { type: 'meningitis' },
                            }"
                            class="sidebar-link"
                          >
                            <div
                              class="round-16 d-flex align-items-center justify-content-center"
                            >
                              <i class="ti ti-circle"></i>
                            </div>
                            <span class="hide-menu"
                              >Meningitis-Encephalitis</span
                            >
                          </router-link>
                        </li>
                      </ul>
                    </li>
                    <li
                      class="sidebar-item"
                      :class="{
                        selected: route.name === 'linelists',
                      }"
                    >
                      <router-link
                        :to="{ name: 'linelists' }"
                        class="sidebar-link"
                        aria-expanded="false"
                      >
                        <span>
                          <i class="ti ti-list-numbers"></i>
                        </span>
                        <span class="hide-menu">Line Lists</span>
                      </router-link>
                    </li>

                    <li
                      v-if="authUser.role == 'Administrator'"
                      class="nav-small-cap"
                    >
                      <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                      <span class="hide-menu">Settings</span>
                    </li>
                    <li
                      v-if="authUser.role == 'Administrator'"
                      class="sidebar-item"
                      :class="{ selected: route.name === 'users' }"
                    >
                      <router-link
                        :to="{ name: 'users' }"
                        class="sidebar-link"
                        aria-expanded="false"
                      >
                        <span class="rounded-3">
                          <i class="ti ti-users"></i>
                        </span>
                        <span class="hide-menu">User Management</span>
                      </router-link>
                    </li>
                    <li
                      v-if="authUser.role == 'Administrator'"
                      class="sidebar-item"
                      :class="{ selected: route.name === 'roles' }"
                    >
                      <router-link
                        :to="{ name: 'roles' }"
                        class="sidebar-link"
                        aria-expanded="false"
                      >
                        <span class="rounded-3">
                          <i class="ti ti-settings-cog"></i>
                        </span>
                        <span class="hide-menu">Roles</span>
                      </router-link>
                    </li>

                    <li class="nav-small-cap">
                      <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
                      <span class="hide-menu">Auth</span>
                    </li>
                    <li class="sidebar-item">
                      <a
                        @click="logout()"
                        class="sidebar-link sidebar-link"
                        href="javascript:void(0);"
                        aria-expanded="false"
                      >
                        <span class="rounded-3">
                          <i class="ti ti-logout"></i>
                        </span>
                        <span class="hide-menu">Logout</span>
                      </a>
                    </li>
                  </ul>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div
            class="simplebar-placeholder"
            style="width: auto; height: 3445px"
          ></div>
        </div>
        <div
          class="simplebar-track simplebar-horizontal"
          style="visibility: hidden"
        >
          <div
            class="simplebar-scrollbar"
            style="
              width: 0px;
              display: none;
              transform: translate3d(0px, 0px, 0px);
            "
          ></div>
        </div>
        <div
          class="simplebar-track simplebar-vertical"
          style="visibility: visible"
        >
          <div
            class="simplebar-scrollbar"
            style="
              height: 230px;
              transform: translate3d(0px, 0px, 0px);
              display: block;
            "
          ></div>
        </div>
      </nav>
      <!-- End Sidebar navigation -->
    </div>
    <!-- End Sidebar scroll-->
  </aside>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../../api/index";
import Cookies from "js-cookie";
import { useStore } from "vuex";

export default defineComponent({
  name: "Sidebar",
  props: {
    theme: String,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const authUser = computed(() => store.getters.getAuthenticatedUser);

    const parentRouteName = computed(() => {
      if (route.matched.length > 0) {
        const parentRoute = route.matched[0];

        return parentRoute.name;
      }

      return "";
    });

    const logout = async () => {
      try {
        const response = await api.post("/auth/logout");
        api.defaults.headers.common["Authorization"] = "";
        Cookies.remove("auth_token");
        localStorage.removeItem("userData");
        router.push({ name: "auth" });
      } catch (error) {
        router.push({ name: "auth" });
      }
    };

    const epidemShow = ref(false);

    const showItems = async (mod) => {
      if (mod == "epidem") {
        epidemShow.value = epidemShow.value == true ? false : true;
      }
    };

    watch(() => {
      route;
      if (route.name === "patients") {
        epidemShow.value = true;
      } else {
        epidemShow.value = false;
      }
    });

    return {
      route,
      logout,
      authUser,
      parentRouteName,
      showItems,
      epidemShow,
    };
  },
});
</script>

<style scoped>
.for-admin {
  display: none;
}
</style>
