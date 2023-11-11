import { toPascalCase } from '../functions'
import api from '../../api';
import moment from 'moment';

const state = {
    data: {
        regions: [],

        provinces: [],
        municipalities: [],
        barangays: [],

        curr_provinces: [],
        curr_municipalities: [],
        curr_barangays: [],

        response: {},
        responseCurr: {}
    }
};


const mutations = {

    setRegions:(state, payload) => {
        state.data.regions = payload
    },

    setProvinces:(state, payload) => {
        state.data.provinces = payload
    },

    setMunicipalities:(state, payload) => {
        state.data.municipalities = payload
    },

    setBarangays:(state, payload) => {
        state.data.barangays = payload
    },

    setProvincesEmpty:(state) => {
        state.data.provinces = []
    },

    setMunicipalitiesEmpty:(state) => {
        state.data.municipalities = []
    },

    setBarangaysEmpty:(state) => {
        state.data.barangays = []
    },


    setCurrProvinces:(state, payload) => {
        state.data.curr_provinces = payload
    },

    setCurrMunicipalities:(state, payload) => {
        state.data.curr_municipalities = payload
    },

    setCurrBarangays:(state, payload) => {
        state.data.curr_barangays = payload
    },

    setCurrProvincesEmpty:(state) => {
        state.data.curr_provinces = []
    },

    setCurrMunicipalitiesEmpty:(state) => {
        state.data.curr_municipalities = []
    },

    setCurrBarangaysEmpty:(state) => {
        state.data.curr_barangays = []
    },


    setResponse:(state, payload) => {
        state.data.response = payload
    },

    setResponseCurr:(state, payload) => {
        state.data.responseCurr = payload
    },

    setResponseEmpty:(state) => {
        state.data.response = {}
    },

    setResponseCurrEmpty:(state) => {
        state.data.responseCurr = {}
    },
    

};


const actions  = {

    async fetchRegions({commit}) {
        const response = await api.get(`/resources/region`)
        if (response.data.data.length > 0) {
            commit('setRegions', response.data.data)
        }else{
            console.log('no data')
        }

    },

    async fetchProvinces({commit}, regionId) {
        const response = await api.get(`/resources/province?region=${regionId}`)
        if (response.data.data.length > 0) {
            commit('setProvinces', response.data.data)
        }else{
            commit('setProvincesEmpty')
        }
    },

    async fetchMunicipalities({commit}, provinceId) {
        const response = await api.get(`/resources/city?province=${provinceId}`)
        if (response.data.data.length > 0) {
            commit('setMunicipalities', response.data.data)
        }else{
            commit('setMunicipalitiesEmpty')
        }
    },

    async fetchBarangays({commit}, cityId) {
        const response = await api.get(`/resources/barangay?municipality=${cityId}`)
        if (response.data.data.length > 0) {
            commit('setBarangays', response.data.data)
        }else{
            commit('setBarangaysEmpty')
        }
    },

    async fetchCurrProvinces({commit}, regionId) {
        const response = await api.get(`/resources/province?region=${regionId}`)
        if (response.data.data.length > 0) {
            commit('setCurrProvinces', response.data.data)
        }else{
            commit('setCurrProvincesEmpty')
        }
    },


    async fetchCurrMunicipalities({commit}, provinceId) {
        const response = await api.get(`/resources/city?province=${provinceId}`)
        if (response.data.data.length > 0) {
            commit('setCurrMunicipalities', response.data.data)
        }else{
            commit('setCurrMunicipalitiesEmpty')
        }
    },

    async fetchCurrBarangays({commit}, cityId) {
        const response = await api.get(`/resources/barangay?municipality=${cityId}`)
        if (response.data.data.length > 0) {
            commit('setCurrBarangays', response.data.data)
        }else{
            commit('setCurrBarangaysEmpty')
        }
    },

    async savePermAddress({commit}, payload) {
        if (payload.per_addressId == 0) {
            const response = await api.post(`/address/create`, {
                street: payload.per_street,
                barangay_id: payload.per_barangay,
                municipality_id: payload.per_municipality,
                province_id: payload.per_province,
                region_id: payload.per_region,
                mobile: payload.per_mobile
            })
            if (response.data) {
                commit('setResponse', response.data);
            } 
        }else{
            const response = await api.put(`/address/${payload.per_addressId}`, {
                street: payload.per_street,
                barangay_id: payload.per_barangay,
                municipality_id: payload.per_municipality,
                province_id: payload.per_province,
                region_id: payload.per_region,
                mobile: payload.per_mobile
            })
            if (response.data) {
                commit('setResponse', response.data);
            } 

        }
    },

    async saveCurrAddress({commit}, payload) {
        if (payload.curr_addressId == 0) {
            const response = await api.post(`/address/create`, {
                street: payload.curr_street,
                barangay_id: payload.curr_barangay,
                municipality_id: payload.curr_municipality,
                province_id: payload.curr_province,
                region_id: payload.curr_region,
                mobile: payload.curr_mobile
            })
            if (response.data) {
                commit('setResponseCurr', response.data);
            } 
        }else{
            const response = await api.put(`/address/${payload.curr_addressId}`, {
                street: payload.curr_street,
                barangay_id: payload.curr_barangay,
                municipality_id: payload.curr_municipality,
                province_id: payload.curr_province,
                region_id: payload.curr_region,
                mobile: payload.curr_mobile
            })
            if (response.data) {
                commit('setResponseCurr', response.data);
            } 

        }
    }

}

const getters = {
    getRegions:state => state.data.regions,
    getProvinces:state => state.data.provinces,
    getMunicipalities:state => state.data.municipalities,
    getBarangays:state => state.data.barangays,
    getCurrProvinces:state => state.data.curr_provinces,
    getCurrMunicipalities:state => state.data.curr_municipalities,
    getCurrBarangays:state => state.data.curr_barangays,
    getPermResponse:state => state.data.response,
    getCurrResponse:state => state.data.responseCurr
}


export default {
    state,
    mutations,
    actions,
    getters
}