import { toPascalCase } from '../functions'
import api from '../../api';
import moment from 'moment';

const state = {
    data: {
        diseaseHistory: {
            id: 0,
            patientInfo_id: 0,
            disease_date: '',
            case_code: '',
            case_id: '',
            ep_id: '',
            type: '',
        },
        response: {}
    }
};


const mutations = {
    setDiseaseHistory:(state, payload) => {
        console.log('payload disdease', payload)
        state.data.diseaseHistory = {
            id: payload.id,
            patientInfo_id: payload.patientInfo_id,
            disease_date: payload.disease_date,
            case_code: payload.case_code,
            case_id: payload.case_id,
            ep_id: payload.ep_id,
            type: payload.type,
        }
    },

    setDiseaseHistoryEmpty:(state, payload) => {
        console.log('payload disdease', payload)
        state.data.diseaseHistory = {
            id: 0,
            patientInfo_id: 0,
            disease_date: '',
            case_code: '',
            case_id: '',
            ep_id: '',
            type: '',
        }
    },

    setResponse:(state, payload) => {
        state.data.response = payload
    }
};


const actions  = {
    async fetchDiseaseHistory({commit}, payload) {
        const response = await api.get(`/disease/${payload}`)
        console.log('response disease', response.data.data)
        commit('setDiseaseHistory', response.data.data)
        

    },

    async saveDiseaseHistory({commit}, formData) {
        // debugger;
        let id = state.data.diseaseHistory.id

        const year = moment(Date.now()).format('YYYY')
        const currdate = moment(Date.now()).format('MMDDYY')
        const gender = formData.gender == 1 ? 'M' : 'F'
        
        const case_no = `${year}-${currdate}${formData.fname}${formData.age_year}${formData.lname}${gender}`

        if (id == 0) {
            const response = await api.post(`/disease/create`, {
                patientInfo_id: formData.patientInfo_id,
                disease_date: formData.disease_date,
                case_code: formData.case_code,
                case_id: case_no,
                ep_id: formData.ep_id,
                type: formData.type,
            user_id: formData.user_id,
            })
            commit('setResponse', response.data.data)
        }else{
            const response = await api.put(`/disease/${id}`, {
                patientInfo_id: formData.patientInfo_id,
                disease_date: state.data.diseaseHistory.disease_date,
                case_code: state.data.diseaseHistory.case_code,
                case_id: state.data.diseaseHistory.case_id,
                ep_id: state.data.diseaseHistory.ep_id,
                type: state.data.diseaseHistory.type.toString(),
                user_id: formData.user_id,
            })
            commit('setResponse', response.data.data)

          
        }
    }

}

const getters = {
    getDiseaseHistory:state => state.data.diseaseHistory,
    getDiseaseResponse:state => state.data.response
}


export default {
    state,
    mutations,
    actions,
    getters
}