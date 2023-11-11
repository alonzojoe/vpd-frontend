import { computed } from 'vue'
import store from '@/store'

const formData = computed(() => store.getters.getPatientFormData)

//Permanent Address
export const changePermRegion = async (same) => {

    if (formData.value.per_region) {
        await store.commit('resetPermAddress')
        await store.dispatch('fetchProvinces', formData.value.per_region)
        if (same == 'true') {
            await store.dispatch('fetchCurrProvinces', formData.value.curr_region)
        }
    }else{
        await store.commit('resetPermAddress')
        store.commit('setProvincesEmpty')
        store.commit('setMunicipalitiesEmpty')
        store.commit('setBarangaysEmpty')
    }

}

export const changePermProvince = async (same) => {
    if (formData.value.per_province) {
        await store.commit('resetPermCityBarangay')
        store.dispatch('fetchMunicipalities', formData.value.per_province)
        if (same == 'true') {
            await store.dispatch('fetchCurrMunicipalities', formData.value.curr_province)
        }
    } else {
        await store.commit('resetPermCityBarangay')
        store.commit('setMunicipalitiesEmpty')
        store.commit('setBarangaysEmpty')
    }
}

export const changePermCity = async (same) => {
      if (formData.value.per_municipality) {
        await store.commit('resetPermBarangay')
        store.dispatch('fetchBarangays', formData.value.per_municipality)
        if (same == 'true') {
            await store.dispatch('fetchCurrBarangays', formData.value.curr_municipality)
        }
    } else {
        await store.commit('resetPermBarangay')
        store.commit('setBarangaysEmpty')
    }
}

export const fetchPermanentAddress = async () => {
    
    await store.dispatch('fetchRegions')
    await store.dispatch('fetchProvinces', formData.value.per_region)
    await store.dispatch('fetchMunicipalities', formData.value.per_province)
    await store.dispatch('fetchBarangays', formData.value.per_municipality)
}

//Current Address

export const changeCurrRegion = async () => {

    if (formData.value.curr_region) {
        await store.commit('resetCurrAddress')
        await store.dispatch('fetchCurrProvinces', formData.value.curr_region)
    }else{
        await store.commit('resetCurrAddress')
        store.commit('setCurrProvincesEmpty')
        store.commit('setCurrMunicipalitiesEmpty')
        store.commit('setCurrBarangaysEmpty')
    }

}

export const changeCurrProvince = async () => {
    if (formData.value.curr_province) {
        await store.commit('resetCurrCityBarangay')
        store.dispatch('fetchCurrMunicipalities', formData.value.curr_province)
    } else {
        await store.commit('resetCurrCityBarangay')
        store.commit('setCurrMunicipalitiesEmpty')
        store.commit('setCurrBarangaysEmpty')
    }
}


export const changeCurrCity = async () => {
      if (formData.value.curr_municipality) {
        await store.commit('resetCurrBarangay')
        store.dispatch('fetchCurrBarangays', formData.value.curr_municipality)
    } else {
        await store.commit('resetCurrBarangay')
        store.commit('setCurrBarangaysEmpty')
    }
}

export const fetchCurrentAddress = async () => {
    
    await store.dispatch('fetchCurrProvinces', formData.value.curr_region)
    await store.dispatch('fetchCurrMunicipalities', formData.value.curr_province)
    await store.dispatch('fetchCurrBarangays', formData.value.curr_municipality)
}

//SameAddress

export const sameAddress = async () => {
    await store.commit('setSameAddress');
    

    
}
