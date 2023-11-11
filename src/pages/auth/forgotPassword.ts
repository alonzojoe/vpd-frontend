import { defineComponent, ref, computed, inject, onMounted } from "vue";
import api from '../../api/index'
import { swalMessage } from "@/composables";

const swal = inject('$swal')

export const modalDetails = ref({
    show: false,
    title: 'Forgot Password'
})

export const forgotEmail = ref('')
export const step = ref(1)
export const forgotPassword = () => {
    modalDetails.value.show = true
    step.value = 1
    console.log(modalDetails.value)
}

export const isLoadingOtp = ref(false)
export const sendOTP = async () => {
  isLoadingOtp.value = true
  try {
     const response = await api.post('auth/forgot', {
       email: forgotEmail.value
     })
     swalMessage(swal, 'Information', `${response.data.message}`, `success`).then(() => {
      step.value = 2
      isLoadingOtp.value = false
     })
  } catch (error) {
    swalMessage(swal, 'Warning', `${error.response.data.message}`, `warning`).then(() => {
      isLoadingOtp.value = false
     })
  }
}