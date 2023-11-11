<template>
  <div
    class="page-wrapper"
    id="main-wrapper"
    data-layout="vertical"
    data-navbarbg="skin6"
    :data-sidebartype="isFull == true ? 'full' : 'mini-sidebar'"
    data-sidebar-position="fixed"
    data-header-position="fixed"
  >
    <!-- Sidebar Start -->

    <sidebar @toggle-sidebar="toggleSidebar" :theme="appTheme" />

    <!-- Sidebar End -->

    <!-- Main wrapper -->

    <div class="body-wrapper">
      <navbar
        :title="pageTitle"
        @toggle-sidebar="toggleSidebar"
        @change-theme="toggleChangeTheme"
      />

      <!-- Header End -->

      <div class="container-fluid px-0 mw-100">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, watch, ref, inject, provide, watchEffect } from "vue";
import Navbar from "../components/navbar/Navbar.vue";
import Sidebar from "../components/sidebar/Sidebar.vue";
import Cookies from "js-cookie";
import { useStore } from "vuex";
import CryptoJS from "crypto-js";
import api from "../api";
import { useRouter, useRoute } from "vue-router";

export default {
  components: {
    Navbar,
    Sidebar,
  },

  setup() {
    const auth = ref(Cookies.get("auth_token"));
    const swal = inject("$swal");
    const router = useRouter();
    const route = useRoute();

    const pageTitle = ref("");

    const isFull = ref(false);

    watch(
      () => route.meta.title,
      (newTitle) => {
        pageTitle.value = newTitle;
      }
    );

    const toggleSidebar = () => {
      isFull.value = !isFull.value;
    };

    const appTheme = ref("");
    const body = document.body;
    const toggleChangeTheme = async (theme) => {
      appTheme.value = theme;
      localStorage.setItem("app-theme", theme);
      body.classList.add("fade-effect", "fade-out");
      if (theme == "dark-theme") {
        addDarkTheme();
      } else {
        removeDarkTheme();
      }

      setTimeout(() => {
        if (theme === "dark-theme") {
          addDarkTheme();
        } else {
          removeDarkTheme();
        }

        setTimeout(() => {
          body.classList.remove("fade-out");
        }, 300);
      }, 10);
    };

    const darkCss = new URL(
      "/src/assets/css/style-dark.min.css",
      import.meta.url
    );

    let styleTag = null;
    const addDarkTheme = () => {
      const linkTag = document.createElement("link");
      linkTag.id = "dark-mode";
      linkTag.rel = "stylesheet";
      linkTag.href = `${darkCss}`;

      document.head.appendChild(linkTag);
    };

    const removeDarkTheme = () => {
      const linkTag = document.getElementById("dark-mode");
      if (linkTag) {
        document.head.removeChild(linkTag);
      }
    };

    const store = useStore();

    onMounted(async () => {
      const theme = localStorage.getItem("app-theme");
      theme == null || theme == "light-theme"
        ? await toggleChangeTheme("light-theme")
        : await toggleChangeTheme("dark-theme");

      const token = Cookies.get("auth_token");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const deviceTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      console.log("device theme", deviceTheme);

      try {
        const response = await api.get("/auth/user");

        if (response.data.user) {
          console.log("current user response", response.data.user);
        }
      } catch (error) {
        console.log(error.response.status);
        console.log(error.response.statusText);

        api.defaults.headers.common["Authorization"] = "";
        Cookies.remove("auth_token");
        localStorage.removeItem("userData");
        localStorage.removeItem("ajioasdmianc8a79sdy0");
        router.push({ name: "auth" });
      }

      const encryptedData = localStorage.getItem("userData");
      const password = import.meta.env.VITE_CRYPTO_SECRET_KEY;
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, password);
        if (bytes.toString()) {
          const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          provide("user", decryptedData);
          store.commit("setAuthenticatedUser", decryptedData);
          console.log("app layout setup");
        } else {
          console.error("Decryption failed. Invalid password or data.");
        }
      } catch (error) {
        console.error("Error decrypting data:", error);
      }

      pageTitle.value = route.meta.title || "";

      //redirect to home*
    });

    watch(() => {
      auth.value;
      if (auth.value) {
        console.log("has token");
      } else {
        console.log("token expires");
      }
    });

    watch(route, () => {
      isFull.value = false;
    });

    return {
      toggleSidebar,
      isFull,
      pageTitle,
      toggleChangeTheme,
      appTheme,
    };
  },
};
</script>

<style scoped>
.app-header {
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);
}

/* .body-wrapper > .container-fluid {
  max-width: 1600px !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.content {
  width: 100%;
}

.wrapper {
  width: 100%;
}
*/

#main-wrapper[data-layout="vertical"][data-header-position="fixed"]
  .body-wrapper
  > .container-fluid {
  padding-top: calc(70px + 1px) !important;
}
</style>
