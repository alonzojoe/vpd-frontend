<template>
  <search-card title="Search Patient">
    <template v-slot:formInput="pObject">
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">Ep ID:</Label>
          <input
            type="text"
            v-model="formData.ep_id"
            @keyup.enter="$emit('search-data')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">Last Name</Label>
          <input
            type="text"
            v-model="formData.lname"
            @keyup.enter="$emit('search-data')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">First Name:</Label>
          <input
            type="text"
            v-model="formData.fname"
            @keyup.enter="$emit('search-data')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">Middle Name:</Label>
          <input
            type="text"
            v-model="formData.mname"
            @keyup.enter="$emit('search-data')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">Case ID:</Label>
          <input
            type="text"
            v-model="formData.case_id"
            @keyup.enter="$emit('search-data')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">Date From</Label>
          <input
            type="date"
            v-model="formData.dateFrom"
            @keyup.enter="$emit('search-data')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="search">
          <Label class="mb-2">Date To:</Label>
          <input
            type="date"
            v-model="formData.dateTo"
            @keyup.enter="$emit('search-data')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3 mb-2">
        <div class="d-flex justify-content-start mt-4">
          <button
            class="btn btn-primary m-1"
            @keyup.enter="$emit('search-data')"
            @click.prevent="$emit('search-data')"
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
import { defineComponent } from "vue";
import SearchCard from "@/components/cards/SearchCard.vue";
export default defineComponent({
  name: "SearchDisease",
  props: {
    formData: Object,
  },
  components: { SearchCard },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
