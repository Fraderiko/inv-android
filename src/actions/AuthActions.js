import {
    AUTH_LOGIN_CHANGED,
    AUTH_PASSWORD_CHANGED,
    AUTH_PERFORM_AUTH
} from './types'

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

export const performAuth = (login, password) => {
    return {
        type: AUTH_PERFORM_AUTH, payload: { login, password }
    }
}