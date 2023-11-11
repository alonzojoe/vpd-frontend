<template>
    <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
      <div class="position-relative overflow-hidden min-vh-100 d-flex align-items-center justify-content-center">
        <div class="d-flex align-items-center justify-content-center w-100">
          <div class="row justify-content-center w-100">
            <div class="col-lg-4">
              <div class="text-center">
                <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/backgrounds/maintenance.svg" alt="" class="img-fluid" width="500">
                <h1 class="fw-semibold my-7 fs-9">401 - Unauthorized</h1>
                <h4 class="fw-semibold mb-7">You are not authorized to access this page.</h4>
                <router-link class="btn btn-primary" :to="{ name: 'dashboard' }" role="button">Go back to Home</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
  -webkit-text-size-adjust: 100%;
}
.fit-wide {
  position: relative;
  overflow: hidden;
  max-width: 1240px;
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 60px;
  padding-left: 20px;
  padding-right: 20px;
}
.background-wrap {
  position: relative;
}
.background-wrap.cloud-blue {
  background-color: #b0e0e9;
}
.background-wrap.white {
  background-color: #fff;
}
.title {
  position: relative;
  text-align: center;
  margin: 20px auto 10px;
}
.title--regular {
  font-family: "Roboto", Arial, sans-serif;
}
.title--size-large {
  font-size: 36px;
  line-height: 46px;
}
.title--size-semimedium {
  font-size: 20px;
  line-height: 28px;
}
.title--weight-normal {
  font-weight: 400;
}
.title--weight-bold {
  font-weight: 700;
}
.title--subtitle {
  padding-bottom: 40px;
  font-family: "Open Sans", Arial, sans-serif;
  text-align: center;
}
.error h1,
.error p {
  color: #226d7a;
}
.error--bg__cover {
  position: absolute;
  left: 0;
  right: 0;
  width: 90%;
  margin: 0 auto;
}
.error--shape__clouds svg {
  display: block;
}
.abstract-half-dot--circle {
  z-index: 0;
  position: absolute;
  left: 15em;
  right: 0;
  width: 300px;
  height: 300px;
  margin: 0 auto;
}
.icon-graphic {
  z-index: 1;
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
}
@media screen and (max-width: 767px) {
  .error--bg__cover {
    display: none;
  }
  .abstract-half-dot--circle {
    left: 0;
  }
}
</style>
