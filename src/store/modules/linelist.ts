import { toPascalCase } from '../functions'
import api from '@/api';
import { buildQueryParams } from '@/composables'
import moment from 'moment';

const state = {
    data: {
        lnheader: [],
        lndetails: [],
        lnhresponse: '',
        lndresponse: '',
        totalLn: 0,
        paginatedLn: 0,
    }
}

const mutations = {
    setLnHeader: (state, payload) => {
        state.data.lnheader = payload.map((p) => {
            return {
                ...p,
                created_at: moment(p.created_at).format('lll'),
                updated_at: moment(p.updated_at).format('lll'),

            }
        })
    },

    setLnHeaderEmpty: (state) => {
        state.data.lnheader = []
    },

    setLnDetails: (state, payload) => {
        state.data.lndetails = payload
    },

    setLnResponse: (state, payload) => {
        state.data.lnhresponse = payload
    },

    setLdResponse: (state, payload) => {
        state.data.lndresponse = payload
    },

    setTotalLn: (state, payload) => {
        state.data.totalLn = payload
    },

    setPaginatedLn: (state, payload) => {
        state.data.paginatedLn = payload
    }
}

const actions = {
    async fetchLinelist({ commit }, payload) {
        const queryParams = buildQueryParams(payload)
        const response = await api.get(`/linelist/?${queryParams}`)
        if (response.data.data.length > 0) {
            commit('setLnHeader', response.data.data)
            commit('setTotalLn', response.data.total)
            commit('setPaginatedLn', response.data.total_pages)
        }
    },

    async saveLinelist({ commit }, formData) {
        const id = formData.id

        if (id == 0) {
            const response = await api.post('/linelist/create', {
                linelist_code: formData.linelist_code,
                dru: formData.dru,
                dru_officer: formData.dru_officer,
                contact: formData.contact,
                region: formData.region,
                province: formData.province,
                email: formData.email,
                linelist_details: formData.linelist_details,
                created_by: formData.created_by,
                updated_by: formData.updated_by,
            });
            commit('setLnResponse', response.data.data)
        } else {

            const response = await api.put(`/linelist/${id}`, {
                linelist_code: formData.linelist_code,
                dru: formData.dru,
                dru_officer: formData.dru_officer,
                contact: formData.contact,
                region: formData.region,
                province: formData.province,
                email: formData.email,
                linelist_details: formData.linelist_details,
                updated_by: formData.updated_by,
                removed_details: formData.removed_details
            })
            commit('setLnResponse', response.data.data)
        }
    },

    async deleteLinelist({ commit }, id) {
        const response = await api.delete(`/linelist/${id}`)
        commit('setLnResponse', response.data.data)
    },

    async postLinelist({ commit }, formData) {
        const response = await api.patch(`/linelist/post/${formData.id}`, {
            status: 2,
            updated_by: formData.updated_by,
        })
        commit('setLnResponse', response.data.data)
    },

    async acceptRejectLinelist({ commit }, formData) {
        // console.log(formData)
        // return;
        const response = await api.patch(`/linelist/status/${formData.id}`, {
            reject_reason: formData.reject_reason,
            status: formData.status,
            updated_by: formData.updated_by
        })
        console.log(response.data)
    }

}

const getters = {
    getLnHeader: state => state.data.lnheader,
    getLnDetails: state => state.data.lndetails,
    getLnTotal: state => state.data.totalLn,
    getLnPaginated: state => state.data.paginatedLn,
    getLnhResponse: state => state.data.lnhresponse,
    getLndResponse: state => state.data.lndresponse,
}

export default {
    state,
    mutations,
    actions,
    getters
}