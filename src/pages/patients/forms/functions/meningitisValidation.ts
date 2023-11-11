import { ref } from 'vue'


export const validationStatus = ref({
    admitted: true,
    date_onset: true,
    investigator_name: true,
    position: true,
    contact: true,
    investigation_date: true,
    report_date: true,
    acase_classification: true,
    bcase_classification: true,
    outcome: true,

})

export const validateChecker = async (formData) => {
    for (const field of Object.keys(validationStatus.value)) {
        if (!formData[field]) {
            validationStatus.value[field] = false
        } else {
            validationStatus.value[field] = true
        }

    }
}

export const validateFields = async (toast, formData, watch) => {

    const requiredFields = [
        { payload: 'admitted', message: 'Admitted', tab: 1 },
        { payload: 'date_onset', message: 'Date of Onset of Illness', tab: 1 },
        { payload: 'investigator_name', message: 'Name of Investigator', tab: 2 },
        { payload: 'position', message: 'Investigator Position', tab: 2 },
        { payload: 'contact', message: 'Investigator Contact No.', tab: 2 },
        { payload: 'investigation_date', message: 'Date of Investigation', tab: 2 },
        { payload: 'report_date', message: 'Date of Report to CHD', tab: 2 },
        { payload: 'acase_classification', message: 'A. Case Classification', tab: 3 },
        { payload: 'bcase_classification', message: 'B. Case Classification', tab: 3 },
        { payload: 'outcome', message: 'Outcome', tab: 3 },
    ]


    //tab 1
    const admDate = { payload: 'date_admitted', message: 'Date Admitted', tab: 1 }
    if (formData.admitted == 'Y') {
        requiredFields.push(admDate)
        validationStatus.value.date_admitted = true
    } else {
        delete validationStatus.value.date_admitted
    }

    const cnsOthers = { payload: 'cns_others', message: 'CNS Others Specify', tab: 1 }
    if (formData.cns == 'O') {
        requiredFields.push(cnsOthers)
        validationStatus.value.cns_others = true
    } else {
        delete validationStatus.value.cns_others
    }

    //tab2
    const je = [
        { payload: 'je_datedose', message: 'JE Date Last Dose', tab: 2 },
        { payload: 'je_doses', message: 'JE No. of Doses', tab: 2 }
    ]
    if (formData.je == 'Y') {
        requiredFields.push(...je)
        validationStatus.value.je_datedose = true
        validationStatus.value.je_doses = true
    } else {
        delete validationStatus.value.je_datedose
        delete validationStatus.value.je_doses
    }

    const penta = [
        { payload: 'penta_datedose', message: 'Penta-Hib Date Last Dose', tab: 2 },
        { payload: 'penta_doses', message: 'Penta-Hib No. of Doses', tab: 2 }
    ]
    if (formData.penta == 'Y') {
        requiredFields.push(...penta)
        validationStatus.value.penta_datedose = true
        validationStatus.value.penta_doses = true
    } else {
        delete validationStatus.value.penta_datedose
        delete validationStatus.value.penta_doses
    }

    const measles = [
        { payload: 'measles_datedose', message: 'Measles Date Last Dose', tab: 2 },
        { payload: 'measles_doses', message: 'Measles No. of Doses', tab: 2 }
    ]
    if (formData.measles == 'Y') {
        requiredFields.push(...measles)
        validationStatus.value.measles_datedose = true
        validationStatus.value.measles_doses = true
    } else {
        delete validationStatus.value.measles_datedose
        delete validationStatus.value.measles_doses
    }

    const meningo = [
        { payload: 'meningo_datedose', message: 'Meningococcal Date Last Dose', tab: 2 },
        { payload: 'meningo_doses', message: 'Meningococcal No. of Doses', tab: 2 }
    ]
    if (formData.meningo == 'Y') {
        requiredFields.push(...meningo)
        validationStatus.value.meningo_datedose = true
        validationStatus.value.meningo_doses = true
    } else {
        delete validationStatus.value.meningo_datedose
        delete validationStatus.value.meningo_doses
    }


    const pneumo = [
        { payload: 'pneumo_datedose', message: 'Pneumococcal Date Last Dose', tab: 2 },
        { payload: 'pneumo_doses', message: 'Pneumococcal No. of Doses', tab: 2 }
    ]
    if (formData.pneumo == 'Y') {
        requiredFields.push(...pneumo)
        validationStatus.value.pneumo_datedose = true
        validationStatus.value.pneumo_doses = true
    } else {
        delete validationStatus.value.pneumo_datedose
        delete validationStatus.value.pneumo_doses
    }


    const pcv10 = [
        { payload: 'pcv10_datedose', message: 'PCV10 Date Last Dose', tab: 2 },
        { payload: 'pcv10_doses', message: 'PCV10 No. of Doses', tab: 2 }
    ]
    if (formData.pcv10 == 'Y') {
        requiredFields.push(...pcv10)
        validationStatus.value.pcv10_datedose = true
        validationStatus.value.pcv10_doses = true
    } else {
        delete validationStatus.value.pcv10_datedose
        delete validationStatus.value.pcv10_doses
    }

    const pcv13 = [
        { payload: 'pcv13_datedose', message: 'PCV13 Date Last Dose', tab: 2 },
        { payload: 'pcv13_doses', message: 'PCV13 No. of Doses', tab: 2 }
    ]
    if (formData.pcv13 == 'Y') {
        requiredFields.push(...pcv13)
        validationStatus.value.pcv13_datedose = true
        validationStatus.value.pcv13_doses = true
    } else {
        delete validationStatus.value.pcv13_datedose
        delete validationStatus.value.pcv13_doses
    }

    //tab3

    const otherExp = { payload: 'other_specify', message: 'Other Exposure Specify', tab: 3 }
    if (formData.other == 'Y') {
        requiredFields.push(otherExp)
        validationStatus.value.other_specify = true
    } else {
        delete validationStatus.value.other_specify
    }

    const travel = [
        { payload: 'travel_place', message: 'Specify Place', tab: 3 },
        { payload: 'travel_from', message: 'Date Travelled From', tab: 3 },
        { payload: 'travel_to', message: 'Date Travelled To', tab: 3 }
    ]
    if (formData.travel == 'Y') {
        requiredFields.push(...travel)
        validationStatus.value.travel_place = true
        validationStatus.value.travel_from = true
        validationStatus.value.travel_to = true
    } else {
        delete validationStatus.value.travel_place
        delete validationStatus.value.travel_from
        delete validationStatus.value.travel_to
    }

    const aesOther = { payload: 'aes_other', message: 'AES Other Agent', tab: 3 }
    if (formData.acase_classification == 'AESOTHER') {
        requiredFields.push(aesOther)
        validationStatus.value.aes_other = true
    } else {
        delete validationStatus.value.aes_other
    }

    const bacterial = { payload: 'confirmed_case', message: 'Confirmed,Confirmatory Test', tab: 3 }
    if (formData.bcase_classification == 'CON') {
        requiredFields.push(bacterial)
        validationStatus.value.confirmed_case = true
    } else {
        delete validationStatus.value.confirmed_case
    }

    const alive = { payload: 'date_discharge', message: 'Date of Discharge', tab: 3 }
    if (formData.outcome == 'A') {
        requiredFields.push(alive)
        validationStatus.value.date_discharge = true
    } else {
        delete validationStatus.value.date_discharge
    }

    const died = { payload: 'date_discharge', message: 'Date of Death', tab: 3 }
    if (formData.outcome == 'D') {
        requiredFields.push(died)
        validationStatus.value.date_died = true
    } else {
        delete validationStatus.value.date_died
    }

    const hama = { payload: 'date_hama', message: 'Date if HAMA', tab: 3 }
    if (formData.outcome == 'HAMA') {
        requiredFields.push(hama)
        validationStatus.value.date_hama = true
    } else {
        delete validationStatus.value.date_hama
    }

    validateChecker(formData)

    const result = ref({
        errors: 0,
        tab: 3,
    })

    requiredFields.every((r) => {
        if (!formData[r.payload]) {
            result.value.errors++;
            result.value.tab = r.tab

            if (watch != 1) {
                toast.add({ severity: 'error', summary: 'Field Required:', detail: `${r.message}`, life: 3000 });
            }

            return false;
        }

        return true;
    })

    return result;

}