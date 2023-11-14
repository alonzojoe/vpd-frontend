import { toPascalCase } from '../functions'
import api from '@/api';
import { buildQueryParams } from '@/composables'
import moment from 'moment';

const state = {
    data: {
        counts: {
            users: 0,
            roles: 0,
            profiles: 0,
            rota_patients: 0,
            meningitis_patients: 0,
            measles_patients: 0
        }
    }
}

const mutations = {
    setCounts: (state, payload) => {
        state.data.counts = {
            users: payload.users.toLocaleString(),
            roles: payload.roles.toLocaleString(),
            profiles: payload.profiles.toLocaleString(),
            rota_patients: payload.rota_patients.toLocaleString(),
            meningitis_patients: payload.meningitis_patients.toLocaleString(),
            measles_patients: payload.measles_patients.toLocaleString(),
        }
    }
}

const actions = {
    async fetchDashboard({ commit }) {
        const response = await api.get('dashboard')
        if (response.data.data) {
            commit('setCounts', response.data.data)
        }
    }
}

const getters = {
    getDashboardCounts: state => state.data.counts
}

export default {
    state,
    mutations,
    actions,
    getters
}