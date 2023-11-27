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
        state.data.lnheader = payload
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
        }
    }
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}