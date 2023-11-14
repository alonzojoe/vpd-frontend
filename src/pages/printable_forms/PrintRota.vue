<template>
  <div class="parent-print">
    <!-- <button @click="generatePDF" style="z-index:9999">Generate PDF</button> -->
    <div ref="pdfContent" class="pdf-content">
      <img
        src="./image/rota-updated.jpg"
        alt="Background Image"
        class="background-img"
      />
      <div class="content-pdf" v-if="patient">
        <div class="dru-name all-labels">
          <p>JOSE B. LINGAD MEMORIAL GENERAL HOSPITAL</p>
        </div>
        <div class="dru-region all-labels">
          <p>REGION III (Central Luzon)</p>
        </div>
        <div class="dru-province all-labels">
          <p>PAMPANGA</p>
        </div>
        <div class="dru-contact all-labels">
          <p>0933-498-6602</p>
        </div>
        <div class="ep_id all-labels" style="font-size: 8px !important">
          <p>{{ patient.ep_id }}</p>
        </div>
        <div class="case-no all-labels">
          <p>{{ patient.case_id }}</p>
        </div>
        <div class="lname all-labels">
          <p>{{ patient.lname }}</p>
        </div>
        <div class="fname all-labels">
          <p>{{ patient.fname }}</p>
        </div>
        <div class="mname all-labels">
          <p>{{ patient.mname }}</p>
        </div>
        <div class="gender all-labels">
          <span class="male" v-if="patient.gender == 1">✔</span>
          <span class="female" v-else>✔</span>
        </div>
        <div class="bday all-labels">
          <p>{{ patient.birthdate }}</p>
        </div>
        <div class="age all-labels">
          <span class="count">{{ patientAge.age }}</span>
          <span class="days" v-if="patientAge.type == 'days'">✔</span>
          <span class="months" v-if="patientAge.type == 'months'">✔</span>
          <span class="years" v-if="patientAge.type == 'years'">✔</span>
        </div>
        <div class="curr_add all-labels" style="font-size: 12px !important">
          <span>{{ patient.curr_address }}</span>
        </div>
        <div class="perm_add all-labels" style="font-size: 12px !important">
          <span>{{ patient.perm_address }}</span>
        </div>
        <div class="is-indigenous all-labels">
          <span class="ind-yes" v-if="patient.is_indigenous">✔</span>
          <span class="ind-no" v-else>✔</span>
        </div>
        <div class="tribe all-labels">
          <p>{{ patient.tribe }}</p>
        </div>
        <div class="is-ps all-labels">
          <span class="ps-yes" v-if="patient.is_fourps == 1">✔</span>
          <span class="ps-no" v-else>✔</span>
        </div>
        <div class="onset-dia all-labels">
          <p>{{ patient.onset_diarrhea }}</p>
        </div>
        <div class="was-dia all-labels">
          <span class="dia-yes" v-if="patient.patient_admitted == 'Y'">✔</span>
          <span class="dia-no" v-else>✔</span>
        </div>
        <div class="admission-date all-labels">
          <p>{{ patient.admission_date }}</p>
        </div>
        <div class="rehy all-labels">
          <span class="rehy-yes" v-if="patient.rehydration_therapy == 'Y'"
            >✔</span
          >
          <span class="rehy-no" v-else>✔</span>
        </div>
        <div class="prev-hosp all-labels">
          <span class="prev-yes" v-if="patient.prev_hospitalization == 'Y'"
            >✔</span
          >
          <span class="prev-no" v-else>✔</span>
        </div>
        <div class="date-hosp all-labels">
          <p>{{ patient.date_hospitalization }}</p>
        </div>
        <div class="vomit all-labels">
          <span class="vomit-yes" v-if="patient.vomiting == 'Y'">✔</span>
          <span class="vomit-no" v-else>✔</span>
        </div>
        <div class="date-vomit all-labels">
          <p>{{ patient.date_vomiting }}</p>
        </div>
        <div class="dehy all-labels">
          <span class="dehy-no" v-if="patient.degree_dehydration == 'NO'"
            >✔</span
          >
          <span
            class="dehy-some"
            v-else-if="patient.degree_dehydration == 'SOM'"
            >✔</span
          >
          <span class="dehy-sev" v-else-if="patient.degree_dehydration == 'SEV'"
            >✔</span
          >
        </div>
        <div class="fever all-labels">
          <span class="fever-yes" v-if="patient.fever == 'Y'">✔</span>
          <span class="fever-no" v-else>✔</span>
        </div>

        <div class="ad-diagnosis all-labels">
          <p>{{ patient.admitting_diagnosis }}</p>
        </div>
        <div class="fl-diagnosis all-labels">
          <p>{{ patient.final_diagnosis }}</p>
        </div>
        <div class="dia-case all-labels">
          <span class="case-y" v-if="patient.more_diarrhea == 'Y'">✔</span>
          <span class="case-n" v-else-if="patient.more_diarrhea == 'N'">✔</span>
          <span class="case-u" v-else-if="patient.more_diarrhea == 'U'">✔</span>
        </div>
        <div class="where-case all-labels">
          <span class="where-y" v-if="patient.where_diarrhea == 'COM'">✔</span>
          <span class="where-n" v-else-if="patient.where_diarrhea == 'SCH'"
            >✔</span
          >
          <span class="where-u" v-else-if="patient.where_diarrhea == 'HOU'"
            >✔</span
          >
        </div>

        <div class="rec-rota all-labels">
          <span class="rec-yes" v-if="patient.received_rota == 'Y'">✔</span>
          <span class="rec-no" v-else-if="patient.received_rota == 'N'">✔</span>
        </div>

        <div class="dose-rota all-labels">
          <p>{{ patient.dose_received }}</p>
        </div>

        <div class="dose-one all-labels">
          <p>{{ patient.first_dose }}</p>
        </div>

        <div class="dose-two all-labels">
          <p>{{ patient.second_dose }}</p>
        </div>

        <div class="inv-name all-labels">
          <p>{{ patient.investigator_name }}</p>
        </div>

        <div class="inv-pos all-labels">
          <p>{{ patient.position }}</p>
        </div>

        <div class="inv-con all-labels">
          <p>{{ patient.contact }}</p>
        </div>

        <div class="inv-date all-labels">
          <p>{{ patient.investigation_date }}</p>
        </div>

        <div class="inv-report all-labels">
          <p>{{ patient.report_date }}</p>
        </div>

        <div class="outcome all-labels">
          <span class="outcome-a" v-if="patient.outcome == 'A'">✔</span>
          <span class="outcome-d" v-else-if="patient.outcome == 'D'">✔</span>
        </div>

        <div class="discharge-date all-labels">
          <p>{{ patient.discharge_date }}</p>
        </div>

        <div class="died-date all-labels">
          <p>{{ patient.died_date }}</p>
        </div>
        <div class="dru all-labels">
          <span class="dru-type">✔</span>
          <span class="dru-sentinel">✔</span>
        </div>
        <!-- case_classification
          SUS
          CON -->
        <!-- fever -->
        <!-- v-if="patient.case_classification == 'SUS'" -->
        <div class="case-class all-labels">
          <!-- v-else-if="patient.case_classification == 'CON'" -->
          <span class="case-sus">✔</span>
          <span class="case-con">✔</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  nextTick,
  watch,
  watchEffect,
  computed,
} from "vue";
import { useRouter } from "vue-router";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import VueSquishFitText from "vue-squish-fit-text";
import textFit from "textfit";
export default defineComponent({
  components: {
    VueSquishFitText,
  },
  props: {
    patient: Object,
  },
  setup(props) {
    const pdfContent = ref(null);

    const router = useRouter();

    const patient = ref();

    watch(
      () => props.patient,
      (newPatient) => {
        patient.value = newPatient;
        // console.log(pElements)
      }
    );

    watchEffect(() => {
      if (typeof patient.value === "object") {
        console.log("patient.value is an object");
        setTimeout(() => {
          const pElements = document.querySelectorAll(".all-labels p");
          pElements.forEach((element) => {
            textFit(element, {
              multiline: true,
            });
          });

          console.log(pElements);
        }, 200);
      }
    });

    const generatePDF = async () => {
      const content = pdfContent.value;

      if (!content) {
        return;
      }
      setTimeout(async () => {
        // Wait for the component to fully render before capturing
        await nextTick();

        // Create a PDF document with A4 dimensions in landscape orientation
        const doc = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
          putOnlyUsedFonts: true,
        });
        doc.setProperties({
          title: `${props.patient.ep_id} - ${props.patient.lname}, ${props.patient.fname} ${props.patient.mname}`,
        });

        // Calculate the dimensions to fit the A4 landscape page
        const pdfWidth = doc.internal.pageSize.getWidth();
        const contentWidth = content.offsetWidth;
        const contentHeight = content.offsetHeight;
        const pdfHeight = (contentHeight / contentWidth) * pdfWidth;

        // Create a canvas from the captured content with higher dpi for better quality
        const canvas = await html2canvas(content, {
          useCORS: true,
          allowTaint: true,
          scale: 2, // Increase the scale for higher quality (adjust as needed)
          windowWidth: contentWidth,
          windowHeight: contentHeight,
          letterRendering: true,
          onrendered: function (canvas) {
            var ctx = canvas.getContext("2d");
            ctx.webkitImageSmoothingEnabled = false;
            ctx.mozImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled = false;
            canvas["imageSmoothingEnabled"] = false;
            canvas["mozImageSmoothingEnabled"] = false;
            canvas["oImageSmoothingEnabled"] = false;
            canvas["webkitImageSmoothingEnabled"] = false;
            canvas["msImageSmoothingEnabled"] = false;
          },
        });

        // Add the canvas as an image to the PDF
        doc.addImage(
          canvas.toDataURL("image/jpeg", 1.0),
          "JPEG",
          0,
          0,
          pdfWidth,
          pdfHeight
        );

        // Save the PDF
        // doc.save('sample.pdf');

        // Optionally, create a Blob and URL for download
        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        console.log(pdfUrl);

        // const pdfBlob = doc.output('blob');

        // const customBlobName = `${props.patient.lname}, ${props.patient.fname} ${props.patient.mname}`;

        // const blobMap = {};
        // blobMap[customBlobName] = pdfBlob;

        // const pdfUrl = URL.createObjectURL(blobMap[customBlobName]);

        // console.log(pdfUrl);

        // Redirect to the PDF preview route
        // router.push({ name: 'pdf-viewer', params: { pdfUrl } });

        window.open(
          `/pdf-viewer?pdfUrl=${encodeURIComponent(pdfUrl)}`,
          "_blank"
        );
      }, 200);
    };

    const patientAge = computed(() => {
      const { age_year, age_month, age_day } = props.patient;
      let age = 0;
      let type = "";
      if (age_year > 0) {
        age = age_year;
        type = "years";
      } else if (age_month > 0) {
        age = age_month;
        type = "months";
      } else {
        age = age_day;
        type = "days";
      }

      return {
        age,
        type,
      };
    });
    // context.expose({ generatePDF })

    return {
      generatePDF,
      pdfContent,
      patient,
      patientAge,
    };
  },
});
</script>

<style scoped>
.parent-print {
  width: 297mm; /* A4 paper width */
}

.dru-name {
  position: relative;
  top: 8.2rem;
  left: 8.1rem;
  height: 13px;
  width: 351px;
  background: transparent;
}
.dru-region {
  position: relative;
  top: 8.35rem;
  left: 8.6rem;
  height: 13px;
  width: 343px;
  background: transparent;
}
.dru-province {
  position: relative;
  top: 8.52rem;
  left: 9.2rem;
  height: 13px;
  width: 332px;
  background: transparent;
}
.dru-contact {
  position: relative;
  top: 7rem;
  left: 30.7rem;
  height: 13px;
  width: 100px;
  background: transparent;
}
.ep_id {
  position: relative;
  top: 9.7rem;
  left: 9.5rem;
  height: 35px;
  width: 70px;
  background: transparent;
}
.case-no {
  position: relative;
  top: 8.2rem;
  left: 14.9rem;
  height: 13px;
  width: 90px;
  background: transparent;
}
.lname {
  position: relative;
  top: 7rem;
  left: 21rem;
  height: 13px;
  width: 140px;
  background: transparent;
  text-align: center;
}
.fname {
  position: relative;
  top: 6.2rem;
  left: 30.5rem;
  height: 13px;
  width: 121px;
  background: transparent;
  text-align: center;
}
.mname {
  position: relative;
  top: 6rem;
  left: 38.8rem;
  height: 13px;
  width: 80px;
  background: transparent;
  text-align: center;
}
.gender {
  position: relative;
  top: 3rem;
  left: 43.9rem;
  height: 13px;
  width: 80px;
  background: transparent;
  text-align: center;
}
.bday {
  position: relative;
  top: 3.8rem;
  left: 52.2rem;
  height: 13px;
  width: 80px;
  background: transparent;
  text-align: center;
  letter-spacing: 0.2rem;
}
.age {
  position: relative;
  top: 2.6rem;
  left: 57.9rem;
  height: 13px;
  width: 80px;
  background: transparent;
  text-align: center;
}
.curr_add {
  position: relative;
  top: 5.4rem;
  left: 3rem;
  height: 13px;
  width: 770px;
  background: transparent;
}
.perm_add {
  position: relative;
  top: 6.8rem;
  left: 3rem;
  height: 13px;
  width: 770px;
  background: transparent;
}
.is-indigenous {
  position: relative;
  top: 4rem;
  left: 52.2rem;
  height: 13px;
  width: 80px;
  background: transparent;
}
.tribe {
  position: relative;
  top: 4.89rem;
  left: 52.2rem;
  height: 13px;
  width: 100px;
  background: transparent;
  text-align: left;
}
.is-ps {
  position: relative;
  top: 2.75rem;
  left: 60.8rem;
  height: 13px;
  width: 80px;
  background: transparent;
}
.onset-dia {
  position: relative;
  top: 7.1rem;
  left: 11.9rem;
  height: 13px;
  width: 100px;
  background: transparent;
  text-align: center;
  letter-spacing: 0.12rem;
}
.was-dia {
  position: relative;
  top: 6.95rem;
  left: 19.8rem;
  height: 13px;
  width: 80px;
  background: transparent;
}
.admission-date {
  position: relative;
  top: 7.2rem;
  left: 11.55rem;
  height: 13px;
  width: 100px;
  background: transparent;
  text-align: center;
  letter-spacing: 0.12rem;
}
.rehy {
  position: relative;
  top: 7.05rem;
  left: 24.05rem;
  height: 13px;
  width: 80px;
  background: transparent;
}
.prev-hosp {
  position: relative;
  top: 7.1rem;
  left: 24.28rem;
  height: 13px;
  width: 80px;
  background: transparent;
}
.date-hosp {
  position: relative;
  top: 7.39rem;
  left: 12.6rem;
  height: 13px;
  width: 100px;
  background: transparent;
  text-align: center;
  letter-spacing: 0.12rem;
}
.vomit {
  position: relative;
  top: 7.63rem;
  left: 6.65rem;
  height: 13px;
  width: 80px;
  background: transparent;
}
.date-vomit {
  position: relative;
  top: 7.89rem;
  left: 13.12rem;
  height: 13px;
  width: 100px;
  background: transparent;
  text-align: center;
  letter-spacing: 0.115rem;
}
.dehy {
  position: relative;
  top: 8.15rem;
  left: 11.2rem;
  height: 13px;
  width: 240px;
  background: transparent;
}
.fever {
  position: relative;
  top: 8.59rem;
  left: 5.9rem;
  height: 13px;
  width: 80px;
  background: transparent;
}
.ad-diagnosis {
  position: relative;
  top: 9rem;
  left: 10.8rem;
  height: 13px;
  width: 292px;
  background: transparent;
  line-height: 0.2;
}
.fl-diagnosis {
  position: relative;
  top: 9.1rem;
  left: 9.1rem;
  height: 13px;
  width: 313px;
  background: transparent;
  line-height: 0.2;
}
.dia-case {
  position: relative;
  top: 0.12rem;
  left: 30.7rem;
  height: 120px;
  width: 20px;
  background: transparent;
}
.where-case {
  position: relative;
  top: -5.41rem;
  left: 32.5rem;
  height: 60px;
  width: 20px;
  background: transparent;
}
.rec-rota {
  position: relative;
  top: -13.3rem;
  left: 39rem;
  height: 13px;
  width: 80px;
  background: transparent;
}
.dose-rota {
  position: relative;
  top: -12.6rem;
  left: 48.6rem;
  height: 13px;
  width: 30px;
  background: transparent;
  text-align: center;
}
.dose-one {
  position: relative;
  top: -11.15rem;
  left: 39.5rem;
  height: 13px;
  width: 150px;
  background: transparent;
  letter-spacing: 0.2rem;
}
.dose-two {
  position: relative;
  top: -9.1rem;
  left: 39.5rem;
  height: 13px;
  width: 150px;
  background: transparent;
  letter-spacing: 0.2rem;
}
.inv-name {
  position: relative;
  top: -15.72rem;
  left: 52rem;
  height: 13px;
  width: 222px;
  background: transparent;
  text-align: center;
}
.inv-pos {
  position: relative;
  top: -14.28rem;
  left: 52rem;
  height: 13px;
  width: 222px;
  background: transparent;
  text-align: center;
}
.inv-con {
  position: relative;
  top: -12.78rem;
  left: 52rem;
  height: 13px;
  width: 222px;
  background: transparent;
  text-align: center;
}
.inv-date {
  position: relative;
  top: -12.42rem;
  left: 60.3rem;
  height: 13px;
  width: 150px;
  background: transparent;
  letter-spacing: 0.2rem;
}
.inv-report {
  position: relative;
  top: -11.752rem;
  left: 58.03rem;
  height: 13px;
  width: 150px;
  background: transparent;
  letter-spacing: 0.2rem;
}
.outcome {
  position: relative;
  top: -4.5rem;
  left: 52.2rem;
  height: 75px;
  width: 20px;
  background: transparent;
}
.discharge-date {
  position: relative;
  top: -7.75rem;
  left: 59.4rem;
  height: 13px;
  width: 150px;
  background: transparent;
  letter-spacing: 0.2rem;
}
.died-date {
  position: relative;
  top: -5.55rem;
  left: 58.65rem;
  height: 13px;
  width: 150px;
  background: transparent;
  letter-spacing: 0.2rem;
}
.case-class {
  position: relative;
  top: -17.76rem;
  left: 61.7rem;
  height: 35px;
  width: 20px;
  background: transparent;
}
.dru {
  position: relative;
  top: -41.5rem;
  left: 57.2rem;
  height: 60px;
  width: 100px;
  background: transparent;
}
.dru .dru-type {
  position: absolute;
  right: 1.9rem;
  top: -0.31rem;
}
.dru .dru-sentinel {
  position: absolute;
  top: 2.3rem;
}

.case-class .case-sus {
  position: absolute;
}
.case-class .case-con {
  position: absolute;
  top: 1rem;
}

.outcome .outcome-a {
  position: absolute;
}
.outcome .outcome-d {
  position: absolute;
  top: 3.2rem;
}

.rec-rota .rec-yes {
  position: absolute;
}
.rec-rota .rec-no {
  position: absolute;
  left: 1.55rem;
}

.where-case .where-y {
  position: absolute;
}
.where-case .where-n {
  position: absolute;
  top: 1.29rem;
}
.where-case .where-u {
  position: absolute;
  top: 2.62rem;
}

.dia-case .case-y {
  position: absolute;
}
.dia-case .case-n {
  position: absolute;
  top: 5.6rem;
}
.dia-case .case-u {
  position: absolute;
  top: 6.55rem;
}

.fever .fever-yes {
  position: absolute;
}
.fever .fever-no {
  position: absolute;
  left: 2.2rem;
}

.dehy .dehy-no {
  position: absolute;
}
.dehy .dehy-some {
  position: absolute;
  left: 5.5rem;
}

.dehy .dehy-sev {
  position: absolute;
  left: 11.9rem;
}

.vomit .vomit-yes {
  position: absolute;
}
.vomit .vomit-no {
  position: absolute;
  left: 1.8rem;
}

.rehy .rehy-yes {
  position: absolute;
}
.rehy .rehy-no {
  position: absolute;
  left: 1.8rem;
}

.was-dia .dia-yes {
  position: absolute;
}
.was-dia .dia-no {
  position: absolute;
  left: 1.8rem;
}

.is-ps .ps-yes {
  position: absolute;
}
.is-ps .ps-no {
  position: absolute;
  left: 1.6rem;
}

.is-indigenous .ind-yes {
  position: absolute;
}
.is-indigenous .ind-no {
  position: absolute;
  left: 1.6rem;
}

.age .count {
  position: absolute;
  left: 5.5rem;
  top: -1.1rem;
  background: transparent;
}

.age .days {
  position: absolute;
  left: 2.9rem;
  background: transparent;
}

.age .months {
  position: absolute;
  left: 5.2rem;
  background: transparent;
}

.age .years {
  position: absolute;
  left: 2.9rem;
  top: 0.75rem;
  background: transparent;
}

.gender .male {
  position: absolute;
}

.gender .female {
  position: absolute;
  top: 0.9rem;
}

p {
  margin: 0;
  color: black;
  position: absolute;
  text-transform: uppercase;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  line-height: 1.2;
  /*text-align: center;*/
}

.pdf-content {
  font-family: Arial, sans-serif !important;
  width: 297mm; /* A4 paper width */
  height: 210mm; /* A4 paper height */
  position: relative;
  color: black;
  font-size: 12px;
}

.background-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* Place the image behind the content */
}

.content-pdf {
  position: relative;
  z-index: 1; /* Place the content on top of the image */
  /* Add your content styling here */
}

.auto-size-text {
}

.ep-id {
  top: 16rem;
  left: 11.3rem;
  position: absolute;
  background: transparent;
}
</style>
