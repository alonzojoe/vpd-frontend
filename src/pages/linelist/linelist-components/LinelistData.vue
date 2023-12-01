<template>
  <div class="row m-2">
    <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
      <div class="d-flex align-items-center justify-content-end">
        <button
          class="btn btn-primary btn-sm m-1"
          @click="$emit('save-linelist')"
        >
          Save Linelist
        </button>
        <button
          class="btn btn-danger btn-sm m-1"
          @click="$emit('close-linelist')"
        >
          Cancel
        </button>
      </div>
    </div>
    <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
      <div class="search">
        <Label class="mb-2">DRU Reporting Unit</Label>
        <input
          type="text"
          v-model="formHeader.dru"
          class="form-control form-control-sm w-100 custom-font"
        />
      </div>
    </div>
    <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
      <div class="search">
        <Label class="mb-2">Disease Surveillance Officer</Label>
        <input
          type="text"
          v-model="formHeader.dru_officer"
          class="form-control form-control-sm w-100 custom-font"
        />
      </div>
    </div>
    <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
      <div class="search">
        <Label class="mb-2">Contact No</Label>
        <input
          type="text"
          v-model="formHeader.contact"
          class="form-control form-control-sm w-100 custom-font"
        />
      </div>
    </div>
    <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
      <div class="search">
        <Label class="mb-2">Region</Label>
        <input
          type="text"
          v-model="formHeader.region"
          class="form-control form-control-sm w-100 custom-font"
        />
      </div>
    </div>
    <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
      <div class="search">
        <Label class="mb-2">Province</Label>
        <input
          type="text"
          v-model="formHeader.province"
          class="form-control form-control-sm w-100 custom-font"
        />
      </div>
    </div>
    <div class="col-sm-12 col-md-3 col-lg-4 mb-2">
      <div class="search">
        <Label class="mb-2">Email</Label>
        <input
          type="text"
          v-model="formHeader.email"
          class="form-control form-control-sm w-100 custom-font"
        />
      </div>
    </div>
  </div>
  <div class="m-3 table-responsive p-0 m-0 border border-primary mb-4">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th class="text-center bg-primary text-white p-0 m-0">No</th>
          <th class="text-center bg-primary text-white p-0 m-0">Last Name</th>
          <th class="text-center bg-primary text-white p-0 m-0">First Name</th>
          <th class="text-center bg-primary text-white p-0 m-0">Middle Name</th>
          <th class="text-center bg-primary text-white p-0 m-0">Age</th>
          <th class="text-center bg-primary text-white p-0 m-0">Gender</th>
          <th class="text-center bg-primary text-white p-0 m-0">
            Date of Birth
          </th>
          <th class="text-center bg-primary text-white p-0 m-0">Specimen</th>
          <th
            class="text-center bg-primary text-white p-0 m-0"
            style="width: 10%"
          >
            Date and Time Collection
          </th>
          <th
            class="text-center bg-primary text-white p-0 m-0"
            style="width: 10%"
          >
            Disease Case
          </th>
          <th class="text-center bg-primary text-white p-0 m-0">Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, index) in patients" :key="index">
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ index + 1 }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ p.lname }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ p.fname }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ p.mname }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ p.age_year }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ p.gender == 1 ? "MALE" : "FEMALE" }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ p.birthdate }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <div :class="{ 'group-invalid': flagChecker && !p.specimen }">
              <select
                v-model="p.specimen"
                class="form-select form-control form-control-sm"
              >
                <option value="">Please Select</option>
                <option v-for="(s, index) in specimens" :value="s">
                  {{ s }}
                </option>
              </select>
            </div>
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <div
              :class="{
                'group-invalid': flagChecker && !p.datetime_collection,
              }"
            >
              <input
                type="datetime-local"
                v-model="p.datetime_collection"
                class="form-control form-control-sm custom-font"
              />
            </div>
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            {{ diseaseType(p.type) }}
          </td>
          <td class="text-center align-middle fw-bold p-1 m-0">
            <a href="javascript:void(0);" @click="removePatient(p)">
              <i
                class="fa fa-times-circle scale-icon text-danger"
                aria-hidden="true"
                style="transition: all 300ms ease"
                v-tooltip.right="{
                  value: `<h6 class='text-white'>Remove Patient</h6>`,
                  escape: true,
                  class: 'bg-dark rounded p-1',
                }"
              ></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "LinelistData",
  props: {
    formHeader: Object,
    patients: Array,
    specimens: Array,
    flagChecker: Boolean,
  },
  setup(props, { emit }) {
    const removePatient = (p) => {
      emit("remove-patient", p);
    };

    const diseaseType = (type) => {
      let patientType = "";
      if (type == 1) {
        patientType = "Rota Virus";
      } else if (type == 2) {
        patientType = "Meningitis-Encephalitis";
      } else if (type == 3) {
        patientType = "Measles-Rubella";
      } else {
        patientType = "Unknown Type";
      }

      return patientType;
    };

    return { removePatient, diseaseType };
  },
});
</script>

<style scoped></style>
