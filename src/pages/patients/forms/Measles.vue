<template>
  <ul
    class="nav nav-pills user-profile-tab justify-content-start bg-light-info d-flex"
    id="pills-tab"
    role="tablist"
  >
    <div class="d-flex justify-content-between align-items-center w-100">
      <div class="d-flex">
        <li class="nav-item" role="presentation" @click="selectTab(1)">
          <button
            :class="{ active: selectedTab == 1 }"
            class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
          >
            <span class="d-none d-md-block">Clinical Information</span>
          </button>
        </li>
        <li class="nav-item" role="presentation" @click="selectTab(2)">
          <button
            :class="{ active: selectedTab == 2 }"
            class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
          >
            <span class="d-none d-md-block"
              >Vaccination Information & Exposure History</span
            >
          </button>
        </li>
        <li class="nav-item" role="presentation" @click="selectTab(3)">
          <button
            :class="{ active: selectedTab == 3 }"
            class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
          >
            <span class="d-none d-md-block"
              >Exposure Occurence & Other Information</span
            >
          </button>
        </li>
      </div>
      <div
        class="btn-container d-flex align-items-center justify-content-end gap-2 mx-3"
      >
        <router-link
          :to="{ name: 'patientlist' }"
          class="btn waves-effect waves-light btn-rounded btn-dark"
        >
          Back to Patient Profile List
        </router-link>
        <button
          class="btn waves-effect waves-light btn-rounded btn-info"
          @click="saveData()"
        >
          {{
            !patient.registry
              ? "Update Patient Disease"
              : "Save Patient Disease"
          }}
        </button>
      </div>
    </div>
  </ul>
  <div class="card my-0">
    <div class="card-body py-4">
      <Toast />
      <div class="tab-Item" v-if="selectedTab == 1">
        <div class="row">
          <div class="col-sm-12 mb-2 col-lg-12">
            <form-skeleton :data="skelPatientInfo" v-if="isLoading" />
            <patient-info-card :formData="formData" v-else />
          </div>
          <div class="col-sm-12 mb-2 col-lg-12">
            <form-skeleton :data="skelClinical" v-if="isLoading" />
            <form-card title="Clinical Data" v-else>
              <template v-slot:formInput>
                <div>
                  <div class="row">
                    <div
                      class="col-sm-12 col-md-6 col-lg-3 mb-2"
                      v-if="!patient.registry"
                    >
                      <div class="search">
                        <Label class="mb-2">Case ID </Label>
                        <input
                          type="text"
                          v-model="formDiseaseHistory.case_id"
                          class="form-control form-control-sm w-100 custom-font"
                          disabled
                        />
                      </div>
                    </div>
                    <div
                      class="col-sm-12 col-md-6 col-lg-3 mb-2"
                      v-if="!patient.registry"
                    >
                      <div class="search">
                        <Label class="mb-2">Ep ID </Label>
                        <input
                          type="text"
                          v-model="formDiseaseHistory.ep_id"
                          class="form-control form-control-sm w-100 custom-font"
                          disabled
                        />
                      </div>
                    </div>
                    <div
                      class="col-sm-12 col-md-6 col-lg-3 mb-2"
                      v-if="formData.gender == 2"
                    >
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.pregnant,
                        }"
                      >
                        <Label class="mb-2"
                          >Pregnant <span class="text-danger">*</span></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.pregnant"
                          required
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                          <option value="N">UNKNOWN</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.admitted,
                        }"
                      >
                        <Label class="mb-2"
                          >Admitted <span class="text-danger">*</span></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.admitted"
                          required
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.date_admitted,
                        }"
                      >
                        <Label class="mb-2"
                          >Date Admitted/Seen/Consulted
                          <span class="text-danger">*</span></Label
                        >
                        <input
                          type="date"
                          v-model="formMease.date_admitted"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Name of Parent / Caregiver </Label>
                        <input
                          type="text"
                          v-model="formMease.caregiver_name"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Contact No.</Label>
                        <input
                          type="text"
                          v-model="formMease.caregiver_contact"
                          maxlength="11"
                          @keypress="NumericOnly()"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.reporter_date,
                        }"
                      >
                        <Label class="mb-2"
                          >Date of Report
                          <span class="text-danger">*</span></Label
                        >
                        <input
                          type="date"
                          v-model="formMease.reporter_date"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Name of Reporter</Label>
                        <input
                          type="text"
                          v-model="formMease.reporter_name"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Reporter Contact No. </Label>
                        <input
                          type="text"
                          v-model="formMease.reporter_contact"
                          maxlength="11"
                          @keypress="NumericOnly()"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.investigate_date,
                        }"
                      >
                        <Label class="mb-2"
                          >Date of Investigation
                          <span class="text-danger">*</span></Label
                        >
                        <input
                          type="date"
                          v-model="formMease.investigate_date"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Name of Investigator/s </Label>
                        <input
                          type="text"
                          v-model="formMease.investigate_name"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Investigator Contact No. </Label>
                        <input
                          type="text"
                          v-model="formMease.investigate_contact"
                          maxlength="11"
                          @keypress="NumericOnly()"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Fever</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMease.changeFever($event)"
                          v-model="formMease.fever"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.fever_date &&
                            formMease.fever == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Date Onset (Fever)
                          <span
                            v-if="formMease.fever == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          v-model="formMease.fever_date"
                          :max="currentDate"
                          :disabled="formMease.fever != 'Y'"
                          :required="formMease.fever == 'Y'"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Rash</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMease.changeRash($event)"
                          v-model="formMease.rash"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.rash_date &&
                            formMease.rash == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Date Onset (Rash)
                          <span v-if="formMease.rash == 'Y'" class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          v-model="formMease.rash_date"
                          :max="currentDate"
                          :disabled="formMease.rash != 'Y'"
                          :required="formMease.rash == 'Y'"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Cough</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.cough"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Koplik Sign</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.koplik"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Runny Nose/Coryza </Label>
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.runny_nose"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Red Eyes/Conjunctivitis </Label>
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.red_eyes"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Artharalgia/Arthritis </Label>
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.artharalgia"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Swollen Lymphatic Nodules </Label>
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMease.changeLymph($event)"
                          v-model="formMease.swollen_lymp"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.lym_location &&
                            formMease.swollen_lymp == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >If, Yes Lymphatic Specify Location
                          <span
                            v-if="formMease.swollen_lymp == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMease.changeLymphLocation($event)"
                          v-model="formMease.lym_location"
                          :disabled="formMease.swollen_lymp != 'Y'"
                          :required="formMease.swollen_lymp == 'Y'"
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="CER">Cervical</option>
                          <option value="SUB-OCCI">Sub-occipital</option>
                          <option value="POST-AUR">Post-auricular</option>
                          <option value="OTHERS">Others</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.lymp_others &&
                            formMease.lym_location == 'OTHERS',
                        }"
                      >
                        <Label class="mb-2"
                          >Others Specify
                          <span
                            class="text-danger"
                            v-if="formMease.lym_location == 'OTHERS'"
                            >*</span
                          ></Label
                        >
                        <input
                          type="text"
                          v-model="formMease.lymp_others"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMease.lym_location != 'OTHERS'"
                          :required="formMease.lym_location == 'OTHERS'"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2"
                          >Are there any Complications?
                        </Label>
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMease.changeComplication($event)"
                          v-model="formMease.complications"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.complications_specify &&
                            formMease.complications == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >If Yes, Specify
                          <span
                            class="text-danger"
                            v-if="formMease.complications == 'Y'"
                            >*</span
                          ></Label
                        >
                        <input
                          type="text"
                          v-model="formMease.complications_specify"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMease.complications != 'Y'"
                          :required="formMease.complications == 'Y'"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Others Symptoms </Label>
                        <input
                          type="text"
                          v-model="formMease.other_symptoms"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </form-card>
          </div>
        </div>
      </div>
      <div class="tab-Item" v-if="selectedTab == 2">
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-12 mb-2">
            <form-card
              title="Vaccination History and Vitamin A Supplementation"
            >
              <template v-slot:formInput>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Working/Final Diagnosis</Label>
                        <input
                          type="text"
                          v-model="formMease.working_diagnosis"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2"
                          >Received Measles-Containing Vaccine(MCV)<button
                            type="button"
                            class="btn btn-sm btn-light-info text-info p-0 m-0"
                            v-tooltip.top="{
                              value: `<h6 class='text-white'>Patient Received Measles-Containing Vaccine(MCV) If, Yes, Indicate the Number of Doses Which is Applicable</h6>`,
                              escape: true,
                              class: 'bg-dark rounded p-1',
                            }"
                          >
                            .....</button
                          >?
                        </Label>
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMease.changeMCV($event)"
                          v-model="formMease.received_mcv"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.mcv_dose &&
                            formMease.received_mcv == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >MV No. of Doses
                          <span
                            class="text-danger"
                            v-if="formMease.received_mcv == 'Y'"
                            >*</span
                          ></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.mcv_dose"
                          :disabled="formMease.received_mcv != 'Y'"
                          :required="formMease.received_mcv == 'Y'"
                        >
                          <option value="">Please Select</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="2">3</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.mr_dose &&
                            formMease.received_mcv == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >MR No. of Doses
                          <span
                            class="text-danger"
                            v-if="formMease.received_mcv == 'Y'"
                            >*</span
                          ></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.mr_dose"
                          :disabled="formMease.received_mcv != 'Y'"
                          :required="formMease.received_mcv == 'Y'"
                        >
                          <option value="">Please Select</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="2">3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.mmr_dose &&
                            formMease.received_mcv == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >MMR No. of Doses
                          <span
                            class="text-danger"
                            v-if="formMease.received_mcv == 'Y'"
                            >*</span
                          ></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.mmr_dose"
                          :disabled="formMease.received_mcv != 'Y'"
                          :required="formMease.received_mcv == 'Y'"
                        >
                          <option value="">Please Select</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="2">3</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.date_last_mcv &&
                            formMease.received_mcv == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Date Last Dose Received MCV
                          <span
                            class="text-danger"
                            v-if="formMease.received_mcv == 'Y'"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          v-model="formMease.date_last_mcv"
                          :max="currentDate"
                          :disabled="formMease.received_mcv != 'Y'"
                          :required="formMease.received_mcv == 'Y'"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.validated_through &&
                            formMease.received_mcv == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Measles Vaccine Recevied Validated Through
                          <span
                            class="text-danger"
                            v-if="formMease.received_mcv == 'Y'"
                            >*</span
                          ></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.validated_through"
                          :disabled="formMease.received_mcv != 'Y'"
                          :required="formMease.received_mcv == 'Y'"
                        >
                          <option value="">Please Select</option>
                          <option value="VCARD">Vaccination Card</option>
                          <option value="LOGSHEET">Log Sheet</option>
                          <option value="RECALL">By Recall</option>
                          <option value="OTHERS">Others</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.received_campaigns &&
                            formMease.received_mcv == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Was Vaccination Received During Campaigns<button
                            type="button"
                            class="btn btn-sm btn-light-info text-info p-0 m-0"
                            v-tooltip.top="{
                              value: `<h6 class='text-white'>Was Vaccination Received During Special Campaigns?</h6>`,
                              escape: true,
                              class: 'bg-dark rounded p-1',
                            }"
                            required
                          >
                            .....</button
                          >?
                          <span
                            class="text-danger"
                            v-if="formMease.received_mcv == 'Y'"
                            >*</span
                          ></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.received_campaigns"
                          :disabled="formMease.received_mcv != 'Y'"
                          :required="formMease.received_mcv == 'Y'"
                        >
                          <option value="">Please Select</option>
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </form-card>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-12 mb-2">
            <form-card
              title="If Patient Did Not Received Any MCV, State Reason/s"
            >
              <template v-slot:formInput>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input primary check-outline outline-primary"
                            type="checkbox"
                            id="was-busy"
                            v-model="formMease.mom_busy"
                            true-value="1"
                            false-value="0"
                          />
                          <label class="form-check-label" for="was-busy"
                            >Mother Was Busy</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input primary check-outline outline-primary"
                            type="checkbox"
                            id="was-sick"
                            v-model="formMease.child_sick"
                            true-value="1"
                            false-value="0"
                          />
                          <label class="form-check-label" for="was-sick"
                            >Child Was Sick</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input primary check-outline outline-primary"
                            type="checkbox"
                            id="forgot-sched"
                            v-model="formMease.forgot_sched"
                            true-value="1"
                            false-value="0"
                          />
                          <label class="form-check-label" for="forgot-sched"
                            >Forgot Schedule</label
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input primary check-outline outline-primary"
                            type="checkbox"
                            id="belief"
                            v-model="formMease.against_belief"
                            true-value="1"
                            false-value="0"
                          />
                          <label class="form-check-label" for="belief"
                            >Against Belief</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input primary check-outline outline-primary"
                            type="checkbox"
                            id="no-vaccine"
                            v-model="formMease.no_available"
                            true-value="1"
                            false-value="0"
                          />
                          <label class="form-check-label" for="no-vaccine"
                            >No Vaccine Available</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div
                          class="form-check form-check-inline d-flex align-items-center gap-2"
                        >
                          <input
                            class="form-check-input primary check-outline outline-primary"
                            type="checkbox"
                            @change="fnMease.chnageOtherReason($event)"
                            id="specify"
                            v-model="formMease.other_reason"
                            true-value="1"
                            false-value="0"
                          />
                          <label class="form-check-label" for="specify"
                            >Other reasons, Specify</label
                          ><input
                            type="text"
                            v-model="formMease.other_reason_specify"
                            class="form-control form-control-sm w-50 custom-font"
                            :class="{
                              'other-reason-specify':
                                saveSubmitted &&
                                !validationStatus.other_reason_specify &&
                                formMease.other_reason == '1',
                            }"
                            :disabled="formMease.other_reason != '1'"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input primary check-outline outline-primary"
                            type="checkbox"
                            id="contra"
                            v-model="formMease.medical_counter"
                            true-value="1"
                            false-value="0"
                          />
                          <label class="form-check-label" for="contra"
                            >Medical Contraindication</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input primary check-outline outline-primary"
                            type="checkbox"
                            id="no-vaccinator"
                            v-model="formMease.no_vaccinator"
                            true-value="1"
                            false-value="0"
                          />
                          <label class="form-check-label" for="no-vaccinator"
                            >Vaccinator Not Available
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input primary check-outline outline-primary"
                            type="checkbox"
                            id="fear"
                            v-model="formMease.side_effects"
                            true-value="1"
                            false-value="0"
                          />
                          <label class="form-check-label" for="fear">
                            Fear of Side Effects
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input primary check-outline outline-primary"
                            type="checkbox"
                            id="ineligible"
                            v-model="formMease.not_eligible"
                            true-value="1"
                            false-value="0"
                          />
                          <label class="form-check-label" for="ineligible"
                            >Not Eligible for Vaccination</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <label class="form-check-label mb-3"
                          >Was the Patient Given Vitamin A During this
                          Illness?</label
                        ><select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.vitamin_illness"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </form-card>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-12 mb-2">
            <form-card title="Exposure History">
              <template v-slot:formInput>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.travel_history,
                        }"
                      >
                        <Label class="mb-2"
                          >With History of Travel Within 23 Days<button
                            type="button"
                            class="btn btn-sm btn-light-info text-info p-0 m-0"
                            v-tooltip.top="{
                              value: `<h6 class='text-white'>With History of Travel Within 23 Days Prior to Onset of Rash</h6>`,
                              escape: true,
                              class: 'bg-dark rounded p-1',
                            }"
                          >
                            .....</button
                          >? <span class="text-danger">*</span></Label
                        >

                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.travel_history"
                          required
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.travel_place &&
                            formMease.travel_history == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Travel Place<span
                            v-if="formMease.travel_history == 'Y'"
                            class="text-danger"
                          >
                            *</span
                          ></Label
                        >

                        <input
                          type="text"
                          v-model="formMease.travel_place"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMease.travel_history != 'Y'"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.travel_date &&
                            formMease.travel_history == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Travel Date<span
                            v-if="formMease.travel_history == 'Y'"
                            class="text-danger"
                          >
                            *</span
                          ></Label
                        >

                        <input
                          type="date"
                          v-model="formMease.travel_date"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMease.travel_history != 'Y'"
                          required
                        />
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">{{
                          "< 7 Days From Rash Onset"
                        }}</Label>

                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.less_seven"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">7-23 Days from Rash Onset</Label>

                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.more_seven"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.confirmed_measles,
                        }"
                      >
                        <Label class="mb-2"
                          >Was there Contact with a Confirmed Measles<button
                            type="button"
                            class="btn btn-sm btn-light-info text-info p-0 m-0"
                            v-tooltip.top="{
                              value: `<h6 class='text-white'>Was there Contact with a Confirmed Measles Case 7-23 Days Prior to Rash Onset?</h6>`,
                              escape: true,
                              class: 'bg-dark rounded p-1',
                            }"
                          >
                            .....</button
                          >? <span class="text-danger">*</span></Label
                        >

                        <select
                          class="form-select form-control form-control-sm"
                          @change="zxc"
                          v-model="formMease.confirmed_measles"
                          required
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                          <option value="U">UNKNOWN</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.confirmed_rubella,
                        }"
                      >
                        <Label class="mb-2"
                          >Was there Contact with a Confirmed Rubella<button
                            type="button"
                            class="btn btn-sm btn-light-info text-info p-0 m-0"
                            v-tooltip.top="{
                              value: `<h6 class='text-white'>Was there Contact with a Confirmed Rubella Case 7-23 Days Prior to Rash Onset?</h6>`,
                              escape: true,
                              class: 'bg-dark rounded p-1',
                            }"
                          >
                            .....</button
                          >? <span class="text-danger">*</span></Label
                        >

                        <select
                          class="form-select form-control form-control-sm"
                          @change="zxc"
                          v-model="formMease.confirmed_rubella"
                          required
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                          <option value="U">UNKNOWN</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">If Yes, Name of Contact</Label>
                        <input
                          type="text"
                          v-model="formMease.confirmed_name"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="disabledContact"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Place of Contact</Label>
                        <input
                          type="text"
                          v-model="formMease.confirmed_place"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="disabledContact"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Date of Contact </Label>
                        <input
                          type="date"
                          v-model="formMease.date_contact"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="disabledContact"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </form-card>
          </div>
        </div>
      </div>
      <div class="tab-item" v-if="selectedTab == 3">
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-12 mb-2">
            <form-card
              title="Tick The Type of Place Where Exposure Probably Occur"
            >
              <template v-slot:formInput>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input primary check-outline outline-primary"
                            type="checkbox"
                            id="daycare"
                            v-model="formMease.day_care"
                            true-value="1"
                            false-value="0"
                          />
                          <label class="form-check-label" for="daycare"
                            >Day Care</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input primary check-outline outline-primary"
                            type="checkbox"
                            id="barangay"
                            v-model="formMease.barangay"
                            true-value="1"
                            false-value="0"
                          />
                          <label class="form-check-label" for="barangay"
                            >Barangay</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input primary check-outline outline-primary"
                            type="checkbox"
                            id="home"
                            v-model="formMease.home"
                            true-value="1"
                            false-value="0"
                          />
                          <label class="form-check-label" for="home"
                            >Home</label
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input primary check-outline outline-primary"
                            type="checkbox"
                            id="school"
                            v-model="formMease.school"
                            true-value="1"
                            false-value="0"
                          />
                          <label class="form-check-label" for="school"
                            >School</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input primary check-outline outline-primary"
                            type="checkbox"
                            id="hci"
                            v-model="formMease.hci"
                            true-value="1"
                            false-value="0"
                          />
                          <label class="form-check-label" for="hci"
                            >Health Care Facility</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input primary check-outline outline-primary"
                            type="checkbox"
                            id="dorm"
                            v-model="formMease.dorm"
                            true-value="1"
                            false-value="0"
                          />
                          <label class="form-check-label" for="dorm"
                            >Dormitory</label
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div class="search">
                        <Label class="mb-2">Others, Specify</Label>
                        <input
                          type="text"
                          v-model="formMease.occur_specify"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2"
                          >Are there other known cases with fever and
                          rash<button
                            type="button"
                            class="btn btn-sm btn-light-info text-info p-0 m-0"
                            v-tooltip.top="{
                              value: `<h6 class='text-white'>(regardless of presence of 3 C’s)in the community?</h6>`,
                              escape: true,
                              class: 'bg-dark rounded p-1',
                            }"
                            required
                          >
                            .....</button
                          >?
                        </Label>

                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMease.known_case"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </form-card>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-8 mb-2">
            <form-card title="Final Classification" class="position-relative">
              <template v-slot:formInput>
                <button
                  @click="fnMease.resetClassification()"
                  class="btn btn-danger btn-sm reset-btn"
                >
                  Reset Selection
                </button>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input primary"
                              type="radio"
                              id="ch1"
                              value="Laboratory Confirmed Measles"
                              v-model="formMease.final_classification"
                            />
                            <label class="form-check-label" for="ch1"
                              >Laboratory Confirmed Measles</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input primary"
                              type="radio"
                              id="ch2"
                              value="Epi-linked Confirmed Measles"
                              v-model="formMease.final_classification"
                            />
                            <label class="form-check-label" for="ch2"
                              >Epi-linked Confirmed Measles</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input primary"
                              type="radio"
                              id="ch3"
                              value="Clinically Compatible Measles"
                              v-model="formMease.final_classification"
                            />
                            <label class="form-check-label" for="ch3"
                              >Clinically Compatible Measles</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input primary"
                              type="radio"
                              id="ch4"
                              value="Laboratory Confirmed Rubella"
                              v-model="formMease.final_classification"
                            />
                            <label class="form-check-label" for="ch4"
                              >Laboratory Confirmed Rubella</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input primary"
                              type="radio"
                              id="ch5"
                              value="Epi-linked Confirmed Rubella"
                              v-model="formMease.final_classification"
                            />
                            <label class="form-check-label" for="ch5"
                              >Epi-linked Confirmed Rubella</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input primary"
                              type="radio"
                              id="ch6"
                              value="Non-Measles/Rubella Discarded Case"
                              v-model="formMease.final_classification"
                            />
                            <label class="form-check-label" for="ch6"
                              >Non-Measles/Rubella Discarded Case</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </form-card>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <form-card title="Source of Infection" class="position-relative">
              <template v-slot:formInput>
                <button
                  @click="fnMease.resetInfection()"
                  class="btn btn-danger btn-sm reset-btn"
                >
                  Reset Selection
                </button>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input primary"
                              type="radio"
                              id="si1"
                              value="Endemic"
                              v-model="formMease.source_infection"
                            />
                            <label class="form-check-label" for="si1"
                              >Endemic</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input primary"
                              type="radio"
                              id="si2"
                              value="Imported"
                              v-model="formMease.source_infection"
                            />
                            <label class="form-check-label" for="si2"
                              >Imported</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-6 col-lg-6 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input primary"
                              type="radio"
                              id="si3"
                              value="Import-related"
                              v-model="formMease.source_infection"
                            />
                            <label class="form-check-label" for="si3"
                              >Import-related</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-3">
                      <div class="search">
                        <div class="form-check form-check-inline">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input primary"
                              type="radio"
                              id="si4"
                              value="Unknown"
                              v-model="formMease.source_infection"
                            />
                            <label class="form-check-label" for="si4"
                              >Unknown</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </form-card>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-12 mb-2">
            <form-card title="Outcome">
              <template v-slot:formInput>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="saveSubmitted && !validationStatus.outcome"
                      >
                        <Label class="mb-2"
                          >Outcome <span class="text-danger">*</span></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMease.changeOutcomed($event)"
                          v-model="formMease.outcome"
                          required
                        >
                          <option value="">Please Select</option>
                          <option value="A">Alive</option>
                          <option value="D">Died</option>
                          <option value="HAMA">HAMA</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.date_died &&
                            formMease.outcome == 'D',
                        }"
                      >
                        <Label class="mb-2"
                          >Date Died
                          <span
                            class="text-danger"
                            v-if="formMease.outcome == 'D'"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          v-model="formMease.date_died"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMease.outcome != 'D'"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div class="search">
                        <Label class="mb-2">Final Diagnosis</Label>
                        <textarea
                          class="form-control form-control-sm custom-font"
                          v-model="formMease.final_diagnosis"
                          rows="4"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </form-card>
          </div>
        </div>
      </div>
      <switch-tab
        :details="switchTabDetails"
        @switch-tab="switchSelect"
        @patient-list="backTo"
        @save-data="saveData()"
      />
    </div>
  </div>
  <loader
    :title="
      !patient.registry
        ? 'Updating Measles-Rubella Record'
        : 'Saving Measles-Rubella Record'
    "
    subTitle="Please Wait...."
    warning="true"
    v-if="savingFlag"
  />
  <pre>{{ validationStatus }}</pre>
  <pre>{{ formMease }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, inject, watch } from "vue";
import {
  swalConfirmation,
  swalMessage,
  trimZeroes,
  decryptData,
  NumericOnly,
} from "@/composables";
import FormCard from "@/components/cards/FormCard.vue";
import FormPatientInfo from "../../../components/cards/FormPatientInfo.vue";
import moment from "moment";
import api from "../../../api/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import * as validFn from "./functions/rota";
import {
  validateFields,
  validationStatus,
  validateChecker,
} from "./functions/measlesValidation";
import { useToast } from "primevue/usetoast";
import Loader from "../../loader/Loader.vue";
import FormSkeleton from "../../loader/FormSkeleton.vue";
import PatientInfoCard from "../../../components/cards/PatientInfoCard.vue";
import SwitchTab from "@/components/pagination/SwitchTab.vue";
import * as fnMease from "./functions/measles";
import measles from "@/store/modules/measles";
export default defineComponent({
  components: {
    FormCard,
    PatientInfoCard,
    Loader,
    FormSkeleton,
    SwitchTab,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const swal = inject("$swal");
    const toast = useToast();
    const patient = ref(decryptData(localStorage.getItem("patient")));
    const formData = ref({});
    const authUser = computed(() => store.getters.getAuthenticatedUser);
    const fetchPatientInfo = async () => {
      //   skeletonLoading();
      const response = await api.get(`/patients/${patient.value.patientId}`);
      formData.value = response.data.data;
      diseaseDetails.value.ep_id = `0038995-${caseName}-${epDate}-${trimZeroes(
        formData.value.patient_no
      )}`;
      diseaseDetails.value.case_id = `${caseDate}-`;
      if (patient.value.registry == false) {
        store.dispatch("fetchDiseaseHistory", patient.value.diseaseId);
        store.dispatch("fetchMease", patient.value.measlesId);
      } else {
        store.commit("setDiseaseHistoryEmpty");
        store.commit("setMeaseEmpty");
      }
    };

    const selectedTab = ref(1);
    const selectTab = (tab: Number) => {
      selectedTab.value = tab;
    };

    const switchSelect = (type: Number) => {
      if (type == 0) {
        selectedTab.value--;
      } else {
        selectedTab.value++;
      }
    };

    const switchTabDetails = ref({
      currentTab: 1,
      maxTab: 3,
      title: "",
    });

    const modifyTab = (tab: number) => {
      switchTabDetails.value.currentTab = tab;
      if (selectedTab.value == 1) {
        switchTabDetails.value.title = "Clinical Information";
      } else if (selectedTab.value == 2) {
        switchTabDetails.value.title =
          "Vaccination Information & Exposure History";
      } else {
        switchTabDetails.value.title = "Exposure Occurence & Other Information";
      }
    };

    watch(
      () => {
        selectedTab.value;
        if (selectedTab.value) {
          modifyTab(selectedTab.value);
        }
      },
      { deep: true }
    );

    const backTo = () => {
      router.push({ name: "patientlist" });
    };

    const currentDate = moment(Date.now()).format("yyyy-MM-DD");

    const formDiseaseHistory = computed(() => store.getters.getDiseaseHistory);
    const diseaseResponse = computed(() => store.getters.getDiseaseResponse);
    const formMease = computed(() => store.getters.getMease);
    const measeResponse = computed(() => store.getters.getMeaseResponse0);

    //forRegistry Only
    const caseName = "MEA";
    const epDate = moment(Date.now()).format("MMDDYY");
    const caseDate = moment(Date.now()).format("YYYY");
    const diseaseDetails = ref({
      id: 0,
      disease_date: currentDate,
      type: "3", //measles 3
      case_code: "MEASLES", //default case code for measles
      case_id: ``,
      ep_id: ``,
    });

    const saveDiseaseHistory = async (formRequest) => {
      console.log(formRequest);
      await store.dispatch("saveDiseaseHistory", formRequest);
    };

    const saveMeasles = async (formRequest) => {
      await store.dispatch("saveMeasles", formRequest);
    };

    const savingFlag = ref(false);
    const savingConfirmation = async () => {
      let message = !patient.value.registry ? "update" : "save";
      swalConfirmation(
        swal,
        "Confirmation",
        `Are you sure to ${message} Patient Disease?`,
        "question"
      ).then(async (res) => {
        if (res.isConfirmed) {
          savingFlag.value = true;
          await saveDiseaseHistory({
            ...diseaseDetails.value,
            patientInfo_id: patient.value.patientId,
            user_id: authUser.value.id,
            gender: formData.value.gender,
            age_year: formData.value.age_year,
            fname: formData.value.fname[0].toUpperCase(),
            lname: formData.value.lname[0].toUpperCase(),
          });

          await saveMeasles({
            ...formMease.value,
            disease_history_id: diseaseResponse.value.id,
            user_id: authUser.value.id,
          });

          savingFlag.value = false;
          let message = !patient.value.registry ? "Updated" : "Saved";
          swalMessage(
            swal,
            `Information`,
            `Patient Measles-Rubella Record ${message} Successfully`,
            "success"
          ).then(() => {
            router.push({ name: "patients", params: { type: "measles" } });
          });
        }
      });
    };

    const saveSubmitted = ref(false);
    const saveData = async () => {
      saveSubmitted.value = true;
      const errors = await validateFields(
        toast,
        { ...formMease.value, gender: formData.value.gender },
        0
      );
      selectTab(errors.value.tab);

      if (errors.value.errors == 0) {
        await savingConfirmation();
      }
    };

    const disabledContact = computed(() => {
      return formMease.value.confirmed_rubella == "Y" ||
        formMease.value.confirmed_measles == "Y"
        ? false
        : true;
    });

    const resetter = () => {
      savingFlag.value = false;
      saveSubmitted.value = false;
      selectedTab.value = 1;
    };

    watch(
      () => {
        formMease.value;
        if (saveSubmitted.value == true) {
          validateFields(
            toast,
            { ...formMease.value, gender: formData.value.gender },
            1
          );
        }
      },
      { deep: true }
    );

    watch(() => {
      disabledContact.value;
      if (disabledContact.value) {
        fnMease.changeExposed();
      }
    });

    onMounted(async () => {
      await fetchPatientInfo();
      resetter;
    });

    return {
      patient,
      formData,
      currentDate,
      selectTab,
      selectedTab,
      formDiseaseHistory,
      formMease,
      diseaseResponse,
      measeResponse,
      NumericOnly,
      diseaseDetails,
      validFn,
      validationStatus,
      switchTabDetails,
      switchSelect,
      backTo,
      savingConfirmation,
      fnMease,
      disabledContact,
      saveData,
      saveSubmitted,
      savingFlag,
    };
  },
});
</script>

<style scoped>
.btn-container {
  background: #eaeff4;
  padding: 5px;
  border-radius: 5px;
}

/*.nav-pills{
  position: fixed;
  top: -10;
  z-index: 100;
  width: 100%;
}*/
.reset-btn {
  position: absolute;
  top: 0;
  right: 0;
  margin: 3px 3px 0 0;
}

.card {
  margin-right: 50px;
}

@media screen and (max-width: 991px) {
  .nav-pills {
    display: none !important;
  }
  .card {
    margin-right: 0;
  }
}
</style>
