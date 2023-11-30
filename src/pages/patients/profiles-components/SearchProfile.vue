<template>
  <search-card title="Search Patient">
    <template v-slot:formInput="pObject">
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">Patient No:</Label>
          <input
            type="text"
            v-model="formDataSearch.patno"
            @keyup.enter="$emit('search-patient')"
            @keypress="NumericOnly()"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">Last Name</Label>
          <input
            type="text"
            v-model="formDataSearch.lname"
            @keyup.enter="$emit('search-patient')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">First Name:</Label>
          <input
            type="text"
            v-model="formDataSearch.fname"
            @keyup.enter="$emit('search-patient')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">Middle Name:</Label>
          <input
            type="text"
            v-model="formDataSearch.mname"
            @keyup.enter="$emit('search-patient')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">Year:</Label>
          <select
            v-model="formDataSearch.year"
            @keyup.enter="$emit('search-patient')"
            class="form-select form-control form-control-sm"
          >
            <option value="">Please Select</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">Date From</Label>
          <input
            type="date"
            v-model="formDataSearch.dateFrom"
            @keyup.enter="$emit('search-patient')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">Date To:</Label>
          <input
            type="date"
            v-model="formDataSearch.dateTo"
            @keyup.enter="$emit('search-patient')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="d-flex justify-content-start mt-4">
          <button
            class="btn btn-primary m-1"
            @keyup.enter="$emit('search-patient')"
            @click.prevent="$emit('search-patient')"
          >
            Search
          </button>
          <button
            class="btn btn-danger m-1"
            @click.prevent="$emit('reset-search')"
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
import { NumericOnly } from "@/composables";
import SearchCard from "@/components/cards/SearchCard.vue";

export default defineComponent({
  name: "SearchProfile",
  props: {
    formDataSearch: Object,
  },
  components: {
    SearchCard,
  },
  setup(props, { emit }) {
    return {
      NumericOnly,
    };
  },
});
</script>

<style scoped></style>
