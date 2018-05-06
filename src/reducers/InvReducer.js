import {
    INV_SET,
    LINE_SUCCESSFULLY_SAVED_RESET,
    LINE_SUCCESSFULLY_SAVED,
    LINE_ADD_ALERT,
    LINE_ADD_ALERT_RESET
} from '../actions/types'


const INITIAL_STATE = { 
    inv: {},
    lineSaved: false,
    isShowingCustomLineAlert: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INV_SET:
            return { ...state, inv: action.payload }
        case LINE_SUCCESSFULLY_SAVED_RESET:
            return { ...state, lineSaved: false }
        case LINE_SUCCESSFULLY_SAVED:
            return { ...state, lineSaved: true }
        case LINE_ADD_ALERT:
            return { ...state, isShowingCustomLineAlert: true }
        case LINE_ADD_ALERT_RESET:
            return { ...state, isShowingCustomLineAlert: false }
        default:
            return state
    }
}