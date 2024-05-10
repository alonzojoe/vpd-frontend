import moment from "moment";
import api from "@/api"
import { buildQueryParams } from "@/composables";
import { RootState } from "./types/pool"

const state: RootState = {
    data: {
        poolCart: [],
        poolHeaders: [],
        poolDetails: [],
        poolHeader: {
            id: 0,
            protocol_no: "",
            date_performed: moment().format('YYYY-MM-DD'),
            method: "",
            test_name: "",
            kit_name: "",
            lot_no: "",
            date_expiry: "",
            room_temp: "",
            start: "",
            end: "",
            performed_by: "",
            validate_by: "",
            pathologist: "",

        },
        poolMethodMeasles: [
            'Enzyme Immunoassay'
        ],
        poolKitMeasles: [
            'Euroimmun Measles IgM ELISA',
            'Euroimmun Rubella IgM ELISA'
        ],
        poolTestMeasles: [
            'Anti-Measles IgM ELISA',
            'Anti-Rubella IgM ELISA'
        ],
        pools: [],
        total_pools: 0,
        pools_pages: 0,
        pool: []
    }
}

const mutations = {
    addToPoolCart: (state: RootState, payload: any) => {
        state.data.poolCart.push(payload)
    },

    removeToPoolCart: (state: RootState, payload: any) => {
        const poolIndex = state.data.poolCart.findIndex(item => item.detail_id === payload.detail_id);

        if (poolIndex !== -1) {
            state.data.poolCart.splice(poolIndex, 1);
        }
    },

    resetPoolCart: (state: RootState) => {
        state.data.poolCart = [];

    },

    setPoolList: <Payload extends { date_expiry: string }>(state: RootState, payload: Payload[]) => {
        state.data.pools = payload.map((pool) => {
            return {
                ...pool,
                date_expiry: moment(pool.date_expiry).format('ll')
            }
        })
    },

    setTotalPools: (state: RootState, payload: number) => {
        state.data.total_pools = payload
    },

    setPoolPages: (state: RootState, payload: number) => {
        state.data.pools_pages = payload
    },

    setPool: <Payload>(state: RootState, payload: Payload) => {
        state.data.pool = payload
    },

    sekectProtocolType: <Payload>(state: RootState, payload: Payload) => {
        if (payload == 'poolMS') {
            state.data.poolHeader.kit_name = 'Euroimmun Measles IgM ELISA'
            state.data.poolHeader.method = 'Enzyme Immunoassay'
            state.data.poolHeader.test_name = 'Anti-Measles IgM ELISA'
        } else if (payload == 'poolRB') {
            state.data.poolHeader.kit_name = 'Euroimmun Rubella IgM ELISA'
            state.data.poolHeader.method = 'Enzyme Immunoassay'
            state.data.poolHeader.test_name = 'Anti-Rubella IgM ELISA'
        } else {
            state.data.poolHeader.kit_name = ''
            state.data.poolHeader.method = ''
            state.data.poolHeader.test_name = ''
        }
    }
}

const actions = {
    async fetchPools<Payload>({ commit }, payload: Payload) {
        const queryParams = buildQueryParams(payload)
        const response = await api.get(`/pool/?${queryParams}`)
        if (response.data.data.length > 0) {
            commit('setPoolList', response.data.data);
            commit('setTotalPools', response.data.total);
            commit('setPoolPages', response.data.totalPages);
        }
    },

    async savePool({ commit }, payload) {

        const endpoint = payload.id == 0 ? 'pool/create' : `pool/${payload.id}`
        console.log('endpoint', endpoint)
        console.log('payload', payload.pool_details)
        // return
        try {
            if (payload.id == 0) {
                const response = await api.post(endpoint, {
                    id: payload.id,
                    protocol_no: payload.protocol_no,
                    date_performed: payload.date_performed,
                    method: payload.method,
                    test_name: payload.test_name,
                    kit_name: payload.kit_name,
                    lot_no: payload.lot_no,
                    date_expiry: payload.date_expiry,
                    room_temp: payload.room_temp,
                    start: payload.start,
                    end: payload.end,
                    performed_by: payload.performed_by,
                    validate_by: payload.validate_by,
                    pathologist: payload.pathologist,
                    pool_details: payload.pool_details
                })

                return response.data;
            } else {
                const response = await api.patch(endpoint, {
                    id: payload.id,
                    protocol_no: payload.protocol_no,
                    date_performed: moment(payload.date_performed).format('YYYY-MM-DD'),
                    method: payload.method,
                    test_name: payload.test_name,
                    kit_name: payload.kit_name,
                    lot_no: payload.lot_no,
                    date_expiry: moment(payload.date_expiry).format('YYYY-MM-DD'),
                    room_temp: payload.room_temp,
                    start: payload.start,
                    end: payload.end,
                    performed_by: payload.performed_by,
                    validate_by: payload.validate_by,
                    pathologist: payload.pathologist,
                    pool_details: payload.pool_details
                })

                return response.data;
            }
        } catch (error) {
            console.log('error')
        }


    },

    async getPoolById({ commit }, payload: number) {
        const response = await api.get(`/pool/${payload}`)
        if (response.data.data) {
            const datePerformed = moment(response.data.data.date_performed).format('ll')
            const dateExpiry = moment(response.data.data.date_expiry).format('ll')
            commit('setPool', { ...response.data.data, date_performed: datePerformed, date_expiry: dateExpiry })
        }
    }
}

const getters = {
    getPool: (state: RootState) => state.data.pool,
    getPools: (state: RootState) => state.data.pools,
    getTotalPools: (state: RootState) => state.data.total_pools,
    getPoolsPages: (state: RootState) => state.data.pools_pages,
    getPoolCart: (state: RootState) => state.data.poolCart,
    getPoolHeaders: (state: RootState) => state.data.poolHeaders,
    getPoolDetails: (state: RootState) => state.data.poolDetails,
    getPoolHeader: (state: RootState) => state.data.poolHeader,
    getMeaslesMethod: (state: RootState) => state.data.poolMethodMeasles,
    getMeaslesKit: (state: RootState) => state.data.poolKitMeasles,
    getMeaslesTest: (state: RootState) => state.data.poolTestMeasles
}


export default {
    state,
    mutations,
    actions,
    getters
}