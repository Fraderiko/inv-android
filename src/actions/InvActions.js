import {
    INV_SET
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