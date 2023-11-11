<template>
  <div class="accordion" id="accordionPanelsStayOpenExample">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button p-2 m-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panelsStayOpen-collapseOne"
          aria-expanded="true"
          aria-controls="panelsStayOpen-collapseOne"
        >
          <h5 class="fw-bolder px-2">I. Patient Information</h5>
        </button>
      </h2>
      <div
        id="panelsStayOpen-collapseOne"
        class="accordion-collapse collapse show"
      >
        <div class="accordion-body">
          <div class="group-style border mt-2">
            <div class="legend"><p>Patient Information</p></div>
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-2">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4">Last Name</label>
                  <input
                    type="text"
                    class="form-control form-control-sm fw-bolder fs-4"
                  />
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-2">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4">First Name</label>
                  <input
                    type="text"
                    class="form-control form-control-sm fw-bolder fs-4"
                  />
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-2">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4">Middle Name</label>
                  <input
                    type="text"
                    class="form-control form-control-sm fw-bolder fs-4"
                  />
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-2">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4">Gender</label>
                  <select
                    class="form-select form-control form-control-sm fw-bolder fs-4"
                  >
                    <option value="">Please Select</option>
                    <option value="">Male</option>
                    <option value="">Female</option>
                  </select>
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-2">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4">Date of Birth</label>
                  <input
                    type="date"
                    class="form-control form-control-sm fw-bolder fs-4"
                  />
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-2">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4">Age</label>
                  <input
                    type="text"
                    class="form-control form-control-sm fw-bolder fs-4"
                  />
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-lg-6">
              <div class="group-style border mt-2">
                <div class="legend"><p>Permanent Address</p></div>
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4">Street</label>
                      <input
                        type="text"
                        class="form-control form-control-sm fw-bolder fs-4"
                      />
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4">Province</label>
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Male</option>
                        <option value="">Female</option>
                      </select>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >City/Municipality</label
                      >
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Male</option>
                        <option value="">Female</option>
                      </select>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4">Barangay</label>
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Male</option>
                        <option value="">Female</option>
                      </select>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4">Region</label>
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Male</option>
                        <option value="">Female</option>
                      </select>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-lg-6">
              <div class="group-style border mt-2">
                <div class="legend"><p>Current Address</p></div>
                <div class="row position-absolute cst-cb-address">
                  <div class="d-flex">
                    <input
                      type="checkbox"
                      id="sameAsPerma"
                      class="mr-2"
                      value="sameAsPermanent"
                    />
                    <label for="sameAsPerma" class="p-0 m-0"
                      ><b>&nbsp;&nbsp;Same as Permanent Address </b>
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4">Street</label>
                      <input
                        type="text"
                        class="form-control form-control-sm fw-bolder fs-4"
                      />
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4">Province</label>
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Male</option>
                        <option value="">Female</option>
                      </select>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >City/Municipality</label
                      >
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Male</option>
                        <option value="">Female</option>
                      </select>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4">Barangay</label>
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Male</option>
                        <option value="">Female</option>
                      </select>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4">Region</label>
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Male</option>
                        <option value="">Female</option>
                      </select>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="group-style border mt-2">
            <div class="legend"><p>Other Information</p></div>
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-6">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4"
                    >Is the patient is member of Indigenous people(IP)?</label
                  >
                  <div class="row">
                    <div class="col-5">
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">No</option>
                        <option value="">Yes</option>
                      </select>
                    </div>
                    <div class="col-7">
                      <input
                        type="text"
                        class="form-control form-control-sm fw-bolder fs-4"
                        placeholder="Please speicify"
                      />
                    </div>
                  </div>
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-6">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4"
                    >Is the patient enrolled in 4 P's (National Household
                    Targeting System)?</label
                  >
                  <div class="row">
                    <div class="col-7">
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">No</option>
                        <option value="">Yes</option>
                      </select>
                    </div>
                  </div>
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button p-2 m-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#clinical"
          aria-expanded="true"
          aria-controls="clinical"
        >
          <h5 class="fw-bolder px-2">
            II. Clinical Data, Epidemiologic, Immunization History and Details
            of Investigator/Reporting
          </h5>
        </button>
      </h2>
      <div id="clinical" class="accordion-collapse collapse show">
        <div class="accordion-body">
          <div class="group-style border mt-2">
            <div class="legend"><p>Clinical Information</p></div>
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4"
                    >Date of Onset of Diarrhea</label
                  >
                  <div class="row">
                    <div class="col-12">
                      <span>&nbsp;</span>
                      <input
                        type="date"
                        class="form-control form-control-sm fw-bolder fs-4"
                      />
                    </div>
                  </div>
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-8">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4"
                    >Was the patient admitted at the ward for diarrhea?</label
                  >
                  <div class="row">
                    <div class="col-4">
                      <span>&nbsp;</span>
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">No</option>
                        <option value="">Yes</option>
                      </select>
                    </div>
                    <div class="col-4">
                      <span>Date of Admission</span>
                      <input
                        type="date"
                        class="form-control form-control-sm fw-bolder fs-4"
                        placeholder="Please speicify"
                      />
                    </div>
                  </div>
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4"
                    >Did patient receive IV rehydration therapy while at the
                    ER?</label
                  >
                  <div class="row">
                    <div class="col-12">
                      <span>&nbsp;</span>
                      <input
                        type="date"
                        class="form-control form-control-sm fw-bolder fs-4"
                      />
                    </div>
                  </div>
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-8">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4"
                    >Did the patient have previous hospitalization due to
                    diarrhea?</label
                  >
                  <div class="row">
                    <div class="col-4">
                      <span>&nbsp;</span>
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">No</option>
                        <option value="">Yes</option>
                      </select>
                    </div>
                    <div class="col-4">
                      <span>Date of hospitalization</span>
                      <input
                        type="date"
                        class="form-control form-control-sm fw-bolder fs-4"
                        placeholder="Please speicify"
                      />
                    </div>
                  </div>
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4">Vomitting</label>
                  <div class="row">
                    <div class="col-6">
                      <span>&nbsp;</span>
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">No</option>
                        <option value="">Yes</option>
                      </select>
                    </div>
                    <div class="col-6">
                      <span>Date of vomitting</span>
                      <input
                        type="date"
                        class="form-control form-control-sm fw-bolder fs-4"
                        placeholder="Please speicify"
                      />
                    </div>
                  </div>
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-5">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4"
                    >Degree of dehydration</label
                  >
                  <div class="row">
                    <div class="col-4">
                      <span>&nbsp;</span>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="nodehy"
                        />
                        <label class="form-check-label" for="nodehy">
                          No dehydration
                        </label>
                      </div>
                    </div>
                    <div class="col-4">
                      <span>&nbsp;</span>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="somedehy"
                        />
                        <label class="form-check-label" for="somedehy">
                          Some dehyrdration
                        </label>
                      </div>
                    </div>
                    <div class="col-4">
                      <span>&nbsp;</span>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="severdehy"
                        />
                        <label class="form-check-label" for="severdehy">
                          Severe dehyrdration
                        </label>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-3">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4">Fever</label>
                  <div class="row">
                    <div class="col-12">
                      <span>&nbsp;</span>
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">No</option>
                        <option value="">Yes</option>
                      </select>
                    </div>
                  </div>
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-6">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4"
                    >Admitting diagnosis</label
                  >
                  <textarea
                    class="form-control form-control-sm fw-bolder fs-4"
                    rows="5"
                  ></textarea>
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-6">
                <div class="mb-3">
                  <label class="form-label fw-bold fs-4">Final diagnosis</label>
                  <textarea
                    class="form-control form-control-sm fw-bolder fs-4"
                    rows="5"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-lg-4">
              <div class="group-style border mt-2">
                <div class="legend"><p>Epidemiologic</p></div>
                <div class="row">
                  <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Are there two or more diarrhea cases?</label
                      >
                      <div class="row">
                        <div class="col-6">
                          <select
                            class="form-select form-control form-control-sm fw-bolder fs-4"
                          >
                            <option value="">Please Select</option>
                            <option value="">Yes</option>
                            <option value="">No</option>
                            <option value="">Unknown</option>
                          </select>
                        </div>
                        <div class="col-6"></div>
                      </div>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >If yes, Where?</label
                      >
                      <div class="row">
                        <div class="col-6">
                          <select
                            class="form-select form-control form-control-sm fw-bolder fs-4"
                          >
                            <option value="">Please Select</option>
                            <option value="">Community</option>
                            <option value="">School</option>
                            <option value="">Household</option>
                          </select>
                        </div>
                        <div class="col-6"></div>
                      </div>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-lg-8">
              <div class="group-style border mt-2">
                <div class="legend"><p>Immunization History</p></div>
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Are there two or more diarrhea cases?</label
                      >

                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Yes</option>
                        <option value="">No</option>
                        <option value="">Unknown</option>
                      </select>

                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Total Dose received?</label
                      >
                      <input
                        type="text"
                        class="form-control form-control-sm fw-bolder fs-4"
                      />
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Date first dose received</label
                      >

                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Yes</option>
                        <option value="">No</option>
                        <option value="">Unknown</option>
                      </select>

                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Date last dose received</label
                      >
                      <input
                        type="date"
                        class="form-control form-control-sm fw-bolder fs-4"
                      />
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="col-sm-12 col-lg-4">
              <div class="group-style border mt-2">
                <div class="legend">
                  <p>Details of Investigator/Reporting</p>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Are there two or more diarrhea cases?</label
                      >
                      <div class="row">
                        <div class="col-6">
                          <select
                            class="form-select form-control form-control-sm fw-bolder fs-4"
                          >
                            <option value="">Please Select</option>
                            <option value="">Yes</option>
                            <option value="">No</option>
                            <option value="">Unknown</option>
                          </select>
                        </div>
                        <div class="col-6">
                          <select
                            class="form-select form-control form-control-sm fw-bolder fs-4"
                          >
                            <option value="">Please Select</option>
                            <option value="">Community</option>
                            <option value="">School</option>
                            <option value="">Household</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
          <div class="row">
            <div class="col-sm-12 col-lg-12">
              <div class="group-style border mt-2">
                <div class="legend">
                  <p>Details of Investigator/Reporting</p>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Name of Investigator</label
                      >
                      <input
                        type="text"
                        class="form-control form-control-sm fw-bolder fs-4"
                      />
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Position / Designation</label
                      >
                      <input
                        type="text"
                        class="form-control form-control-sm fw-bolder fs-4"
                      />
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Contact Number</label
                      >
                      <input
                        type="text"
                        class="form-control form-control-sm fw-bolder fs-4"
                      />
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Date of Investigation</label
                      >
                      <input
                        type="date"
                        class="form-control form-control-sm fw-bolder fs-4"
                      />
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Date of Report</label
                      >
                      <input
                        type="date"
                        class="form-control form-control-sm fw-bolder fs-4"
                      />
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button p-2 m-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#laboratory"
          aria-expanded="true"
          aria-controls="laboratory"
        >
          <h5 class="fw-bolder px-2">III. Laboratory Data</h5>
        </button>
      </h2>
      <div id="laboratory" class="accordion-collapse collapse show">
        <div class="accordion-body">
          <div class="row">
            <div class="col-sm-12 col-lg-6">
              <div class="group-style border mt-2">
                <div class="legend"><p>Stool Specimen</p></div>
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Stool collected?</label
                      >
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Yes</option>
                        <option value="">No</option>
                      </select>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >If yes, Date taken</label
                      >
                      <input
                        type="date"
                        class="form-control form-control-sm fw-bolder fs-4"
                      />
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Date sent to RITM</label
                      >
                      <input
                        type="date"
                        class="form-control form-control-sm fw-bolder fs-4"
                      />
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-lg-6">
              <div class="group-style border mt-2">
                <div class="legend">
                  <p>Specimen Condition and Adequency</p>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Date received by RITM</label
                      >
                      <input
                        type="date"
                        class="form-control form-control-sm fw-bolder fs-4"
                      />
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4">Condition</label>
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Frozen</option>
                        <option value="">Thawed but cold</option>
                        <option value="">Warm</option>
                      </select>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >No of ice packs</label
                      >
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Male</option>
                        <option value="">Female</option>
                      </select>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Quantity of stool</label
                      >
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Sufficient</option>
                        <option value="">
                          SUfficient for ELISA but no remaining sample
                        </option>
                        <option value="">Insufficient</option>
                      </select>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-3">
              <div class="group-style border mt-2">
                <div class="legend"><p>Elisa Result</p></div>

                <div class="mb-3">
                  <label class="form-label fw-bold fs-4">Result</label>
                  <select
                    class="form-select form-control form-control-sm fw-bolder fs-4"
                  >
                    <option value="">Please Select</option>
                    <option value="">NEG</option>
                    <option value="">POS</option>
                    <option value="">Equivocal</option>
                  </select>
                  <!-- <div class="form-text">Validate</div> -->
                </div>

                <div class="mb-3">
                  <label class="form-label fw-bold fs-4">Date of result</label>
                  <input
                    type="date"
                    class="form-control form-control-sm fw-bolder fs-4"
                  />
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-3">
              <div class="group-style border mt-2">
                <div class="legend"><p>PCR Result</p></div>

                <div class="mb-3">
                  <label class="form-label fw-bold fs-4">Genotype</label>
                  <input
                    type="text"
                    class="form-control form-control-sm fw-bolder fs-4"
                  />
                  <!-- <div class="form-text">Validate</div> -->
                </div>

                <div class="mb-3">
                  <label class="form-label fw-bold fs-4">Date of result</label>
                  <input
                    type="date"
                    class="form-control form-control-sm fw-bolder fs-4"
                  />
                  <!-- <div class="form-text">Validate</div> -->
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div class="group-style border mt-2">
                <div class="legend"><p>Classification and Outcome</p></div>
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Classification</label
                      >
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Suspected</option>
                        <option value="">Confirmed</option>
                      </select>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4">&nbsp;</label>
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Yes</option>
                        <option value="">No</option>
                      </select>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4">Outcome</label>
                      <select
                        class="form-select form-control form-control-sm fw-bolder fs-4"
                      >
                        <option value="">Please Select</option>
                        <option value="">Alive</option>
                        <option value="">Dead</option>
                      </select>
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="mb-3">
                      <label class="form-label fw-bold fs-4"
                        >Date of discharge / Date of Death</label
                      >
                      <input
                        type="date"
                        class="form-control form-control-sm fw-bolder fs-4"
                      />
                      <!-- <div class="form-text">Validate</div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
:root {
  --color-danger: #fa896b;
  --color-info: #49beff;
  --color-success: #13deb9;
  --color-warning: #539bff;
  --color-purple: #615dff;
}

.form-select {
  padding: 5px !important;
}

.group-style {
  margin-bottom: 20px;
  padding: 40px 20px;
  position: relative;
  /* border-radius: 7px; */
  /* border: 1px solid #a9abb9 !important; */
  border: 1.5px solid #cccccc !important;
  /*background: rgb(249, 249, 252);*/
}

.legend {
  position: absolute;
  margin: 0;
  padding: 1px 10px;
  top: -14px;
  left: 10px;
  background: white;
  border: 1px solid #615dff;
  border-radius: 3px;
  background-color: #615dff;
  font-weight: 700;
  /* border: 2px solid blue; */
}

.legend p {
  color: #fff;
  font-size: 17px;
  margin-bottom: 0 !important;
}

.cst-cb-address {
  display: block;
}

.cst-cb-address {
  top: -13px;
  right: 35px;
  padding: 0px 6px;
  background: white;
  color: black;
}
</style>
