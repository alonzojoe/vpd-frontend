import { defineComponent, ref, computed, onMounted, inject } from 'vue'
import store from '@/store'


export const changeAdmitted = (event) => {
    console.log(event.target.value)
    if (event.target.value != 'Y') {
        store.commit('resetAdmittedWard')
    }
}

export const changeHospitalization = (event) => {
    if (event.target.value != 'Y') {
        store.commit('resetHospitalization')
    }
} 

export const changeVomitting = (event) => {
    if (event.target.value != 'Y') {
        store.commit('resetVomitting')
    }
}


export const changeMoreDia = (event) => {
    if (event.target.value  != 'Y') {
        store.commit('resetMoreDia')
    }
}

export const changeDose = (event) => {
    if (event.target.value != 'Y') {
        store.commit('resetTotalDosse')
    }
}

export const changeOutcome = (event) => {
    if (event.target.value == 'A' || event.target.value == 'HAMA') {
        store.commit('resetDiedDate')
    }else if(event.target.value == 'D') {
        store.commit('resetDateDischarge')
    }else{
        store.commit('resetBothOutcome')
    }
}





