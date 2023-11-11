import store from '@/store'


export const changeAdmitted = async (event) => {

    if (event.target.value != 'Y') {
        await store.commit('setAmittedNull')
    }

}

export const changeCns = async (event) => {

    if (event.target.value != 'O') {
        await store.commit('setCnsNull')
    }

}

export const changeJe = async (event) => {

    if (event.target.value != 'Y') {
        await store.commit('setJeNull')
    }

}

export const changePenta = async (event) => {

    if (event.target.value != 'Y') {
        await store.commit('setPentaNull')
    }

}

export const changeMeasles = async (event) => {

    if (event.target.value != 'Y') {
        await store.commit('setMeaslesNull')
    }

}

export const changeMeningo = async (event) => {

    if (event.target.value != 'Y') {
        await store.commit('setMeningoNull')
    }

}

export const changePneumo = async (event) => {

    if (event.target.value != 'Y') {
        await store.commit('setPneumoNull')
    }

}

export const changePcv10 = async (event) => {

    if (event.target.value != 'Y') {
        await store.commit('setPcv10Null')
    }

}

export const changePcv13 = async (event) => {

    if (event.target.value != 'Y') {
        await store.commit('setPcv13Null')
    }

}

export const changeExposure = async (event) => {

    if (event.target.value != 'Y') {
        await store.commit('setExposureNull')
    }

}

export const changeTravel = async (event) => {

    if (event.target.value != 'Y') {
        await store.commit('setTravelNull')
    }

}

export const changeAes = async (event) => {

    if (event.target.value != 'AESOTHER') {
        await store.commit('setAesNull')
    }

}

export const changeConfirmed = async (event) => {

    if (event.target.value != 'CON') {
        await store.commit('setConfirmedNull')
    }

}


export const changeOutcome = async (event) => {

    const selected = event.target.value

    await store.commit('setOutcomeDateNull', selected)

}