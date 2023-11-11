import { ref } from 'vue';

import { swalMessage } from '@/composables'


export const validationStatus = ref({
    patno: true,
    fname: true,
    mname: true,
    lname: true,
    gender: true,
    dob: true,
    per_street: true,
    per_region: true,
    per_province: true,
    per_municipality: true,
    per_barangay: true,
    curr_street: true,
    curr_region: true,
    curr_province: true,
    curr_municipality: true,
    curr_barangay: true,
})


export const validateChecker = async (formData) => {
    for (const field of Object.keys(validationStatus.value)) {
        if (!formData[field]) {
            validationStatus.value[field] = false;
        }else{
            validationStatus.value[field] = true;
        }
    }
}


export const validateFields = async (toast, formData) => {

    const requiredFields =  [

        { payload: 'patno', message: 'Patient No' },
        { payload: 'fname', message: 'First Name' },
        { payload: 'mname', message: 'Middle Name' },
        { payload: 'lname', message: 'Last Name' },
        { payload: 'gender', message: 'Gender' },
        { payload: 'dob', message: 'Date of Birth' },
        { payload: 'per_street', message: 'Permanent Address Street' },
        { payload: 'per_region', message: 'Permanent Address Region' },
        { payload: 'per_province', message: 'Permanent Address Province' },
        { payload: 'per_municipality', message: 'Permanent Address Municipality' },
        { payload: 'per_barangay', message: 'Permanent Address Barangay' },
        { payload: 'curr_street', message: 'Current Address Street' },
        { payload: 'curr_region', message: 'Current Address Region' },
        { payload: 'curr_province', message: 'Current Address Province' },
        { payload: 'curr_municipality', message: 'Current Address Municipality' },
        { payload: 'curr_barangay', message: 'Current Address Barangay' }
    
    ]

    const tribe = { payload:"indigenousOthers", message:'Indigenous Tribe' }
    const validateTribe = { indigenousOthers: true }
    if (formData.isIndigenous == 1) {
        requiredFields.push(tribe)
        validationStatus.value.indigenousOthers = true
    }else{
        delete validationStatus.value.indigenousOthers
    }

    validateChecker(formData)

    let errors = 0;
    requiredFields.every((res) => {
        if (!formData[res.payload]) {
            errors++;
            // swalMessage(swal, 'Validation', `Field Required: ${res.message}`, 'warning')
            toast.add({ severity: 'error', summary: 'Field Required:', detail: `${res.message}`, life: 3000 });
            return false;
        }
        return true;
    });

    return errors;

}



