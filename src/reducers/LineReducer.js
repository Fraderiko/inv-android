import {
    LINE_SHOW,
    LINE_TEXT_FIELD_CHANGED,
    LINE_IMAGE_CAPTURED,
    LINE_MEDIA_DELETE,
    LINE_MEDIA_SET,
    LINE_MISSING_REQUIRED_FIELDS,
    LINE_MISSING_REQUIRED_FIELDS_RESET
} from '../actions/types'


const INITIAL_STATE = {
    line: [],
    isValid: true
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LINE_SHOW:
            return { ...state, line: action.payload }
        case LINE_TEXT_FIELD_CHANGED:

            const i = state.line.findIndex(l => l._id === action.payload._id)

            const e = {
                ...state.line[i],
                value: action.payload.value
            }

            return {
                ...state,
                line: [
                    ...state.line.slice(0, i),
                    e,
                    ...state.line.slice(i + 1)
                ]
            }

            return { ...state, line: line }
        case LINE_IMAGE_CAPTURED:
            let e_line = state.line
            e_line[state.line.findIndex(l => l._id === action.payload._id)].media.push(action.payload.uri)
            return { ...state, line: e_line }
        case LINE_MEDIA_DELETE:
            const line_index = state.line.findIndex(l => l._id === action.payload._id)

            const changedElement = {
                ...state.line[line_index],
                media: [
                    ...state.line[line_index].media.slice(0, action.payload.index),
                    ...state.line[line_index].media.slice(action.payload.index + 1)
                ]
            }

            return {
                ...state,
                line: [
                    ...state.line.slice(0, line_index),
                    changedElement,
                    ...state.line.slice(line_index + 1)
                ]
            }

        case LINE_MEDIA_SET:
            const l_index = state.line.findIndex(l => l._id === action.payload._id)
            const c = {
                ...state.line[l_index],
                media: action.payload.response.map(v => v.link )
            }
            return {
                ...state,
                line: [
                    ...state.line.slice(0, l_index),
                    c,
                    ...state.line.slice(l_index + 1)
                ]
            }
        case LINE_MISSING_REQUIRED_FIELDS:
            return { ...state, isValid: action.payload }
        case LINE_MISSING_REQUIRED_FIELDS_RESET:
            return { ...state, isValid: true }
        default:
            return state
    }
}