import {
    INVS_LIST_GET,
    INVS_LIST_SHOW,
    TASKS_SET,
} from './types'

import { getInvsCall, getTasksCall } from '../api/index'

export const startLoading = () => {
    return {
        type: INVS_LIST_GET
    }
}

export const getInvs = (counter) => {
    return (dispatch) =>
    getInvsCall(counter).then(response => {
        getTasksCall(counter).then(tasks => {
            dispatch({ type: TASKS_SET, payload: tasks.tasks })
            dispatch({ type: INVS_LIST_SHOW, payload: response })
        })
    })
}

export const showLoading = () => {
    return { type: AUTH_PERFORM_AUTH }
}