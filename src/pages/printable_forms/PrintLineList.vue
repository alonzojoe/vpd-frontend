<template>
  <div>
    <h2>TEST LINELIST JSPDF</h2>
    <button @click="generatePDF">Generate PDF</button>
    <!-- <pre>{{ tableData }}</pre> -->

    <h5>CSV to JSON</h5>
    <input type="file" @change="handleFileUpload" />
    <button @click="convertCsvToJson">Convert to JSON</button>
    <pre>{{ jsonArray }}</pre>
    <table></table>
    <h5></h5>
  </div>

  <div class="row">
    <div class="col-12">
      <div class="card w-100">
        <div class="card-body">
          <div class="mb-2">
            <h5 class="mb-0">Scrollspy with nested nav</h5>
          </div>
          <p class="mb-3 card-subtitle">
            Scrollspy also works with nested .navs. If a nested .nav is .active,
            its parents will also be .active. Scroll the area next to the navbar
            and watch the active class change.
          </p>
          <div class="row">
            <div class="col-4">
              <nav id="navbar-example3" class="navbar navbar-light">
                <a class="navbar-brand ps-3" href="#">
                  <img
                    src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/logos/favicon.ico"
                  />
                </a>
                <nav class="nav nav-pills flex-column">
                  <a class="nav-link" href="#item-1">Item 1</a>
                  <nav class="nav nav-pills flex-column">
                    <a class="nav-link ms-3 my-1" href="#item-1-1">Item 1-1</a>
                    <a class="nav-link ms-3 my-1" href="#item-1-2">Item 1-2</a>
                  </nav>
                  <a class="nav-link" href="#item-2">Item 2</a>
                  <a class="nav-link" href="#item-3">Item 3</a>
                  <nav class="nav nav-pills flex-column">
                    <a class="nav-link ms-3 my-1" href="#item-3-1">Item 3-1</a>
                    <a class="nav-link ms-3 my-1" href="#item-3-2">Item 3-2</a>
                  </nav>
                </nav>
              </nav>
            </div>
            <div class="col-8">
              <div
                class="position-relative mt-3 p-3 border overflow-auto"
                style="height: 300px"
                data-bs-spy="scroll"
                data-bs-target="#navbar-example3"
                data-bs-offset="0"
                tabindex="0"
              >
                <h4 id="item-1">Item 1</h4>
                <p>
                  farm-to-table bicycle rights whatever. Anim keffiyeh carles
                  cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon
                  irure. Cosby sweater lomo jean shorts, williamsburg hoodie
                  minim qui you probably haven't heard of them et cardigan trust
                  fund culpa biodiesel wes anderson aesthetic. Nihil tattooed
                  accusamus, cred irony biodiesel keffiyeh artisan ullamco
                  consequat.
                </p>

                <h5 id="item-1-1">Item 1-1</h5>
                <p>
                  Veniam marfa mustache skateboard, adipisicing fugiat velit
                  pitchfork beard. Freegan beard aliqua cupidatat mcsweeney's
                  vero. Cupidatat four loko nisi, ea helvetica nulla carles.
                  Tattooed cosby sweater food truck, mcsweeney's quis non
                  freegan vinyl. Lo-fi wes anderson +1 sartorial. Carles non
                  aesthetic exercitation quis gentrify. Brooklyn adipisicing
                  craft beer vice keytar deserunt.
                </p>

                <h5 id="item-1-2">Item 1-1</h5>
                <p>
                  Occaecat commodo aliqua delectus. Fap craft beer deserunt
                  skateboard ea. Lomo bicycle rights adipisicing banh mi, velit
                  ea sunt next level locavore single-origin coffee in magna
                  veniam. High life id vinyl, echo park consequat quis aliquip
                  banh mi pitchfork. Vero VHS est adipisicing. Consectetur nisi
                  DIY minim messenger bag. Cred ex in, sustainable delectus
                  consectetur fanny pack iphone.
                </p>

                <h4 id="item-2">Item 2</h4>
                <p>
                  In incididunt echo park, officia deserunt mcsweeney's proident
                  master cleanse thundercats sapiente veniam. Excepteur VHS
                  elit, proident shoreditch +1 biodiesel laborum craft beer.
                  Single-origin coffee wayfarers irure four loko, cupidatat
                  terry richardson master cleanse. Assumenda you probably
                  haven't heard of them art party fanny pack, tattooed nulla
                  cardigan tempor ad. Proident wolf nesciunt sartorial keffiyeh
                  eu banh mi sustainable. Elit wolf voluptate, lo-fi ea portland
                  before they sold out four loko. Locavore enim nostrud mlkshk
                  brooklyn nesciunt.
                </p>

                <h4 id="item-3">Item 3</h4>
                <p>
                  Ad leggings keytar, brunch id art party dolor labore.
                  Pitchfork yr enim lo-fi before they sold out qui. Tumblr
                  farm-to-table bicycle rights whatever. Anim keffiyeh carles
                  cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon
                  irure. Cosby sweater lomo jean shorts, williamsburg hoodie
                  minim qui you probably haven't heard of them et cardigan trust
                  fund culpa biodiesel wes anderson aesthetic. Nihil tattooed
                  accusamus, cred irony biodiesel keffiyeh artisan ullamco
                  consequat.
                </p>

                <h5 id="item-3-1">Item 3-1</h5>
                <p>
                  Ad leggings keytar, brunch id art party dolor labore.
                  Pitchfork yr enim lo-fi before they sold out qui. Tumblr
                  farm-to-table bicycle rights whatever. Anim keffiyeh carles
                  cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon
                  irure. Cosby sweater lomo jean shorts, williamsburg hoodie
                  minim qui you probably haven't heard of them et cardigan trust
                  fund culpa biodiesel wes anderson aesthetic. Nihil tattooed
                  accusamus, cred irony biodiesel keffiyeh artisan ullamco
                  consequat.
                </p>

                <h5 id="item-3-2">Item 3-2</h5>
                <p>
                  Ad leggings keytar, brunch id art party dolor labore.
                  Pitchfork yr enim lo-fi before they sold out qui. Tumblr
                  farm-to-table bicycle rights whatever. Anim keffiyeh carles
                  cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon
                  irure. Cosby sweater lomo jean shorts, williamsburg hoodie
                  minim qui you probably haven't heard of them et cardigan trust
                  fund culpa biodiesel wes anderson aesthetic. Nihil tattooed
                  accusamus, cred irony biodiesel keffiyeh artisan ullamco
                  consequat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Knob v-model="valueAdded" />
  <Timeline :value="events">
    <template #content="slotProps">
      {{ slotProps.item.status }}
    </template>
  </Timeline>
  <div class="card dock-demo">
    <div class="flex flex-wrap gap-3 mb-5">
      <div
        v-for="pos of positions"
        :key="pos.label"
        class="flex align-items-center"
      >
        <RadioButton
          v-model="position"
          :value="pos.value"
          :inputId="pos.label"
          name="dock"
        />
        <label :for="pos.label" class="ml-2"> {{ pos.label }} </label>
      </div>
    </div>
    <div
      class="dock-window"
      style="
        backgroundimage: 'url(https://primefaces.org/cdn/primevue/images/dock/window.jpg))';
      "
    >
      <Dock :model="items" :position="position">
        <template #icon="{ item }">
          <img :alt="item.label" :src="item.icon" style="width: 100%" />
        </template>
      </Dock>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import jsPDF from "jspdf";
import "jspdf-autotable";
import csvtojson from "csvtojson";
import Knob from "primevue/knob";
import Timeline from "primevue/timeline";
import Dock from "primevue/dock";
export default defineComponent({
  components: {
    Knob,
    Timeline,
    Dock,
  },
  setup() {
    const tableData = ref([
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
      {
        no: 1,
        accessionNo: "ACC001",
        name: "Sample 1",
        biologicalMaterial: "Tissue",
        storedBy: "John Doe",
        remarks: "First sample",
      },
      {
        no: 2,
        accessionNo: "ACC002",
        name: "Sample 2",
        biologicalMaterial: "Blood",
        storedBy: "Jane Doe",
        remarks: "Second sample",
      },
      {
        no: 3,
        accessionNo: "ACC003",
        name: "Sample 3",
        biologicalMaterial: "Cells",
        storedBy: "Bob Smith",
        remarks: "Third sample",
      },
      {
        no: 4,
        accessionNo: "ACC004",
        name: "Sample 4",
        biologicalMaterial: "DNA",
        storedBy: "Alice Johnson",
        remarks: "Fourth sample",
      },
      {
        no: 5,
        accessionNo: "ACC005",
        name: "Sample 5",
        biologicalMaterial: "Tissue",
        storedBy: "Eve Brown",
        remarks: "Fifth sample",
      },
      {
        no: 6,
        accessionNo: "ACC006",
        name: "Sample 6",
        biologicalMaterial: "Blood",
        storedBy: "Charlie White",
        remarks: "Sixth sample",
      },
      {
        no: 7,
        accessionNo: "ACC007",
        name: "Sample 7",
        biologicalMaterial: "Cells",
        storedBy: "David Black",
        remarks: "Seventh sample",
      },
      {
        no: 8,
        accessionNo: "ACC008",
        name: "Sample 8",
        biologicalMaterial: "DNA",
        storedBy: "Frank Red",
        remarks: "Eighth sample",
      },
      {
        no: 9,
        accessionNo: "ACC009",
        name: "Sample 9",
        biologicalMaterial: "Tissue",
        storedBy: "Grace Green",
        remarks: "Ninth sample",
      },
      {
        no: 10,
        accessionNo: "ACC010",
        name: "Sample 10",
        biologicalMaterial: "Blood",
        storedBy: "Harry Blue",
        remarks: "Tenth sample",
      },
      // ... Repeat similar structures for 90 more items
      {
        no: 100,
        accessionNo: "ACC100",
        name: "Sample 100",
        biologicalMaterial: "Cells",
        storedBy: "Alice Smith",
        remarks: "One hundredth sample",
      },
    ]);

    const generatePDF2 = () => {
      const doc = new jsPDF();
      doc.setProperties({
        title: `Line List November 15, 2023`,
      });

      const tableColumn = [
        "no",
        "accessionNo",
        "name",
        "biologicalMaterial",
        "storedBy",
        "remarks",
      ];
      let tableRows = []; // Change from const to let

      // Add table rows
      tableData.value.forEach((dataRow) => {
        const rowData = Object.values(dataRow);
        tableRows.push(rowData);
      });

      // Function to add page count to the footer
      const addPageCount = () => {
        const pageCount = doc.internal.getNumberOfPages(); // Use getNumberOfPages to get the correct page count
        doc.setFontSize(7);
        doc.text(
          `Page ${pageCount}`,
          doc.internal.pageSize.width - 10,
          doc.internal.pageSize.height - 10
        );
      };

      let totalPages = 0; // Variable to store the total number of pages

      // Set up a page event to add the page count to the footer on each page
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        theme: "grid",
        didDrawPage: () => {
          addPageCount();

          // Left Logo
          doc.addImage("./image/doh.png", "PNG", 10, 10, logoWidth, logoHeight);

          // Right Logo
          const rightLogoX = doc.internal.pageSize.width - logoWidth - 10;
          doc.addImage(
            "./image/doh.png",
            "PNG",
            rightLogoX,
            10,
            logoWidth,
            logoHeight
          );

          // Title
          doc.setFontSize(16);
          doc.setTextColor("#5D87FF");
          doc.setFontStyle("bold");
          doc.text(
            "Your Custom Header Text",
            doc.internal.pageSize.width / 2,
            20,
            { align: "center" }
          );
        },
        styles: { fontSize: 8 },
        headStyles: { fillColor: "#5D87FF" }, // Change header color
      });

      // Increment total pages for the initial page
      totalPages++;

      // Add logos and other content to the header
      const logoWidth = 30;
      const logoHeight = 30;
      const leftLogoX = 10;
      const rightLogoX = doc.internal.pageSize.width - logoWidth - 10;

      //   doc.addImage(
      //     "path/to/left-logo.png",
      //     "PNG",
      //     leftLogoX,
      //     10,
      //     logoWidth,
      //     logoHeight
      //   );
      //   doc.addImage(
      //     "path/to/right-logo.png",
      //     "PNG",
      //     rightLogoX,
      //     10,
      //     logoWidth,
      //     logoHeight
      //   );

      // Save the PDF with a specific name
      //   doc.save("table.pdf");
      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      console.log(pdfUrl);
      window.open(`/pdf-viewer?pdfUrl=${encodeURIComponent(pdfUrl)}`, "_blank");
    };
    const generatePDF = () => {
      const doc = new jsPDF();
      doc.setProperties({
        title: `Line List November 15, 2023`,
      });

      const tableColumn = [
        "no",
        "accessionNo",
        "name",
        "biologicalMaterial",
        "storedBy",
        "remarks",
      ];
      let tableRows = [];

      // Add table rows
      tableData.value.forEach((dataRow) => {
        const rowData = Object.values(dataRow);
        tableRows.push(rowData);
      });

      // Function to add page count to the footer
      const addPageCount = () => {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(7);
        doc.text(
          `Page ${pageCount}`,
          doc.internal.pageSize.width - 10,
          doc.internal.pageSize.height - 10
        );
      };

      let totalPages = 0;
      let startY = 40; // Initial startY value

      // Logo dimensions
      const logoWidth = 20;
      const logoHeight = 20;

      // Set up a page event to add the page count to the footer on each page
      // doc.autoTable({
      //   head: [tableColumn],
      //   body: tableRows,
      //   theme: "grid",
      //   startY: startY,
      //   didDrawPage: () => {
      //     addPageCount();

      //     // Left Logo
      //     doc.addImage(
      //       "src/pages/printable_forms/image/doh.png",
      //       "PNG",
      //       10,
      //       10,
      //       logoWidth,
      //       logoHeight
      //     );

      //     // Right Logo
      //     const rightLogoX = doc.internal.pageSize.width - logoWidth - 10;
      //     doc.addImage(
      //       "src/pages/printable_forms/image/jbl.png",
      //       "PNG",
      //       rightLogoX,
      //       10,
      //       logoWidth,
      //       logoHeight
      //     );

      //     // Title
      //     doc.setFontSize(12);
      //     doc.setTextColor("#00000");
      //     doc.setFont("bold");
      //     doc.text(
      //       "JOSE B. LINGAD MEMORIAL GENERAL HOSPITAL \n Dolores, City of San Fernando Pampanga \n Linelist Report \n From November 16, 2023 to November 17, 2023",
      //       doc.internal.pageSize.width / 2,
      //       20,
      //       { align: "center" }
      //     );

      //     // Adjust startY for the next page
      //     if (totalPages > 0) {
      //       startY = 10; // Adjust this value based on your desired margin between pages
      //     }
      //   },
      //   styles: { fontSize: 8 },
      //   headStyles: { fillColor: "#5D87FF" },
      //   didParseCell: (data) => {
      //     // Increase totalPages on each new page
      //     if (data.row.index === 0) {
      //       totalPages++;
      //     }
      //   },
      // });
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        theme: "grid",
        startY: startY,
        didDrawPage: () => {
          addPageCount();

          // Left Logo
          doc.addImage(
            "src/pages/printable_forms/image/doh.png",
            "PNG",
            10,
            10,
            logoWidth,
            logoHeight
          );

          // Right Logo
          const rightLogoX = doc.internal.pageSize.width - logoWidth - 10;
          doc.addImage(
            "src/pages/printable_forms/image/jbl.png",
            "PNG",
            rightLogoX,
            10,
            logoWidth,
            logoHeight
          );

          // Title
          const titleText =
            "JOSE B. LINGAD MEMORIAL GENERAL HOSPITAL \n Dolores, City of San Fernando Pampanga \n Linelist Report \n From November 16, 2023 to November 17, 2023";

          doc.setFontSize(12);
          doc.setTextColor("#00000");
          doc.setFont("bold");

          // Calculate the height of the multi-line text
          const titleTextHeight = doc.getTextDimensions(titleText).h;

          // Calculate the y-coordinate for centering the text vertically
          const centerY = 10 + Math.max(logoHeight, titleTextHeight) / 2;

          doc.text(titleText, doc.internal.pageSize.width / 2, centerY, {
            align: "center",
          });

          // Adjust startY for the next page
          if (totalPages > 0) {
            startY = 10; // Adjust this value based on your desired margin between pages
          }
        },
        styles: { fontSize: 8 },
        headStyles: { fillColor: "#5D87FF" },
        didParseCell: (data) => {
          // Increase totalPages on each new page
          if (data.row.index === 0) {
            totalPages++;
          }
        },
      });
      // Increment total pages for the initial page
      totalPages++;

      // Save the PDF with a specific name
      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      console.log(pdfUrl);
      window.open(`/pdf-viewer?pdfUrl=${encodeURIComponent(pdfUrl)}`, "_blank");
    };

    onMounted(async () => {
      //   try {
      //     const response = await fetch("/json/test.json"); // Adjust the path accordingly
      //     if (response.ok) {
      //       tableData.value = await response.json();
      //     } else {
      //       console.error("Failed to fetch test data");
      //     }
      //   } catch (error) {
      //     console.error("Error fetching test data:", error);
      //   }
    });

    const csvData = ref(null);
    const jsonArray = ref([]);

    const handleFileUpload = (event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          csvData.value = e.target.result;
        };
        reader.readAsText(file);
      }
    };

    const convertCsvToJson = async () => {
      if (csvData.value) {
        try {
          const result = await csvtojson().fromString(csvData.value);
          jsonArray.value = result;
        } catch (error) {
          console.error("Error converting CSV to JSON:", error);
        }
      } else {
        console.warn("No CSV data to convert.");
      }
    };

    const valueAdded = ref(85);

    const events = ref([
      {
        status: "Ordered",
        date: "15/10/2020 10:30",
        icon: "pi pi-shopping-cart",
        color: "#9C27B0",
      },
      {
        status: "Processing",
        date: "15/10/2020 14:00",
        icon: "pi pi-cog",
        color: "#673AB7",
      },
      {
        status: "Shipped",
        date: "15/10/2020 16:15",
        icon: "pi pi-shopping-cart",
        color: "#FF9800",
      },
      {
        status: "Delivered",
        date: "16/10/2020 10:00",
        icon: "pi pi-check",
        color: "#607D8B",
      },
    ]);

    const items = ref([
      {
        label: "Finder",
        icon: "https://primefaces.org/cdn/primevue/images/dock/finder.svg",
      },
      {
        label: "App Store",
        icon: "https://primefaces.org/cdn/primevue/images/dock/appstore.svg",
      },
      {
        label: "Photos",
        icon: "https://primefaces.org/cdn/primevue/images/dock/photos.svg",
      },
      {
        label: "Trash",
        icon: "https://primefaces.org/cdn/primevue/images/dock/trash.png",
      },
    ]);
    const position = ref("bottom");
    const positions = ref([
      {
        label: "Bottom",
        value: "bottom",
      },
      {
        label: "Top",
        value: "top",
      },
      {
        label: "Left",
        value: "left",
      },
      {
        label: "Right",
        value: "right",
      },
    ]);

    return {
      generatePDF,
      tableData,

      csvData,
      jsonArray,
      handleFileUpload,
      convertCsvToJson,
      valueAdded,
      events,
      items,
      position,
      positions,
    };
  },
});
</script>

<style scoped>
.dock-demo > .dock-window {
  width: 100%;
  height: 450px;
  position: relative;
  background-image: url("https://primefaces.org/cdn/primevue/images/dock/window.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
}

.dock-demo > .p-dock {
  z-index: 1000;
}
</style>
