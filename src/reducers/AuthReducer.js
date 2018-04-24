import {
    AUTH_LOGIN_CHANGED,
    AUTH_PASSWORD_CHANGED,
    AUTH_PERFORM_AUTH,
    AUTH_OK,
    AUTH_FAILED,
} from '../actions/types'


const INITIAL_STATE = { 
    email : "me",
    password : "1",
    wrongCredentials: false,
    isLoading: false,
    isAuthed: false,
    isLogout: false,
    _id: ""
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_LOGIN_CHANGED:
            return { ...state, email: action.payload, wrongCredentials: false }
        case AUTH_PASSWORD_CHANGED:
            return { ...state, password: action.payload, wrongCredentials: false }
        case AUTH_PERFORM_AUTH:
            return { ...state, isLoading: true, wrongCredentials: false }
        case AUTH_OK:
            return { ...state, _id: action.payload, isLoading: false, isAuthed: true }
        case AUTH_FAILED:
            return { ...state, wrongCredentials: true, isLoading: false }
        default:
            return state
    }
}