import { toPascalCase } from '../functions'
import api from '@/api';
import { buildQueryParams } from '@/composables'
import moment from 'moment';

const state = {
    data: {
        linelists: [],
        linelistDetails: [],
        totalLinelists: 0,
        paginatedLinelists: 0,
    }
}

const mutations = {
    setLinelists: (state, payload) => {
        state.data.linelists = payload.map((p) => {
            return {
                ...p,
                created_at: moment(p.created_at).format('lll'),
                updated_at: moment(p.updated_at).format('lll'),

            }
        })
    },

    setLinelistsEmpty: (state) => {
        state.data.linelists = []
    },

    setLinelistsDetails: (state, payload) => {
        state.data.linelistDetails = payload.map((l) => {
            return {
                ...l,
                date_received: !l.date_received ? '' : moment(l.date_received).format('ll')
            }
        })

    },

    setLinelistsDetailsEmpty: (state,) => {
        state.data.linelistDetails = []
    },

    setTotalLinelists: (state, payload) => {
        state.data.totalLinelists = payload
    },

    setPaginatedLinelists: (state, payload) => {
        state.data.paginatedLinelists = payload
    }
}

const actions = {
    async fetchSubmittedLinelist({ commit }, payload) {
        const queryParams = buildQueryParams(payload)
        const response = await api.get(`/laboratory/?${queryParams}`)
        if (response.data.data.length > 0) {
            commit('setLinelists', response.data.data)
            commit('setTotalLinelists', response.data.total)
            commit('setPaginatedLinelists', response.data.total_pages)
        }
    },

    async fetchLinelistDetails({ commit }, headerId) {
        const response = await api.get(`/laboratory/detail/${headerId}`)
        if (response.data.data) {
            commit('setLinelistsDetails', response.data.data)

        }
    },

    async acceptSpecimen({ commit }, payload) {
        console.log('pay', payload)
        await api.patch(`/linelist/accept/${payload.detail_id}`);
    },

    async batchAcceppt({ commit }, payload) {
        await api.patch(`/linelist/batch-accept`, {
            detailIds: payload.detail_id,
        })
    },

    async rejectSpecimen({ commit }, payload) {
        await api.patch(`/linelist/reject/${payload.detail_id}`, {
            reject_reason: payload.reason
        });
    },

    async generateAccessionNo({ commit }, payload) {
        await api.patch(`/linelist/accession/${payload.detail_id}`, {
            medtech_id: payload.medtech,
            type: payload.disease_type
        });
    }


}

const getters = {
    getLinelists: state => state.data.linelists,
    getLinelistsDetails: state => state.data.linelistDetails,
    getTotalLinelists: state => state.data.totalLinelists,
    getPaginatedLinelists: state => state.data.paginatedLinelists,
}

export default {
    state,
    mutations,
    actions,
    getters
}