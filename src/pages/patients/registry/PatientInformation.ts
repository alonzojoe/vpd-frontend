import { computed } from 'vue'
import moment from "moment";
import store from '@/store'

const formData = computed(() => store.getters.getPatientFormData)

export const currentDate = moment(Date.now()).format("yyyy-MM-DD")

export const calculateAge = (selectedDate) => {
    const birthDate = moment(selectedDate);
    const currentDate = moment();
  
    const years = currentDate.diff(birthDate, 'years');
    birthDate.add(years, 'years');
  
    const months = currentDate.diff(birthDate, 'months');
    birthDate.add(months, 'months');
  
    const days = currentDate.diff(birthDate, 'days');
  
    return {
      age: {
        years,
        months,
        days,
      }
    };
}

export const formatPhoneNumber = (number) => {
  const formattedNumber = String(number).replace(/\D/g, ''); // Remove non-numeric characters
  const leadingZeros = '0'.repeat(11 - formattedNumber.length); // Add leading zeros if needed

  return leadingZeros + formattedNumber;
}

export const resetIndigenous = () => {
  if (formData.value.isIndigenous == 0) {
    store.commit('resetTribe')
  }
}