import {
    INV_SET,
    LINE_SHOW,
    LINE_ADD_ALERT,
    LINE_ADD_ALERT_RESET,
    TASK_SET_CURRENT
} from './types'
import { createLines } from '../api/index'
import { NavigationActions } from 'react-navigation'

export const invOpened = inv => {
    return { type: INV_SET, payload: inv }
}

export const navigateToInv = (title) => {
    return (dispatch) => {
        dispatch(NavigationActions.navigate({ routeName: 'InvScreen', params: { title } }))
    }
}

export const navigateToLine = (_id, inv, title) => {
    let line
    inv.lines.forEach(l => { // ищем линию, на которую было нажатие 
        l.forEach(field => {
            if (field._id === _id) {
                line = l
            }
        })
    })

    return (dispatch) => {
        dispatch(NavigationActions.navigate({ routeName: 'LineScreen', params: { title } }))
        dispatch({ type: LINE_SHOW, payload: line })
    }
}

export const navigateToTask = (_id, tasks, title) => {
    let task = tasks.filter(t => t._id === _id)[0]

    return (dispatch) => {
        dispatch(NavigationActions.navigate({ routeName: 'LineScreen', params: { title } }))
        dispatch({ type: LINE_SHOW, payload: task.lines[0] })
        dispatch({ type: TASK_SET_CURRENT, payload: task })

    }
}

export const navigateToCustomLineAlert = () => {
    return { type: LINE_ADD_ALERT }
}

export const navigateToCustomLineAlertReset = () => {
    return { type: LINE_ADD_ALERT_RESET }
}

export const navigateToCustomLine = (inv) => {
    let line = inv.fields.map(l => ({ 
        name: l.name,
        field_uuid: l.uuid,
        value: "",
        initial_value: "",
        user: "",
        date: "",
        media: []
    }))

    let customLine = inv.counters_fields.map(l => ({ 
        isCustom: true,
        name: l.name,
        field_uuid: l.uuid,
        value: "",
        initial_value: "",
        user: "",
        date: "",
        media: []
    }))

    const result = line.concat(customLine)

    return (dispatch) => {
        createLines(result).then(response => {
            dispatch(NavigationActions.navigate({ routeName: 'LineScreen', params: { title: 'Новая линия' } }))
            dispatch({ type: LINE_SHOW, payload: response })
        })        
    }
}