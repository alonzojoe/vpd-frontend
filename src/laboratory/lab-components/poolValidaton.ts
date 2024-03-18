import { ref } from 'vue'


export const validationStatus = ref({
    id: true,
    protocol_no: true,
    date_performed: true,
    method: true,
    test_name: true,
    kit_name: true,
    lot_no: true,
    date_expiry: true,
    room_temp: true,
    start: true,
    end: true,
    performed_by: true,
    validate_by: true,
    pathologist: true,
})

export const validateChecker = async (formData: any) => {
    for (const field of Object.keys(validationStatus.value)) {
        if (!formData[field]) {
            validationStatus.value[field] = false
        } else {
            validationStatus.value[field] = true
        }
    }
}

export const validateFields = async (formData) => {
    const requiredFields = [
        { payload: 'kit_name', message: "Name of Kit" },
        { payload: 'room_temp', message: "Room Temperature" },
        { payload: 'method', message: "Method" },
        { payload: 'method', message: "Lot Number" },
        { payload: 'method', message: "Expiry Date" },
        { payload: 'start', message: "Start" },
        { payload: 'end', message: "End" },
    ]

    validateChecker(formData)

    let errors = 0

    requiredFields.every((r) => {
        if (!formData[r.payload]) {
            errors++
            return false
        }
        return true;
    })

    return errors;
}