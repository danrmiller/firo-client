import * as types from '../types/App'

const state = {
    isReady: false,
    clientIsLocked: false,
    showIntroScreen: true,
    passphrase: null
}

const mutations = {
    [types.IS_READY] (state) {
        state.isReady = true
    },

    [types.SET_CLIENT_LOCKED] (state, isLocked) {
        state.clientIsLocked = isLocked
    },

    [types.HIDE_INTRO_SCREEN] (state) {
        state.showIntroScreen = false
    },

    [types.SET_CURRENT_PASSPHRASE] (state, passphrase) {
        state.passphrase = passphrase
    },

    [types.CLEAR_PASSPHRASE] (state) {
        state.passphrase = null
    }
}

const actions = {
    [types.IS_READY] ({ commit, state }) {
        if (state.isReady) {
            return
        }

        commit(types.IS_READY)
    },

    [types.SET_CLIENT_LOCKED] ({ commit, state }, isLocked) {
        if (state.clientIsLocked === isLocked) {
            return
        }

        commit(types.SET_CLIENT_LOCKED, isLocked)
    },

    [types.HIDE_INTRO_SCREEN] ({ commit, state }) {
        console.log('in action')
        commit(types.HIDE_INTRO_SCREEN)
    },

    [types.SET_CURRENT_PASSPHRASE] ({ commit, state }, passphrase) {
        if (state.passphrase === passphrase) {
            return
        }

        commit(types.SET_CURRENT_PASSPHRASE, passphrase)
    },

    [types.CLEAR_PASSPHRASE] ({ commit }) {
        commit(types.CLEAR_PASSPHRASE)
    }
}

const getters = {
    isReady: (state) => state.isReady || false,
    showIntroScreen: (state) => state.showIntroScreen,
    isLocked: (state) => state.clientIsLocked,
    addressBelongsToWallet: (state, getters, rootState, rootGetters) => {
        return (address) => {
            console.log('---- validating address ', address, ' ----')
            const isPaymentRequestAddress = !!rootGetters['PaymentRequest/paymentRequests'].find((el) => {
                if (typeof el.address === 'string') {
                    return el.address === address
                }

                return el.address && el.address.address === address
            })

            if (isPaymentRequestAddress) {
                return true
            }

            const isWalledAddress = rootGetters['Address/walletAddresses'].find((addr) => {
                return addr.address === address
            })

            return !!isWalledAddress
        }
    },
    showIncomingPaymentRequest (state, getters, rootState, rootGetters) {
        return rootGetters['Clipboard/hasIncomingPaymentRequest'] &&
            !rootGetters['Clipboard/isNotified']
    },
    hasOpenOverlay (state, getters, rootState, rootGetters) {
        const windowHasOpenModal = rootGetters['Window/hasOpenModal']
        const networkIsConnected = rootGetters['Network/isConnected']
        const networkConnectionError = rootGetters['Network/ConnectionError']

        return windowHasOpenModal ||
            !networkIsConnected ||
            getters.showIntroScreen ||
            networkConnectionError ||
            getters.showIncomingPaymentRequest
    },
    currentPassphrase: (state) => state.passphrase
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
