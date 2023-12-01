<template>
  <div class="placeholder">&nbsp;</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    height: String,
    width: String,
    radius: String,
    bg: {
      type: String,
      default: "#d0d0d0",
    },
  },
  setup(props) {},
});
</script>

<style scoped>
@keyframes wave-bg {
  0% {
    background-color: v-bind(bg);
  }
  50% {
    background-color: #d0d0d0;
  }
  100% {
    background-color: v-bind(bg);
  }
}

@keyframes glow {
  50% {
    opacity: 0.2;
  }
}

.placeholder {
  height: v-bind(height);
  width: v-bind(width);
  border-radius: v-bind(radius);
  background-color: v-bind(bg);
  animation: glow 1300ms ease-in-out infinite;
}
</style>
