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
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import jsPDF from "jspdf";
import "jspdf-autotable";
import csvtojson from "csvtojson";

export default defineComponent({
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

    return {
      generatePDF,
      tableData,

      csvData,
      jsonArray,
      handleFileUpload,
      convertCsvToJson,
    };
  },
});
</script>

<style scoped></style>
