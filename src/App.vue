<script lang="ts">
import { defineComponent, ref, getCurrentInstance  } from 'vue'
import { useLoading } from '../src/pages/loader/loaderSettings'

export default defineComponent({
  name: 'App',

  setup() {

    const { loading } = useLoading()
  
    return { loading }

  }

})

</script>

<template>
  <Loading v-if="loading" />
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
