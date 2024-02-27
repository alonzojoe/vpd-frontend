const state = {
    data: {
        poolCart: [],
        poolHeaders: [],
        poolDetails: []
    }
}

const mutations = {
    addToPoolCart: (state, payload) => {
        state.data.poolCart.push(payload)
    },

    removeToPoolCart: (state, payload) => {
        const poolIndex = state.data.poolCart.findIndex(item => item.detail_id === payload.detail_id);

        if (poolIndex !== -1) {
            state.data.poolCart.splice(poolIndex, 1); 
        }
    },

    resetPoolCart: (state) => {
        state.data.poolCart = [];
    }
}

const actions = {

}

const getters = {
    getPoolCart: state => state.data.poolCart,
    getPoolHeaders: state => state.data.poolHeaders,
    getPoolDetails: state => state.data.poolDetails
}

export default {
    state,
    mutations,
    actions,
    getters
}