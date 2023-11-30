<template>
  <search-card title="Search User">
    <template v-slot:formInput="pObject">
      <div class="col-sm-12 col-md-4 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">Last Name:</Label>
          <input
            type="text"
            v-model="formDataSearch.lname"
            @keyup.enter="$emit('search-user')"
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
            @keyup.enter="$emit('search-user')"
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
            @keyup.enter="$emit('search-user')"
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
            @keyup.enter="$emit('search-user')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-4 col-lg-3 mb-2">
        <div class="d-flex justify-content-start mt-4">
          <button
            class="btn btn-primary m-1"
            @keyup.enter="$emit('search-user')"
            @click.prevent="$emit('search-user')"
          >
            Search
          </button>
          <button
            class="btn btn-danger m-1"
            @click.prevent="$emit('refresh-data')"
          >
            Refresh
          </button>
        </div>
      </div>
    </template>
  </search-card>
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
export default defineComponent({
  name: "SearchUser",
  props: {
    formDataSearch: Object,
  },
  components: { SearchCard },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
