import {
    AUTH_LOGIN_CHANGED,
    AUTH_PASSWORD_CHANGED,
    AUTH_PERFORM_AUTH,
    AUTH_OK,
    AUTH_FAILED,
    AUTH_CHECK,
    AUTH_STOP_ACTIVITY,
    AUTH_LOGOUT
} from './types'

import { authCall } from '../api/index'
import { AsyncStorage } from 'react-native'

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

export const logout = () => {
    return dispatch => {
        AsyncStorage.removeItem('@Store:_id')
        dispatch({ type: AUTH_LOGOUT })
    } 
}


export const performAuth = (email, password) => {
    return (dispatch) =>
    authCall({ email, password }).then(response => {
        switch (response.result) {
            case 'ok':
                dispatch({ type: AUTH_OK, payload: response.details })
                AsyncStorage.setItem('@Store:_id', response.details);
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

export const checkAuth = () => {
    return (dispatch) => {

        dispatch({ type: AUTH_PERFORM_AUTH })

        AsyncStorage.getItem('@Store:_id').then(value => {
            if (value !== null) {
                dispatch({ type: AUTH_OK, payload: value })
            } else {
                dispatch({ type: AUTH_STOP_ACTIVITY })
            }
        })
        
    }
    
}