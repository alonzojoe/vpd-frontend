import store from '@/store'


export const changeFever = (event) => {
    if (event.target.value != 'Y') {
        store.commit('resetDateFever')
    }
}

export const changeRash = (event) => {
    if (event.target.value != 'Y') {
        store.commit('resetDateRash')
    }
}

export const changeLymph = (event) => {
    if (event.target.value != 'Y') {
        store.commit('resetLymph')
    }
}

export const changeLymphLocation = (event) => {
    if (event.target.value != 'OTHERS') {
        store.commit('resetLymphLocation')
    }
}

export const changeComplication = (event) => {
    if (event.target.value != 'Y') {
        store.commit('resetComplication')
    }
}

export const changeMCV = (event) => {
    if (event.target.value != 'Y') {
        store.commit('resetMCV')
    }
}

export const chnageOtherReason = (event) => {
    if (event.target.value != '1') {
        store.commit('resetOtherReason')
    }
}

export const changeExposed = () => {
    store.commit('resetExposeContact')
}

export const resetClassification = () => {
    store.commit('resetFinalClassification')
}

export const resetInfection = () => {
    store.commit('resetSourceInfection')
}

export const changeOutcomed = (event) => {
    if (event.target.value !== 'D') {
        store.commit('resetOutcomeDied')
    }
}