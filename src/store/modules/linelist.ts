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
                updated_at: moment(p.updated_at).format('lll')
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

    async saveLnHeader({ commit }, formData) {
        const id = formData.id

        if (id == 0) {
            const response = await api.post('/linelist/header/create', {
                linelist_code: formData.linelist_code,
                dru: formData.dru,
                dru_officer: formData.dru_officer,
                contact: formData.contact,
                region: formData.region,
                province: formData.province,
                email: formData.email,
                created_by: formData.created_by,
                updated_by: formData.updated_by,
            });
            commit('setLnResponse', response.data.data)
        } else {
            const response = await api.put(`/linelist/header/${id}`, {
                linelist_code: formData.linelist_code,
                dru: formData.dru,
                dru_officer: formData.dru_officer,
                contact: formData.contact,
                region: formData.region,
                province: formData.province,
                email: formData.email,
                updated_by: formData.updated_by,
            })
            commit('setLnResponse', response.data.data)
        }
    },

    async saveLinelistDetails({ commit }, formData) {
        const id = formData.idd
        if (id == 0) {
            const response = await api.post('/linelist/details/create', {
                linelist_header_id: formData.linelist_header_id,
                disease_history_id: formData.disease_history_id,
                specimen: formData.specimen_type,
                datetime_collection: formData.datetime_collection
            });
            commit('setLdResponse', response.data.data)
        } else {
            const response = await api.put(`/linelist/details/${id}`, {
                linelist_header_id: formData.linelist_header_id,
                disease_history_id: formData.disease_history_id,
                specimen: formData.specimen_type,
                datetime_collection: formData.datetime_collection
            });
            commit('setLdResponse', response.data.data)
        }

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