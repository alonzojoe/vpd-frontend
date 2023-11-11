import { toPascalCase } from '../functions'
import api from '../../api';
import { buildQueryParams } from '@/composables'
import moment from 'moment';

const state = {
    data: {
        rota: {
            id: 0,
            disease_history_id: 0,
            onset_diarrhea: '',
            patient_admitted: '',
            admission_date: '',
            rehydration_therapy: '',
            prev_hospitalization: '',
            date_hospitalization: '',
            vomiting: '',
            date_vomiting: '',
            degree_dehydration: '',
            fever: '',
            admitting_diagnosis: '',
            final_diagnosis: '',
            more_diarrhea: '',
            where_diarrhea: '',
            received_rota: '',
            dose_received: '',
            first_dose: '',
            second_dose: '',
            investigator_name: '',
            position: '',
            contact: '',
            investigation_date: '',
            report_date: '',
            case_classification: '',
            outcome: '',
            discharge_date: '',
            died_date: ''
        },
        rotaPatients: [],
        rotaTotalPatients: 0,
        rotaPaginatedPatients: 0,

        response: {}
    }
};


const mutations = {
    setRota: (state, payload) => {
        state.data.rota = {
            id: payload.id,
            disease_history_id: payload.disease_history_id,
            onset_diarrhea: payload.onset_diarrhea || '',
            patient_admitted: payload.patient_admitted || '',
            admission_date: payload.admission_date || '',
            rehydration_therapy: payload.rehydration_therapy || '',
            prev_hospitalization: payload.prev_hospitalization || '',
            date_hospitalization: payload.date_hospitalization || '',
            vomiting: payload.vomiting || '',
            date_vomiting: payload.date_vomiting || '',
            degree_dehydration: payload.degree_dehydration || '',
            fever: payload.fever || '',
            admitting_diagnosis: payload.admitting_diagnosis || '',
            final_diagnosis: payload.final_diagnosis || '',
            more_diarrhea: payload.more_diarrhea || '',
            where_diarrhea: payload.where_diarrhea || '',
            received_rota: payload.received_rota || '',
            dose_received: payload.dose_received || '',
            first_dose: payload.first_dose || '',
            second_dose: payload.second_dose || '',
            investigator_name: payload.investigator_name || '',
            position: payload.position || '',
            contact: payload.contact || '',
            investigation_date: payload.investigation_date || '',
            report_date: payload.report_date || '',
            case_classification: payload.case_classification || '',
            outcome: payload.outcome || '',
            discharge_date: payload.discharge_date || '',
            died_date: payload.died_date || '',
        }
    },

    setRotaEmpty: (state) => {
        state.data.rota = {
            id: 0,
            disease_history_id: 0,
            onset_diarrhea: '',
            patient_admitted: '',
            admission_date: '',
            rehydration_therapy: '',
            prev_hospitalization: '',
            date_hospitalization: '',
            vomiting: '',
            date_vomiting: '',
            degree_dehydration: '',
            fever: '',
            admitting_diagnosis: '',
            final_diagnosis: '',
            more_diarrhea: '',
            where_diarrhea: '',
            received_rota: '',
            dose_received: '',
            first_dose: '',
            second_dose: '',
            investigator_name: '',
            position: '',
            contact: '',
            investigation_date: '',
            report_date: '',
            case_classification: '',
            outcome: '',
            discharge_date: '',
            died_date: ''
        }
    },

    setRotaResponse: (state, payload) => {
        state.data.response = payload
    },

    setRotaPatients: (state, payload) => {
        state.data.rotaPatients = payload.map((r) => {
            return {
                ...r,
                date_created: moment(r.date_created).format('lll'),
                date_updated: moment(r.date_updated).format('lll')
            }
        })
    },

    setRotaTotalPatients: (state, payload) => {
        state.data.rotaTotalPatients = payload
    },

    setRotalPaginatedPatients: (state, payload) => {
        state.data.rotaPaginatedPatients = payload
    },

    setRotaPatientsEmpty: (state) => {
        state.data.rotaPatients = []
    },


    resetAdmittedWard: (state) => {
        state.data.rota.admission_date = ''
    },

    resetHospitalization: (state) => {
        state.data.rota.date_hospitalization = ''
    },

    resetVomitting: (state) => {
        state.data.rota.date_vomiting = ''
        state.data.rota.degree_dehydration = ''
    },

    resetMoreDia: (state) => {
        state.data.rota.where_diarrhea = ''
    },
    //
    resetTotalDosse: (state) => {
        state.data.rota.dose_received = ''
        state.data.rota.first_dose = ''
        state.data.rota.second_dose = ''
    },

    resetDateDischarge: (state) => {
        state.data.rota.discharge_date = ''
    },

    resetDiedDate: (state) => {
        state.data.rota.died_date = ''
    },

    resetBothOutcome: (state) => {
        state.data.rota.discharge_date = ''
        state.data.rota.died_date = ''
    }

};


const actions = {
    async fetchRota({ commit }, payload) {
        const response = await api.get(`/rota/${payload}`)
        if (response.data.data) {
            commit('setRota', response.data.data)
        }
    },



    async fetchAllRota({ commit }, { page, case_id, lname, fname, mname, ep_id, dateFrom, dateTo, mime }) {
        const queryParams = buildQueryParams({ page, case_id, lname, fname, mname, ep_id, dateFrom, dateTo, mime })
        const response = await api.get(`/rota/?${queryParams}`)
        if (response.data.data.length > 0) {
            commit('setRotaPatients', response.data.data)
            commit('setRotaTotalPatients', response.data.total)
            commit('setRotalPaginatedPatients', response.data.total_pages)
        }
    },

    async saveRota({ commit }, formData) {
        let id = formData.id


        if (id == 0) {
            const response = await api.post('/rota/create', {
                id: formData.id,
                disease_history_id: formData.disease_history_id,
                onset_diarrhea: formData.onset_diarrhea,
                patient_admitted: formData.patient_admitted,
                admission_date: formData.admission_date,
                rehydration_therapy: formData.rehydration_therapy,
                prev_hospitalization: formData.prev_hospitalization,
                date_hospitalization: formData.date_hospitalization,
                vomiting: formData.vomiting,
                date_vomiting: formData.date_vomiting,
                degree_dehydration: formData.degree_dehydration,
                fever: formData.fever,
                admitting_diagnosis: formData.admitting_diagnosis,
                final_diagnosis: formData.final_diagnosis,
                more_diarrhea: formData.more_diarrhea,
                where_diarrhea: formData.where_diarrhea,
                received_rota: formData.received_rota,
                dose_received: formData.dose_received,
                first_dose: formData.first_dose,
                second_dose: formData.second_dose,
                investigator_name: formData.investigator_name,
                position: formData.position,
                contact: formData.contact,
                investigation_date: formData.investigation_date,
                report_date: formData.report_date,
                case_classification: formData.case_classification,
                outcome: formData.outcome,
                discharge_date: formData.discharge_date,
                died_date: formData.died_date,
                user_id: formData.user_id
            })

            commit('setRotaResponse', response.data.data)

        } else {
            const response = await api.put(`/rota/${id}`, {
                id: formData.id,
                disease_history_id: formData.disease_history_id,
                onset_diarrhea: formData.onset_diarrhea,
                patient_admitted: formData.patient_admitted,
                admission_date: formData.admission_date,
                rehydration_therapy: formData.rehydration_therapy,
                prev_hospitalization: formData.prev_hospitalization,
                date_hospitalization: formData.date_hospitalization,
                vomiting: formData.vomiting,
                date_vomiting: formData.date_vomiting,
                degree_dehydration: formData.degree_dehydration,
                fever: formData.fever,
                admitting_diagnosis: formData.admitting_diagnosis,
                final_diagnosis: formData.final_diagnosis,
                more_diarrhea: formData.more_diarrhea,
                where_diarrhea: formData.where_diarrhea,
                received_rota: formData.received_rota,
                dose_received: formData.dose_received,
                first_dose: formData.first_dose,
                second_dose: formData.second_dose,
                investigator_name: formData.investigator_name,
                position: formData.position,
                contact: formData.contact,
                investigation_date: formData.investigation_date,
                report_date: formData.report_date,
                case_classification: formData.case_classification,
                outcome: formData.outcome,
                discharge_date: formData.discharge_date,
                died_date: formData.died_date,
                user_id: formData.user_id
            })

            commit('setRotaResponse', response.data.data)
        }

    }

}

const getters = {
    getRota: state => state.data.rota,
    getRotaResponse: state => state.data.response,
    getRotaPatients: state => state.data.rotaPatients,
    getRotaTotalPatients: state => state.data.rotaTotalPatients,
    getRotaPagesPatients: state => state.data.rotaPaginatedPatients,

}


export default {
    state,
    mutations,
    actions,
    getters
}