import moment from "moment";
import api from "@/api"
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
            'Anti-Measles IgM ELISA',
            'Anti-Rubella IgM ELISA'
        ],
        poolKitMeasles: [
            'Euroimmun Measles IgM ELISA',
            'Euroimmun Rubella IgM ELISA'
        ]
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
    },
}

const getters = {
    getPoolCart: (state: RootState) => state.data.poolCart,
    getPoolHeaders: (state: RootState) => state.data.poolHeaders,
    getPoolDetails: (state: RootState) => state.data.poolDetails,
    getPoolHeader: (state: RootState) => state.data.poolHeader,
    getMeaslesMethod: (state: RootState) => state.data.poolMethodMeasles,
    getMeaslesKit: (state: RootState) => state.data.poolKitMeasles
}

export default {
    state,
    mutations,
    actions,
    getters
}