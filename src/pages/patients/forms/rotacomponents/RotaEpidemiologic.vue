<template>
  <form-card title="Epidemiologic Data">
    <template v-slot:formInput>
      <div>
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted && !validationStatus.more_diarrhea,
              }"
            >
              <Label class="mb-2"
                >Are there two or more diarrhea cases?
                <span class="text-danger">*</span></Label
              >
              <select
                class="form-select form-control form-control-sm"
                @change="validFn.changeMoreDia($event)"
                v-model="formRota.more_diarrhea"
                required
              >
                <option value="">PLEASE SELECT</option>
                <option value="Y">YES</option>
                <option value="N">NO</option>
                <option value="U">UNKNOWN</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
            <div
              class="search"
              :class="{
                'group-invalid':
                  saveSubmitted &&
                  !validationStatus.where_diarrhea &&
                  formRota.more_diarrhea == 'Y',
              }"
            >
              <Label class="mb-2"
                >If Yes, where?
                <span v-if="formRota.more_diarrhea == 'Y'" class="text-danger"
                  >*</span
                ></Label
              >
              <select
                class="form-select form-control form-control-sm"
                v-model="formRota.where_diarrhea"
                :disabled="formRota.more_diarrhea != 'Y'"
                :required="formRota.more_diarrhea == 'Y'"
              >
                <option value="">PLEASE SELECT</option>
                <option value="COM">COMMUNITY</option>
                <option value="SCH">SCHOOL</option>
                <option value="HOU">HOUSEHOLD</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </template>
  </form-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, inject, watch } from "vue";
import {
  swalConfirmation,
  swalMessage,
  trimZeroes,
  decryptData,
  NumericOnly,
} from "@/composables";
import FormCard from "@/components/cards/FormCard.vue";
import * as validFn from "../functions/rota";
import { useStore } from "vuex";
import moment from "moment";
export default defineComponent({
  name: "RotaEpidemiologic",
  props: {
    saveSubmitted: {
      type: Boolean,
    },
    validationStatus: {
      type: Object,
    },
  },
  components: {
    FormCard,
  },
  setup() {
    const store = useStore();
    const formDiseaseHistory = computed(() => store.getters.getDiseaseHistory);
    const formRota = computed(() => store.getters.getRota);
    const currentDate = moment(Date.now()).format("yyyy-MM-DD");
    return { NumericOnly, currentDate, formDiseaseHistory, formRota, validFn };
  },
});
</script>

<style scoped></style>
