import {
    AUTH_LOGIN_CHANGED,
    AUTH_PASSWORD_CHANGED,
    AUTH_PERFORM_AUTH,
    AUTH_OK,
    AUTH_FAILED
} from './types'

import { authCall } from '../api/index'

export const onLoginChange = login => {
    return {
        type: AUTH_LOGIN_CHANGED, payload: login
    }
}

export const onPasswordChange = password => {
    return {
        type: AUTH_PASSWORD_CHANGED, payload: password
    }
}

export const performAuth = (email, password) => {
    return (dispatch) =>
    authCall({ email, password }).then(response => {
        switch (response.result) {
            case 'ok':
                dispatch({ type: AUTH_OK, payload: response.details })
                break
            case 'error':
                dispatch({ type: AUTH_FAILED })
                break
            default:
                break
        }
    })
}

export const showLoading = () => {
    return { type: AUTH_PERFORM_AUTH }
}