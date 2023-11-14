<template>
  <div class="parent-print" v-if="patient">
    <div ref="pdfContent1" class="pdf-content">
      <img
        src="./image/ames1.jpg"
        alt="Background Image"
        class="background-img"
      />
      <div class="dru-name all-labels">
        <p>JOSE B. LINGAD MEMORIAL GENERAL HOSPITAL</p>
      </div>
      <div class="dru-address all-labels">
        <p>DOLORES, CITY OF SAN FERNANDO PAMPANGA 2000, REGION III</p>
      </div>
      <div class="dru-contact all-labels">
        <p>0933-498-6602</p>
      </div>
      <div class="dru-type all-labels">
        <p>✔</p>
      </div>
      <div class="ep_id all-labels" style="font-size: 10px !important">
        <p>{{ patient.ep_id }}</p>
      </div>
      <div class="case-no all-labels" style="font-size: 10px !important">
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
      <div class="curr_region all-labels" style="font-size: 12px !important">
        <span>{{ patient.curr_region }}</span>
      </div>
      <div class="is-indigenous all-labels">
        <span class="ind-yes" v-if="patient.is_indigenous">✔</span>
        <span class="ind-no" v-else>✔</span>
      </div>
      <div class="tribe all-labels">
        <p>{{ patient.tribe }}</p>
      </div>
      <div class="dru-sentinel all-labels">
        <span>✔</span>
      </div>
      <div class="was-admit all-labels">
        <span class="dia-yes" v-if="patient.admitted == 'Y'">✔</span>
        <span class="dia-no" v-else>✔</span>
        <p class="date-admit">{{ patient.date_admitted }}</p>
        <p class="date-onset">{{ patient.date_onset }}</p>
      </div>
      <div class="sign-symp all-labels">
        <span class="fev-yes" v-if="patient.fever == 'Y'">✔</span>
        <span class="fev-no" v-else>✔</span>

        <span class="mental-yes" v-if="patient.mental_status == 'Y'">✔</span>
        <span class="mental-no" v-else>✔</span>

        <span class="seiz-yes" v-if="patient.onset_seizure == 'Y'">✔</span>
        <span class="seiz-no" v-else>✔</span>

        <span class="stiff-yes" v-if="patient.neck_stiffness == 'Y'">✔</span>
        <span class="stiff-no" v-else>✔</span>

        <span class="menin-yes" v-if="patient.meningeal_signs == 'Y'">✔</span>
        <span class="menin-no" v-else>✔</span>
      </div>
      <div class="adm-diag all-labels">
        <span class="cns-infect" v-if="patient.cns && patient.cns != null"
          >✔</span
        >
        <span class="sus-bact" v-if="patient.cns == 'SBM'">✔</span>
        <span class="sus-encep" v-if="patient.cns == 'SE'">✔</span>
        <span class="others-chk" v-if="patient.cns == 'O'">✔</span>
        <p class="others-field">{{ patient.cns_others }}</p>
      </div>
      <div class="inv-details all-labels">
        <p class="inv-name">{{ patient.investigator_name }}</p>
        <p class="inv-position">{{ patient.position }}</p>
        <p class="inv-contact">{{ patient.contact }}</p>
        <p class="inv-date">{{ patient.investigation_date }}</p>
        <p class="inv-report">{{ patient.report_date }}</p>
      </div>
      <div class="cbo-ill all-labels">
        <span class="cbo-je" v-if="patient.je == 'Y'">✔</span>
        <span class="cbo-penta" v-if="patient.penta == 'Y'">✔</span>
        <span class="cbo-measles" v-if="patient.measles == 'Y'">✔</span>
        <!-- <span class="cbo-mmr" v-if="patient.cns == 'Y'">✔</span> -->
      </div>
      <div class="ill-date all-labels">
        <p class="je-date">{{ patient.je_datedose }}</p>
        <p class="penta-date">{{ patient.penta_datedose }}</p>
        <p class="measles-date">{{ patient.measles_datedose }}</p>
        <!-- <p class="mmr-date">{{ patient.measles_datedose }}</p> -->
      </div>

      <div class="ill-doses all-labels">
        <p class="je-dose">{{ patient.je_doses }}</p>
        <p class="penta-dose">{{ patient.penta_doses }}</p>
        <p class="measles-dose">{{ patient.measles_doses }}</p>
        <!-- <p class="mmr-dose">{{ patient.measles_doses }}</p> -->
      </div>

      <div class="cbo-ill-pt all-labels">
        <span class="cbo-meningo" v-if="patient.meningo == 'Y'">✔</span>
        <span class="cbo-pneumo" v-if="patient.pneumo == 'Y'">✔</span>
        <span class="cbo-pcv10" v-if="patient.pcv10 == 'Y'">✔</span>
        <span class="cbo-pcv13" v-if="patient.pcv13 == 'Y'">✔</span>
      </div>

      <div class="ill-date-pt all-labels">
        <p class="meningo-date">{{ patient.meningo_datedose }}</p>
        <p class="pneumo-date">{{ patient.pneumo_datedose }}</p>
        <p class="pcv10-date">{{ patient.pcv10_datedose }}</p>
        <p class="pcv13-date">{{ patient.pcv13_datedose }}</p>
      </div>

      <div class="ill-doses-pt all-labels">
        <p class="meningo-dose">{{ patient.meningo_doses }}</p>
        <p class="pneumo-dose">{{ patient.pneumo_doses }}</p>
        <p class="pcv10-dose">{{ patient.pcv10_doses }}</p>
        <p class="pcv13-dose">{{ patient.pcv13_doses }}</p>
      </div>

      <div class="expose-occur all-labels">
        <span class="daycare" v-if="patient.daycare == 'Y'">✔</span>
        <span class="barangay" v-if="patient.barangay == 'Y'">✔</span>
        <span class="home" v-if="patient.home == 'Y'">✔</span>
        <span class="school" v-if="patient.school == 'Y'">✔</span>
        <span class="dorm" v-if="patient.dormitory == 'Y'">✔</span>
        <span class="hci" v-if="patient.healthcare == 'Y'">✔</span>
        <span class="workplace" v-if="patient.workplace == 'Y'">✔</span>
        <span class="others" v-if="patient.other == 'Y'">✔</span>
        <p class="occur-field">{{ patient.other_specify }}</p>
      </div>

      <div class="expose-travel all-labels">
        <span class="yes" v-if="patient.travel == 'Y'">✔</span>
        <span class="no" v-else>✔</span>
        <p class="travel-field">{{ patient.travel_place }}</p>
        <p class="date-from">{{ patient.travel_from }}</p>
        <p class="date-to">{{ patient.travel_to }}</p>
      </div>

      <div class="blood-csf all-labels">
        <span class="yes" v-if="patient.where_blood == 'Y'">✔</span>
        <span class="no" v-else-if="patient.where_blood == 'Y'">✔</span>
        <span class="unknown" v-else-if="patient.where_blood == 'Y'">✔</span>
      </div>
    </div>

    <div ref="pdfContent2" class="pdf-content2">
      <img
        src="./image/ames2.jpg"
        alt="Background Image"
        class="background-img"
      />

      <div class="case-class all-labels">
        <span class="suspected">✔</span>
        <span class="lab">✔</span>
        <span class="je">✔</span>
        <span class="bacterial">✔</span>
        <span class="confirmed">✔</span>
        <span class="aes-other">✔</span>
        <span class="aes-unknown">✔</span>
        <p class="aes-field">{{ patient.aes_other }}</p>
        <p class="confirmed-field">{{ patient.confirmed_case }}</p>
      </div>

      <div class="final-diagnosis all-labels">
        <p class="final-diagnosis-field">{{ patient.final_diagnosis }}</p>
      </div>

      <div class="outcome all-labels">
        <span class="alive">✔</span>
        <p class="alive-date">{{ patient.date_discharge }}</p>

        <span class="died">✔</span>
        <p class="died-date">{{ patient.date_discharge }}</p>

        <span class="hama">✔</span>
        <p class="hama-date">{{ patient.date_discharge }}</p>
      </div>

      <div class="follow-up all-labels">
        <p class="follow-up-date">{{ patient.date_follow }}</p>
        <p class="follow-up-status">{{ patient.status_follow }}</p>
      </div>
      <!-- {{ patient }} -->
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

    const generatePDF2 = async () => {
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
  width: 297mm; /* A4 paper width */
}

.dru-name {
  position: relative;
  top: 5.7rem;
  left: 5.5rem;
  height: 13px;
  width: 351px;
  background: transparent;
}

.dru-address {
  position: relative;
  top: 5.7rem;
  left: 5.5rem;
  height: 13px;
  width: 400px;
  background: transparent;
}

.dru-contact {
  position: relative;
  top: 4.8rem;
  left: 30.7rem;
  height: 13px;
  width: 100px;
  background: transparent;
}

.dru-type {
  position: relative;
  top: 3.15rem;
  left: 52.13rem;
  height: 13px;
  width: 20px;
  background: transparent;
}

.ep_id {
  position: relative;
  top: 5.1rem;
  left: 9.5rem;
  height: 35px;
  width: 70px;
  background: transparent;
}
.case-no {
  position: relative;
  top: 3.2rem;
  left: 16rem;
  height: 13px;
  width: 130px;
  background: transparent;
}
.lname {
  position: relative;
  top: 2.4rem;
  left: 22.4rem;
  height: 13px;
  width: 125px;
  background: transparent;
  text-align: center;
}
.fname {
  position: relative;
  top: 1.6rem;
  left: 30.2rem;
  height: 13px;
  width: 90px;
  background: transparent;
  text-align: center;
}
.mname {
  position: relative;
  top: 0.79rem;
  left: 35.8rem;
  height: 13px;
  width: 78px;
  background: transparent;
  text-align: center;
}
.gender {
  position: relative;
  top: -1.3rem;
  left: 41.5rem;
  height: 38px;
  width: 50px;
  background: transparent;
  text-align: center;
}

.gender .male {
  left: 1.4rem;
  top: 0.035rem;
}
.bday {
  position: relative;
  top: -2.7rem;
  left: 48.9rem;
  height: 13px;
  width: 120px;
  background: transparent;
  text-align: center;
  letter-spacing: 0.1rem;
}
.age {
  position: relative;
  top: -4.25rem;
  left: 58.5rem;
  height: 50px;
  width: 100px;
  background: transparent;
  text-align: center;
}

.age .count {
  position: absolute;
  left: 2.5rem;
  top: -0.1rem;
  background: transparent;
}

.age .days {
  position: absolute;
  left: -0.3rem;
  top: 1.05rem;
  background: transparent;
}

.age .months {
  position: absolute;
  left: 2.28rem;
  top: 1.05rem;
  background: transparent;
}

.age .years {
  position: absolute;
  left: 5.85rem;
  top: 1.05rem;
  background: transparent;
}
.curr_add {
  position: relative;
  top: -3.8rem;
  left: 3rem;
  height: 13px;
  width: 435px;
  background: transparent;
}
.curr_region {
  position: relative;
  top: -5rem;
  left: 41rem;
  height: 13px;
  width: 60px;
  text-align: center;
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
  top: -6.31rem;
  left: 49.4rem;
  height: 13px;
  width: 80px;
  background: transparent;
}

.is-indigenous .ind-yes {
  position: absolute;
}
.is-indigenous .ind-no {
  position: absolute;
  left: 1.6rem;
}

.tribe {
  position: relative;
  top: -6.18rem;
  left: 52.8rem;
  height: 13px;
  width: 75px;
  background: transparent;
  text-align: center;
}

.dru-sentinel {
  position: relative;
  top: -7.7rem;
  left: 56.2rem;
  height: 13px;
  width: 75px;
  background: transparent;
  text-align: center;
}

.was-admit {
  position: relative;
  top: -3.65rem;
  left: 3rem;
  height: 90px;
  width: 80px;
  background: transparent;
}

.was-admit .dia-yes {
  position: absolute;
}
.was-admit .dia-no {
  position: absolute;
  left: 3.45rem;
}

.was-admit .date-admit {
  position: absolute;
  top: 2.12rem;
  left: 0.5rem;
  text-align: center;
  letter-spacing: 0.1rem;
}
.was-admit .date-onset {
  position: absolute;
  top: 4.63rem;
  left: 0.5rem;
  text-align: center;
  letter-spacing: 0.1rem;
}

.sign-symp {
  position: relative;
  top: -9rem;
  left: 13.5rem;
  height: 90px;
  width: 150px;
  background: transparent;
}

.sign-symp .fev-yes {
  position: absolute;
  left: 0.3rem;
  top: -0.189rem;
}
.sign-symp .fev-no {
  position: absolute;
  left: 2rem;
  top: -0.189rem;
}

.sign-symp .mental-yes {
  position: absolute;
  left: 6.05rem;
  top: 0.68rem;
}
.sign-symp .mental-no {
  position: absolute;
  left: 7.5rem;
  top: 0.68rem;
}

.sign-symp .seiz-yes {
  position: absolute;
  left: 4.45rem;
  top: 1.64rem;
}
.sign-symp .seiz-no {
  position: absolute;
  left: 6rem;
  top: 1.64rem;
}

.sign-symp .stiff-yes {
  position: absolute;
  left: 2.95rem;
  top: 2.6rem;
}
.sign-symp .stiff-no {
  position: absolute;
  left: 4.5rem;
  top: 2.6rem;
}

.sign-symp .menin-yes {
  position: absolute;
  left: 3.4rem;
  top: 3.56rem;
}
.sign-symp .menin-no {
  position: absolute;
  left: 4.95rem;
  top: 3.56rem;
}

.adm-diag {
  position: relative;
  top: -15.56rem;
  left: 32rem;
  height: 90px;
  width: 150px;
  background: transparent;
}

.adm-diag .cns-infect {
  position: absolute;
  left: 0.3rem;
  top: 0.45rem;
}

.adm-diag .sus-bact {
  position: absolute;
  left: 1.05rem;
  top: 1.3rem;
}

.adm-diag .sus-encep {
  position: absolute;
  left: 1.05rem;
  top: 2.13rem;
}

.adm-diag .others-chk {
  position: absolute;
  left: 0.3rem;
  top: 3rem;
}

.adm-diag .others-field {
  position: relative;
  top: 3.2rem;
  left: 3.2rem;
  height: 13px;
  width: 220px;
  background: transparent;
}

.inv-details {
  position: relative;
  top: -22rem;
  left: 56.3rem;
  height: 120px;
  width: 200px;
  background: transparent;
}

.inv-details .inv-name {
  position: relative;
  top: 0.8rem;
  left: 0.2rem;
  height: 13px;
  width: 195px;
  background: transparent;
  text-align: center;
}

.inv-details .inv-position {
  position: relative;
  top: 1.09rem;
  left: 0.25rem;
  height: 13px;
  width: 195px;
  background: transparent;
  text-align: center;
}

.inv-details .inv-contact {
  position: relative;
  top: 1.5rem;
  left: 0.6rem;
  height: 13px;
  width: 185px;
  background: transparent;
  text-align: center;
}

.inv-details .inv-date {
  position: relative;
  top: 2.04rem;
  left: 2.02rem;
  height: 13px;
  width: 220px;
  background: transparent;
  letter-spacing: 0.25rem;
}

.inv-details .inv-report {
  position: relative;
  top: 2.68rem;
  left: 2.02rem;
  height: 13px;
  width: 220px;
  background: transparent;
  letter-spacing: 0.25rem;
}

.cbo-ill {
  position: relative;
  top: -18.7rem;
  left: 3rem;
  height: 80px;
  width: 20px;
  background: transparent;
}

.cbo-ill .cbo-je {
  position: absolute;
  top: -0.189rem;
}

.cbo-ill .cbo-penta {
  position: absolute;
  top: 0.62rem;
}

.cbo-ill .cbo-measles {
  position: absolute;
  top: 1.46rem;
}

.cbo-ill .cbo-mmr {
  position: absolute;
  top: 3.204rem;
}

.ill-date {
  position: relative;
  top: -23.7rem;
  left: 8.5rem;
  height: 120px;
  width: 70px;
  background: transparent;
}

.ill-date .je-date {
  position: relative;
  top: 0.05rem;
  height: 13px;
  width: 220px;
  background: transparent;
  letter-spacing: 0.1rem;
}

.ill-date .penta-date {
  position: relative;
  top: 0.05rem;
  left: -0.1rem;
  height: 13px;
  width: 220px;
  background: transparent;
  letter-spacing: 0.1rem;
}

.ill-date .measles-date {
  position: relative;
  top: 0.1rem;
  left: -0.1rem;
  height: 13px;
  width: 220px;
  background: transparent;
  letter-spacing: 0.1rem;
}

.ill-date .mmr-date {
  position: relative;
  top: 0.96rem;
  left: -0.2rem;
  height: 13px;
  width: 220px;
  background: transparent;
  letter-spacing: 0.1rem;
}

.ill-doses {
  position: relative;
  top: -31.2rem;
  left: 12.5rem;
  height: 120px;
  width: 80px;
  background: transparent;
}

.ill-doses .je-dose {
  position: relative;
  top: 0.05rem;
  height: 13px;
  width: 80px;
  background: transparent;
  text-align: center;
}

.ill-doses .penta-dose {
  position: relative;
  top: 0.05rem;
  height: 13px;
  width: 80px;
  background: transparent;
  text-align: center;
}

.ill-doses .measles-dose {
  position: relative;
  top: 0.1rem;
  height: 13px;
  width: 80px;
  background: transparent;
  text-align: center;
}

.ill-doses .mmr-dose {
  position: relative;
  top: 0.96rem;
  height: 13px;
  width: 80px;
  background: transparent;
  text-align: center;
}

.cbo-ill-pt {
  position: relative;
  top: -38.7rem;
  left: 18.75rem;
  height: 80px;
  width: 20px;
  background: transparent;
}

.cbo-ill-pt .cbo-meningo {
  position: absolute;
  top: -0.189rem;
}

.cbo-ill-pt .cbo-pneumo {
  position: absolute;
  top: 0.62rem;
}

.cbo-ill-pt .cbo-pcv10 {
  position: absolute;
  left: 2.4rem;
  top: 1.46rem;
}

.cbo-ill-pt .cbo-pcv13 {
  position: absolute;
  top: 2.35rem;
  left: 2.24rem;
}

.ill-date-pt {
  position: relative;
  top: -43.7rem;
  left: 25.95rem;
  height: 120px;
  width: 70px;
  background: transparent;
}

.ill-date-pt .meningo-date {
  position: relative;
  top: 0.05rem;
  height: 13px;
  width: 220px;
  background: transparent;
  letter-spacing: 0.1rem;
}

.ill-date-pt .pneumo-date {
  position: relative;
  top: 0.05rem;
  left: -0.1rem;
  height: 13px;
  width: 220px;
  background: transparent;
  letter-spacing: 0.1rem;
}

.ill-date-pt .pcv10-date {
  position: relative;
  top: 0.1rem;
  left: -0.1rem;
  height: 13px;
  width: 220px;
  background: transparent;
  letter-spacing: 0.1rem;
}

.ill-date-pt .pcv13-date {
  position: relative;
  top: 0.12rem;
  left: -0.1rem;
  height: 13px;
  width: 220px;
  background: transparent;
  letter-spacing: 0.1rem;
}

.ill-doses-pt {
  position: relative;
  top: -51.25rem;
  left: 30.5rem;
  height: 120px;
  width: 80px;
  background: transparent;
}

.ill-doses-pt .meningo-dose {
  position: relative;
  top: 0.05rem;
  height: 13px;
  width: 80px;
  background: transparent;
  text-align: center;
}

.ill-doses-pt .pneumo-dose {
  position: relative;
  top: 0.15rem;
  height: 13px;
  width: 80px;
  background: transparent;
  text-align: center;
}

.ill-doses-pt .pcv10-dose {
  position: relative;
  top: 0.1rem;
  height: 13px;
  width: 80px;
  background: transparent;
  text-align: center;
}

.ill-doses-pt .pcv13-dose {
  position: relative;
  top: 0.15rem;
  height: 13px;
  width: 80px;
  background: transparent;
  text-align: center;
}

.expose-occur {
  position: relative;
  top: -58.7rem;
  left: 35.75rem;
  height: 60px;
  width: 222px;
  background: transparent;
}

.expose-occur .daycare {
  position: absolute;
  left: 5.38rem;
  top: -0.24rem;
}

.expose-occur .barangay {
  position: absolute;
  left: 9rem;
  top: -0.24rem;
}

.expose-occur .home {
  position: absolute;
  left: 0.66rem;
  top: 0.518rem;
}

.expose-occur .school {
  position: absolute;
  left: 3.4rem;
  top: 0.518rem;
}

.expose-occur .dorm {
  position: absolute;
  left: 6.4rem;
  top: 0.518rem;
}

.expose-occur .hci {
  position: absolute;
  left: 0.66rem;
  top: 1.27rem;
}

.expose-occur .workplace {
  position: absolute;
  left: 7.46rem;
  top: 1.27rem;
}

.expose-occur .others {
  position: absolute;
  left: 0.66rem;
  top: 2.05rem;
}

.expose-occur .occur-field {
  position: absolute;
  top: 2.4rem;
  left: 5.8rem;
  height: 13px;
  width: 130px;
  font-size: 10px;
  background: transparent;
}

.expose-travel {
  position: relative;
  top: -62.5rem;
  left: 50rem;
  height: 60px;
  width: 300px;
  background: transparent;
}

.expose-travel .yes {
  position: absolute;
  left: 0.3rem;
  top: -0.18rem;
}

.expose-travel .no {
  position: absolute;
  left: 2.55rem;
  top: -0.18rem;
}

.expose-travel .travel-field {
  position: absolute;
  top: 0.93rem;
  left: 6.8rem;
  height: 13px;
  width: 193px;
  background: transparent;
}

.expose-travel .date-from {
  position: relative;
  top: 2.35rem;
  left: 6.45rem;
  height: 13px;
  width: 220px;
  background: transparent;
  font-size: 10px;
  letter-spacing: 0.01rem;
}

.expose-travel .date-to {
  position: relative;
  top: 1.56rem;
  left: 10.27rem;
  height: 13px;
  width: 220px;
  background: transparent;
  font-size: 10px;
  letter-spacing: 0.03rem;
}

.blood-csf {
  position: relative;
  top: -61rem;
  left: 14rem;
  height: 20px;
  width: 222px;
  background: transparent;
}

.blood-csf .yes {
  position: absolute;
  left: 0.64rem;
}

.blood-csf .no {
  position: absolute;
  left: 2.94rem;
}

.blood-csf .unknown {
  position: absolute;
  left: 4.95rem;
}

/*page2*/

.case-class {
  position: relative;
  top: 10.4rem;
  left: 3.5rem;
  height: 60px;
  width: 222px;
  background: transparent;
}

.case-class .suspected {
  position: absolute;
  left: 0.2rem;
  top: -0.24rem;
}

.case-class .lab {
  position: absolute;
  left: 0.2rem;
  top: 0.65rem;
}

.case-class .je {
  position: absolute;
  left: 0.2rem;
  top: 1.64rem;
}

.case-class .bacterial {
  position: absolute;
  left: 0.12rem;
  top: 2.568rem;
}

.case-class .confirmed {
  position: absolute;
  left: 0.2rem;
  top: 3.5rem;
}

.case-class .aes-other {
  position: absolute;
  left: 10.9rem;
  top: 0.65rem;
}

.case-class .aes-unknown {
  position: absolute;
  left: 10.9rem;
  top: 1.65rem;
}

.case-class .aes-field {
  position: absolute;
  top: 0.88rem;
  left: 17.2rem;
  height: 13px;
  width: 772px;
  background: transparent;
}

.case-class .confirmed-field {
  position: absolute;
  top: 3.65rem;
  left: 21.8rem;
  height: 13px;
  width: 697px;
  background: transparent;
}

.final-diagnosis {
  position: relative;
  top: 12.04rem;
  left: 7.8rem;
  height: 13px;
  width: 980px;
  background: transparent;
}

.final-diagnosis .final-diagnosis-field {
  position: absolute;
  height: 13px;
  width: 980px;
  background: transparent;
}

.outcome {
  position: relative;
  top: 14rem;
  left: 3.5rem;
  height: 60px;
  width: 800px;
  background: transparent;
}

.outcome .alive {
  position: absolute;
  left: -0.55rem;
  top: -0.3rem;
}

.outcome .alive-date {
  position: relative;
  top: -0.1rem;
  left: 8.6rem;
  height: 13px;
  width: 220px;
  background: transparent;
  letter-spacing: 0.25rem;
}

.outcome .died {
  position: absolute;
  left: 24.89rem;
  top: -0.3rem;
}

.outcome .died-date {
  position: relative;
  top: -0.95rem;
  left: 33.8rem;
  height: 13px;
  width: 220px;
  background: transparent;
  letter-spacing: 0.25rem;
}

.outcome .hama {
  position: absolute;
  left: 24.99rem;
  top: 2.7rem;
}

.outcome .hama-date {
  position: relative;
  top: 1.26rem;
  left: 43.6rem;
  height: 13px;
  width: 220px;
  background: transparent;
  letter-spacing: 0.25rem;
}

.follow-up {
  position: relative;
  top: 10.5rem;
  left: 62rem;
  height: 60px;
  width: 200px;
  background: transparent;
}

.follow-up .follow-up-date {
  position: absolute;
  top: 0.93rem;
  left: -0.189rem;
  height: 13px;
  width: 193px;
  background: transparent;
}

.follow-up .follow-up-status {
  position: absolute;
  top: 1.76rem;
  left: -0.7rem;
  height: 13px;
  width: 120px;
  background: transparent;
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
.inv-names {
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

.is-ps .ps-yes {
  position: absolute;
}
.is-ps .ps-no {
  position: absolute;
  left: 1.6rem;
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

.pdf-content2 {
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
