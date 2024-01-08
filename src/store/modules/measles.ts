import { toPascalCase } from '../functions'
import api from '@/api';
import { buildQueryParams } from '@/composables'
import moment from 'moment';

const state = {
    data: {
        measles: {
            id: 0,
            disease_history_id: 0,
            pregnant: '',
            admitted: '',
            date_admitted: '',
            caregiver_name: '',
            caregiver_contact: '',
            reporter_date: '',
            reporter_name: '',
            reporter_contact: '',
            investigate_date: '',
            investigate_name: '',
            investigate_contact: '',
            fever: 'N',
            fever_date: '',
            rash: 'N',
            rash_date: '',
            cough: 'N',
            koplik: 'N',
            runny_nose: 'N',
            red_eyes: 'N',
            artharalgia: 'N',
            swollen_lymp: 'N',
            lym_location: '',
            lymp_others: '',
            complications: 'N',
            complications_specify: '',
            other_symptoms: '',
            working_diagnosis: '',
            received_mcv: 'N',
            mcv_dose: '',
            mr_dose: '',
            mmr_dose: '',
            date_last_mcv: '',
            validated_through: '',
            received_campaigns: '',
            mom_busy: '0',
            child_sick: '0',
            forgot_sched: '0',
            against_belief: '0',
            no_available: '0',
            other_reason: '0',
            other_reason_specify: '',
            medical_counter: '0',
            no_vaccinator: '0',
            side_effects: '0',
            not_eligible: '0',
            vitamin_illness: 'N',
            travel_history: '',
            travel_place: '',
            travel_date: '',
            less_seven: 'N',
            more_seven: 'N',
            confirmed_measles: '',
            confirmed_rubella: '',
            confirmed_name: '',
            confirmed_place: '',
            date_contact: '',
            day_care: '',
            barangay: '',
            home: '',
            school: '',
            hci: '',
            dorm: '',
            occur_specify: '',
            known_case: 'N',
            final_classification: '',
            source_infection: '',
            outcome: '',
            date_died: '',
            final_diagnosis: '',
            user_id: 0
        },



        measePatients: [],
        measeTotalPatients: 0,
        measePaginatedPatients: 0,
        measeResponse: '',
        measeSpecimens: [
            'Whole Blood',
            'Serum',
            'DBS',
            'OPS',
            'NPS',
            'NPS/OPS'
        ],
        measlesTests: [
            'Enzyme-linked Immunoassay (ELISA)',
            'IgM Antibody Test',
            'IgM and IgG Antibody Test',
            'Polymerase Chain Reaction',
            'Virus Isolation'
        ],
        measeLabProfile: [
            // {
            //     id: 0,
            //     disease_id: 0,
            //     disease_type: "",
            //     datetime_collection: "",
            //     specimen_type: "",
            //     specimen_sent: "",
            //     date_sent: "",
            //     date_received: "",
            //     test_conducted: "",
            //     lab_result: "",
            //     organism_detected: "",
            //     interpretation: ""
            // }
        ],
    }
}

const mutations = {
    setMease: (state, payload) => {
        state.data.measles = {
            id: payload.id,
            disease_history_id: payload.disease_history_id,
            pregnant: payload.pregnant,
            admitted: payload.admitted,
            date_admitted: payload.date_admitted,
            caregiver_name: payload.caregiver_name || '',
            caregiver_contact: payload.caregiver_contact || '',
            reporter_date: payload.reporter_date || '',
            reporter_name: payload.reporter_name || '',
            reporter_contact: payload.reporter_contact || '',
            investigate_date: payload.investigate_date || '',
            investigate_name: payload.investigate_name || '',
            investigate_contact: payload.investigate_contact || '',
            fever: payload.fever || '',
            fever_date: payload.fever_date || '',
            rash: payload.rash || '',
            rash_date: payload.rash_date || '',
            cough: payload.cough || '',
            koplik: payload.koplik || '',
            runny_nose: payload.runny_nose || '',
            red_eyes: payload.red_eyes || '',
            artharalgia: payload.artharalgia || '',
            swollen_lymp: payload.swollen_lymp || '',
            lym_location: payload.lym_location || '',
            lymp_others: payload.lymp_others || '',
            complications: payload.complications || '',
            complications_specify: payload.complications_specify || '',
            other_symptoms: payload.other_symptoms || '',
            working_diagnosis: payload.working_diagnosis || '',
            received_mcv: payload.received_mcv || '',
            mcv_dose: payload.mcv_dose || '',
            mr_dose: payload.mr_dose || '',
            mmr_dose: payload.mmr_dose || '',
            date_last_mcv: payload.date_last_mcv || '',
            validated_through: payload.validated_through || '',
            received_campaigns: payload.received_campaigns || '',
            mom_busy: payload.mom_busy || '',
            child_sick: payload.child_sick || '',
            forgot_sched: payload.forgot_sched || '',
            against_belief: payload.against_belief || '',
            no_available: payload.no_available || '',
            other_reason: payload.other_reason || '',
            other_reason_specify: payload.other_reason_specify || '',
            medical_counter: payload.medical_counter || '',
            no_vaccinator: payload.no_vaccinator || '',
            side_effects: payload.side_effects || '',
            not_eligible: payload.not_eligible || '',
            vitamin_illness: payload.vitamin_illness || '',
            travel_history: payload.travel_history || '',
            travel_place: payload.travel_place || '',
            travel_date: payload.travel_date || '',
            less_seven: payload.less_seven || '',
            more_seven: payload.more_seven || '',
            confirmed_measles: payload.confirmed_measles || '',
            confirmed_rubella: payload.confirmed_rubella || '',
            confirmed_name: payload.confirmed_name || '',
            confirmed_place: payload.confirmed_place || '',
            date_contact: payload.date_contact || '',
            day_care: payload.day_care || '',
            barangay: payload.barangay || '',
            home: payload.home || '',
            school: payload.school || '',
            hci: payload.hci || '',
            dorm: payload.dorm || '',
            occur_specify: payload.occur_specify || '',
            known_case: payload.known_case || '',
            final_classification: payload.final_classification || '',
            source_infection: payload.source_infection || '',
            outcome: payload.outcome || '',
            date_died: payload.date_died || '',
            final_diagnosis: payload.final_diagnosis || '',
            user_id: payload.user_id,
        }
    },

    setMeaseEmpty: (state) => {
        state.data.measles = {
            id: 0,
            disease_history_id: 0,
            pregnant: '',
            admitted: '',
            date_admitted: '',
            caregiver_name: '',
            caregiver_contact: '',
            reporter_date: '',
            reporter_name: '',
            reporter_contact: '',
            investigate_date: '',
            investigate_name: '',
            investigate_contact: '',
            fever: 'N',
            fever_date: '',
            rash: 'N',
            rash_date: '',
            cough: 'N',
            koplik: 'N',
            runny_nose: 'N',
            red_eyes: 'N',
            artharalgia: 'N',
            swollen_lymp: 'N',
            lym_location: '',
            lymp_others: '',
            complications: 'N',
            complications_specify: '',
            other_symptoms: '',
            working_diagnosis: '',
            received_mcv: 'N',
            mcv_dose: '',
            mr_dose: '',
            mmr_dose: '',
            date_last_mcv: '',
            validated_through: '',
            received_campaigns: '',
            mom_busy: '0',
            child_sick: '0',
            forgot_sched: '0',
            against_belief: '0',
            no_available: '0',
            other_reason: '0',
            other_reason_specify: '',
            medical_counter: '0',
            no_vaccinator: '0',
            side_effects: '0',
            not_eligible: '0',
            vitamin_illness: 'N',
            travel_history: '',
            travel_place: '',
            travel_date: '',
            less_seven: 'N',
            more_seven: 'N',
            confirmed_measles: '',
            confirmed_rubella: '',
            confirmed_name: '',
            confirmed_place: '',
            date_contact: '',
            day_care: '',
            barangay: '',
            home: '',
            school: '',
            hci: '',
            dorm: '',
            occur_specify: '',
            known_case: 'N',
            final_classification: '',
            source_infection: '',
            outcome: '',
            date_died: '',
            final_diagnosis: '',
            user_id: 0
        }
    },

    setMeasePatients: (state, payload) => {
        state.data.measePatients = payload.map((m) => {
            return {
                ...m,
                birthdate: moment(m.birthdate).format('ll'),
                date_created: moment(m.date_created).format('lll'),
                date_updated: moment(m.date_updated).format('lll')
            }
        })
    },

    setMeasePatientsEmpty: (state, payload) => {
        state.data.measePatients = []
    },

    setMeaseTotal: (state, payload) => {
        state.data.measeTotalPatients = payload
    },

    setMeasePaginated: (state, payload) => {
        state.data.measePaginatedPatients = payload
    },

    setMeaseResponse: (state, payload) => {
        state.data.measeResponse = payload
    },


    resetDateFever: (state) => {
        state.data.measles.fever_date = ''
    },

    resetDateRash: (state) => {
        state.data.measles.rash_date = ''
    },

    resetLymph: (state) => {
        state.data.measles.lym_location = ''
        state.data.measles.lymp_others = ''
    },

    resetLymphLocation: (state) => {
        state.data.measles.lymp_others = ''
    },

    resetComplication: (state) => {
        state.data.measles.complications_specify = ''
    },

    resetMCV: (state) => {
        state.data.measles.mcv_dose = ''
        state.data.measles.mr_dose = ''
        state.data.measles.mmr_dose = ''
        state.data.measles.date_last_mcv = ''
        state.data.measles.validated_through = ''
        state.data.measles.received_campaigns = ''
    },

    resetOtherReason: (state) => {
        state.data.measles.other_reason_specify = ''
    },

    resetExposeContact: (state) => {
        state.data.measles.confirmed_name = ''
        state.data.measles.confirmed_place = ''
        state.data.measles.date_contact = ''
    },

    resetFinalClassification: (state) => {
        state.data.measles.final_classification = ''
    },

    resetSourceInfection: (state) => {
        state.data.measles.source_infection = ''
    },

    resetOutcomeDied: (state) => {
        state.data.measles.date_died = ''
    },

    addLaboratory: (state, payload) => {
        console.log('payload mutation', payload)
        const newSpecimen = {
            id: 0,
            disease_id: payload.id,
            disease_type: "",
            datetime_collection: "",
            specimen_type: "",
            specimen_sent: "",
            date_sent: "",
            date_received: "",
            test_conducted: "",
            lab_result: "",
            organism_detected: "",
            interpretation: ""
        }
        state.data.measeLabProfile.push(newSpecimen);
    },

    updateLabProfile: (state, payload) => {

        state.data.measeLabProfile = state.data.measeLabProfile.map((m) => {
            return {
                ...m,
                disease_id: payload.id,
                disease_type: payload.disease_type
            }
        })
    },

    setLaboratoryProfile: (state, payload) => {
        state.data.measeLabProfile = payload
    },

    removeLabProfile: (state, payload) => {
        state.data.measeLabProfile.splice(payload, 1)
    },

    resetLabProfile: (state) => {
        state.data.measeLabProfile = []
    }

}

const actions = {
    async fetchMease({ commit }, payload) {
        const response = await api.get(`/measles/${payload}`)
        if (response.data.data) {
            commit('setMease', response.data.data)
        }
    },

    async fetchAllMease({ commit }, payload) {
        const queryParams = buildQueryParams(payload)
        const response = await api.get(`/measles/?${queryParams}`)
        if (response.data.data.length > 0) {
            commit('setMeasePatients', response.data.data)
            commit('setMeaseTotal', response.data.total)
            commit('setMeasePaginated', response.data.total_pages)
        }
    },

    async saveMeasles({ commit }, formData) {
        const id = formData.id

        if (id == 0) {
            const response = await api.post('/measles/create', {
                id: formData.id,
                disease_history_id: formData.disease_history_id,
                pregnant: formData.pregnant,
                admitted: formData.admitted,
                date_admitted: formData.date_admitted,
                caregiver_name: formData.caregiver_name,
                caregiver_contact: formData.caregiver_contact,
                reporter_date: formData.reporter_date,
                reporter_name: formData.reporter_name,
                reporter_contact: formData.reporter_contact,
                investigate_date: formData.investigate_date,
                investigate_name: formData.investigate_name,
                investigate_contact: formData.investigate_contact,
                fever: formData.fever,
                fever_date: formData.fever_date,
                rash: formData.rash,
                rash_date: formData.rash_date,
                cough: formData.cough,
                koplik: formData.koplik,
                runny_nose: formData.runny_nose,
                red_eyes: formData.red_eyes,
                artharalgia: formData.artharalgia,
                swollen_lymp: formData.swollen_lymp,
                lym_location: formData.lym_location,
                lymp_others: formData.lymp_others,
                complications: formData.complications,
                complications_specify: formData.complications_specify,
                other_symptoms: formData.other_symptoms,
                working_diagnosis: formData.working_diagnosis,
                received_mcv: formData.received_mcv,
                mcv_dose: formData.mcv_dose,
                mr_dose: formData.mr_dose,
                mmr_dose: formData.mmr_dose,
                date_last_mcv: formData.date_last_mcv,
                validated_through: formData.validated_through,
                received_campaigns: formData.received_campaigns,
                mom_busy: formData.mom_busy,
                child_sick: formData.child_sick,
                forgot_sched: formData.forgot_sched,
                against_belief: formData.against_belief,
                no_available: formData.no_available,
                other_reason: formData.other_reason,
                other_reason_specify: formData.other_reason_specify,
                medical_counter: formData.medical_counter,
                no_vaccinator: formData.no_vaccinator,
                side_effects: formData.side_effects,
                not_eligible: formData.not_eligible,
                vitamin_illness: formData.vitamin_illness,
                travel_history: formData.travel_history,
                travel_place: formData.travel_place,
                travel_date: formData.travel_date,
                less_seven: formData.less_seven,
                more_seven: formData.more_seven,
                confirmed_measles: formData.confirmed_measles,
                confirmed_rubella: formData.confirmed_rubella,
                confirmed_name: formData.confirmed_name,
                confirmed_place: formData.confirmed_place,
                date_contact: formData.date_contact,
                day_care: formData.day_care,
                barangay: formData.barangay,
                home: formData.home,
                school: formData.school,
                hci: formData.hci,
                dorm: formData.dorm,
                occur_specify: formData.occur_specify,
                known_case: formData.known_case,
                final_classification: formData.final_classification,
                source_infection: formData.source_infection,
                outcome: formData.outcome,
                date_died: formData.date_died,
                final_diagnosis: formData.final_diagnosis,
                user_id: formData.user_id,
                laboratory_profiles: formData.laboratory_profiles
            })

            commit('setMeaseResponse', response.data.data)
        } else {
            const response = await api.put(`/measles/${id}`, {
                id: formData.id,
                disease_history_id: formData.disease_history_id,
                pregnant: formData.pregnant,
                admitted: formData.admitted,
                date_admitted: formData.date_admitted,
                caregiver_name: formData.caregiver_name,
                caregiver_contact: formData.caregiver_contact,
                reporter_date: formData.reporter_date,
                reporter_name: formData.reporter_name,
                reporter_contact: formData.reporter_contact,
                investigate_date: formData.investigate_date,
                investigate_name: formData.investigate_name,
                investigate_contact: formData.investigate_contact,
                fever: formData.fever,
                fever_date: formData.fever_date,
                rash: formData.rash,
                rash_date: formData.rash_date,
                cough: formData.cough,
                koplik: formData.koplik,
                runny_nose: formData.runny_nose,
                red_eyes: formData.red_eyes,
                artharalgia: formData.artharalgia,
                swollen_lymp: formData.swollen_lymp,
                lym_location: formData.lym_location,
                lymp_others: formData.lymp_others,
                complications: formData.complications,
                complications_specify: formData.complications_specify,
                other_symptoms: formData.other_symptoms,
                working_diagnosis: formData.working_diagnosis,
                received_mcv: formData.received_mcv,
                mcv_dose: formData.mcv_dose,
                mr_dose: formData.mr_dose,
                mmr_dose: formData.mmr_dose,
                date_last_mcv: formData.date_last_mcv,
                validated_through: formData.validated_through,
                received_campaigns: formData.received_campaigns,
                mom_busy: formData.mom_busy,
                child_sick: formData.child_sick,
                forgot_sched: formData.forgot_sched,
                against_belief: formData.against_belief,
                no_available: formData.no_available,
                other_reason: formData.other_reason,
                other_reason_specify: formData.other_reason_specify,
                medical_counter: formData.medical_counter,
                no_vaccinator: formData.no_vaccinator,
                side_effects: formData.side_effects,
                not_eligible: formData.not_eligible,
                vitamin_illness: formData.vitamin_illness,
                travel_history: formData.travel_history,
                travel_place: formData.travel_place,
                travel_date: formData.travel_date,
                less_seven: formData.less_seven,
                more_seven: formData.more_seven,
                confirmed_measles: formData.confirmed_measles,
                confirmed_rubella: formData.confirmed_rubella,
                confirmed_name: formData.confirmed_name,
                confirmed_place: formData.confirmed_place,
                date_contact: formData.date_contact,
                day_care: formData.day_care,
                barangay: formData.barangay,
                home: formData.home,
                school: formData.school,
                hci: formData.hci,
                dorm: formData.dorm,
                occur_specify: formData.occur_specify,
                known_case: formData.known_case,
                final_classification: formData.final_classification,
                source_infection: formData.source_infection,
                outcome: formData.outcome,
                date_died: formData.date_died,
                final_diagnosis: formData.final_diagnosis,
                user_id: formData.user_id,
                laboratory_profiles: formData.laboratory_profiles
            })
            commit('setMeaseResponse', response.data.data)
        }

    },

    async fethLaboratoryProfile({ commit }, payload) {
        const response = await api.get(`laboratory/profile/${payload}`)
        commit('setLaboratoryProfile', response.data.data)
    }

}

const getters = {
    getMease: state => state.data.measles,
    getMeasePatients: state => state.data.measePatients,
    getMeaseTotal: state => state.data.measeTotalPatients,
    getMeasePaginated: state => state.data.measePaginatedPatients,
    getMeaseResponse: state => state.data.measeResponse,
    getMeaseSpecimens: state => state.data.measeSpecimens,
    getMeaseTests: state => state.data.measlesTests,
    getMeaseLabProfile: state => state.data.measeLabProfile,

}

export default {
    state,
    mutations,
    actions,
    getters
}