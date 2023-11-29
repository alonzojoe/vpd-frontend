<template>
  <div class="group-style border mt-2 mb-2">
    <div class="legend">
      <p>{{ title }}</p>
    </div>
    <div class="row position-absolute cst-cb-address" v-if="withCbo.show">
      <div class="d-flex gap-2">
        <input
          type="checkbox"
          id="form-checkbox"
          true-value="true"
          false-value="false"
          v-model="withCbo.value"
        />
        <label for="form-checkbox" class="p-0 m-0"
          ><b> {{ withCbo.title }} </b></label
        >
      </div>
    </div>

    <slot name="formInput">
      <h2>404 Please Add Input-Forms Here</h2>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Form Card",
  props: {
    title: String,
    withCbo: {
      type: Object,
      default: () => {
        return {
          show: false,
          title: "",
          value: false,
        };
      },
    },
  },
  setup(props) {
    return {};
  },
});
</script>

<style scoped>
.legend {
  position: absolute;
  margin: 0;
  padding: 1px 10px;
  top: -14px;
  left: 10px;
  background: white;
  border: 1px solid #5d87ff;
  border-radius: 3px;
  background-color: #5d87ff;
  font-weight: 600;
  /* border: 2px solid blue; */

  /* old
  border: 1px solid #615dff;
  background-color: #615dff;*/
}

.group-style {
  padding: 30px 20px 20px 20px;
  position: relative;
  border-radius: 7px;
  border: 1px solid #5d87ff !important;

  /*border: 1px solid #615dff !important;*/
  /*background: rgb(249, 249, 252);*/
}

.legend p {
  color: #fff;
  font-size: 14px;
  margin-bottom: 0 !important;
}

.w-100 {
  width: 100% !important;
}

.custom-font {
  font-size: 16px;
}

.cst-cb-address {
  display: block;
}

.cst-cb-address {
  top: -13px;
  right: 35px;
  padding: 0px 6px;
  background: #fff;
  color: black;
}
</style>
