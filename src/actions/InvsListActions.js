import {
    INVS_LIST_GET,
    INVS_LIST_SHOW
} from './types'

import { getInvsCall } from '../api/index'

export const startLoading = () => {
    return {
        type: INVS_LIST_GET
    }
}

export const getInvs = (counter) => {
    return (dispatch) =>
    getInvsCall(counter).then(response => {
        dispatch({ type: INVS_LIST_SHOW, payload: response })
    })
}

export const showLoading = () => {
    return { type: AUTH_PERFORM_AUTH }
}