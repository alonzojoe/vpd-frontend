import { ref } from 'vue';

export const validationStatus = ref({
    patient_admitted: true,
    rehydration_therapy: true,
    prev_hospitalization: true,
    vomiting: true,
    fever: true,
    more_diarrhea: true,
    received_rota: true,
    investigator_name: true,
    position: true,
    contact: true,
    investigation_date: true,
    report_date: true,
    case_classification: true,
    outcome: true
})

export const validateChecker = async (formData) => {
    for (const field of Object.keys(validationStatus.value)) {
        if (!formData[field]) {
            validationStatus.value[field] = false
        }else{
            validationStatus.value[field] = true
        }
        
    }
}

export const validateFields = async (toast, formData, watch) => {

    const requiredFields = [
        { payload: 'patient_admitted', message: 'Was Patient Admitted at the Ward', tab: 1 },
        { payload: 'rehydration_therapy', message: 'Rehydration Therapy', tab: 1 },
        { payload: 'prev_hospitalization', message: 'Previous Hospitalization', tab: 1 },
        { payload: 'vomiting', message: 'Vomitting', tab: 1 },
        { payload: 'fever', message: 'Fever', tab: 1 },
        { payload: 'more_diarrhea', message: 'Two or More Diarrhea Case', tab: 2 },
        { payload: 'received_rota', message: 'Received Rotavirus Vaccine', tab: 2 },
        { payload: 'investigator_name', message: 'Name of Investigator', tab: 2 },
        { payload: 'position', message: 'Position / Designation', tab: 2 },
        { payload: 'contact', message: 'Contact No.', tab: 2 },
        { payload: 'investigation_date', message: 'Date of Investigation', tab: 2 },
        { payload: 'report_date', message: 'Date of Report', tab: 2 },
        { payload: 'case_classification', message: 'Case Classification', tab: 2 },
        { payload: 'outcome', message: 'Outcome', tab: 2 },
    ]

    //tab1
    const admDate = { payload: 'admission_date', message: 'Date of Admission', tab: 1 }
    if (formData.patient_admitted == 'Y') {
        requiredFields.push(admDate)
        validationStatus.value.admission_date = true
    }else{
        delete validationStatus.value.admission_date
    }

    const hospData = { payload: 'date_hospitalization', message: 'Date of Hospitalization', tab: 1 }
    if (formData.prev_hospitalization == 'Y') {
        requiredFields.push(hospData)
        validationStatus.value.date_hospitalization = true
    }else{
        delete validationStatus.value.date_hospitalization
    }

    const vomitting = [
        { payload: 'date_vomiting', message: 'Date of Onset Vomitting', tab: 1 },
        { payload: 'degree_dehydration', message: 'Degree of Dehyrdation', tab: 1 }
    ]
    if (formData.vomiting == 'Y') {
        requiredFields.push(...vomitting)
        validationStatus.value.date_vomiting = true
        validationStatus.value.degree_dehydration = true
    }else{
        delete validationStatus.value.date_vomiting
        delete validationStatus.value.degree_dehydration
    }

    //tabl2 
    const diarrhea = { payload: 'where_diarrhea', message: 'Diarrhea, Where?', tab: 2 }
    if (formData.more_diarrhea == 'Y') {
        requiredFields.push(diarrhea)
        validationStatus.value.where_diarrhea = true
    }else{
        delete validationStatus.value.where_diarrhea
    }

    const rotavaccine  = { payload: 'dose_received', message: 'Total Dose Received', tab: 2 }
    if (formData.received_rota == 'Y') {
        requiredFields.push(rotavaccine)
        validationStatus.value.dose_received = true
    }else{
        delete validationStatus.value.dose_received
    }


    const outcome = { payload: 'discharge_date', message: 'Date of Discharge', tab: 2 }
    if (formData.outcome == 'A' || formData.outcome == 'HAMA' ) {
        requiredFields.push(outcome)
        validationStatus.value.discharge_date = true
    }else{
        delete validationStatus.value.discharge_date
    }

    const died = { payload: 'died_date', message: 'Date Died', tab: 2 }
    if (formData.outcome == 'D') {
        requiredFields.push(died)
        validationStatus.value.died_date = true
    }else{
        delete validationStatus.value.died_date
    }

    validateChecker(formData)

    const result = ref({
        errors: 0,
        tab: 2
    })

    requiredFields.every((r) => {
        if (!formData[r.payload]) {
            result.value.errors++;
            result.value.tab = r.tab
            if (watch != 1) {
                toast.add({ severity: 'error', summary: 'Field Required:', detail: `${r.message}`, life: 3000 });
            }
            return false
        }

        return true;
    })

    return result;
}