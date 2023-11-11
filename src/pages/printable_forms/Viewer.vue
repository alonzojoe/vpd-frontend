<template>
  <div class="frame-content">
    <iframe :src="pdfUrl" id="pdfIframe" class="viewer"></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const pdfUrl = computed(() => route.query.pdfUrl);

    const pdfIframe = document.getElementById("pdfIframe");

    window.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "p") {
        event.preventDefault();
        const pdfIframe = document.getElementById("pdfIframe");
        if (pdfIframe) {
          pdfIframe.contentWindow.print();
        }
      }
    });

    // onMounted(() => {
    //   pdfIframe.focus();
    //   pdfIframe.contentWindow.print();
    // });

    return { pdfUrl, route };
  },
});
</script>

<style scoped>
.viewer {
  height: 100%; /* Use 100vh to make it fullscreen in terms of viewport height */
  width: 100%; /* Use 100% to make it span the entire width */
  overflow: hidden !important;
  margin-bottom: 0;
}

.frame-content {
  height: 100vh;
  background: red !important;
}
</style>
