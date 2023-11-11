import { toPascalCase } from '../functions'
import api from '../../api';
import moment from 'moment';

const state = {
    data: {
        roles: [],
        choice_roles: [],
        total_roles: 0,
        pages: 0,
    }
};


const mutations = {
    setRoles:(state, payload) => {
        state.data.roles = payload.map((p) => {
            return {
                ...p,
                created_at: moment(p.created_at).format('lll'),
                updated_at: moment(p.updated_at).format('lll')
            }
        })
        state.data.total_roles = payload.total
        state.data.pages = payload.total_pages
    },

    setTotalRoles:(state, payload) => {
        state.data.total_roles = payload
    },

    setTotalPages:(state, payload) => {
        state.data.pages = payload
    },
    
    setEmptyRoles:(state) => {
        state.data.roles = []
        state.data.total_roles = 0
        state.data.pages = 0
    },

    setChoices:(state, payload) => {
        state.data.choice_roles = payload
    }
};


const actions  = {
    async fetchRoles({commit}, { page, role }) {
        try {
            const response = await api.get(`/roles/?page=${page}&query=${role}`)
            if (response.data.data.length > 0) {
                console.log('roles res', response.data.data, 'roles total', response.data.total, 'roles pages', response.data.total_pages)
                commit('setRoles', response.data.data)
                commit('setTotalRoles', response.data.total)
                commit('setTotalPages', response.data.total_pages)
            }
        } catch (error) {
            console.log('error fetching roles')
        }
    },

    async saveRole({commit}, {id, role}) {
        const url = id == 0 ? `/roles/create` : `/roles/${id}`

        if (id == 0) {
            await api.post(url, { role: role })
        }else{
            await api.put(url, { role: role })
        }

        // const response = await api.post(url, {
        //     role: role,
        // })
    },

    async deleteRole({commit}, id) {
        await api.delete(`/roles/${id}`)
    },
    
    async fetchChoiceRoles({commit}){
        try {
            const response = await api.get(`/roles/all`)
            if (response.data.data.length > 0) {
                commit('setChoices', response.data.data)
            }
        } catch (error) {
            console.log('error fetching roles')
        }
    }
}

const getters = {
    getRoles:state => state.data.roles,
    getTotalRoles:state => state.data.total_roles,
    getPagesRoles:state => state.data.pages,
    getChoiceRoles:state => state.data.choice_roles
}


export default {
    state,
    mutations,
    actions,
    getters
}
