<template>
  {{ details }}
  <div class="row cst-paginator-parent">
    <button
      class="btn-sm-cst-hidden nav-link nav-icon-hover"
      @click="$emit('patient-list')"
      :disabled="selectedHeader == 1 ? 1 : 0"
      v-tooltip.top="{
        value: `<h6 class='text-white'>Back to Patient Profile List</h6>`,
        escape: true,
        class: 'bg-dark rounded p-1',
      }"
    >
      <i class="fa fa-users"></i>
    </button>
    <button
      class="btn-sm-cst-hidden"
      @click="switchTab(0)"
      :disabled="details.currentTab == 1"
    >
      <i
        class="fa"
        :class="details.currentTab == 1 ? 'fa-ban' : 'fa-arrow-left'"
      ></i>
    </button>
    <button class="pe-none btn-sm-cst-hidden">{{ details.title }}</button>
    <button
      class="btn-sm-cst-hidden"
      @click="switchTab(1)"
      :disabled="details.currentTab == details.maxTab"
    >
      <i
        class="fa"
        :class="
          details.currentTab == details.maxTab ? 'fa-ban' : 'fa-arrow-right'
        "
      ></i>
    </button>
    <button
      class="btn-sm-cst-hidden btn btn-success btn-sm px-4"
      @click="$emit('save-data')"
      id="saveData"
      :disabled="isDisabled"
      v-tooltip.top="{
        value: `<h6 class='text-white'>Save Patient Disease</h6>`,
        escape: true,
        class: 'bg-dark rounded p-1',
      }"
    >
      <i class="fa fa-save"></i>
    </button>
    <div class="col-sm-12 cst-hidden-sm">
      <div class="d-flex justify-content-end flex-column position-absolute">
        <button
          class="btn btn-secondary cst-paginator btn-caret"
          @click="switchTab(0)"
          @mouseover="toggleTitle(true)"
          @mouseout="toggleTitle(false)"
          :disabled="details.currentTab == 1"
        >
          <i class="fa fa-arrow-left"></i>
        </button>
        <button
          class="btn btn-primary cst-paginator btn-caret"
          @click="switchTab(1)"
          @mouseover="toggleTitle(true)"
          @mouseout="toggleTitle(false)"
          :disabled="details.currentTab == details.maxTab"
        >
          <i class="fa fa-arrow-right"></i>
        </button>
        <!-- <h5 class="cst-paginator" v-if="isHover">Toast</h5> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    details: {
      type: Object,
      default: () => ({
        currentTab: 1,
        maxTab: 3,
        title: "",
      }),
    },
  },
  setup(props, { emit }) {
    const switchTab = (tab: number) => {
      emit("switch-tab", tab);
    };

    const isHover = ref(false);

    const currentTheme = ref(localStorage.getItem("app-theme"));

    const toggleTitle = (bool) => {
      isHover.value = bool;
    };

    return {
      switchTab,
      toggleTitle,
      isHover,
    };
  },
});
</script>

<style scoped>
.btn-caret:disabled {
  cursor: not-allowed;
  pointer-events: auto !important;
}

.cst-cb-address {
  display: block;
}

.cst-same-as-sm {
  display: none;
}

.cst-visible-sm-physician {
  display: none;
}

@media screen and (max-width: 980px) {
  .save-wrapper {
    display: flex;
    position: absolute;
    top: 5px;
    right: -10px;
  }
}

@media screen and (max-width: 991px) {
  .cst-head {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    width: 100%;
  }

  .save-wrapper {
    display: none;
  }

  .save-wrapper a {
    margin: 0 !important;
    margin-bottom: 5px !important;
  }

  #pi-content {
    margin: 0 7px !important;
    padding: 0 !important;
  }

  h5.cst-paginator {
    display: none;
  }

  .cst-paginator-parent {
    background: red;
    height: 60px;
    position: fixed;
    bottom: 0;
    right: 14px;
    width: 100%;
    z-index: 1;
    display: flex;
  }

  .cst-paginator-parent button {
    flex: 1;
    border: none;
    border-radius: 0;
    color: #7489ff;
    background: #ebf3fe;
    display: block;
  }

  .cst-paginator-parent button i.fa {
    font-size: 22px;
    color: #7489ff;
    position: relative;
  }

  .cst-hidden-sm {
    display: none;
  }

  .cst-navbar-menu {
    display: none !important;
  }

  .cst-margin-bottom {
    margin: 0;
    margin-top: 40px;
  }

  .cst-pat-info {
    padding-bottom: 0 !important;
    margin-bottom: 0 !important;
  }

  .cst-pat-info h5 {
    padding-bottom: 0 !important;
    margin-bottom: 10px !important;
  }

  .cst-body-parent {
    width: calc(100% - 85px) !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .cst-margin-sm {
    margin-bottom: 70px !important;
  }

  .cst-cb-address {
    display: none;
  }

  .cst-same-as-sm {
    display: block;
  }

  .cst-hidden-sm-physician {
    display: none;
  }

  .cst-visible-sm-physician {
    display: block;
  }
}

.cst-bg-suggest {
  background: rgba(0, 0, 0, 0.582);
  position: absolute;
  width: calc(100vw);
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.cst-bg-suggest .group-style {
  width: 100%;
  animation: animateSuggests 0.2s linear 2 forwards;
  border: 2px solid #ccc !important;
  font-size: 1.05rem;
}

@keyframes animateSuggests {
  0% {
    transform: rotateZ(4deg);
    /* transform: rotateZ(0deg); */
  }

  50% {
    transform: rotateZ(-3deg);
  }
  100% {
    transform: rotateZ(0deg);
    /* transform: rotateZ(360deg); */
  }
}

html {
  scroll-behavior: smooth;
}

.wrapper {
  min-height: 100vh;
  background: white;
}

.content {
  position: relative;
  top: 10;
  left: 0;
  width: 100%;
  padding: 20px 30px;
}

.group-style {
  margin-bottom: 20px;
  padding: 40px 20px;
  position: relative;
  border-radius: 7px;
  /* border: 1px solid #a9abb9 !important; */
  border: 1px solid #0d6efd !important;

  background: rgb(249, 249, 252);
}

.group-style-2 {
  margin-bottom: 20px;
  padding: 30px 20px 0px 20px;
  position: relative;
  border-radius: 7px;
  border: 1px solid #a9abb9 !important;
  background: rgb(249, 249, 252);
}

.group-style-3 {
  margin-bottom: 20px;
  padding: 30px 20px;
  position: relative;
  border-radius: 7px;
  border: 1px solid #a9abb9 !important;
  background: rgb(249, 249, 252);
}

.form-group p {
  color: rgb(105, 105, 105);
}

.legend {
  position: absolute;
  margin: 0;
  padding: 0 10px;
  top: -14px;
  left: 5px;
  background: white;
  border: 1px solid #0d6efd;
  border-radius: 3px;
  background-color: #0d6efd;
  /* border: 2px solid blue; */
}

.legend p {
  font-weight: bolder;
  margin: 0;
  padding: 0;
  font-size: 15px;
  /* color: #3A3F5C; */
  color: white;
}

.sub-header {
  border-bottom: 1px solid rgb(228, 228, 228);
}

.sub-header p {
  font-weight: 600;
  margin: 0;
  padding: 0;
}

.fc-btn {
  background: #3848a8;
  color: white;
  border: none;
  padding: 5px 15px;
}

.tbl-wrapper {
  /* border: 5px solid blue; */

  overflow-x: auto;
}

.cst-navbar a {
  color: rgb(105, 105, 105);
}

.cst-navbar {
  border: none;
  flex-wrap: wrap;
}

.cst-sep {
  color: #ccc;
  margin: 0 10px;
}

.cst-head {
  color: #3a3f5c;
  position: relative;
  padding: 0 20px;
  /* border: 3px solid #454a66; */
}

.cst-head .line-1 {
  height: 2px;
  width: 20vw;
  background: linear-gradient(to right, white, #ccc, #3a3f5c);
  position: absolute;
  left: calc(-20vw - 3px);
  top: 17px;
}

.cst-head .line-2 {
  height: 2px;
  width: 20vw;
  background: linear-gradient(to left, white, #ccc, #3a3f5c);
  position: absolute;
  right: calc(-20vw - 3px);
  bottom: 17px;
}

:required {
  background: rgb(252, 253, 238);
}

.cst-head-parent {
  padding-top: 20px;
  position: fixed;
  z-index: 1000;
  width: calc(100vw - 95px);
  background: #3a3f5c;
  top: 0;
}

.cst-margin-bottom {
  margin-bottom: 130px;
}

.save-btn {
  width: 2px;
  overflow: hidden;
}

.cst-active {
  font-weight: 700;
  color: #3a3f5c;
  border-bottom: 2px solid #3a3f5c;
}

.cst-active:hover {
  font-weight: 700;
  color: #3a3f5c;
  border-bottom: 2px solid #3a3f5c;
}

.cst-form-flex {
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.cst-form-flex select,
.cst-form-flex input {
  outline: none;
  border: none;
}

.cst-form-flex select {
  flex: 70%;
}

.cst-form-flex input.cst-select {
  flex: 70%;
}

.cst-form-flex input {
  flex: 30%;
  border-left: 1px solid #ccc;
}

:disabled {
  cursor: not-allowed;
}

.tby-tbl tr td:nth-child(2),
.tby-tbl td:nth-child(3),
.tby-tbl td:nth-child(4),
.tby-tbl td:nth-child(5) {
  background: rgb(255, 255, 245);
}

.tby-tbl tr td:nth-of-type(1) {
  color: #3a3f5c;
  min-width: 20vw;
  max-width: 20vw;
}

.tby-tbl .rem-radius,
.tby-tbl-index .rem-radius {
  border-radius: none;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  box-shadow: none;
  background: rgb(255, 255, 245);
  color: #3a3f5c;
  text-align: center;
  font-weight: bold;
}

.tby-tbl,
.tby-tbl-index {
  border: 1px solid rgb(150, 150, 150);
}

.other-spec {
  padding: 0;
  padding-left: 5px;
  margin: 0;
  width: 40%;
  border: 1px solid #ccc;
  outline: none;
}

.other-spec:focus {
  border: 1px solid #ccc;
}

.sip {
  color: #3848a8;
}

.cst-tbl-head h5 {
  padding: 0;
  margin: 0;
  color: #3a3f5c;
  font-weight: 700;
  font-size: 1.1em;
}

.fc-tbl {
  background: #3a3f5c;
  color: white;
}

.fc-tbl .cst-th {
  overflow: hidden;
  position: relative;
  border-left: none;
}

.cst-tbl-head {
  position: absolute;
  left: -1px;
  top: 16px;
  border: 1px solid white;
  background: white;
  padding: 0 10px;
  overflow: hidden;
  width: 90%;
  max-width: 400px;
  /* border-right:5px solid rgb(174, 210, 235); */
  /* padding: 0 10vh 0 10px; */
  /* box-shadow: 4px 4px 0 #a4aad4; */
}

.assessment-findings tr td textarea {
  min-height: 150px;
  max-height: 150px;
  outline: none;
  border: none;
}

.save-wrapper {
  border: 1px solid #ccc;
  height: fit-content;
  margin: 0;
  border-radius: 5px;
  background: rgb(255, 255, 245);
  padding: 5px;
  cursor: pointer;
  margin-right: 15px;
  transition: all 0.6s ease-in;
  z-index: 1002;
}

.save-wrapper i {
  font-size: 27px;
  padding: 0;
  margin: 0;
  color: white;
}

@media screen and (max-width: 516px) {
  .cst-tbl-head {
    left: 0px;
    top: 15px;
  }

  .cst-tbl-head h5 {
    font-size: 1em;
  }

  .assessment-findings tr td textarea {
    min-height: 250px;
    max-height: 250px;
  }

  .save-wrapper {
    bottom: -63px;
  }
}

.tby-tbl tr {
  transition: all 0.6s ease-in;
}

.tby-tbl tr:hover {
  background: rgb(199, 240, 224);
}

.tby-tbl tr:hover td:nth-of-type(1) {
  color: #3a3f5c;
}

.tby-tbl-index tr td {
  padding: 5px 7px;
}

.tby-tbl-index tr {
  cursor: pointer;
  transition: all 0.6s ease-in;
}

.tby-tbl-index tr:hover {
  background: rgb(218, 245, 235);
}

.show-error {
  background: rgb(194, 60, 60) !important;
}

.show-error td:nth-of-type(1) {
  color: rgb(255, 255, 255) !important;
}

.show-error:hover {
  background: rgb(194, 60, 60) !important;
}

.show-error:hover td:nth-of-type(1) {
  color: rgb(255, 255, 255) !important;
}

.show-error td:nth-of-type(1)::after {
  content: "  (required)";
}

.swal2-container {
  z-index: 100000 !important;
}

.cst-paginator {
  font-size: 22px;
  max-width: fit-content;
  margin-bottom: 10px;

  border-radius: 50px;
  position: fixed;
  right: 14px;
  z-index: 10000;
  bottom: 45%;
  padding: 10px 18px;
  /* padding-right:15px;
    padding-left:10px; */
}

.btn-sm-cst-hidden {
  display: none;
}

.cst-paginator:nth-of-type(2) {
  bottom: calc(45% - 65px);
}

h5.cst-paginator {
  color: rgb(71, 71, 162);
  right: 90px;
  bottom: calc(45% - 40px);
  background: rgb(255, 255, 255);
  border-radius: 5px;
  z-index: 9000;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.197);
  font-size: 20px;
  padding: 5px 25px;
  opacity: 0;
  animation: animateInfo 0.4s ease-in forwards;
}

@keyframes animateInfo {
  100% {
    opacity: 1;
  }
}

.cst-cb-address {
  top: -13px;
  right: 35px;
  padding: 0px 6px;
  background: white;
  color: black;
}

.invalid-input input,
.invalid-input textarea,
.invalid-input select,
.invalid-input .ts-control {
  outline: none;
  border: 2px solid red;
  background: rgb(253, 237, 237);
  animation: animateError 0.3s ease-in forwards;
}

.invalid-input p,
.invalid-input label {
  color: red;
  font-weight: bold;
}

@keyframes animateError {
  0% {
    transform: translateX(-5px);
  }
  25% {
    transform: translateX(5px);
  }
  50% {
    transform: translateX(-3px);
  }
  75% {
    transform: translateX(7px);
  }
  100% {
    transform: translateX(0px);
  }
}
/* 
#saveData{
    animation: animateBtn 3s ease-in infinite;
}

@keyframes animateBtn{
    0%{
        transform: translateX(0px);
    }
    50%{
        transform: translateX(-90vw);
    }
    80%{
        transform: translateY(600px);
    }
    100%{
        transform: translateX(-30px);
    }
} */

.td-icons i {
  display: flex;
  flex-flow: column;
}

.td-icons i {
  padding-top: 10px;
  cursor: pointer;
  font-weight: bolder;
  font-size: 1.3rem;
}

.td-icons p {
  color: blue;
  text-decoration: underline !important;
  text-decoration-color: blue !important;
  font-size: 0.8rem;
}

.td-icons p:hover {
  cursor: pointer;
  opacity: 0.8;
  color: rgb(100, 100, 247);
}

.h-full {
  height: 100%;
}

table tbody tr {
  background: white;
}

table tbody tr:hover {
  background: white;
}

.bg-main-physician td:nth-of-type(1) {
  background: rgb(169, 218, 136);
  font-weight: bold;
  color: black;
}

.balance-checker {
  opacity: 0.1;
  animation: animateChecker 1s ease-in infinite !important;
}

@keyframes animateChecker {
  0% {
    opacity: 0.2;
    background-color: red;
  }
  50% {
    opacity: 1;
    background-color: blue;
  }
  100% {
    opacity: 0.2;
    background-color: yellow;
  }
}

#app {
  display: none;
}

.my-textarea textarea {
  font-size: 0.8rem !important;
  min-height: 100px;
  max-height: 120px;
}

.cst-form-flex select.cst-height-unit {
  width: fit-content;
  max-width: fit-content;
}

.cst-height input {
  border-radius: 3px 0 0 3px;
}

.cst-height input {
  border-radius: 0 !important;
}

.cst-height select {
  border-radius: 0 3px 3px 0 !important;
  border-left: 1px solid #ccc;
}

.cst-height input:nth-of-type(2) {
  border-right: 1px solid #ccc;
}

select {
  width: 100%;
  padding: 4px;
  border-radius: 4px;
  outline: none;
  border: 1px solid #ccc;
}
</style>
