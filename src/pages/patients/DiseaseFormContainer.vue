<template>
  <div class="position-relative">
    <component :is="formComponent" v-bind="$attrs"></component>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import Rota from "./forms/Rota.vue";
import Meningitis from "./forms/Meningitis.vue";
import Measles from "./forms/Measles.vue";
import NotFound from "@/pages/404-pages/NotFound.vue";

export default {
  props: {
    type: String,
    patient: String,
  },
  components: {
    Rota,
    Meningitis,
    Measles,
    NotFound,
  },
  setup(props) {
    const formComponent = computed(() => {
      if (props.type === "rota") {
        return Rota;
      } else if (props.type === "meningitis") {
        return Meningitis;
      } else if (props.type === "measles") {
        return Measles;
      }

      return NotFound;
    });

    return {
      formComponent,
    };
  },
};
</script>

<style scoped></style>
