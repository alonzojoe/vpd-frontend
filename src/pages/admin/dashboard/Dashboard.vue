<template>
  <div class="overflow-x-hidden py-3 mx-3">
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card bg-dark overflow-hidden">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-8">
                <h5 class="card-title mb-9 fw-semibold text-white">
                  Created Patient Profiles
                </h5>
                <h2 class="fw-semibold mb-3 fs-7 text-white">
                  {{ dashboard.profiles }}
                  <i class="ti ti-arrow-up text-success"></i>
                </h2>
                <div class="d-flex align-items-center mb-3">
                  <span
                    class="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center"
                  >
                    <i class="ti ti-arrow-up-left text-success"></i>
                  </span>
                  <p class="text-dark me-1 fs-3 mb-0 text-white">+100%</p>
                  <p class="fs-3 mb-0">last year</p>
                </div>
                <div class="d-flex align-items-center">
                  <div class="me-4">
                    <span
                      class="round-8 bg-primary rounded-circle me-2 d-inline-block"
                    ></span>
                    <span class="fs-2">as of {{ currentYear }}</span>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="d-flex justify-content-center">
                  <div id="breakup" style="min-height: 128.7px">
                    <div
                      class="bg-light-dark waves-effect waves-light text-success d-inline-block px-4 py-3 rounded"
                    >
                      <i class="ti ti-user display-4"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <div
          class="card border-start border-bottom border-secondary overflow-hidden"
        >
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-8">
                <h5 class="card-title mb-9 fw-semibold">Registered Users</h5>
                <h2 class="fw-semibold mb-3 fs-7">
                  {{ dashboard.users }}
                  <i class="ti ti-arrow-up text-secondary"></i>
                </h2>
                <div class="d-flex align-items-center mb-3">
                  <span
                    class="me-1 rounded-circle bg-light-secondary round-20 d-flex align-items-center justify-content-center"
                  >
                    <i class="ti ti-arrow-up-left text-secondary"></i>
                  </span>
                  <p class="text-dark me-1 fs-3 mb-0">+9%</p>
                  <p class="fs-3 mb-0">last year</p>
                </div>
                <div class="d-flex align-items-center">
                  <div class="me-4">
                    <span
                      class="round-8 bg-primary rounded-circle me-2 d-inline-block"
                    ></span>
                    <span class="fs-2">as of {{ currentYear }}</span>
                  </div>
                  <!-- <div>
                      <span class="round-8 bg-light-primary rounded-circle me-2 d-inline-block"></span>
                      <span class="fs-2">{{currentYear}}</span>
                    </div> -->
                </div>
              </div>
              <div class="col-4">
                <div class="d-flex justify-content-center">
                  <div id="breakup" style="min-height: 128.7px">
                    <div
                      class="bg-light-secondary text-secondary d-inline-block px-4 py-3 rounded"
                    >
                      <i class="ti ti-users display-4"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="card">
          <div
            class="card-body rounded border-start border-bottom border-danger overflow-hidden"
          >
            <div class="row align-items-center">
              <div class="col-3">
                <h5 class="card-title mb-9 fw-semibold">Total Roles</h5>
                <h2 class="fw-semibold mb-3 fs-7">
                  {{ dashboard.roles }}
                  <i class="ti ti-arrow-up text-success"></i>
                </h2>
                <div class="d-flex align-items-center mb-3">
                  <span
                    class="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center"
                  >
                    <i class="ti ti-arrow-up-left text-success"></i>
                  </span>
                  <p class="text-dark me-1 fs-3 mb-0">+5</p>
                </div>
                <div class="d-flex align-items-center">
                  <div class="me-4">
                    <span
                      class="round-8 bg-primary rounded-circle me-2 d-inline-block"
                    ></span>
                    <span class="fs-2">as of {{ currentYear }}</span>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row mt-4">
                  <div class="col-sm-12 col-md-6">
                    <div class="d-block mb-2">
                      <span
                        class="round-8 bg-success rounded-circle me-2 d-inline-block"
                      ></span>
                      <span class="fs-2">Administrator</span>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6">
                    <div class="d-block mb-2">
                      <span
                        class="round-8 bg-warning rounded-circle me-2 d-inline-block"
                      ></span>
                      <span class="fs-2">Medical Technologist</span>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6">
                    <div class="d-block mb-2">
                      <span
                        class="round-8 bg-primary rounded-circle me-2 d-inline-block"
                      ></span>
                      <span class="fs-2">Pathologist</span>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6">
                    <div class="d-block mb-2">
                      <span
                        class="round-8 bg-danger rounded-circle me-2 d-inline-block"
                      ></span>
                      <span class="fs-2">Nurse</span>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6">
                    <div class="d-block mb-2">
                      <span
                        class="round-8 bg-light-primary rounded-circle me-2 d-inline-block"
                      ></span>
                      <span class="fs-2">Regular</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="d-flex justify-content-end">
                  <div id="breakup" style="min-height: 128.7px">
                    <div
                      class="bg-light-danger text-danger d-inline-block px-4 py-3 rounded"
                    >
                      <i class="ti ti-settings-cog display-4"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 d-flex align-items-strech">
        <div class="card rounded border-top border-end border-primary w-100">
          <div class="card-body">
            <div
              class="d-sm-flex d-block align-items-center justify-content-between mb-9"
            >
              <div class="mb-3 mb-sm-0">
                <h5 class="card-title fw-semibold">Total Disease Summary</h5>
                <p class="card-subtitle mb-0">Graph Representation</p>
              </div>
              <div>
                <!-- <select class="form-select form-control form-control-sm">
                  <option value="1">March {{currentYear}}</option>
                  <option value="2">April {{currentYear}}</option>
                  <option value="3">May {{currentYear}}</option>
                  <option value="4">June {{currentYear}}</option>
                </select> -->
              </div>
            </div>
            <div class="row align-items-center">
              <div class="col-lg-8 col-md-8">
                <div
                  class="d-flex d-block align-items-center justify-content-center mb-9"
                >
                  <Chart
                    type="pie"
                    :data="chartData"
                    :options="chartOptions"
                    class="w-full md:w-30rem"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-4">
                <!-- <div class="d-flex align-items-center mb-4 pb-1">
                  <div class="p-8 bg-light-primary rounded-1 me-3 d-flex align-items-center justify-content-center">
                    <i class="ti ti-grid-dots text-primary fs-6"></i>
                  </div>
                  <div>
                    <h4 class="mb-0 fs-7 fw-semibold">$63,489.50</h4>
                    <p class="fs-3 mb-0">Total Earnings</p>
                  </div>
                </div> -->
                <div>
                  <div class="d-flex align-items-baseline mb-4">
                    <span class="round-8 bg-danger rounded-circle me-6"></span>
                    <div>
                      <p class="fs-3 mb-1">Measles-Rubella</p>
                      <h6 class="fs-5 fw-semibold mb-0">
                        {{ dashboard.measles_patients }}
                      </h6>
                    </div>
                  </div>
                  <div class="d-flex align-items-baseline mb-4">
                    <span class="round-8 bg-success rounded-circle me-6"></span>
                    <div>
                      <p class="fs-3 mb-1">Rota Virus</p>
                      <h6 class="fs-5 fw-semibold mb-0">
                        {{ dashboard.rota_patients }}
                      </h6>
                    </div>
                  </div>
                  <div class="d-flex align-items-baseline mb-4 pb-1">
                    <span class="round-8 bg-warning rounded-circle me-6"></span>
                    <div>
                      <p class="fs-3 mb-1">Meningitis-Encephalitis</p>
                      <h6 class="fs-5 fw-semibold mb-0">
                        {{ dashboard.meningitis_patients }}
                      </h6>
                    </div>
                  </div>
                  <div>
                    <button class="btn btn-primary w-100">
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="row">
          <div class="col-lg-12 col-md-6 col-sm-12">
            <div class="card overflow-hidden">
              <div
                class="card-body border-start border-top border-warning rounded"
              >
                <div class="row align-items-center">
                  <div class="col-8">
                    <h5 class="card-title mb-9 fw-semibold">Total Disease</h5>
                    <h2 class="fw-semibold mb-3 fs-7">
                      3 <i class="ti ti-arrow-up text-success"></i>
                    </h2>
                    <div class="d-flex align-items-center gap-4">
                      <div>
                        <span
                          class="round-8 bg-danger rounded-circle me-2 d-inline-block"
                        ></span>
                        <span class="fs-2">Measles-Rubella</span>
                      </div>
                      <div>
                        <span
                          class="round-8 bg-success rounded-circle me-2 d-inline-block"
                        ></span>
                        <span class="fs-2">Rota Virus</span>
                      </div>
                      <div>
                        <span
                          class="round-8 bg-warning rounded-circle me-2 d-inline-block"
                        ></span>
                        <span class="fs-2">Meningitis-Encephalitis</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="d-flex justify-content-center">
                      <div id="breakup" style="min-height: 128.7px">
                        <div
                          class="bg-light-warning text-warning d-inline-block px-4 py-3 rounded"
                        >
                          <i class="ti ti-virus display-4"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12 col-md-6 col-sm-12">
            <div class="card">
              <div
                class="card-body rounded border-start border-top border-success"
              >
                <div class="row align-items-center">
                  <div class="col-8">
                    <h5 class="card-title mb-9 fw-semibold">Reports</h5>
                    <h2 class="fw-semibold mb-3 fs-7">
                      0 <i class="ti ti-arrow-down text-success"></i>
                    </h2>
                    <div class="d-flex align-items-center mb-3">
                      <span
                        class="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center"
                      >
                        <i class="ti ti-arrow-down-left text-success"></i>
                      </span>
                      <p class="text-dark me-1 fs-3 mb-0">0</p>
                    </div>
                    <div class="d-flex align-items-center gap-4">
                      <div>
                        <span
                          class="round-8 bg-info rounded-circle me-2 d-inline-block"
                        ></span>
                        <span class="fs-2">as of {{ currentYear }}</span>
                      </div>
                      <!-- <div>
                        <span class="round-8 bg-info rounded-circle me-2 d-inline-block"></span>
                        <span class="fs-2">Medical Technologist</span>
                      </div> -->
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="d-flex justify-content-center">
                      <div id="breakup" style="min-height: 128.7px">
                        <div
                          class="bg-light-success text-success d-inline-block px-4 py-3 rounded"
                        >
                          <i class="ti ti-file-analytics display-4"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, defineComponent } from "vue";
import Chart from "primevue/chart";
import { useStore } from "vuex";
import moment from "moment";

export default defineComponent({
  components: {
    Chart,
  },

  setup() {
    const store = useStore();
    const currentYear = moment(Date.now()).format("YYYY");
    const chartData = ref();
    const chartOptions = ref();

    const setChartData = () => {
      const documentStyle = getComputedStyle(document.body);

      return {
        labels: ["Measles-Rubella", "Rota Virus", "Meningitis-Encephalitis"],
        datasets: [
          {
            data: [
              dashboard.value.measles_patients,
              dashboard.value.rota_patients,
              dashboard.value.meningitis_patients,
            ],
            backgroundColor: [
              documentStyle.getPropertyValue("--red-400"),
              documentStyle.getPropertyValue("--green-400"),
              documentStyle.getPropertyValue("--yellow-400"),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue("--red-400"),
              documentStyle.getPropertyValue("--green-400"),
              documentStyle.getPropertyValue("--yellow-400"),
            ],
          },
        ],
      };
    };

    const setChartOptions = () => {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--text-color");

      return {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor,
            },
          },
        },
      };
    };

    const dashboard = computed(() => store.getters.getDashboardCounts);

    const fetchDashboardItems = async () => {
      await store.dispatch("fetchDashboard");
    };

    onMounted(async () => {
      fetchDashboardItems();
      chartData.value = setChartData();
    });

    return {
      chartData,
      chartOptions,
      dashboard,
      currentYear,
    };
  },
});
</script>

<style scoped></style>
