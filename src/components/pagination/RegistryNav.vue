<template>
  <ul
    class="nav nav-pills user-profile-tab justify-content-start bg-light-info d-flex registry-nav"
    id="pills-tab"
    role="tablist"
  >
    <div class="d-flex justify-content-between align-items-center w-100">
      <div class="d-flex">
        <li
          v-for="(t, index) in tabs"
          :key="index"
          class="nav-item"
          role="presentation"
          @click="chooseTab(t.id)"
        >
          <button
            :class="{ active: selectedTab == t.id }"
            class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
          >
            <span class="d-none d-md-block">{{ t.name }}</span>
          </button>
        </li>
      </div>
      <div
        class="btn-container d-flex align-items-center justify-content-end gap-2 mx-3"
      >
        <router-link
          :to="{ name: 'patientlist' }"
          class="btn waves-effect waves-light btn-rounded btn-dark"
        >
          Back to Patient Profiles
        </router-link>
        <button
          class="btn waves-effect waves-light btn-rounded btn-info"
          @click="$emit('save-data')"
        >
          {{
            !patient.registry
              ? "Update Patient Disease"
              : "Save Patient Disease"
          }}
        </button>
      </div>
    </div>
  </ul>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from "vue";

export default defineComponent({
  name: "RegistryNav",
  props: {
    tabs: Array,
    patient: Object,
    selectedTab: Number,
  },

  setup(props, { emit }) {
    const isFull = inject("isFull");
    const calculateWidth = computed(() => {
      return isFull.value ? "calc(100% - 269px)" : "calc(100% - 86px)";
    });
    const chooseTab = (tabId: Number) => {
      emit("select-tab", tabId);
    };

    return { chooseTab, isFull, calculateWidth };
  },
});
</script>

<style scoped>
.registry-nav {
  position: fixed;
  width: v-bind(calculateWidth);
}
@media screen and (max-width: 991px) {
  .nav-pills {
    display: none !important;
  }
  .card {
    margin-right: 0;
  }
}
</style>
