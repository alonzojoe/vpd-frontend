<template>
  <registry-nav
    class="position-fixed z-3 mr-5"
    :tabs="tabs"
    :patient="patient"
    :selectedTab="selectedTab"
    @save-data="saveData()"
    @select-tab="selectTab($event)"
  />
  <div class="card my-0" style="margin-right: 50px">
    <div class="card-body menin-content py-4">
      <Toast />
      <div class="tab-Item" v-if="selectedTab == 1">
        <div class="row">
          <div class="col-sm-12 mb-2 col-lg-12">
            <form-skeleton :data="skelPatientInfo" v-if="isLoading" />
            <form-patient-info :formData="formData" v-else />
          </div>
          <div class="col-sm-12 col-md-12 mb-2 col-lg-12">
            <form-skeleton :data="skelClinical" v-if="isLoading" />
            <meningitis-clinical
              v-else
              :patient="patient"
              :formData="formData"
              :saveSubmitted="saveSubmitted"
              :validationStatus="validationStatus"
            />
          </div>
        </div>
      </div>
      <div class="tab-Item" v-if="selectedTab == 2">
        <div class="row">
          <div class="col-sm-12 mb-2 col-lg-12">
            <form-card title="Details of Investigator">
              <template v-slot:formInput>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
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
                          v-model="formMenin.investigator_name"
                          class="form-control form-control-sm w-100 custom-font"
                          maxlength="255"
                          required
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
                            saveSubmitted && !validationStatus.position,
                        }"
                      >
                        <Label class="mb-2"
                          >Position / Designation
                          <span class="text-danger">*</span></Label
                        >
                        <input
                          type="text"
                          v-model="formMenin.position"
                          class="form-control form-control-sm w-100 custom-font"
                          maxlength="255"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
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
                          v-model="formMenin.contact"
                          maxlength="11"
                          @keypress="NumericOnly()"
                          class="form-control form-control-sm w-100 custom-font"
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
                            !validationStatus.investigation_date,
                        }"
                      >
                        <Label class="mb-2"
                          >Date of Investigation
                          <span class="text-danger">*</span></Label
                        >
                        <input
                          type="date"
                          v-model="formMenin.investigation_date"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted && !validationStatus.report_date,
                        }"
                      >
                        <Label class="mb-2"
                          >Date of Report to CHD
                          <span class="text-danger">*</span></Label
                        >
                        <input
                          type="date"
                          v-model="formMenin.report_date"
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
          <div class="col-sm-12 col-md-12 mb-2 col-lg-12">
            <form-card title="Vacination History">
              <template v-slot:formInput>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div class="search">
                        <Label class="mb-2">JE</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMenin.changeJe($event)"
                          v-model="formMenin.je"
                        >
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
                            !validationStatus.je_datedose &&
                            formMenin.je == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >JE Date Last Dose
                          <span v-if="formMenin.je == 'Y'" class="text-danger"
                            >*</span
                          >
                        </Label>
                        <input
                          type="date"
                          v-model="formMenin.je_datedose"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.je != 'Y'"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.je_doses &&
                            formMenin.je == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >JE No. of Doses
                          <span v-if="formMenin.je == 'Y'" class="text-danger"
                            >*</span
                          >
                        </Label>
                        <input
                          type="text"
                          v-model="formMenin.je_doses"
                          class="form-control form-control-sm w-100 custom-font"
                          @keypress="NumericOnly()"
                          maxlength="2"
                          :disabled="formMenin.je != 'Y'"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div class="search">
                        <Label class="mb-2">Penta-Hib</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMenin.changePenta($event)"
                          v-model="formMenin.penta"
                        >
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
                            !validationStatus.penta_datedose &&
                            formMenin.penta == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Penta-Hib Date Last Dose
                          <span
                            v-if="formMenin.penta == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          v-model="formMenin.penta_datedose"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          maxlength="2"
                          :disabled="formMenin.penta != 'Y'"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.penta_doses &&
                            formMenin.penta == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Penta-Hib No. of Doses
                          <span
                            v-if="formMenin.penta == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="text"
                          v-model="formMenin.penta_doses"
                          @keypress="NumericOnly()"
                          maxlength="2"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.penta != 'Y'"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div class="search">
                        <Label class="mb-2">Measles</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMenin.changeMeasles($event)"
                          v-model="formMenin.measles"
                        >
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
                            !validationStatus.measles_datedose &&
                            formMenin.measles == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Measles Date Last Dose
                          <span
                            v-if="formMenin.measles == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          :max="currentDate"
                          v-model="formMenin.measles_datedose"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.measles != 'Y'"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.measles_doses &&
                            formMenin.measles == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Measles No. of Doses
                          <span
                            v-if="formMenin.measles == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="text"
                          v-model="formMenin.measles_doses"
                          @keypress="NumericOnly()"
                          maxlength="2"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.measles != 'Y'"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div class="search">
                        <Label class="mb-2">Meningococcal</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMenin.changeMeningo($event)"
                          v-model="formMenin.meningo"
                        >
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
                            !validationStatus.meningo_datedose &&
                            formMenin.meningo == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Meningococcal Date Last Dose
                          <span
                            v-if="formMenin.meningo == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          v-model="formMenin.meningo_datedose"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.meningo != 'Y'"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.meningo_doses &&
                            formMenin.meningo == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Meningococcal No. of Doses
                          <span
                            v-if="formMenin.meningo == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="text"
                          v-model="formMenin.meningo_doses"
                          @keypress="NumericOnly()"
                          maxlength="2"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.meningo != 'Y'"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div class="search">
                        <Label class="mb-2">Pneumococcal</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMenin.changePneumo($event)"
                          v-model="formMenin.pneumo"
                        >
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
                            !validationStatus.pneumo_datedose &&
                            formMenin.pneumo == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Pneumococcal Date Last Dose
                          <span
                            v-if="formMenin.pneumo == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          v-model="formMenin.pneumo_datedose"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.pneumo != 'Y'"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.pneumo_doses &&
                            formMenin.pneumo == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Pneumococcal No. of Doses
                          <span
                            v-if="formMenin.pneumo == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="text"
                          v-model="formMenin.pneumo_doses"
                          @keypress="NumericOnly()"
                          maxlength="2"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.pneumo != 'Y'"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div class="search">
                        <Label class="mb-2">PCV10</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMenin.changePcv10($event)"
                          v-model="formMenin.pcv10"
                        >
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
                            !validationStatus.pcv10_datedose &&
                            formMenin.pcv10 == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >PCV10 Date Last Dose
                          <span
                            v-if="formMenin.pcv10 == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          v-model="formMenin.pcv10_datedose"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.pcv10 != 'Y'"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.pcv10_doses &&
                            formMenin.pcv10 == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >PCV10 No. of Doses
                          <span
                            v-if="formMenin.pcv10 == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="text"
                          v-model="formMenin.pcv10_doses"
                          @keypress="NumericOnly()"
                          maxlength="2"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.pcv10 != 'Y'"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div class="search">
                        <Label class="mb-2">PCV13</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMenin.changePcv13($event)"
                          v-model="formMenin.pcv13"
                        >
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
                            !validationStatus.pcv13_datedose &&
                            formMenin.pcv13 == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >PCV13 Date Last Dose
                          <span
                            v-if="formMenin.pcv13 == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          v-model="formMenin.pcv13_datedose"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.pcv13 != 'Y'"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.pcv13_doses &&
                            formMenin.pcv13 == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >PCV13 No. of Doses
                          <span
                            v-if="formMenin.pcv13 == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="text"
                          v-model="formMenin.pcv13_doses"
                          @keypress="NumericOnly()"
                          maxlength="2"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.pcv13 != 'Y'"
                          required
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
      <div class="tab-Item" v-if="selectedTab == 3">
        <div class="row">
          <div class="col-sm-12 col-md-12 mb-2 col-lg-12">
            <form-card title="Exposure History">
              <template v-slot:formInput>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Day Care</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMenin.daycare"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Barangay</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMenin.barangay"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Home</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMenin.home"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">School</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMenin.school"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Dormitory</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMenin.dormitory"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Health Care Facility</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMenin.healthcare"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Work Place</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMenin.workplace"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2">Other Exposure</Label>
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMenin.changeExposure($event)"
                          v-model="formMenin.other"
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
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
                            !validationStatus.other_specify &&
                            formMenin.other == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Other Exposure Specify
                          <span
                            v-if="formMenin.other == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="text"
                          v-model="formMenin.other_specify"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.other != 'Y'"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-2">
                      <div class="search">
                        <Label class="mb-2"
                          >Did the Patient Travel Outside<button
                            type="button"
                            class="btn btn-sm btn-light-info text-info p-0 m-0"
                            v-tooltip.top="{
                              value: `<h6 class='text-white'>Did the Patient Travel Outside of the Province in 2 Weeks Prior to Illness?</h6>`,
                              escape: true,
                              class: 'bg-dark rounded p-1',
                            }"
                            required
                          >
                            .....</button
                          >?</Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMenin.changeTravel($event)"
                          v-model="formMenin.travel"
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
                            !validationStatus.travel_place &&
                            formMenin.travel == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >If Yes, Specify Place
                          <span
                            v-if="formMenin.travel == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="text"
                          v-model="formMenin.travel_place"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.travel != 'Y'"
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
                            !validationStatus.travel_from &&
                            formMenin.travel == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Date Travelled From:
                          <span
                            v-if="formMenin.travel == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          v-model="formMenin.travel_from"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.travel != 'Y'"
                          required
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
                            saveSubmitted &&
                            !validationStatus.travel_to &&
                            formMenin.travel == 'Y',
                        }"
                      >
                        <Label class="mb-2"
                          >Date Travelled To:
                          <span
                            v-if="formMenin.travel == 'Y'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="date"
                          v-model="formMenin.travel_to"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.travel != 'Y'"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </form-card>
          </div>
          <div class="col-sm-12 col-md-12 mb-2 col-lg-6">
            <form-card title="Case Management">
              <template v-slot:formInput>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div class="search">
                        <Label class="mb-2"
                          >Where Blood/CSF Extracted<button
                            type="button"
                            class="btn btn-sm btn-light-info text-info p-0 m-0"
                            v-tooltip.top="{
                              value: `<h6 class='text-white'>Where Blood/CSF Extracted Before the First Dose of Antibiotics Was Given to the Patient?`,
                              escape: true,
                              class: 'bg-dark rounded p-1',
                            }"
                          >
                            .....</button
                          >?</Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          v-model="formMenin.where_blood"
                        >
                          <option value="Y">YES</option>
                          <option value="N">NO</option>
                          <option value="U">UNKNOWN</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </form-card>
          </div>
          <div class="col-sm-12 col-md-12 mb-2 col-lg-6">
            <form-card title="A. For Acute Encephalitis Syndrome">
              <template v-slot:formInput>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.acase_classification,
                        }"
                      >
                        <Label class="mb-2"
                          >A. Case Classification
                          <span class="text-danger">*</span></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMenin.changeAes($event)"
                          v-model="formMenin.acase_classification"
                          required
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="SUS">Suspected</option>
                          <option value="LAB">Laboratory confirmed JE</option>
                          <option value="PROB">Probable JE</option>
                          <option value="AESOTHER">AES other agent</option>
                          <option value="U">Unknown</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.aes_other &&
                            formMenin.acase_classification == 'AESOTHER',
                        }"
                      >
                        <Label class="mb-2"
                          >A. AES Other Agent
                          <span
                            v-if="formMenin.acase_classification == 'AESOTHER'"
                            class="text-danger"
                            >*</span
                          ></Label
                        >
                        <input
                          type="text"
                          v-model="formMenin.aes_other"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="
                            formMenin.acase_classification != 'AESOTHER'
                          "
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </form-card>
          </div>
          <div class="col-sm-12 col-md-6 mb-2 col-lg-6">
            <form-card title="B. For Bacterial Meningitis">
              <template v-slot:formInput>
                <div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.bcase_classification,
                        }"
                      >
                        <Label class="mb-2"
                          >B. Case Classification
                          <span class="text-danger">*</span></Label
                        >
                        <select
                          class="form-select form-control form-control-sm"
                          @change="fnMenin.changeConfirmed($event)"
                          v-model="formMenin.bcase_classification"
                          required
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="SUS">Suspected Meningitis</option>
                          <option value="PROB">
                            Probable Bacterial Meningitis
                          </option>
                          <option value="CON">Confirmed Meningitis</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.confirmed_case &&
                            formMenin.bcase_classification == 'CON',
                        }"
                      >
                        <Label class="mb-2"
                          >B. Confirmed,Confirmatory Test
                          <span
                            v-if="formMenin.bcase_classification == 'CON'"
                            class="text-danger"
                            >*</span
                          >
                        </Label>
                        <input
                          type="text"
                          v-model="formMenin.confirmed_case"
                          class="form-control form-control-sm w-100 custom-font"
                          :disabled="formMenin.bcase_classification != 'CON'"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-12 mb-2">
                      <div class="search">
                        <Label class="mb-2">B. Final Diagnosis</Label>
                        <input
                          type="text"
                          v-model="formMenin.final_diagnosis"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </form-card>
          </div>
          <div class="col-sm-12 col-md-6 mb-2 col-lg-6">
            <form-card title="Outcome">
              <template v-slot:formInput>
                <div>
                  <div class="row">
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
                          @change="fnMenin.changeOutcome($event)"
                          v-model="formMenin.outcome"
                          required
                        >
                          <option value="">PLEASE SELECT</option>
                          <option value="A">Alive</option>
                          <option value="D">Died</option>
                          <option value="HAMA">
                            Home Against Medical Advice
                          </option>
                        </select>
                      </div>
                    </div>
                    <div
                      class="col-sm-12 col-md-6 col-lg-6 mb-2"
                      v-if="formMenin.outcome == 'A'"
                    >
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.date_discharge &&
                            formMenin.outcome == 'A',
                        }"
                      >
                        <Label class="mb-2"
                          >Date of Discharge
                          <span class="text-danger">*</span></Label
                        >
                        <input
                          type="date"
                          v-model="formMenin.date_discharge"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          required
                        />
                      </div>
                    </div>
                    <div
                      class="col-sm-12 col-md-6 col-lg-6 mb-2"
                      v-if="formMenin.outcome == 'D'"
                    >
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.date_died &&
                            formMenin.outcome == 'D',
                        }"
                      >
                        <Label class="mb-2"
                          >Date of Death
                          <span class="text-danger">*</span></Label
                        >
                        <input
                          type="date"
                          v-model="formMenin.date_died"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          required
                        />
                      </div>
                    </div>
                    <div
                      class="col-sm-12 col-md-6 col-lg-6 mb-2"
                      v-if="formMenin.outcome == 'HAMA'"
                    >
                      <div
                        class="search"
                        :class="{
                          'group-invalid':
                            saveSubmitted &&
                            !validationStatus.date_hama &&
                            formMenin.outcome == 'HAMA',
                        }"
                      >
                        <Label class="mb-2"
                          >Date if HAMA
                          <span class="text-danger">*</span></Label
                        >
                        <input
                          type="date"
                          v-model="formMenin.date_hama"
                          :max="currentDate"
                          class="form-control form-control-sm w-100 custom-font"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div class="search">
                        <Label class="mb-2"
                          >Date of ff-up<button
                            type="button"
                            class="btn btn-sm btn-light-info text-info p-0 m-0"
                            v-tooltip.top="{
                              value: `<h6 class='text-white'>If JE, ff-up after 3 mos</h6>`,
                              escape: true,
                              class: 'bg-dark rounded p-1',
                            }"
                            required
                          >
                            .....</button
                          >?</Label
                        >
                        <input
                          type="date"
                          v-model="formMenin.date_follow"
                          class="form-control form-control-sm w-100 custom-font"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-2">
                      <div class="search">
                        <Label class="mb-2">Status at ff-up</Label>
                        <input
                          type="text"
                          v-model="formMenin.status_follow"
                          class="form-control form-control-sm w-100 custom-font"
                          maxlength="255"
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
    </div>
  </div>
  <!-- <pre>{{ formMenin }}</pre> -->
  <loader
    :title="
      !patient.registry
        ? 'Updating Acute Meningitis-Encephalitis Record'
        : 'Saving Acute Meningitis-Encephalitis Record'
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
import { useToast } from "primevue/usetoast";
import Loader from "../../loader/Loader.vue";
import FormSkeleton from "../../loader/FormSkeleton.vue";
import * as fnMenin from "./functions/meningitis";
import {
  validateFields,
  validationStatus,
  validateChecker,
} from "./functions/meningitisValidation";
import RegistryNav from "@/components/pagination/RegistryNav.vue";
import SwitchTab from "@/components/pagination/SwitchTab.vue";
import MeningitisClinical from "./meningitiscomponents/MeningitisClinical.vue";
export default defineComponent({
  components: {
    FormCard,
    FormPatientInfo,
    Loader,
    FormSkeleton,
    RegistryNav,
    SwitchTab,
    MeningitisClinical,
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
        store.dispatch("fetchMenin", patient.value.meningitisId);
      } else {
        store.commit("setDiseaseHistoryEmpty");
        store.commit("setMeninEmpty");
      }
    };

    const tabs = ref([
      { id: 1, name: "Clinical Information" },
      { id: 2, name: "Investigator Details & Vaccination History" },
      { id: 3, name: "Exposure History & Other Information" },
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
      maxTab: 3,
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
    const formMenin = computed(() => store.getters.getMenin);
    const meninResponse = computed(() => store.getters.getMeninResponse);

    //registry
    //forRegistry Only
    const caseName = "AME";
    const epDate = moment(Date.now()).format("MMDDYY");
    const caseDate = moment(Date.now()).format("YYYY");
    const diseaseDetails = ref({
      id: 0,
      disease_date: currentDate,
      type: "2", //meningitis type 2
      case_code: "AMES", //default case code meningitis
      case_id: ``,
      ep_id: ``,
    });

    const saveDiseaseHistory = async (formRequest) => {
      await store.dispatch("saveDiseaseHistory", formRequest);
    };

    const saveMenin = async (formRequest) => {
      await store.dispatch("saveMenin", formRequest);
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

          await saveMenin({
            ...formMenin.value,
            disease_history_id: diseaseResponse.value.id,
            user_id: authUser.value.id,
          });

          savingFlag.value = false;
          let message = !patient.value.registry ? "Updated" : "Saved";
          swalMessage(
            swal,
            `Information`,
            `Patient AMES Record ${message} Successfully`,
            "success"
          ).then(() => {
            router.push({ name: "patients", params: { type: "meningitis" } });
          });
        }
      });
    };

    const saveSubmitted = ref(false);
    const saveData = async () => {
      saveSubmitted.value = true;
      const errors = await validateFields(toast, formMenin.value, 0);
      console.log("saving error", errors.value.errors, errors.value.tab);
      selectTab(errors.value.tab);

      if (errors.value.errors == 0) {
        await savingConfirmation();
      }
    };

    const resetter = () => {
      savingFlag.value = false;
      saveSubmitted.value = false;
      selectedTab.value = 1;
    };

    watch(
      () => {
        formMenin.value;
        if (saveSubmitted.value == true) {
          validateFields(toast, formMenin.value, 1);
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

    const skelInvestigator = { count: 2, perRow: 3, withButtons: false };
    const skelVaccination = { count: 7, perRow: 3, withButtons: false };
    const skelExposure = { count: 4, perRow: 4, withButtons: false };
    const skelCase = { count: 1, perRow: 3, withButtons: false };
    const skelAClass = { count: 1, perRow: 2, withButtons: false };
    const skelBClass = { count: 2, perRow: 2, withButtons: false };
    const skelOutCome = { count: 2, perRow: 2, withButtons: false };

    const isLoading = ref(true);
    const skeletonLoading = async () => {
      setTimeout(() => {
        isLoading.value = false;
        console.log("isLoading:", isLoading.value);
      }, 1500);
    };

    onMounted(async () => {
      await fetchPatientInfo();
      console.log("onMounted", patient.value);
      resetter();
    });

    return {
      patient,
      formData,
      currentDate,
      selectedTab,
      selectTab,
      NumericOnly,

      formDiseaseHistory,
      diseaseResponse,
      formMenin,
      fnMenin,
      //saving
      savingFlag,
      savingConfirmation,
      saveData,
      //validation
      validationStatus,
      saveSubmitted,
      //loader
      isLoading,
      skelPatientInfo,
      skelClinical,
      skelInvestigator,
      skelVaccination,
      skelExposure,
      skelCase,
      skelAClass,
      skelBClass,
      skelOutCome,
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

.card {
  margin-right: 50px;
}

.menin-content {
  margin-top: 50px !important;
}

@media screen and (max-width: 991px) {
  .nav-pills {
    display: none !important;
  }
  .card {
    margin-right: 0;
  }
  .menin-content {
    margin-top: 0px !important;
  }
}
</style>
