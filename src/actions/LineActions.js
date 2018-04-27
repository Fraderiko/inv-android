import { NavigationActions } from 'react-navigation'
import {
    LINE_TEXT_FIELD_CHANGED,
    LINE_IMAGE_CAPTURED,
    LINE_MEDIA_DELETE,
    LINE_MEDIA_SET,
} from '../actions/types'
import { upload } from '../api/index'

export const navigateToTextField = (title, _id) => {
    return (dispatch) => {
        dispatch(NavigationActions.navigate({ routeName: 'TextField', params: { title, _id } }))
    }
}

export const navigateToChoiceField = (title, _id) => {
    return (dispatch) => {
        dispatch(NavigationActions.navigate({ routeName: 'PickerField', params: { title, _id } }))
    }
}

export const navigateToDateField = (title, _id) => {
    return (dispatch) => {
        dispatch(NavigationActions.navigate({ routeName: 'DateField', params: { title, _id } }))
    }
}

export const navigateToMediaField = (title, _id) => {
    return (dispatch) => {
        dispatch(NavigationActions.navigate({ routeName: 'MediaField', params: { title, _id } }))
    }
}

export const goBack = () => {
    return (dispatch) => {
        dispatch(NavigationActions.back({ key: null }))
    }
}

export const lineTextFieldChanged = (_id, value) => {
    return {
        type: LINE_TEXT_FIELD_CHANGED, payload: { _id, value }
    }
}

export const navigateToCamera = (_id) => {
    return (dispatch) => {
        dispatch(NavigationActions.navigate({ routeName: 'CameraScreen', params: { _id } }))
    }
}

export const imageCaptured = (_id, uri) => {
    return (dispatch) => {
        dispatch({ type: LINE_IMAGE_CAPTURED, payload: { _id, uri } })
        dispatch(NavigationActions.back({ key: null }))
    }
}

export const onMediaDelete = (_id, index) => {
    return {
        type: LINE_MEDIA_DELETE, payload: { _id, index }
    }
}

export const uploadFiles = (files, _id) => {
    let data = new FormData();
    files.forEach(f => {
        data.append('file', {
            uri: 'file://' + f,
            name: 'file.jpg',
            type: 'image/jpg'
        })
    })

    return (dispatch) => {
        upload(data).then(response => {
            dispatch({ type: LINE_MEDIA_SET, payload: { response, _id } })
            dispatch(NavigationActions.back({ key: null }))
        })
    }
}