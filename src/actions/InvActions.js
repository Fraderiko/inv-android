import {
    INV_SET,
    LINE_SHOW
} from './types'

import { NavigationActions } from 'react-navigation'

export const invOpened = inv => {
    return { type: INV_SET, payload: inv }
}

export const navigateToInv = (title) => {
    return (dispatch) => {
        dispatch(NavigationActions.navigate({ routeName: 'InvScreen', params: { title } }))
    }
}

export const navigateToLine = (_id, inv) => {
    let line
    inv.lines.forEach(l => {
        l.forEach(field => {
            if (field._id === _id) {
                line = l
            }
        })
    })

    return (dispatch) => {
        dispatch(NavigationActions.navigate({ routeName: 'LineScreen', params: { title: 'Заголовок' } }))
        dispatch({ type: LINE_SHOW, payload: line })
    }
}