<template>
  <form-card
    title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
  >
    <template v-slot:formInput="pObject">
      <div
        class="row"
        v-for="(r, outerIndex) in data.count"
        :key="outerIndex"
        :class="outerIndex == data.count - 1 ? 'mb-2' : ''"
      >
        <div
          class="col-sm-12 col-md-6 mb-2"
          :class="
            data.perRow === 2
              ? 'col-lg-6'
              : data.perRow === 3
              ? 'col-lg-4'
              : 'col-lg-3'
          "
          v-for="(i, innerIndex) in data.perRow"
          :key="innerIndex"
        >
          <div
            class="search"
            v-if="
              outerIndex == data.count - 1 &&
              data.withButtons == true &&
              innerIndex == data.perRow - 1
            "
          >
            <label for="" class="mb-1">&nbsp;</label>
            <div class="d-flex align-items-center gap-2">
              <skeleton-placeholder
                height="35px"
                width="22%"
                radius="5px"
                bg="#5D87FF"
              />
              <skeleton-placeholder
                height="35px"
                width="22%"
                radius="5px"
                bg="#FA896B"
              />
            </div>
          </div>
          <div class="search" v-else>
            <skeleton-placeholder class="mb-2" height="19px" width="40%" />
            <skeleton-placeholder height="33px" width="100%" radius="5px" />
          </div>
        </div>
      </div>
    </template>
  </form-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import FormCard from "@/components/cards/FormCard.vue";
import SkeletonPlaceholder from "./SkeletonPlaceholder.vue";

export default defineComponent({
  components: {
    FormCard,
    SkeletonPlaceholder,
  },
  props: {
    data: Object,
  },
  setup(props) {
    onMounted(() => {
      console.log("prop", props.data);
    });

    return {};
  },
});
</script>

<style scoped></style>
