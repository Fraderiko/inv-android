import {
    AUTH_LOGIN_CHANGED,
    AUTH_PASSWORD_CHANGED,
    AUTH_PERFORM_AUTH
} from '../actions/types'


const INITIAL_STATE = { 
    email : "",
    password : "",
    wrongCredentials: false,
    isLoading: false,
    isAuthed: false,
    isLogout: false,
    _id: ""
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_LOGIN_CHANGED:
            return { ...state, email: action.payload }
        case AUTH_PASSWORD_CHANGED:
            return { ...state, password: action.payload }
        case AUTH_PERFORM_AUTH:
            return { ...state, isLoading: true }
        default:
            return state
    }
}