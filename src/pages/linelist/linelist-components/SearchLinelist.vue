<template>
  <search-card title="Search Line list">
    <template v-slot:formInput="pObject">
      <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
        <div class="search">
          <Label class="mb-2">Linelist Code:</Label>
          <input
            type="text"
            v-model="formData.code"
            @keyup.enter="$emit('search-linelist')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
        <div class="search">
          <Label class="mb-2">DRU</Label>
          <input
            type="text"
            v-model="formData.dru"
            @keyup.enter="$emit('search-linelist')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
        <div class="search">
          <Label class="mb-2">DRU Officer:</Label>
          <input
            type="text"
            v-model="formData.officer"
            @keyup.enter="$emit('search-linelist')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
        <div class="search">
          <Label class="mb-2">Date From</Label>
          <input
            type="date"
            v-model="formData.dateFrom"
            @keyup.enter="$emit('search-linelist')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
        <div class="search">
          <Label class="mb-2">Date To:</Label>
          <input
            type="date"
            v-model="formData.dateTo"
            @keyup.enter="$emit('search-linelist')"
            class="form-control form-control-sm w-100 custom-font"
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
        <div class="d-flex justify-content-start mt-4">
          <button
            class="btn btn-primary m-1"
            @keyup.enter="$emit('search-linelist')"
            @click.prevent="$emit('search-linelist')"
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
  name: "SearchLinelist",
  props: {
    formData: Object,
  },
  components: {
    SearchCard,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
