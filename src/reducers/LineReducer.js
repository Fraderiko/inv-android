import {
    LINE_SHOW,
    LINE_TEXT_FIELD_CHANGED,
    LINE_IMAGE_CAPTURED
} from '../actions/types'


const INITIAL_STATE = {
    line: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LINE_SHOW:
            return { ...state, line: action.payload }
        case LINE_TEXT_FIELD_CHANGED:
            let line = state.line
            line[state.line.findIndex(l => l._id === action.payload._id)].value = action.payload.value
            return { ...state, line: line }
        case LINE_IMAGE_CAPTURED:
            let e_line = state.line
            e_line[state.line.findIndex(l => l._id === action.payload._id)].media.push(action.payload.uri)
            return { ...state, line: e_line }
        default:
            return state
    }
}