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
        <span class="male" v-if="patient.gender == 1">✔</span>
        <span class="female" v-else>✔</span>

        <span class="preg-yes" v-if="patient.pregnant == 'Y'">✔</span>
        <span class="preg-no" v-else-if="patient.pregnant == 'N'">✔</span>
        <span class="preg-unknown" v-else-if="patient.pregnant == 'U'">✔</span>

        <p class="preg-days"></p>
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

      <div class="curr_add all-labels">
        <p>{{ patient.curr_address }}</p>
      </div>

      <div class="perm_add all-labels">
        <p>{{ patient.perm_address }}</p>
      </div>

      <div class="was-admit all-labels">
        <span class="dia-yes" v-if="patient.admitted == 'Y'">✔</span>
        <span class="dia-no" v-else>✔</span>
        <p class="date-admit">{{ patient.date_admitted }}</p>
      </div>

      <div class="is-indigenous all-labels">
        <span class="ind-yes" v-if="patient.is_indigenous == 1">✔</span>
        <span class="ind-no" v-else>✔</span>
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
        <span class="fever-yes" v-if="patient.fever == 'Y'">✔</span>
        <span class="fever-no" v-else>✔</span>
        <p class="fever-date">{{ patient.fever_date }}</p>

        <span class="rash-yes" v-if="patient.rash == 'Y'">✔</span>
        <span class="rash-no" v-else>✔</span>
        <p class="rash-date">{{ patient.rash_date }}</p>

        <span class="cough-yes" v-if="patient.cough == 'Y'">✔</span>
        <span class="cough-no" v-else>✔</span>

        <span class="koplik-yes" v-if="patient.koplik == 'Y'">✔</span>
        <span class="koplik-no" v-else>✔</span>

        <span class="nose-yes" v-if="patient.runny_nose == 'Y'">✔</span>
        <span class="nose-no" v-else>✔</span>

        <span class="eyes-yes" v-if="patient.red_eyes == 'Y'">✔</span>
        <span class="eyes-no" v-else>✔</span>
      </div>

      <div class="clinical-data-ii all-labels">
        <span class="arthris-yes" v-if="patient.artharalgia == 'Y'">✔</span>
        <span class="arthris-no" v-else>✔</span>

        <span class="swollen-yes" v-if="patient.swollen_lymp == 'Y'">✔</span>
        <span class="swollen-no" v-else>✔</span>

        <span class="cervical" v-if="patient.lym_location == 'CER'">✔</span>
        <span class="sub" v-else-if="patient.lym_location == 'SUB-OCCI'"
          >✔</span
        >
        <span class="post" v-else-if="patient.lym_location == 'POST-AUR'"
          >✔</span
        >
        <span class="other" v-else-if="patient.lym_location == 'OTHERS'"
          >✔</span
        >

        <p class="other-lymp">{{ patient.lymp_others }}</p>
      </div>

      <div class="clinical-data-iii all-labels">
        <span class="comp-yes" v-if="patient.complications == 'Y'">✔</span>
        <span class="comp-no" v-else>✔</span>

        <p class="comp-specify">{{ patient.complications_specify }}</p>
        <p class="other-specify">{{ patient.other_symptoms }}</p>
        <p class="working-diagnosis">{{ patient.working_diagnosis }}</p>
      </div>

      <div class="vaccination-data all-labels">
        <span class="mcv-yes" v-if="patient.received_mcv == 'Y'">✔</span>
        <span class="mcv-no" v-else>✔</span>

        <p class="mv-dose">{{ patient.mcv_dose }}</p>
        <p class="mr-dose">{{ patient.mr_dose }}</p>
        <p class="mmr-dose">{{ patient.mmr_dose }}</p>
      </div>

      <div class="vaccination-data-ii all-labels">
        <p class="mcv-date">{{ patient.date_last_mcv }}</p>
        <span class="vaxcard" v-if="patient.validated_through == 'VCARD'"
          >✔</span
        >
        <span
          class="logsheet"
          v-else-if="patient.validated_through == 'LOGSHEET'"
          >✔</span
        >
        <span class="recall" v-else-if="patient.validated_through == 'RECALL'"
          >✔</span
        >
        <span
          class="validate-others"
          v-else-if="patient.validated_through == 'OTHERS'"
          >✔</span
        >
        <!-- <p class="validate-others-fields">by vaccinator</p> -->
      </div>

      <div class="vaccination-data-iii all-labels">
        <span class="campaign-yes" v-if="patient.received_campaigns == 'Y'"
          >✔</span
        >
        <span class="campaign-no" v-else>✔</span>
      </div>

      <div class="vaccination-data-iv all-labels">
        <span class="busy" v-if="patient.mom_busy == '1'">✔</span>
        <span class="sick" v-if="patient.child_sick == '1'">✔</span>
        <span class="forgot" v-if="patient.forgot_sched == '1'">✔</span>

        <span class="belief" v-if="patient.against_belief == '1'">✔</span>
        <span class="vaccine" v-if="patient.no_available == '1'">✔</span>
        <span class="other" v-if="patient.other_reason == '1'">✔</span>

        <span class="medical" v-if="patient.medical_counter == '1'">✔</span>
        <span class="vaccinator" v-if="patient.no_vaccinator == '1'">✔</span>

        <span class="fear" v-if="patient.side_effects == 'Y'">✔</span>
        <span class="eligible" v-if="patient.not_eligible == 'Y'">✔</span>

        <p class="other-reason">{{ patient.other_reason_specify }}</p>
      </div>

      <div class="vaccination-data-v all-labels">
        <span class="vitamin-yes" v-if="patient.vitamin_illness == 'Y'">✔</span>
        <span class="vitamin-no" v-else>✔</span>
      </div>

      <div class="exposure all-labels">
        <span class="travel-no" v-if="patient.travel_history == 'N'">✔</span>
        <span class="travel-yes" v-else>✔</span>
      </div>

      <div class="exposure-ii all-labels">
        <p class="travel-place">{{ patient.travel_place }}</p>
        <p class="travel-date">{{ patient.travel_date }}</p>
      </div>

      <div class="exposure-iii all-labels">
        <span class="less-seven" v-if="patient.less_seven == 'Y'">✔</span>
        <span class="more-seven" v-if="patient.more_seven == 'Y'">✔</span>
      </div>

      <div class="exposure-iv all-labels">
        <span class="measles-yes" v-if="patient.confirmed_measles == 'Y'"
          >✔</span
        >
        <span class="measles-no" v-else-if="patient.confirmed_measles == 'N'"
          >✔</span
        >
        <span
          class="measles-unknown"
          v-else-if="patient.confirmed_measles == 'U'"
          >✔</span
        >

        <span class="rubella-yes" v-if="patient.confirmed_rubella == 'Y'"
          >✔</span
        >
        <span class="rubella-no" v-else-if="patient.confirmed_rubella == 'N'"
          >✔</span
        >
        <span
          class="rubella-unknown"
          v-else-if="patient.confirmed_rubella == 'U'"
          >✔</span
        >
      </div>

      <div class="exposure-v all-labels">
        <p class="contact-name">{{ patient.confirmed_name }}</p>
        <p class="contact-place">{{ patient.confirmed_place }}</p>

        <p class="contact-date">{{ patient.date_contact }}</p>
      </div>

      <div class="exposure-vi all-labels">
        <span class="daycare" v-if="patient.day_care == '1'">✔</span>
        <span class="barangay" v-if="patient.barangay == '1'">✔</span>
        <span class="home" v-if="patient.home == '1'">✔</span>
        <span class="school" v-if="patient.school == '1'">✔</span>
        <span class="hci" v-if="patient.hci == '1'">✔</span>

        <span class="dorm" v-if="patient.dorm == '1'">✔</span>
        <span class="others" v-if="patient.other_reason == '1'">✔</span>

        <p class="occur-specify">{{ patient.other_reason_specify }}</p>
      </div>

      <div class="exposure-vii all-labels">
        <span class="comm-yes" v-if="patient.known_case == 'Y'">✔</span>
        <span class="comm-no" v-else-if="patient.known_case == 'N'">✔</span>
        <span class="comm-unknown" v-else-if="patient.known_case == 'U'"
          >✔</span
        >
      </div>
    </div>

    <div ref="pdfContent2" class="pdf-content2">
      <img
        src="./image/measles2.jpg"
        alt="Background Image"
        class="background-img"
      />

      <div class="final-class all-labels">
        <span
          class="lab-measles"
          v-if="patient.final_classification == 'Laboratory Confirmed Measles'"
          >✔</span
        >
        <span
          class="lab-rubella"
          v-if="patient.final_classification == 'Laboratory Confirmed Rubella'"
          >✔</span
        >

        <span
          class="epi-measles"
          v-if="patient.final_classification == 'linked Confirmed Measles'"
          >✔</span
        >
        <span
          class="epi-rubella"
          v-if="patient.final_classification == 'Epi-linked Confirmed Rubella'"
          >✔</span
        >

        <span
          class="compatible-measles"
          v-if="patient.final_classification == 'Clinically Compatible Measles'"
          >✔</span
        >
        <span
          class="discarded-case"
          v-if="
            patient.final_classification == 'Non-Measles/Rubella Discarded Case'
          "
          >✔</span
        >
      </div>

      <div class="final-class-ii all-labels">
        <span class="endemic" v-if="patient.source_infection == 'Endemic'"
          >✔</span
        >
        <span class="imported" v-if="patient.source_infection == 'Imported'"
          >✔</span
        >

        <span
          class="related"
          v-if="patient.source_infection == 'Import-related'"
          >✔</span
        >
        <span class="unknown" v-if="patient.source_infection == 'Unknown'"
          >✔</span
        >
      </div>

      <div class="outcome all-labels">
        <span class="alive" v-if="patient.outcome == 'A'">✔</span>
        <span class="died" v-else-if="patient.outcome == 'D'">✔</span>

        <p class="died-date">{{ patient.date_died }}</p>
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
  left: 13.8rem;
  height: 55px;
  width: 480px;
  background: transparent;
}

.vaccination-data-ii .mcv-date {
  position: absolute;
  top: 0.3rem;
  left: 0.82rem;
  height: 13px;
  width: 95px;
  letter-spacing: 0.23rem;
  background: transparent;
}

.vaccination-data-ii .vaxcard {
  position: absolute;
  top: 1.95rem;
  left: 5.64rem;
}

.vaccination-data-ii .logsheet {
  position: absolute;
  top: 1.95rem;
  left: 12.04rem;
}

.vaccination-data-ii .recall {
  position: absolute;
  top: 1.95rem;
  left: 16.1rem;
}

.vaccination-data-ii .validate-others {
  position: absolute;
  top: 1.95rem;
  left: 19.82rem;
}

.vaccination-data-ii .validate-others-fields {
  position: relative;
  top: 2.15rem;
  left: 20.5rem;
  height: 13px;
  width: 71px;
  background: transparent;
  text-align: center;
}

.vaccination-data-iii {
  position: relative;
  top: -23rem;
  left: 31rem;
  height: 35px;
  width: 250px;
  background: transparent;
}

.vaccination-data-iii .campaign-yes {
  position: absolute;
  top: -0.13rem;
  left: 0.85rem;
}
.vaccination-data-iii .campaign-no {
  position: absolute;
  top: -0.13rem;
  left: 4.3rem;
}

.vaccination-data-iv {
  position: relative;
  top: -23rem;
  left: 4.5rem;
  height: 90px;
  width: 640px;
  background: transparent;
}

.vaccination-data-iv .busy {
  position: absolute;
  top: 0.27rem;
  left: 0.83rem;
}
.vaccination-data-iv .sick {
  position: absolute;
  top: 0.27rem;
  left: 14.57rem;
}

.vaccination-data-iv .forgot {
  position: absolute;
  top: 0.27rem;
  left: 27.33rem;
}

.vaccination-data-iv .belief {
  position: absolute;
  top: 1.54rem;
  left: 0.83rem;
}
.vaccination-data-iv .vaccine {
  position: absolute;
  top: 1.54rem;
  left: 14.57rem;
}

.vaccination-data-iv .other {
  position: absolute;
  top: 1.54rem;
  left: 27.33rem;
}

.vaccination-data-iv .medical {
  position: absolute;
  top: 2.75rem;
  left: 0.83rem;
}
.vaccination-data-iv .vaccinator {
  position: absolute;
  top: 2.75rem;
  left: 14.57rem;
}

.vaccination-data-iv .fear {
  position: absolute;
  top: 4rem;
  left: 0.83rem;
}
.vaccination-data-iv .eligible {
  position: absolute;
  top: 4rem;
  left: 14.57rem;
}

.vaccination-data-iv .other-reason {
  position: relative;
  top: 2.92rem;
  left: 27.2rem;
  height: 13px;
  width: 155px;
  background: transparent;
  text-align: center;
}

.vaccination-data-v {
  position: relative;
  top: -23.18rem;
  left: 25.54rem;
  height: 20px;
  width: 250px;
  background: transparent;
}

.vaccination-data-v .vitamin-yes {
  position: absolute;
  top: -0.13rem;
  left: 0.85rem;
}
.vaccination-data-v .vitamin-no {
  position: absolute;
  top: -0.13rem;
  left: 4.285rem;
}

.exposure {
  position: relative;
  top: -21.55rem;
  left: 24.12rem;
  height: 20px;
  width: 250px;
  background: transparent;
}

.exposure .travel-no {
  position: absolute;
  top: -0.13rem;
  left: 0.85rem;
}
.exposure .travel-yes {
  position: absolute;
  top: -0.13rem;
  left: 2.945rem;
}

.exposure-ii {
  position: relative;
  top: -21.9rem;
  left: 10.5rem;
  height: 20px;
  width: 575px;
  background: transparent;
}

.exposure-ii .travel-place {
  position: relative;
  top: 0.25rem;
  left: -0.1rem;
  height: 13px;
  width: 181px;
  background: transparent;
  text-align: center;
}

.exposure-ii .travel-date {
  position: absolute;
  top: 0.25rem;
  left: 22.2rem;
  height: 13px;
  width: 95px;
  letter-spacing: 0.23rem;
  background: transparent;
}

.exposure-iii {
  position: relative;
  top: -21.15rem;
  left: 4.76rem;
  height: 20px;
  width: 250px;
  background: transparent;
}

.exposure-iii .less-seven {
  position: absolute;
  top: -0.13rem;
  left: 0.85rem;
}
.exposure-iii .more-seven {
  position: absolute;
  top: -0.13rem;
  left: 11.2rem;
}

.exposure-iv {
  position: relative;
  top: -20.9rem;
  left: 31.5rem;
  height: 35px;
  width: 225px;
  background: transparent;
}

.exposure-iv .measles-yes {
  position: absolute;
  top: -0.25rem;
  left: 1.35rem;
}
.exposure-iv .measles-no {
  position: absolute;
  top: -0.25rem;
  left: 3.15rem;
}

.exposure-iv .measles-unknown {
  position: absolute;
  top: -0.25rem;
  left: 5rem;
}

.exposure-iv .rubella-yes {
  position: absolute;
  top: 0.8rem;
  left: 1.35rem;
}
.exposure-iv .rubella-no {
  position: absolute;
  top: 0.8rem;
  left: 3.15rem;
}

.exposure-iv .rubella-unknown {
  position: absolute;
  top: 0.8rem;
  left: 5rem;
}

.exposure-v {
  position: relative;
  top: -21.4rem;
  left: 10.5rem;
  height: 20px;
  width: 575px;
  background: transparent;
}

.exposure-v .contact-name {
  position: relative;
  top: 0.34rem;
  left: 2.1rem;
  height: 13px;
  width: 115px;
  background: transparent;
  text-align: center;
}

.exposure-v .contact-place {
  position: relative;
  top: -0.5rem;
  left: 16rem;
  height: 13px;
  width: 88px;
  background: transparent;
  text-align: center;
}

.exposure-v .contact-date {
  position: absolute;
  top: 0.34rem;
  left: 27rem;
  height: 13px;
  width: 95px;
  letter-spacing: 0.23rem;
  background: transparent;
}

.exposure-vi {
  position: relative;
  top: -20.19rem;
  left: 22rem;
  height: 40px;
  width: 394px;
  background: transparent;
}

.exposure-vi .daycare {
  position: absolute;
  top: -0.25rem;
  left: 1.58rem;
}
.exposure-vi .barangay {
  position: absolute;
  top: -0.25rem;
  left: 5.58rem;
}

.exposure-vi .home {
  position: absolute;
  top: -0.25rem;
  left: 9.44rem;
}

.exposure-vi .school {
  position: absolute;
  top: -0.25rem;
  left: 12.35rem;
}

.exposure-vi .hci {
  position: absolute;
  top: -0.25rem;
  left: 15.54rem;
}

.exposure-vi .dorm {
  position: absolute;
  top: 1.01rem;
  left: 0.1rem;
}
.exposure-vi .others {
  position: absolute;
  top: 1.01rem;
  left: 4.15rem;
}

.exposure-vi .occur-specify {
  position: relative;
  top: 1.18rem;
  left: 9.6rem;
  height: 13px;
  width: 238px;
  background: transparent;
  text-align: left;
}

.exposure-vii {
  position: relative;
  top: -20.1rem;
  left: 39.38rem;
  height: 20px;
  width: 120px;
  background: transparent;
}

.exposure-vii .comm-yes {
  position: absolute;
  top: -0.25rem;
  left: 1.35rem;
}
.exposure-vii .comm-no {
  position: absolute;
  top: -0.25rem;
  left: 3.15rem;
}

.exposure-vii .comm-unknown {
  position: absolute;
  top: -0.25rem;
  left: 5.2rem;
}
/*Page2*/
.final-class {
  position: relative;
  top: 16rem;
  left: 3rem;
  height: 70px;
  width: 508px;
  background: transparent;
}

.final-class .lab-measles {
  position: absolute;
  top: -0.05rem;
  left: 0.4rem;
}
.final-class .lab-rubella {
  position: absolute;
  top: -0.05rem;
  left: 16.25rem;
}

.final-class .epi-measles {
  position: absolute;
  top: 0.96rem;
  left: 0.4rem;
}
.final-class .epi-rubella {
  position: absolute;
  top: 0.96rem;
  left: 16.25rem;
}

.final-class .compatible-measles {
  position: absolute;
  top: 2rem;
  left: 0.4rem;
}
.final-class .discarded-case {
  position: absolute;
  top: 2rem;
  left: 16.25rem;
}

.final-class-ii {
  position: relative;
  top: 11.59rem;
  left: 34.75rem;
  height: 70px;
  width: 120px;
  background: transparent;
}

.final-class-ii .endemic {
  position: absolute;
  top: -0.03rem;
  left: 0.4rem;
}
.final-class-ii .imported {
  position: absolute;
  top: 1.01rem;
  left: 0.4rem;
}

.final-class-ii .related {
  position: absolute;
  top: 2.05rem;
  left: 0.4rem;
}
.final-class-ii .unknown {
  position: absolute;
  top: 3.08rem;
  left: 0.4rem;
}

.outcome {
  position: relative;
  top: 11.59rem;
  left: 10rem;
  height: 40px;
  width: 588px;
  background: transparent;
}

.outcome .alive {
  position: absolute;
  top: 0.05rem;
  left: 0.46rem;
}
.outcome .died {
  position: absolute;
  top: 0.05rem;
  left: 4.6rem;
}

.outcome .died-date {
  position: absolute;
  top: 0.25rem;
  left: 25.1rem;
  height: 13px;
  width: 95px;
  letter-spacing: 0.23rem;
  background: transparent;
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
