import { ref } from 'vue'


export const isSkeleton = ref(true)

export const skeletonData = ref({
    count: 2,
    perRow: 4,
    withButtons: true
})

export const loadingSkeleton = () => {
    setTimeout(() => {
        isSkeleton.value = false
    }, 2000);
}

export const formData = ref({
    case_id: '',
    ep_id: '',
    lname: '',
    fname: '',
    mname: '',
    date_from: '',
    date_to: '',
})

export const resetFormData = () => {
    Object.keys(formData.value).forEach((key) => {
        formData.value[key] = ''
    })
}