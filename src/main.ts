import { createApp, ref } from 'vue'

import './assets/css/style.min.css'

import './assets/libs/bootstrap-table/dist/bootstrap-table.min.css'

import './assets/libs/jquery/dist/jquery.min.js'
import './assets/libs/simplebar/dist/simplebar.min.js'
import './assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js'


import './assets/js/app.min.js'
import './assets/js/app.minisidebar.init.js'
import './assets/js/app-style-switcher.js'
import './assets/js/sidebarmenu.js'

// import './assets/js/custom.js'
// import './assets/libs/owl.carousel/dist/owl.carousel.min.js'
// import './assets/libs/apexcharts/dist/apexcharts.min.js'
import './assets/js/dashboard.js'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.js'

import 'sweetalert2/dist/sweetalert2.min.css'
import './assets/css/tabler-icons.css'
import './assets/css/custom-style.css'


import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css"; //core CSS
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";

import App from './App.vue'
import store from './store'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import Loading from './pages/loader/Loader.vue'
import PrimeVue from "primevue/config";
import ToolTip from 'primevue/tooltip'
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import VueApexCharts from "vue3-apexcharts";
import Bootstrap_PT from "./passthrough/bootstrap";

const loading = ref(false)

const app = createApp(App)
app.component('apexchart ', VueApexCharts)
app.component('Loading', Loading)
app.component('Toast', Toast);
app.directive('tooltip', ToolTip)
// app.component('Skeleton', Skeleton)
app.config.globalProperties.$loading = loading;
app.use(VueApexCharts);
app.use(PrimeVue, { unstyled: false, pt: Bootstrap_PT });
app.use(ToastService);
app.use(VueSweetalert2);
app.use(store)
app.use(router)
app.mount('#app')

export { app }
