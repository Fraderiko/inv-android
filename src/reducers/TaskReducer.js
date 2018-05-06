import {
    TASKS_SET,
    TASK_SET_CURRENT,
    TASK_TEXT_FIELD_CHANGED,
    TASK_IMAGE_CAPTURED,
    TASK_MEDIA_SET,
    TASK_SUCCESSFULLY_SAVED,
    TASK_SUCCESSFULLY_SAVED_RESET
} from '../actions/types'


const INITIAL_STATE = {
    tasks: [],
    currentTask: {},
    isShowingTaskAlert: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TASKS_SET:
            return { ...state, tasks: action.payload }
        case TASK_SET_CURRENT:
            return { ...state, currentTask: action.payload }
        case TASK_TEXT_FIELD_CHANGED:

            const i = state.currentTask.lines.findIndex(l => l._id === action.payload._id)

            const e = {
                ...state.currentTask.lines[i],
                value: action.payload.value
            }

            return {
                ...state, currentTask: {
                    ...state.currentTask,
                    lines: [
                        ...state.currentTask.lines.slice(0, i),
                        e,
                        ...state.currentTask.lines.slice(i + 1)
                    ]
                }
            }

            return { ...state, lines: lines }
        case TASK_IMAGE_CAPTURED:
            let e_line = state.currentTask.lines
            e_line[state.currentTask.lines.findIndex(l => l._id === action.payload._id)].media.push(action.payload.uri)
            return { ...state, currentTask: { ...state.currentTask, lines: e_line } }
        case TASK_MEDIA_SET:
            const l_index = state.currentTask.lines.findIndex(l => l._id === action.payload._id)
            const c = {
                ...state.currentTask.lines[l_index],
                media: action.payload.response.map(v => v.link)
            }
            return {
                ...state,
                currentTask: {
                    ...state.currentTask, lines: [
                        ...state.currentTask.lines.slice(0, l_index),
                    c,
                    ...state.currentTask.lines.slice(l_index + 1)
                    ]
                }
            }
            TASK_SUCCESSFULLY_SAVED:
                return { ...state, currentTask: {}, isShowingTaskAlert: true }
            TASK_SUCCESSFULLY_SAVED_RESET:
                return { ...state, isShowingTaskAlert: false }
        default:
            return state
    }
}