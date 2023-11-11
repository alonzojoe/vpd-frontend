<template>
  <div class="loading">
    <div class="switch-container pe-none">
      <input
        type="checkbox"
        v-model="isChecked"
        true-value="true"
        false-value="false"
        id="switch"
      />
      <label for="switch">
        <i class="fas fa-moon"></i>
        <i class="fas fa-sun"></i>

        <!-- <span class="ball"></span> -->
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeMount } from "vue";
export default defineComponent({
  name: "Loading",
  props: {
    checkType: Boolean,
  },
  setup(props) {
    const currentTheme = localStorage.getItem("app-theme");
    const isChecked = ref(currentTheme == "light-theme" ? true : false);

    onMounted(() => {
      console.log("page-break");
      setTimeout(() => {
        isChecked.value = props.checkType;
      }, 100);
    });

    return { isChecked };
  },
});
</script>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 999999;
}
label {
  display: flex;
  width: 150px;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px;
  background: #2a3447;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
}

label i {
  font-size: 40px;
}
label .fa-sun {
  color: gold;
  transition: 0.8s;
}
label .fa-moon {
  color: #fff;
  transition: 0.8s;
}
label .ball {
  display: none;
}
input:checked + label .fa-sun {
  transform: translateX(-60px);
}
input:checked + label .fa-moon {
  transform: translateX(60px);
}
label .fa-sun {
  opacity: 1;
}
input:checked + label .fa-sun {
  opacity: 0;
}
label .fa-moon {
  opacity: 0;
}
input:checked + label .fa-moon {
  opacity: 1;
}
label .ball {
  position: absolute;
  display: block;
  width: 44px;
  height: 44px;
  top: 8px;
  left: 10px;
  background: #fff;
  border-radius: 50%;
  transition: 0.8s;
}
input:checked + label .ball {
  transform: translateX(50px);
}
label .fa-moon {
  transform: translateX(70px);
}
input:checked + label .fa-moon {
  transform: translateX(0);
}
label {
  transition: 0.3s;
}
input:checked + label {
  background: #c0c0c0;
}
input:checked + label .ball {
  background: #2a3447;
}
input {
  display: none;
}
input:checked + label .fa-sun {
  transform: translateX(-60px) rotate(160deg);
}
label .fa-moon {
  transform: translateX(60px) rotate(250deg);
}
input:checked + label .fa-moon {
  transform: translateX(0), rotate(0);
}
</style>
