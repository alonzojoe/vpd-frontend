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
            date_performed: "",
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

        }
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

}

const getters = {
    getPoolCart: (state: RootState) => state.data.poolCart,
    getPoolHeaders: (state: RootState) => state.data.poolHeaders,
    getPoolDetails: (state: RootState) => state.data.poolDetails,
    getPoolHeader: (state: RootState) => state.data.poolHeader
}

export default {
    state,
    mutations,
    actions,
    getters
}