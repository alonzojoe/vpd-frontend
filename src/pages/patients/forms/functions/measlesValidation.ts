import { ref } from 'vue';


export const validationStatus = ref({
    admitted: true,
    date_admitted: true,
    reporter_date: true,
    investigate_date: true,
    travel_history: true,
    confirmed_measles: true,
    confirmed_rubella: true,
    outcome: true
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
        { payload: 'date_admitted', message: 'Date Admitted/Seen/Consulted', tab: 1 },
        { payload: 'reporter_date', message: 'Date of Report', tab: 1 },
        { payload: 'investigate_date', message: 'Date of Investigation', tab: 1 },
        { payload: 'travel_history', message: 'With History of Travel Within 23 Days...', tab: 2 },
        { payload: 'confirmed_measles', message: 'Was there Contact with a Confirmed Measles?', tab: 2 },
        { payload: 'confirmed_rubella', message: 'Was there Contact with a Confirmed Rubella?', tab: 2 },
        { payload: 'outcome', message: 'Outcome', tab: 3 },
    ]
    //tab1
    const pregnant = { payload: 'pregnant', message: 'Pregnant', tab: 1 }
    if (formData.gender == '2') {
        requiredFields.unshift(pregnant)
        validationStatus.value.pregnant = true
    } else {
        delete validationStatus.value.pregnant
    }


    const feverDate = { payload: 'fever_date', message: 'Date Onset (Fever)', tab: 1 }
    if (formData.fever == 'Y') {
        requiredFields.unshift(feverDate)
        validationStatus.value.fever_date = true
    } else {
        delete validationStatus.value.fever_date
    }

    const rashDate = { payload: 'rash_date', message: 'Date Onset (Rash)', tab: 1 }
    if (formData.rash == 'Y') {
        requiredFields.unshift(rashDate)
        validationStatus.value.rash_date = true
    } else {
        delete validationStatus.value.rash_date
    }

    const lymphLocation = { payload: 'lym_location', message: 'Lymphatic Specify Location', tab: 1 }
    if (formData.swollen_lymp == 'Y') {
        requiredFields.unshift(lymphLocation)
        validationStatus.value.lym_location = true
    } else {
        delete validationStatus.value.lym_location
    }

    const lymphOthers = { payload: 'lymp_others', message: 'Others Specify', tab: 1 }
    if (formData.lym_location == 'OTHERS') {
        requiredFields.unshift(lymphOthers)
        validationStatus.value.lymp_others = true
    } else {
        delete validationStatus.value.lymp_others
    }

    const complications = { payload: 'complications_specify', message: 'Complication Specify', tab: 1 }
    if (formData.complications == 'Y') {
        requiredFields.unshift(complications)
        validationStatus.value.complications_specify = true
    } else {
        delete validationStatus.value.complications_specify
    }


    const mcv = [
        { payload: 'mcv_dose', message: 'MV No. of Doses', tab: 2 },
        { payload: 'mr_dose', message: 'MR No. of Doses', tab: 2 },
        { payload: 'mmr_dose', message: 'MMR No. of Doses', tab: 2 },
        { payload: 'date_last_mcv', message: 'Date Last Dose Received MCV ', tab: 2 },
        { payload: 'validated_through', message: 'Measles Vaccine Recevied Validated Through', tab: 2 },
        { payload: 'received_campaigns', message: 'Was Vaccination Received During Campaigns', tab: 2 }
    ]
    if (formData.received_mcv == 'Y') {
        requiredFields.unshift(...mcv)
        validationStatus.value.mcv_dose = true
        validationStatus.value.mr_dose = true
        validationStatus.value.mmr_dose = true
        validationStatus.value.date_last_mcv = true
        validationStatus.value.validated_through = true
        validationStatus.value.received_campaigns = true
    } else {
        delete validationStatus.value.mcv_dose
        delete validationStatus.value.mr_dose
        delete validationStatus.value.mmr_dose
        delete validationStatus.value.date_last_mcv
        delete validationStatus.value.validated_through
        delete validationStatus.value.received_campaigns
    }

    const travelData = [
        { payload: 'travel_place', message: 'Travel Place', tab: 2 },
        { payload: 'travel_date', message: 'Travel Date', tab: 2 },
    ];

    if (formData.travel_history == 'Y') {
        requiredFields.unshift(...travelData)
        validationStatus.value.travel_place = true
        validationStatus.value.travel_date = true

    } else {
        delete validationStatus.value.travel_place
        delete validationStatus.value.travel_date

    }

    //tab3
    const otherReason = { payload: 'other_reason_specify', message: 'Other Reason, Specify', tab: 3 }
    if (formData.other_reason == '1') {
        requiredFields.unshift(otherReason)
        validationStatus.value.other_reason_specify = true
    } else {
        delete validationStatus.value.other_reason_specify
    }

    const dateDied = { payload: 'date_died', message: 'Date Died', tab: 3 }
    if (formData.outcome == 'D') {
        requiredFields.unshift(dateDied)
        validationStatus.value.date_died = true
    } else {
        delete validationStatus.value.date_died
    }

    const labs = { payload: 'lab', message: 'Laboratory Profile Specimen', tab: 4 }


    if (formData.labs.length === 0) {
        requiredFields.push(labs)
        validationStatus.value.labs = true
    } else {
        delete validationStatus.value.labs
    }

    validateChecker(formData)

    const result = ref({
        errors: 0,
        tab: 4
    })

    requiredFields.every((r) => {
        if (!formData[r.payload]) {
            result.value.errors++;
            result.value.tab = r.tab
            if (watch != 1) {
                toast.add({ severity: 'error', summary: 'Field Required:', detail: `${r.message}`, life: 3000 })
            }
            return false
        }

        return true
    })


    return result;

}