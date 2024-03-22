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

    setPoolList: <T>(state: RootState, payload: T[]) => {
        state.data.pools = payload
    },

    setTotalPools: (state: RootState, payload: number) => {
        state.data.total_pools = payload
    },

    setPoolPages: (state: RootState, payload: number) => {
        state.data.pools_pages = payload
    }
}

const actions = {
    async savePool({ commit }, payload) {
        console.log(payload.poolDetails)
        // return
        const response = await api.post('pool/create', {
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

        console.log('response', response.data)
        return response.data;
    },
}

const getters = {
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