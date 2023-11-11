<template>
     <div class="group-style border mt-2 mb-2" v-if="$slots.formInput">
     <div class="legend"><p>{{ title }}</p></div>
        <div class="row">
            <slot name="formInput" :personObject="person">
                <h2>404 Please Add Input-Forms Here</h2>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'SearchCard',
    props: {
        title: String
    },
    setup (props) {

        const person = ref({
            name: 'John Doe',
            age: 50,
            address: 'CA, USA'
        })

        return { person }
    }
})
</script>

<style scoped>
.legend {
  position: absolute;
  margin: 0;
  padding: 1px 10px;
  top: -14px;
  left: 10px;
  background: white;
  border: 1px solid #5D87FF;
  border-radius: 3px;
  background-color: #5D87FF;
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
  border: 1px solid #5D87FF !important;

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
</style>
