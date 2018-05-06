import {
    INVS_LIST_GET,
    INVS_LIST_LOADING,
    INVS_LIST_SHOW,
} from '../actions/types'


const INITIAL_STATE = { 
    isLoading: false,
    invs: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INVS_LIST_GET:
            return { ...state, isLoading: true }
        case INVS_LIST_SHOW:
            return { ...state, isLoading: false, invs: action.payload }
        default:
            return state
    }
}