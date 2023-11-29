<template>
  <registry-nav
    class="position-fixed z-3 mr-5"
    :tabs="tabs"
    :patient="patient"
    :selectedTab="selectedTab"
    @save-data="saveData()"
    @select-tab="selectTab($event)"
  />
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
            <span class="d-none d-md-block">Other Information</span>
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
  <div class="card my-0" style="margin-right: 50px">
    <div class="card-body py-4">
      <Toast />
      <div class="tab-Item" v-if="selectedTab == 1">
        <div class="row">
          <div class="col-sm-12 mb-2 col-lg-12">
            <form-skeleton :data="skelPatientInfo" v-if="isLoading" />
            <form-patient-info :formData="formData" v-else />
          </div>
          <div class="col-sm-12 mb-2 col-lg-12">
            <form-skeleton :data="skelClinical" v-if="isLoading" />
            <form-card title="Clinical Data" v-else>
              <template v-slot:formInput>
                <div>
                  <div class="row" v-if="!patient.registry">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
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
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
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
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div class="search">
                        <Label class="mb-2">Date of Onset Diarrhea</Label>
                        <input
                          type="date"
                          v-model="formRota.onset_diarrhea"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.patient_admitted,
                        }"
                      >
                        <Label class="mb-2"
                          >Was the Patient Admitted at the Ward?
                          <span class="text-danger">*</span></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          @change="validFn.changeAdmitted($event)"
                          v-model="formRota.patient_admitted"
                          required
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                          <option value="U">UNKNOWN</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.admission_date &&
                            formRota.patient_admitted == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >If Yes, Date of Admission
                          <span
                            class="text-danger"
                            v-if="formRota.patient_admitted == 'Y'"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          v-model="formRota.admission_date"
                          :max="currentDate"
                          :disabled="formRota.patient_admitted != 'Y'"
                          class="form-control form-control-sm w-100 custom-font"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.rehydration_therapy,
                        }"
                      >
                        <Label class="mb-2"
                          >Did Patient Receive IV Rehydration Therapy<button
                            type="button"
                            class="btn btn-sm btn-light-info text-info p-0 m-0"
                            v-tooltip.top="{
                              value: `<h6 class='text-white'>Did Patient Receive IV Rehydration Therapy while at the ER?</h6>`,
                              escape: true,
                              class: 'bg-dark rounded p-1',
                            }"
                            required
                          >
                            .....</button
                          >? <span class="text-danger">*</span></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formRota.rehydration_therapy"
                          required
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.prev_hospitalization,
                        }"
                      >
                        <Label class="mb-2"
                          >Did Patient Have Previous Hospitalization<button
                            type="button"
                            class="btn btn-sm btn-light-info text-info p-0 m-0"
                            v-tooltip.top="{
                              value: `<h6 class='text-white'>Did Patient Have Previous Hospitalization due to Diarrhea?</h6>`,
                              escape: true,
                              class: 'bg-dark rounded p-2',
                            }"
                          >
                            .....</button
                          >? <span class="text-danger">*</span></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          @change="validFn.changeHospitalization($event)"
                          v-model="formRota.prev_hospitalization"
                          required
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.date_hospitalization &&
                            formRota.prev_hospitalization == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >If Yes, Date of Hospitalization
                          <span
                            v-if="formRota.prev_hospitalization == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          v-model="formRota.date_hospitalization"
                          :max="currentDate"
                          :disabled="formRota.prev_hospitalization != 'Y'"
                          class="form-control form-control-sm w-100 custom-font"
                          :required="formRota.prev_hospitalization == 'Y'"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.vomiting,
                        }"
                      >
                        <Label class="mb-2"
                          >Vomitting? <span class="text-danger">*</span></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          @change="validFn.changeVomitting($event)"
                          v-model="formRota.vomiting"
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
                            !validationStatus.date_vomiting &&
                            formRota.vomiting == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Date of Onset Vomitting
                          <span
                            v-if="formRota.vomiting == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          v-model="formRota.date_vomiting"
                          :max="currentDate"
                          :disabled="formRota.vomiting != 'Y'"
                          :required="formRota.vomiting == 'Y'"
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
                            !validationStatus.degree_dehydration &&
                            formRota.vomiting == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Degree of Dehyrdation?
                          <span
                            v-if="formRota.vomiting == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formRota.degree_dehydration"
                          :disabled="formRota.vomiting != 'Y'"
                          :required="formRota.vomiting == 'Y'"
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="NO">NO DEHYDRATION</option>
                          <option value="SOM">SOME DEHYDRATION</option>
                          <option value="SEV">SEVERE DEHYDRATION</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.fever,
                        }"
                      >
                        <Label class="mb-2"
                          >Fever? <span class="text-danger">*</span></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formRota.fever"
                          required
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div class="search">
                        <Label class="mb-2">Admitting Diagnosis</Label>
                        <textarea
                          class="form-control form-control-sm custom-font"
                          v-model="formRota.admitting_diagnosis"
                          rows="4"
                        ></textarea>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div class="search">
                        <Label class="mb-2">Final Diagnosis</Label>
                        <textarea
                          class="form-control form-control-sm custom-font"
                          v-model="formRota.final_diagnosis"
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
      <div class="tab-Item" v-if="selectedTab == 2">
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
            <form-card title="Epidemiologic Data">
              <template v-slot:formInput>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.more_diarrhea,
                        }"
                      >
                        <Label class="mb-2"
                          >Are there two or more diarrhea cases?
                          <span class="text-danger">*</span></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          @change="validFn.changeMoreDia($event)"
                          v-model="formRota.more_diarrhea"
                          required
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                          <option value="U">UNKNOWN</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.where_diarrhea &&
                            formRota.more_diarrhea == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >If Yes, where?
                          <span
                            v-if="formRota.more_diarrhea == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formRota.where_diarrhea"
                          :disabled="formRota.more_diarrhea != 'Y'"
                          :required="formRota.more_diarrhea == 'Y'"
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="COM">COMMUNITY</option>
                          <option value="SCH">SCHOOL</option>
                          <option value="HOU">HOUSEHOLD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </form-card>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-8 mb-2">
            <form-card title="Immunization History">
              <template v-slot:formInput>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.received_rota,
                        }"
                      >
                        <Label class="mb-2"
                          >Received Rotavirus Vaccine?
                          <span class="text-danger">*</span></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          @change="validFn.changeDose($event)"
                          v-model="formRota.received_rota"
                          required
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.dose_received &&
                            formRota.received_rota == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >If Yes, Total dose received
                          <span
                            v-if="formRota.received_rota == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="text"
                          v-model="formRota.dose_received"
                          @keypress="NumericOnly()"
                          :disabled="formRota.received_rota != 'Y'"
                          :required="formRota.received_rota == 'Y'"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div class="search">
                        <Label class="mb-2">Date First Dose received</Label>
                        <input
                          type="date"
                          v-model="formRota.first_dose"
                          :max="currentDate"
                          :disabled="formRota.received_rota != 'Y'"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div class="search">
                        <Label class="mb-2">Date Second Dose received</Label>
                        <input
                          type="date"
                          v-model="formRota.second_dose"
                          :max="currentDate"
                          :disabled="formRota.received_rota != 'Y'"
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
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <form-card title="Details of Investigator">
              <template v-slot:formInput>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.investigator_name,
                        }"
                      >
                        <Label class="mb-2"
                          >Name of Investigator
                          <span class="text-danger">*</span></Label
                        >

                        <input
                          type="text"
                          v-model="formRota.investigator_name"
                          class="form-control form-control-sm w-100 custom-font"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.position,
                        }"
                      >
                        <Label class="mb-2"
                          >Position / Designation
                          <span class="text-danger">*</span></Label
                        >
                        <input
                          type="text"
                          v-model="formRota.position"
                          class="form-control form-control-sm w-100 custom-font"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.contact,
                        }"
                      >
                        <Label class="mb-2"
                          >Contact No. <span class="text-danger">*</span></Label
                        >
                        <input
                          type="text"
                          v-model="formRota.contact"
                          maxlength="11"
                          @keypress="NumericOnly()"
                          class="form-control form-control-sm w-100 custom-font"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.investigation_date,
                        }"
                      >
                        <Label class="mb-2"
                          >Date of Investigation
                          <span class="text-danger">*</span></Label
                        >
                        <input
                          type="date"
                          v-model="formRota.investigation_date"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.report_date,
                        }"
                      >
                        <Label class="mb-2"
                          >Date of Report
                          <span class="text-danger">*</span></Label
                        >
                        <input
                          type="date"
                          v-model="formRota.report_date"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </form-card>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
            <form-card title="Classification and Outcome">
              <template v-slot:formInput>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.case_classification,
                        }"
                      >
                        <Label class="mb-2"
                          >Case Classification
                          <span class="text-danger">*</span></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formRota.case_classification"
                          required
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="SUS">SUSPECT</option>
                          <option value="PROB">PROBABLE</option>
                          <option value="CON">CONFIRMED</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.outcome,
                        }"
                      >
                        <Label class="mb-2"
                          >Outcome <span class="text-danger">*</span></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          @change="validFn.changeOutcome($event)"
                          v-model="formRota.outcome"
                          required
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="A">ALIVE</option>
                          <option value="D">DIED</option>
                          <option value="HAMA">
                            HOME AGAINST MEDICAL ADVICE
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.discharge_date &&
                            (formRota.outcome == 'A' ||
                              formRota.outcome == 'HAMA'),
                        }"
                      >
                        <Label class="mb-2"
                          >Date of Discharge
                          <span
                            v-if="
                              formRota.outcome == 'A' ||
                              formRota.outcome == 'HAMA'
                            "
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          v-model="formRota.discharge_date"
                          :max="currentDate"
                          :disabled="
                            formRota.outcome == '' || formRota.outcome == 'D'
                          "
                          :required="
                            formRota.outcome == 'A' ||
                            formRota.outcome == 'HAMA'
                          "
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.died_date &&
                            formRota.outcome == 'D',
                        }"
                      >
                        <Label class="mb-2"
                          >Date Died
                          <span
                            v-if="formRota.outcome == 'D'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          v-model="formRota.died_date"
                          :max="currentDate"
                          :disabled="formRota.outcome != 'D'"
                          :required="formRota.outcome == 'D'"
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
      <switch-tab
        :details="switchTabDetails"
        @switch-tab="switchSelect"
        @patient-list="backTo"
        @save-data="saveData()"
      />
      <!-- <pre>{{ validationStatus }}</pre>
      <pre>{{ diseaseDetails }}</pre>
      <pre>{{ patient }}</pre>
      <pre>{{ formDiseaseHistory }}</pre>
      <pre>{{ diseaseResponse }}</pre>
      <pre>{{ formRota }}</pre>
      <pre>{{ rotaResponse }}</pre> -->
    </div>
  </div>
  <loader
    :title="
      !patient.registry
        ? 'Updating Rota Virus Record'
        : 'Saving Rota Virus Record'
    "
    subTitle="Please Wait...."
    warning="true"
    v-if="savingFlag"
  />
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
} from "./functions/rotaValidation";
import { useToast } from "primevue/usetoast";
import Loader from "../../loader/Loader.vue";
import FormSkeleton from "../../loader/FormSkeleton.vue";
import RegistryNav from "@/components/pagination/RegistryNav.vue";
import SwitchTab from "@/components/pagination/SwitchTab.vue";

export default defineComponent({
  components: {
    FormCard,
    FormPatientInfo,
    Loader,
    FormSkeleton,
    RegistryNav,
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
      skeletonLoading();
      const response = await api.get(`/patients/${patient.value.patientId}`);
      formData.value = response.data.data;
      diseaseDetails.value.ep_id = `0038995-${caseName}-${epDate}-${trimZeroes(
        formData.value.patient_no
      )}`;
      diseaseDetails.value.case_id = `${caseDate}-`;
      if (patient.value.registry == false) {
        store.dispatch("fetchDiseaseHistory", patient.value.diseaseId);
        store.dispatch("fetchRota", patient.value.rotavirusId);
      } else {
        store.commit("setDiseaseHistoryEmpty");
        store.commit("setRotaEmpty");
      }
    };

    const tabs = ref([
      { id: 1, name: "Clinical Information" },
      { id: 2, name: "Other Information" },
    ]);

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
      maxTab: 2,
      title: "",
    });

    const modifyTab = (tab: number) => {
      switchTabDetails.value.currentTab = tab;

      const selectedTab = tabs.value.find((t) => t.id === tab);

      if (selectedTab) {
        switchTabDetails.value.title = selectedTab.name;
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
    const formRota = computed(() => store.getters.getRota);
    const rotaResponse = computed(() => store.getters.getRotaResponse);

    //forRegistry Only
    const caseName = "ROT";
    const epDate = moment(Date.now()).format("MMDDYY");
    const caseDate = moment(Date.now()).format("YYYY");
    const diseaseDetails = ref({
      id: 0,
      disease_date: currentDate,
      type: "1", //rota virus 1
      case_code: "ROTAVIRUS", //default case code for rota virus
      case_id: ``,
      ep_id: ``,
    });

    const saveDiseaseHistory = async (formRequest) => {
      console.log(formRequest);
      await store.dispatch("saveDiseaseHistory", formRequest);
    };

    const saveRota = async (formRequest) => {
      console.log(formRequest);
      await store.dispatch("saveRota", formRequest);
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
          await saveRota({
            ...formRota.value,
            disease_history_id: diseaseResponse.value.id,
            user_id: authUser.value.id,
          });

          savingFlag.value = false;
          let message = !patient.value.registry ? "Updated" : "Saved";
          swalMessage(
            swal,
            `Information`,
            `Patient Rota Virus Record ${message} Successfully`,
            "success"
          ).then(() => {
            router.push({ name: "patients", params: { type: "rota" } });
          });
        }
      });
    };

    const saveSubmitted = ref(false);
    const saveData = async () => {
      saveSubmitted.value = true;
      console.log("toast", toast);
      const errors = await validateFields(toast, formRota.value, 0);
      console.log("saving error", errors.value.errors, errors.value.tab);
      selectTab(errors.value.tab);

      if (errors.value.errors == 0) {
        await savingConfirmation();
        // alert('saving...')
      }
    };

    const resetter = () => {
      savingFlag.value = false;
      saveSubmitted.value = false;
      selectedTab.value = 1;
    };

    watch(
      () => {
        formRota.value;
        if (saveSubmitted.value == true) {
          validateFields(toast, formRota.value, 1);
          console.log("adssa");
        }
      },
      { deep: true }
    );

    const skelPatientInfo = { count: 3, perRow: 3, withButtons: false };
    const skelClinical = {
      count: !patient.registry ? 5 : 4,
      perRow: 3,
      withButtons: false,
    };
    const skelEpi = { count: 2, perRow: 1, withButtons: false };

    const isLoading = ref(true);
    const skeletonLoading = async () => {
      setTimeout(() => {
        isLoading.value = false;
        console.log("isLoading:", isLoading.value);
      }, 1500);
    };

    onMounted(async () => {
      await fetchPatientInfo();
      resetter();
    });

    return {
      patient,
      formData,
      currentDate,
      selectTab,
      selectedTab,
      formDiseaseHistory,
      formRota,
      diseaseResponse,
      rotaResponse,
      NumericOnly,
      saveData,
      diseaseDetails,
      validFn,
      validationStatus,
      saveSubmitted,
      savingFlag,
      isLoading,
      skelPatientInfo,
      skelClinical,
      skelEpi,
      //tabs
      tabs,
      switchSelect,
      switchTabDetails,
      backTo,
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
</style>
