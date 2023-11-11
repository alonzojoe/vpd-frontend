import { toPascalCase, formatPhoneNumber } from '../functions'
import api from '../../api';
import moment from 'moment';
import { buildQueryParams } from '../../composables'
import axios from 'axios';

const state = {
    data: {
        patients: [],
        total_patients: 0,
        pages_patients: 0,
        patientSearch: [],
        patientInfo: null,
        patientFormData: {
            id: 0,
            patno: '',
            fname: '',
            mname: '',
            lname: '',
            suffix: '',
            gender: '',
            dob: '',
            age_years: 0,
            age_month: 0,
            age_days: 0,
            isIndigenous: 0,
            indigenousOthers: '',
            isfourps: 0,
            per_addressId: 0,
            per_street: '',
            per_region: '',
            per_province: '',
            per_municipality: '',
            per_barangay: '',
            per_mobile: '',
            curr_addressId: 0,
            curr_street: '',
            curr_region: '',
            curr_province: '',
            curr_municipality: '',
            curr_barangay: '',
            curr_mobile: '',
        },
        savingResponse: {},
    }
};


const mutations = {
    setPatients: (state, payload) => {
        state.data.patients = payload.map((p) => {
            return {
                ...p,
                birthdate: moment(p.birthdate).format('LL'),
                created_at: moment(p.created_at).format('lll'),
                updated_at: moment(p.updated_at).format('lll')
            }
        })
    },

    setTotalPatients: (state, payload) => {
        state.data.total_patients = payload
    },

    setPagesPatients: (state, payload) => {
        state.data.pages_patients = payload
    },

    setEmptyPatients:(state) => {
        state.data.patients = []
        state.data.total_patients = 0
        state.data.pages_patients = 0
    },

    setPatientSearch:(state, payload) => {
        state.data.patientSearch = payload.map((p) => {
            console.log('mutation', p.patientinfo)
            return {
                ...p,
                Birthday: moment(p.patients.persons.BirthDate).format('LL'),
                BirthDate: moment(p.patients.persons.BirthDate).format('YYYY-MM-DD')
            }
        })
    },

    setPatientSearchEmpty:(state) => {
        state.data.patientSearch = []
    },

    setPatientInfo:(state, payload) => {
        state.data.patientInfo = payload
    },

    setFormData:(state, payload) => {
        state.data.patientFormData = {
            id: 0,
            patno: payload.patients.PatientNo,
            fname: payload.patientinfo.FirstName,
            mname: payload.patientinfo.MiddleName,
            lname: payload.patientinfo.LastName,
            suffix: payload.patients.persons ? payload.patients.persons.SuffixName : '',
            gender: payload.patients.persons ? payload.patients.persons.Gender : '',
            dob: payload.BirthDate,
            age_years: 0,
            age_month: 0,
            age_days: 0,
            isIndigenous: 0,
            indigenousOthers: '',
            isfourps: 0,
            per_addressId: 0,
            per_street: payload.permanentaddress ?  payload.permanentaddress.Street : '',
            per_region: payload.permanentaddress &&  payload.permanentaddress.RegionID && payload.permanentaddress.RegionID !=0 ?  payload.permanentaddress.RegionID : '',
            per_province: payload.permanentaddress &&  payload.permanentaddress.ProvinceID && payload.permanentaddress.ProvinceID !=0 ?  payload.permanentaddress.ProvinceID : '',
            per_municipality: payload.permanentaddress &&  payload.permanentaddress.MunicipalityID && payload.permanentaddress.MunicipalityID !=0 ?  payload.permanentaddress.MunicipalityID : '',
            per_barangay: payload.permanentaddress &&  payload.permanentaddress.BarangayID && payload.permanentaddress.BarangayID !=0 ?  payload.permanentaddress.BarangayID : '',
            per_mobile:  payload.permanentaddress ?  payload.permanentaddress.MobileNo ? formatPhoneNumber(payload.permanentaddress.MobileNo) : '' : '',
            curr_addressId: 0,
            curr_street:payload.currentaddress &&  payload.currentaddress.Street ? payload.currentaddress.Street : '',
            curr_region: payload.currentaddress &&  payload.currentaddress.RegionID && payload.currentaddress.RegionID !=0 ? payload.currentaddress.RegionID : '',
            curr_province: payload.currentaddress &&  payload.currentaddress.ProvinceID && payload.currentaddress.ProvinceID !=0 ? payload.currentaddress.ProvinceID : '',
            curr_municipality: payload.currentaddress &&  payload.currentaddress.MunicipalityID && payload.currentaddress.MunicipalityID !=0 ? payload.currentaddress.MunicipalityID : '',
            curr_barangay: payload.currentaddress &&  payload.currentaddress.BarangayID && payload.currentaddress.BarangayID !=0 ? payload.currentaddress.BarangayID : '',
            curr_mobile: payload.currentaddress &&  payload.currentaddress.MobileNo ? payload.currentaddress.MobileNo ? formatPhoneNumber(payload.currentaddress.MobileNo) : '' : '',
        }
    },

    setFormDataUpdate:(state, payload) => {
        state.data.patientFormData = {
            id: payload.id,
            patno: payload.patient_no,
            fname: payload.lname,
            mname: payload.fname,
            lname: payload.mname,
            suffix: payload.suffix,
            gender: payload.gender,
            dob: moment(payload.birthdate).format('YYYY-MM-DD'),
            age_years: payload.age_year,
            age_month: payload.age_month,
            age_days: payload.age_day,
            isIndigenous: payload.is_indigenous,
            indigenousOthers: payload.indigenous_tribe == null || payload.indigenous_tribe == ''  ? '' : payload.indigenous_tribe,
            isfourps: payload.is_fourps,
            per_addressId: payload.permanentaddress_id,
            per_street: payload.permanent_address.street,
            per_region: payload.permanent_address.region_id,
            per_province: payload.permanent_address.province_id,
            per_municipality: payload.permanent_address.municipality_id,
            per_barangay: payload.permanent_address.barangay_id,
            per_mobile: payload.permanent_address.mobile,

            curr_addressId: payload.currentaddress_id,
            curr_street: payload.current_address.street,
            curr_region: payload.current_address.region_id,
            curr_province: payload.current_address.province_id,
            curr_municipality: payload.current_address.municipality_id,
            curr_barangay: payload.current_address.barangay_id,
            curr_mobile: payload.current_address.mobile,
        }
    },

    setFormAddNew:(state, payload) => {
       state.data.patientFormData = {
            id: 0,
            patno: payload.patientNo,
            fname: payload.firstName,
            mname: payload.middleName,
            lname: payload.lastName,
            suffix: '',
            gender: '',
            dob: '',
            age_years: 0,
            age_month: 0,
            age_days: 0,
            isIndigenous: 0,
            indigenousOthers: '',
            isfourps: 0,
            per_addressId: 0,
            per_street: '',
            per_region: '',
            per_province: '',
            per_municipality: '',
            per_barangay: '',
            per_mobile: '',
            curr_addressId: 0,
            curr_street: '',
            curr_region: '',
            curr_province: '',
            curr_municipality: '',
            curr_barangay: '',
            curr_mobile: '',
       }
    },

    setAge:(state, payload) => {
        state.data.patientFormData.age_years = payload.years
        state.data.patientFormData.age_month = payload.months
        state.data.patientFormData.age_days = payload.days
    },

    //permanent
    resetPermAddress:(state) => {
        state.data.patientFormData.per_province = ''
        state.data.patientFormData.per_municipality = ''
        state.data.patientFormData.per_barangay = ''
    },

    resetPermCityBarangay:(state) => {
        state.data.patientFormData.per_municipality = ''
        state.data.patientFormData.per_barangay = ''
    },

    resetPermBarangay:(state) => {
        state.data.patientFormData.per_barangay = ''
    },
    //current
    resetCurrAddress:(state) => {
        state.data.patientFormData.curr_province = ''
        state.data.patientFormData.curr_municipality = ''
        state.data.patientFormData.curr_barangay = ''
    },

    resetCurrCityBarangay:(state) => {
        state.data.patientFormData.curr_municipality = ''
        state.data.patientFormData.curr_barangay = ''
    },

    resetCurrBarangay:(state) => {
        state.data.patientFormData.curr_barangay = ''
    },

    resetTribe:(state) => {
        state.data.patientFormData.indigenousOthers = ''
    },
    
    setSavingResponse:(state, payload) => {
        state.data.savingResponse = payload
    },

        
    setAddressDefault:(state) => {
        state.data.patientFormData.per_region = ''
        state.data.patientFormData.per_province = ''
        state.data.patientFormData.per_municipality = ''
        state.data.patientFormData.per_barangay = ''

        state.data.patientFormData.curr_region = ''
        state.data.patientFormData.curr_province = ''
        state.data.patientFormData.curr_municipality = ''
        state.data.patientFormData.curr_barangay = ''
    },


    setSameAddress:(state) => {
        state.data.patientFormData.curr_street = state.data.patientFormData.per_street
        state.data.patientFormData.curr_region = state.data.patientFormData.per_region
        state.data.patientFormData.curr_province = state.data.patientFormData.per_province
        state.data.patientFormData.curr_municipality = state.data.patientFormData.per_municipality
        state.data.patientFormData.curr_barangay = state.data.patientFormData.per_barangay
        state.data.patientFormData.curr_mobile = state.data.patientFormData.per_mobile
    }
    

};


const actions  = {
    async fetchPatients({commit}, {page, patno, lname, fname, mname, year, dateFrom, dateTo, mime}) {
        const queryParams = buildQueryParams({page, patno, lname, fname, mname, year, dateFrom, dateTo, mime})
        const response = await api.get(`/patients/?${queryParams}`)
        if (response.data.data.length > 0) {
            commit('setPatients', response.data.data)
            commit('setTotalPatients', response.data.total)
            commit('setPagesPatients', response.data.total_pages)
        }
    },

    async fetchPatientSearch({commit}, {patientNo, lastName, firstName, middleName}) {
        const queryParams = buildQueryParams({patientNo, lastName, firstName, middleName})
        const response = await axios.get(`http://192.163.8.244:8000/api/vpd/patientData/?${queryParams}`)
        if (response.data.data.length > 0) {
            commit('setPatientSearch', response.data.data)
        }
    },

    async savePatientProfile({state, commit}, formData) {
        console.log('savePatient', formData)
        // debugger;
        let patientId = state.data.patientFormData.id
        const url = patientId == 0 ?  `/patients/create` : `/patients/${patientId}`

        if (patientId == 0) {
            const response = await api.post(url, {
                patient_no: formData.patno,
                lname: formData.lname,
                fname: formData.fname,
                mname: formData.mname,
                suffix: formData.suffix,
                gender: formData.gender,
                birthdate: formData.dob,
                age_year: formData.age_years,
                age_month: formData.age_month,
                age_day: formData.age_days,
                is_indigenous: formData.isIndigenous,
                indigenous_tribe: formData.indigenousOthers,
                is_fourps: formData.isfourps,
                currentaddress_id: formData.currmId,
                permanentaddress_id: formData.permId,
                created_by: formData.userId,
            })
            commit('setSavingResponse', response.data)
        }else{
            const response = await api.put(url, {
                patient_no: formData.patno,
                lname: formData.lname,
                fname: formData.fname,
                mname: formData.mname,
                suffix: formData.suffix,
                gender: formData.gender,
                birthdate: formData.dob,
                age_year: formData.age_years,
                age_month: formData.age_month,
                age_day: formData.age_days,
                is_indigenous: formData.isIndigenous,
                indigenous_tribe: formData.indigenousOthers,
                is_fourps: formData.isfourps,
                currentaddress_id: formData.currmId,
                permanentaddress_id: formData.permId,
                created_by: formData.userId,
            })
            commit('setSavingResponse', response.data)
        }
        // const response = await api.post(`/patients/create`)
    },

    async setPatientInactive({state}, payload) {
        await api.patch(`/patients/${payload}/inactive`)
    }

 
}

const getters = {
    getPatientProfiles:state => state.data.patients,
    getTotalPatients:state => state.data.total_patients,
    getPagesPatients:state => state.data.pages_patients,
    getPatientSearch:state => state.data.patientSearch,
    getPatientInfo:state => state.data.patientInfo,
    getPatientFormData:state => state.data.patientFormData,
    getSavingResponse:state => state.data.savingResponse
}


export default {
    state,
    mutations,
    actions,
    getters,
}