import { toPascalCase } from '../functions'
import api from '@/api';
import { buildQueryParams } from '@/composables'
import moment from 'moment';

const state = {
    data: {
        meningitis: {
            id: 0,
            disease_history_id: 0,
            admitted: '',
            date_admitted: '',
            date_onset: '',
            fever: 'N',
            mental_status: 'N',
            onset_seizure: 'N',
            neck_stiffness: 'N',
            meningeal_signs: 'N',
            cns: '',
            cns_others: '',
            investigator_name: '',
            position: '',
            contact: '',
            investigation_date: '',
            report_date: '',
            je: 'N',
            je_datedose: '',
            je_doses: '',
            penta: 'N',
            penta_datedose: '',
            penta_doses: '',
            measles: 'N',
            measles_datedose: '',
            measles_doses: '',
            meningo: 'N',
            meningo_datedose: '',
            meningo_doses: '',
            pneumo: 'N',
            pneumo_datedose: '',
            pneumo_doses: '',
            pcv10: 'N',
            pcv10_datedose: '',
            pcv10_doses: '',
            pcv13: 'N',
            pcv13_datedose: '',
            pcv13_doses: '',
            daycare: 'N',
            barangay: 'N',
            home: 'N',
            school: 'N',
            dormitory: 'N',
            healthcare: 'N',
            workplace: 'N',
            other: 'N',
            other_specify: '',
            travel: 'N',
            travel_place: '',
            travel_from: '',
            travel_to: '',
            where_blood: 'N',
            acase_classification: '',
            aes_other: '',
            bcase_classification: '',
            confirmed_case: '',
            final_diagnosis: '',
            outcome: '',
            date_discharge: '',
            date_died: '',
            date_hama: '',
            date_follow: '',
            status_follow: '',
            user_id: '',
        },

        meninPatients: [],
        meninTotalPatients: 0,
        meninPaginatedPatients: 0,
        meninResponse: '',
        meninSpecimens: [
            'Whole Blood',
            'Serum',
            'CSF'
        ]
    }
}

const mutations = {

    setMenin: (state, payload) => {
        state.data.meningitis = {
            id: payload.id,
            disease_history_id: payload.disease_history_id,
            admitted: payload.admitted || '',
            date_admitted: payload.date_admitted || '',
            date_onset: payload.date_onset || '',
            fever: payload.fever || '',
            mental_status: payload.mental_status || '',
            onset_seizure: payload.onset_seizure || '',
            neck_stiffness: payload.neck_stiffness || '',
            meningeal_signs: payload.meningeal_signs || '',
            cns: payload.cns || '',
            cns_others: payload.cns_others || '',
            investigator_name: payload.investigator_name || '',
            position: payload.position || '',
            contact: payload.contact || '',
            investigation_date: payload.investigation_date || '',
            report_date: payload.report_date || '',
            je: payload.je || '',
            je_datedose: payload.je_datedose || '',
            je_doses: payload.je_doses || '',
            penta: payload.penta || '',
            penta_datedose: payload.penta_datedose || '',
            penta_doses: payload.penta_doses || '',
            measles: payload.measles || '',
            measles_datedose: payload.measles_datedose || '',
            measles_doses: payload.measles_doses || '',
            meningo: payload.meningo || '',
            meningo_datedose: payload.meningo_datedose || '',
            meningo_doses: payload.meningo_doses || '',
            pneumo: payload.pneumo || '',
            pneumo_datedose: payload.pneumo_datedose || '',
            pneumo_doses: payload.pneumo_doses || '',
            pcv10: payload.pcv10 || '',
            pcv10_datedose: payload.pcv10_datedose || '',
            pcv10_doses: payload.pcv10_doses || '',
            pcv13: payload.pcv13 || '',
            pcv13_datedose: payload.pcv13_datedose || '',
            pcv13_doses: payload.pcv13_doses || '',
            daycare: payload.daycare || '',
            barangay: payload.barangay || '',
            home: payload.home || '',
            school: payload.school || '',
            dormitory: payload.dormitory || '',
            healthcare: payload.healthcare || '',
            workplace: payload.workplace || '',
            other: payload.other || '',
            other_specify: payload.other_specify || '',
            travel: payload.travel || '',
            travel_place: payload.travel_place || '',
            travel_from: payload.travel_from || '',
            travel_to: payload.travel_to || '',
            where_blood: payload.where_blood || '',
            acase_classification: payload.acase_classification || '',
            aes_other: payload.aes_other || '',
            bcase_classification: payload.bcase_classification || '',
            confirmed_case: payload.confirmed_case || '',
            final_diagnosis: payload.final_diagnosis || '',
            outcome: payload.outcome || '',
            date_discharge: payload.date_discharge || '',
            date_died: payload.date_died || '',
            date_hama: payload.date_hama || '',
            date_follow: payload.date_follow || '',
            status_follow: payload.status_follow || '',
            user_id: payload.user_id || '',
        }
    },

    setMeninEmpty: (state) => {
        state.data.meningitis = {
            id: 0,
            disease_history_id: 0,
            admitted: '',
            date_admitted: '',
            date_onset: '',
            fever: 'N',
            mental_status: 'N',
            onset_seizure: 'N',
            neck_stiffness: 'N',
            meningeal_signs: 'N',
            cns: '',
            cns_others: '',
            investigator_name: '',
            position: '',
            contact: '',
            investigation_date: '',
            report_date: '',
            je: 'N',
            je_datedose: '',
            je_doses: '',
            penta: 'N',
            penta_datedose: '',
            penta_doses: '',
            measles: 'N',
            measles_datedose: '',
            measles_doses: '',
            meningo: 'N',
            meningo_datedose: '',
            meningo_doses: '',
            pneumo: 'N',
            pneumo_datedose: '',
            pneumo_doses: '',
            pcv10: 'N',
            pcv10_datedose: '',
            pcv10_doses: '',
            pcv13: 'N',
            pcv13_datedose: '',
            pcv13_doses: '',
            daycare: 'N',
            barangay: 'N',
            home: 'N',
            school: 'N',
            dormitory: 'N',
            healthcare: 'N',
            workplace: 'N',
            other: 'N',
            other_specify: '',
            travel: 'N',
            travel_place: '',
            travel_from: '',
            travel_to: '',
            where_blood: 'N',
            acase_classification: '',
            aes_other: '',
            bcase_classification: '',
            confirmed_case: '',
            final_diagnosis: '',
            outcome: '',
            date_discharge: '',
            date_died: '',
            date_hama: '',
            date_follow: '',
            status_follow: '',
            user_id: '',
        }
    },

    setMeninPatients: (state, payload) => {
        state.data.meninPatients = payload.map((m) => {
            return {
                ...m,
                date_created: moment(m.date_created).format('lll'),
                date_updated: moment(m.date_updated).format('lll')
            }
        })
    },

    setMeninPatientsEmpty: (state, payload) => {
        state.data.meninPatients = [];
    },

    setMeninTotal: (state, payload) => {
        state.data.meninTotalPatients = payload;
    },

    setMeninPaginated: (state, payload) => {
        state.data.meninPaginatedPatients = payload;
    },

    setMeninResponse: (state, payload) => [
        state.data.meninResponse = payload
    ],

    setAmittedNull: (state) => {
        state.data.meningitis.date_admitted = ''
    },

    setCnsNull: (state) => {
        state.data.meningitis.cns_others = ''
    },

    setJeNull: (state) => {
        state.data.meningitis.je_datedose = ''
        state.data.meningitis.je_doses = ''
    },

    setPentaNull: (state) => {
        state.data.meningitis.penta_datedose = ''
        state.data.meningitis.penta_doses = ''
    },

    setMeaslesNull: (state) => {
        state.data.meningitis.measles_datedose = ''
        state.data.meningitis.measles_doses = ''
    },

    setMeningoNull: (state) => {
        state.data.meningitis.meningo_datedose = ''
        state.data.meningitis.meningo_doses = ''
    },

    setPneumoNull: (state) => {
        state.data.meningitis.pneumo_datedose = ''
        state.data.meningitis.pneumo_doses = ''
    },

    setPcv10Null: (state) => {
        state.data.meningitis.pcv10_datedose = ''
        state.data.meningitis.pcv10_doses = ''
    },

    setPcv13Null: (state) => {
        state.data.meningitis.pcv13_datedose = ''
        state.data.meningitis.pcv13_doses = ''
    },

    setExposureNull: (state) => {
        state.data.meningitis.other_specify = ''
    },

    setTravelNull: (state) => {
        state.data.meningitis.travel_place = ''
        state.data.meningitis.travel_from = ''
        state.data.meningitis.travel_to = ''
    },

    setAesNull: (state) => {
        state.data.meningitis.aes_other = ''
    },

    setConfirmedNull: (state) => {
        state.data.meningitis.confirmed_case = ''
    },

    setOutcomeDateNull: (state, payload) => {
        if (payload == 'A') {
            state.data.meningitis.date_died = ''
            state.data.meningitis.date_hama = ''
        } else if (payload == 'D') {
            state.data.meningitis.date_discharge = ''
            state.data.meningitis.date_hama = ''
        } else if (payload == 'HAMA') {
            state.data.meningitis.date_discharge = ''
            state.data.meningitis.date_died = ''
        } else {
            state.data.meningitis.date_discharge = ''
            state.data.meningitis.date_died = ''
            state.data.meningitis.date_hama = ''
        }
    }

}


const actions = {

    async fetchMenin({ commit }, payload) {
        const response = await api.get(`/meningitis/${payload}`)
        if (response.data.data) {
            commit('setMenin', response.data.data)
        }
    },

    async fetchAllMenin({ commit }, payload) {
        const queryParams = buildQueryParams(payload)
        const response = await api.get(`/meningitis/?${queryParams}`)
        if (response.data.data.length > 0) {
            commit('setMeninPatients', response.data.data)
            commit('setMeninTotal', response.data.total)
            commit('setMeninPaginated', response.data.total_pages)
        }
    },

    async saveMenin({ commit }, formData) {
        const id = formData.id

        if (id == 0) {
            const response = await api.post('meningitis/create', {
                id: formData.id,
                disease_history_id: formData.disease_history_id,
                admitted: formData.admitted,
                date_admitted: formData.date_admitted,
                date_onset: formData.date_onset,
                fever: formData.fever,
                mental_status: formData.mental_status,
                onset_seizure: formData.onset_seizure,
                neck_stiffness: formData.neck_stiffness,
                meningeal_signs: formData.meningeal_signs,
                cns: formData.cns,
                cns_others: formData.cns_others,
                investigator_name: formData.investigator_name,
                position: formData.position,
                contact: formData.contact,
                investigation_date: formData.investigation_date,
                report_date: formData.report_date,
                je: formData.je,
                je_datedose: formData.je_datedose,
                je_doses: formData.je_doses,
                penta: formData.penta,
                penta_datedose: formData.penta_datedose,
                penta_doses: formData.penta_doses,
                measles: formData.measles,
                measles_datedose: formData.measles_datedose,
                measles_doses: formData.measles_doses,
                meningo: formData.meningo,
                meningo_datedose: formData.meningo_datedose,
                meningo_doses: formData.meningo_doses,
                pneumo: formData.pneumo,
                pneumo_datedose: formData.pneumo_datedose,
                pneumo_doses: formData.pneumo_doses,
                pcv10: formData.pcv10,
                pcv10_datedose: formData.pcv10_datedose,
                pcv10_doses: formData.pcv10_doses,
                pcv13: formData.pcv13,
                pcv13_datedose: formData.pcv13_datedose,
                pcv13_doses: formData.pcv13_doses,
                daycare: formData.daycare,
                barangay: formData.barangay,
                home: formData.home,
                school: formData.school,
                dormitory: formData.dormitory,
                healthcare: formData.healthcare,
                workplace: formData.workplace,
                other: formData.other,
                other_specify: formData.other_specify,
                travel: formData.travel,
                travel_place: formData.travel_place,
                travel_from: formData.travel_from,
                travel_to: formData.travel_to,
                where_blood: formData.where_blood,
                acase_classification: formData.acase_classification,
                aes_other: formData.aes_other,
                bcase_classification: formData.bcase_classification,
                confirmed_case: formData.confirmed_case,
                final_diagnosis: formData.final_diagnosis,
                outcome: formData.outcome,
                date_discharge: formData.date_discharge,
                date_died: formData.date_died,
                date_hama: formData.date_hama,
                date_follow: formData.date_follow,
                status_follow: formData.status_follow,
                user_id: formData.user_id,
            })

            commit('setMeninResponse', response.data.data)
        } else {
            const response = await api.put(`/meningitis/${id}`, {
                id: formData.id,
                disease_history_id: formData.disease_history_id,
                admitted: formData.admitted,
                date_admitted: formData.date_admitted,
                date_onset: formData.date_onset,
                fever: formData.fever,
                mental_status: formData.mental_status,
                onset_seizure: formData.onset_seizure,
                neck_stiffness: formData.neck_stiffness,
                meningeal_signs: formData.meningeal_signs,
                cns: formData.cns,
                cns_others: formData.cns_others,
                investigator_name: formData.investigator_name,
                position: formData.position,
                contact: formData.contact,
                investigation_date: formData.investigation_date,
                report_date: formData.report_date,
                je: formData.je,
                je_datedose: formData.je_datedose,
                je_doses: formData.je_doses,
                penta: formData.penta,
                penta_datedose: formData.penta_datedose,
                penta_doses: formData.penta_doses,
                measles: formData.measles,
                measles_datedose: formData.measles_datedose,
                measles_doses: formData.measles_doses,
                meningo: formData.meningo,
                meningo_datedose: formData.meningo_datedose,
                meningo_doses: formData.meningo_doses,
                pneumo: formData.pneumo,
                pneumo_datedose: formData.pneumo_datedose,
                pneumo_doses: formData.pneumo_doses,
                pcv10: formData.pcv10,
                pcv10_datedose: formData.pcv10_datedose,
                pcv10_doses: formData.pcv10_doses,
                pcv13: formData.pcv13,
                pcv13_datedose: formData.pcv13_datedose,
                pcv13_doses: formData.pcv13_doses,
                daycare: formData.daycare,
                barangay: formData.barangay,
                home: formData.home,
                school: formData.school,
                dormitory: formData.dormitory,
                healthcare: formData.healthcare,
                workplace: formData.workplace,
                other: formData.other,
                other_specify: formData.other_specify,
                travel: formData.travel,
                travel_place: formData.travel_place,
                travel_from: formData.travel_from,
                travel_to: formData.travel_to,
                where_blood: formData.where_blood,
                acase_classification: formData.acase_classification,
                aes_other: formData.aes_other,
                bcase_classification: formData.bcase_classification,
                confirmed_case: formData.confirmed_case,
                final_diagnosis: formData.final_diagnosis,
                outcome: formData.outcome,
                date_discharge: formData.date_discharge,
                date_died: formData.date_died,
                date_hama: formData.date_hama,
                date_follow: formData.date_follow,
                status_follow: formData.status_follow,
                user_id: formData.user_id,
            })

            commit('setMeninResponse', response.data.data)
        }

    }



}

const getters = {
    getMenin: state => state.data.meningitis,
    getMeninPatients: state => state.data.meninPatients,
    getMeninTotal: state => state.data.meninTotalPatients,
    getMeninPaginated: state => state.data.meninPaginatedPatients,
    getMeninResponse: state => state.data.meninResponse,
    getMeninSpecimens: state => state.data.meninSpecimens
}

export default {
    state,
    mutations,
    actions,
    getters
}