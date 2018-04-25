import {
    INV_SET
} from '../actions/types'


const INITIAL_STATE = { 
    inv: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INV_SET:
            return { ...state, inv: action.payload }
        default:
            return state
    }
}