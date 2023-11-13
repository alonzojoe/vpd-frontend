<template>
  <div class="parent-print" v-if="patient">
    <div ref="pdfContent1" class="pdf-content">
      <img
        src="./image/measles1.jpg"
        alt="Background Image"
        class="background-img"
      />
      <div class="dru-name all-labels">
        <p>JOSE B. LINGAD MEMORIAL GENERAL HOSPITAL</p>
      </div>
      <div class="dru-barangay all-labels">
        <p>DOLORES</p>
      </div>

      <div class="dru-city all-labels">
        <p>SAN FERNANDO</p>
      </div>

      <div class="dru-prov all-labels">
        <p>PAMPANGA</p>
      </div>

      <div class="dru-region all-labels">
        <p>III</p>
      </div>

      <div class="dru-sentinel all-labels">
        <span>✔</span>
      </div>

      <div class="patient-no all-labels">
        <p>{{ patient.patient_no }}</p>
      </div>

      <div class="ep_id all-labels" style="font-size: 10px !important">
        <p>{{ patient.ep_id }}</p>
      </div>

      <div class="fname all-labels">
        <p>{{ patient.fname }}</p>
      </div>
      <div class="mname all-labels">
        <p>{{ patient.mname }}</p>
      </div>
      <div class="lname all-labels">
        <p>{{ patient.lname }}</p>
      </div>

      <div class="other-info all-labels">
        <span class="male">✔</span>
        <span class="female">✔</span>
        <span class="preg-yes">✔</span>
        <span class="preg-no">✔</span>
        <span class="preg-unknown">✔</span>
        <p class="preg-days">2</p>
      </div>

      <div class="bday all-labels">
        <p>{{ patient.birthdate }}</p>
      </div>

      <div class="age all-labels">
        <span class="count">{{ patientAge.age }}</span>
        <span class="days">✔</span>
        <span class="months">✔</span>
        <span class="years">✔</span>
      </div>

      <div class="curr_add all-labels">
        <p>{{ patient.curr_address }}</p>
      </div>

      <div class="perm_add all-labels">
        <p>{{ patient.perm_address }}</p>
      </div>

      <div class="was-admit all-labels">
        <span class="dia-yes">✔</span>
        <span class="dia-no">✔</span>
        <p class="date-admit">{{ patient.date_admitted }}</p>
      </div>

      <div class="is-indigenous all-labels">
        <span class="ind-yes">✔</span>
        <span class="ind-no">✔</span>
      </div>

      <div class="tribe all-labels">
        <p>{{ patient.tribe }}</p>
      </div>

      <div class="caregiver-name all-labels">
        <p>{{ patient.caregiver_name }}</p>
      </div>

      <div class="caregiver-contact all-labels">
        <p>{{ patient.caregiver_contact }}</p>
      </div>

      <div class="inv-details all-labels">
        <p class="report-date">{{ patient.reporter_date }}</p>
        <p class="inv-date">{{ patient.investigate_date }}</p>
      </div>

      <div class="inv-info all-labels">
        <p class="reporter-name">{{ patient.reporter_name }}</p>
        <p class="reporter-contact">{{ patient.reporter_contact }}</p>

        <p class="investigate-name">{{ patient.investigate_name }}</p>
        <p class="investigate-contact">{{ patient.investigate_contact }}</p>
      </div>

      <div class="clinical-data all-labels">
        <span class="fever-yes">✔</span>
        <span class="fever-no">✔</span>
        <p class="fever-date">{{ patient.fever_date }}</p>

        <span class="rash-yes">✔</span>
        <span class="rash-no">✔</span>
        <p class="rash-date">{{ patient.rash_date }}</p>

        <span class="cough-yes">✔</span>
        <span class="cough-no">✔</span>

        <span class="koplik-yes">✔</span>
        <span class="koplik-no">✔</span>

        <span class="nose-yes">✔</span>
        <span class="nose-no">✔</span>

        <span class="eyes-yes">✔</span>
        <span class="eyes-no">✔</span>
      </div>

      <div class="clinical-data-ii all-labels">
        <span class="arthris-yes">✔</span>
        <span class="arthris-no">✔</span>

        <span class="swollen-yes">✔</span>
        <span class="swollen-no">✔</span>

        <span class="cervical">✔</span>
        <span class="sub">✔</span>
        <span class="post">✔</span>
        <span class="other">✔</span>

        <p class="other-lymp">{{ patient.lymp_others }}</p>
      </div>

      <div class="clinical-data-iii all-labels">
        <span class="comp-yes">✔</span>
        <span class="comp-no">✔</span>
        <p class="comp-specify">{{ patient.complications_specify }}</p>
        <p class="other-specify">{{ patient.other_symptoms }}</p>
        <p class="working-diagnosis">{{ patient.working_diagnosis }}</p>
      </div>

      <div class="vaccination-data all-labels">
        <span class="mcv-yes">✔</span>
        <span class="mcv-no">✔</span>

        <p class="mv-dose">{{ patient.mcv_dose }}</p>
        <p class="mr-dose">{{ patient.mr_dose }}</p>
        <p class="mmr-dose">{{ patient.mmr_dose }}</p>
      </div>

      <div class="vaccination-data-ii all-labels">
        <p class="mcv-date">{{ patient.date_last_mcv }}</p>
        <!-- <span class="vaxcard">✔</span>
        <span class="logsheet">✔</span>
        <span class="recall">✔</span>
        <span class="validate-others">✔</span> -->
      </div>
    </div>

    <div ref="pdfContent2" class="pdf-content2">
      <img
        src="./image/measles2.jpg"
        alt="Background Image"
        class="background-img"
      />
      {{ patient }}
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
    const pdfContent1 = ref(null);
    const pdfContent2 = ref(null);
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
      const content1 = pdfContent1.value;
      const content2 = pdfContent2.value;

      if (!content1 || !content2) {
        return;
      }
      setTimeout(async () => {
        // Wait for the component to fully render before capturing
        await nextTick();

        // Create a PDF document with A4 dimensions in landscape orientation
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
          putOnlyUsedFonts: true,
        });
        doc.setProperties({
          title: `${props.patient.ep_id} - ${props.patient.lname}, ${props.patient.fname} ${props.patient.mname}`,
        });

        // Calculate the dimensions to fit the A4 landscape page
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();

        // Create a canvas from the captured content with higher dpi for better quality for the first page
        const canvas1 = await html2canvas(content1, {
          useCORS: true,
          allowTaint: true,
          scale: 2, // Increase the scale for higher quality (adjust as needed)
          windowWidth: pdfWidth,
          windowHeight: pdfHeight,
          letterRendering: true,
          onrendered: function (canvas) {
            let ctx = canvas.getContext("2d");
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

        // Add the first page to the PDF
        doc.addImage(
          canvas1.toDataURL("image/jpeg", 1.0),
          "JPEG",
          0,
          0,
          pdfWidth,
          pdfHeight
        );

        // Add a new page to the PDF
        doc.addPage();

        // Create another canvas for the second page
        const canvas2 = await html2canvas(content2, {
          useCORS: true,
          allowTaint: true,
          scale: 2, // Increase the scale for higher quality (adjust as needed)
          windowWidth: pdfWidth,
          windowHeight: pdfHeight,
          letterRendering: true,
          onrendered: function (canvas) {
            let ctx = canvas.getContext("2d");
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

        // Add the second page to the PDF
        doc.addImage(
          canvas2.toDataURL("image/jpeg", 1.0),
          "JPEG",
          0,
          0,
          pdfWidth,
          pdfHeight
        );

        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        console.log(pdfUrl);

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
      pdfContent1,
      patient,
      pdfContent2,
      patientAge,
    };
  },
});
</script>

<style scoped>
.parent-print {
  width: 210mm; /* A4 paper width */
}

.dru-name {
  position: relative;
  top: 6.4rem;
  left: 8.2rem;
  height: 25px;
  width: 211px;
  background: transparent;
}

.dru-barangay {
  position: relative;
  top: 7.12rem;
  left: 4rem;
  height: 11px;
  width: 60px;
  background: transparent;
  text-align: center;
}

.dru-city {
  position: relative;
  top: 6.45rem;
  left: 8.4rem;
  height: 12px;
  width: 78px;
  background: transparent;
  text-align: center;
}

.dru-prov {
  position: relative;
  top: 5.71rem;
  left: 13.8rem;
  height: 12px;
  width: 80px;
  background: transparent;
  text-align: center;
}

.dru-region {
  position: relative;
  top: 4.9rem;
  left: 19.3rem;
  height: 12px;
  width: 25px;
  background: transparent;
  text-align: center;
}

.dru-sentinel {
  position: relative;
  top: 2.25rem;
  left: 28.5rem;
  height: 13px;
  width: 75px;
  background: transparent;
  text-align: center;
}

.patient-no {
  position: relative;
  top: 7.6rem;
  left: 3.1rem;
  height: 13px;
  width: 96px;
  background: transparent;
  text-align: center;
}

.ep_id {
  position: relative;
  top: 6.6rem;
  left: 9.4rem;
  height: 25px;
  width: 74px;
  background: transparent;
}

.fname {
  position: relative;
  top: 5.3rem;
  left: 14.5rem;
  height: 13px;
  width: 140px;
  background: transparent;
  text-align: center;
}
.mname {
  position: relative;
  top: 4.5rem;
  left: 23.3rem;
  height: 13px;
  width: 146px;
  background: transparent;
  text-align: center;
}
.lname {
  position: relative;
  top: 3.64rem;
  left: 32.5rem;
  height: 13px;
  width: 160px;
  background: transparent;
  text-align: center;
}

.other-info {
  position: relative;
  top: 4.2rem;
  left: 3.2rem;
  height: 45px;
  width: 222px;
  background: transparent;
}

.other-info .male {
  position: absolute;
  left: 1.75rem;
  top: -0.15rem;
}

.other-info .female {
  position: absolute;
  left: 4.65rem;
  top: -0.15rem;
}

.other-info .preg-yes {
  position: absolute;
  left: 4.14rem;
  top: 1rem;
}

.other-info .preg-no {
  position: absolute;
  left: 5.45rem;
  top: 1rem;
}

.other-info .preg-unknown {
  position: absolute;
  left: 6.98rem;
  top: 1rem;
}

.other-info .preg-days {
  position: absolute;
  top: 1.85rem;
  left: 8.5rem;
  height: 13px;
  width: 25px;
  text-align: center;
  background: transparent;
}

.bday {
  position: relative;
  top: 2.75rem;
  left: 14.7rem;
  height: 13px;
  width: 90px;
  background: transparent;
  text-align: center;
  letter-spacing: 0.12rem;
}

.age {
  position: relative;
  top: 0.25rem;
  left: 19.8rem;
  height: 50px;
  width: 100px;
  background: transparent;
  text-align: center;
}

.age .count {
  position: absolute;
  left: 3.2rem;
  top: 0rem;
  background: transparent;
}

.age .days {
  position: absolute;
  left: 0.1rem;
  top: 0.65rem;
  background: transparent;
}

.age .months {
  position: absolute;
  left: 0.1rem;
  top: 1.44rem;
  background: transparent;
}

.age .years {
  position: absolute;
  left: 0.1rem;
  top: 2.25rem;
  background: transparent;
}

.curr_add {
  position: relative;
  top: -1.2rem;
  left: 25.6rem;
  height: 26px;
  width: 330px;
  background: transparent;
}

.perm_add {
  position: relative;
  top: 0.3rem;
  left: 25.6rem;
  height: 26px;
  width: 330px;
  background: transparent;
}

.was-admit {
  position: relative;
  top: -3.1rem;
  left: 3rem;
  height: 90px;
  width: 355px;
  background: transparent;
}

.was-admit .dia-yes {
  position: absolute;
  left: 7.18rem;
}
.was-admit .dia-no {
  position: absolute;
  left: 8.85rem;
}

.was-admit .date-admit {
  position: absolute;
  top: 1.6rem;
  left: 16.99rem;
  height: 13px;
  width: 95px;
  letter-spacing: 0.23rem;
  background: transparent;
}

.is-indigenous {
  position: relative;
  top: -5.4rem;
  left: 18.8rem;
  height: 13px;
  width: 80px;
  background: transparent;
}

.is-indigenous .ind-yes {
  position: absolute;
}
.is-indigenous .ind-no {
  position: absolute;
  left: 1.65rem;
}

.tribe {
  position: relative;
  top: -6.03rem;
  left: 28.5rem;
  height: 13px;
  width: 95px;
  background: transparent;
  text-align: center;
}

.caregiver-name {
  position: relative;
  top: -5.94rem;
  left: 11.4rem;
  height: 13px;
  width: 174px;
  background: transparent;
}

.caregiver-contact {
  position: relative;
  top: -6.72rem;
  left: 27rem;
  height: 13px;
  width: 174px;
  background: transparent;
}

.inv-details {
  position: relative;
  top: -6.5rem;
  left: 3rem;
  height: 40px;
  width: 695px;
  background: transparent;
}

.inv-details .report-date {
  position: absolute;
  top: 0.1rem;
  left: 6.4rem;
  height: 13px;
  width: 85px;
  letter-spacing: 0.2rem;
  background: transparent;
}

.inv-details .inv-date {
  position: absolute;
  top: 1.4rem;
  left: 6.4rem;
  height: 13px;
  width: 85px;
  letter-spacing: 0.2rem;
  background: transparent;
}

.inv-info {
  position: relative;
  top: -9.2rem;
  left: 20rem;
  height: 40px;
  width: 425px;
  background: transparent;
}

.inv-info .reporter-name {
  position: relative;
  top: 0.1rem;
  left: 0.1rem;
  height: 13px;
  width: 155px;
  background: transparent;
}

.inv-info .reporter-contact {
  position: relative;
  top: -0.7rem;
  left: 15rem;
  height: 13px;
  width: 184px;
  background: transparent;
}

.inv-info .investigate-name {
  position: relative;
  top: -0.2rem;
  left: 1.8rem;
  height: 13px;
  width: 127px;
  background: transparent;
}

.inv-info .investigate-contact {
  position: relative;
  top: -1rem;
  left: 15rem;
  height: 13px;
  width: 182px;
  background: transparent;
}

.clinical-data {
  position: relative;
  top: -7.6rem;
  left: 3rem;
  height: 143px;
  width: 237px;
  background: transparent;
}

.clinical-data .fever-yes {
  position: absolute;
  top: -0.27rem;
  left: 4.34rem;
}
.clinical-data .fever-no {
  position: absolute;
  top: -0.27rem;
  left: 6.84rem;
}

.clinical-data .fever-date {
  position: absolute;
  top: 0.88rem;
  left: 8rem;
  height: 13px;
  width: 95px;
  letter-spacing: 0.23rem;
  background: transparent;
}

.clinical-data .rash-yes {
  position: absolute;
  top: 2.3rem;
  left: 4.34rem;
}
.clinical-data .rash-no {
  position: absolute;
  top: 2.3rem;
  left: 6.84rem;
}

.clinical-data .rash-date {
  position: absolute;
  top: 3.4rem;
  left: 8rem;
  height: 13px;
  width: 95px;
  letter-spacing: 0.23rem;
  background: transparent;
}

.clinical-data .cough-yes {
  position: absolute;
  top: 4.86rem;
  left: 6.4rem;
}
.clinical-data .cough-no {
  position: absolute;
  top: 4.86rem;
  left: 8.85rem;
}

.clinical-data .koplik-yes {
  position: absolute;
  top: 5.82rem;
  left: 6.59rem;
}
.clinical-data .koplik-no {
  position: absolute;
  top: 5.82rem;
  left: 9.05rem;
}

.clinical-data .nose-yes {
  position: absolute;
  top: 6.85rem;
  left: 9.55rem;
}
.clinical-data .nose-no {
  position: absolute;
  top: 6.85rem;
  left: 12.02rem;
}

.clinical-data .eyes-yes {
  position: absolute;
  top: 7.8rem;
  left: 9.9rem;
}
.clinical-data .eyes-no {
  position: absolute;
  top: 7.8rem;
  left: 12.365rem;
}

.clinical-data-ii {
  position: relative;
  top: -16.62rem;
  left: 18rem;
  height: 143px;
  width: 254px;
  background: transparent;
}

.clinical-data-ii .arthris-yes {
  position: absolute;
  top: -0.2rem;
  left: 10.5rem;
}
.clinical-data-ii .arthris-no {
  position: absolute;
  top: -0.2rem;
  left: 12.95rem;
}

.clinical-data-ii .swollen-yes {
  position: absolute;
  top: 0.8rem;
  left: 10.65rem;
}
.clinical-data-ii .swollen-no {
  position: absolute;
  top: 0.8rem;
  left: 13.1rem;
}

.clinical-data-ii .cervical {
  position: absolute;
  top: 3.7rem;
  left: 1.68rem;
}
.clinical-data-ii .sub {
  position: absolute;
  top: 3.7rem;
  left: 9.05rem;
}

.clinical-data-ii .post {
  position: absolute;
  top: 4.66rem;
  left: 1.68rem;
}
.clinical-data-ii .other {
  position: absolute;
  top: 5.68rem;
  left: 1.68rem;
}

.clinical-data-ii .other-lymp {
  position: relative;
  top: 6.82rem;
  left: 1.55rem;
  height: 13px;
  width: 196px;
  background: transparent;
  text-align: center;
}

.clinical-data-iii {
  position: relative;
  top: -24.5rem;
  left: 34rem;
  height: 130px;
  width: 200px;
  background: transparent;
}

.clinical-data-iii .comp-yes {
  position: absolute;
  top: -0.3rem;
  left: 0.73rem;
}
.clinical-data-iii .comp-no {
  position: absolute;
  top: -0.3rem;
  left: 3.25rem;
}

.clinical-data-iii .comp-specify {
  position: relative;
  top: 0.9rem;
  left: 4.99rem;
  height: 13px;
  width: 102px;
  background: transparent;
  text-align: center;
}

.clinical-data-iii .other-specify {
  position: relative;
  top: 1.99rem;
  left: 0.01rem;
  height: 13px;
  width: 184px;
  background: transparent;
  text-align: center;
}

.clinical-data-iii .working-diagnosis {
  position: relative;
  top: 3.1rem;
  left: 0.01rem;
  height: 13px;
  width: 184px;
  background: transparent;
  text-align: center;
}

.vaccination-data {
  position: relative;
  top: -23rem;
  left: 31rem;
  height: 35px;
  width: 250px;
  background: transparent;
}

.vaccination-data .mcv-yes {
  position: absolute;
  top: -0.25rem;
  left: 0.8rem;
}
.vaccination-data .mcv-no {
  position: absolute;
  top: -0.25rem;
  left: 5rem;
}

.vaccination-data .mv-dose {
  position: relative;
  top: 1rem;
  left: 1.75rem;
  height: 13px;
  width: 20px;
  background: transparent;
  text-align: center;
}

.vaccination-data .mr-dose {
  position: relative;
  top: 0.15rem;
  left: 5.9rem;
  height: 13px;
  width: 20px;
  background: transparent;
  text-align: center;
}

.vaccination-data .mmr-dose {
  position: relative;
  top: -0.65rem;
  left: 9.88rem;
  height: 13px;
  width: 20px;
  background: transparent;
  text-align: center;
}

.vaccination-data-ii {
  position: relative;
  top: -23rem;
  left: 31rem;
  height: 35px;
  width: 250px;
  background: red;
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
  width: 210mm; /* A4 paper width */
  height: 297mm; /* A4 paper height */
  position: relative;
  color: black;
  font-size: 12px;
}

.pdf-content2 {
  font-family: Arial, sans-serif !important;
  width: 210mm; /* A4 paper width */
  height: 297mm; /* A4 paper height */
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
