import { NavigationActions } from 'react-navigation'
import {
    LINE_TEXT_FIELD_CHANGED,
    LINE_IMAGE_CAPTURED,
    LINE_MEDIA_DELETE,
    LINE_MEDIA_SET,
    LINE_MISSING_REQUIRED_FIELDS,
    LINE_MISSING_REQUIRED_FIELDS_RESET,
    LINE_SUCCESSFULLY_SAVED,
    LINE_SUCCESSFULLY_SAVED_RESET,
    INV_SET,
    TASK_TEXT_FIELD_CHANGED,
    TASK_IMAGE_CAPTURED,
    TASK_MEDIA_SET,
    TASK_SUCCESSFULLY_SAVED,
    TASK_SUCCESSFULLY_SAVED_RESET
} from '../actions/types'
import { upload, updateInvCall, updateTaskCall } from '../api/index'

export const navigateToTextField = (title, _id, isCustom) => {
    return (dispatch) => {
        dispatch(NavigationActions.navigate({ routeName: 'TextField', params: { title, _id, isCustom } }))
    }
}

export const navigateToChoiceField = (title, _id, isCustom) => {
    return (dispatch) => {
        dispatch(NavigationActions.navigate({ routeName: 'PickerField', params: { title, _id, isCustom } }))
    }
}

export const navigateToDateField = (title, _id, isCustom) => {
    return (dispatch) => {
        dispatch(NavigationActions.navigate({ routeName: 'DateField', params: { title, _id, isCustom } }))
    }
}

export const navigateToMediaField = (title, _id, isCustom, isTask) => {
    return (dispatch) => {
        dispatch(NavigationActions.navigate({ routeName: 'MediaField', params: { title, _id, isCustom, isTask } }))
    }
}

export const goBack = () => {
    return (dispatch) => {
        dispatch(NavigationActions.back({ key: null }))
    }
}

export const lineTextFieldChanged = (_id, value, isTask) => {
    if (isTask === false) {
        return {
            type: LINE_TEXT_FIELD_CHANGED, payload: { _id, value }
        }
    } else {
        return {
            type: TASK_TEXT_FIELD_CHANGED, payload: { _id, value }
        }
    }
}

export const navigateToCamera = (_id) => {
    return (dispatch) => {
        dispatch(NavigationActions.navigate({ routeName: 'CameraScreen', params: { _id } }))
    }
}

export const navigateToCameraWithBarcode = (_id) => {
    return (dispatch) => {
        dispatch(NavigationActions.navigate({ routeName: 'CameraScreen', params: { _id, isBarcode: true } }))
    }
}

export const barcodeSubmited = (value, _id) => {
    return (dispatch) => {
        dispatch({ type: LINE_TEXT_FIELD_CHANGED, payload: { _id, value } })
        dispatch(NavigationActions.back({ key: null }))
    }
}

export const imageCaptured = (_id, uri, isTask) => {

    if (isTask === false) {
        return (dispatch) => {
            dispatch({ type: LINE_IMAGE_CAPTURED, payload: { _id, uri } })
            dispatch(NavigationActions.back({ key: null }))
        }
    } else {
        return (dispatch) => {
            dispatch({ type: TASK_IMAGE_CAPTURED, payload: { _id, uri } })
            dispatch(NavigationActions.back({ key: null }))
        }
    }
}

export const onMediaDelete = (_id, index) => {
    return {
        type: LINE_MEDIA_DELETE, payload: { _id, index }
    }
}

export const uploadFiles = (files, _id, isTask) => {

    const isVideo = files.length === 1 && files[0].split('.').pop() === 'mov'

    let data = new FormData();
    files.forEach(f => {
        data.append('file', {
            uri: 'file://' + f,
            name: isVideo === true ? 'file.mov' : 'file.jpg',
            type: isVideo === true ? 'video/mp4' : 'image/jpg'
        })
    })

    return (dispatch) => {
        upload(data).then(response => {

            if (isTask === false || isTask === undefined) {
                dispatch({ type: LINE_MEDIA_SET, payload: { response, _id } })
            } else {
                dispatch({ type: TASK_MEDIA_SET, payload: { response, _id } })
            }

            if (isTask === false) {
                dispatch(NavigationActions.back({ key: null }))
            }
        })
    }
}

export const updateInv = (line, inv, user, invs, isTask, task) => {

    if (isTask === false) {
        const fields_uuid = line.map(l => l.field_uuid)
        let isValid = true
        const required_fields = inv.fields.filter(f => f.is_required)
        const required_fields_uuids = required_fields.map(r => r.uuid)
        let index

        inv.lines.forEach((l, i) => {
            if (l[0]._id === line[0]._id) {
                index = i
            }
        })

        line.forEach(l => {
            l.user = user
            l.date = new Date().getTime()
        })

        if (line.filter(l => l.isCustom === true).length > 0) {
            inv.lines.push(line)
        } else {
            inv.lines[index] = line
        }

        line.forEach(l => {
            if (required_fields_uuids.includes(l.field_uuid)) {
                const field = inv.fields.filter(c => c.uuid === l.field_uuid)[0]

                if (field.type === 'text' || field.type === 'digit' || field.type === 'time' || field.type === 'choice' || field.type === 'date') {
                    if (l.value === "") {
                        isValid = false
                    }
                } else {
                    if (l.media.length === 0) {
                        isValid = false
                    }
                }
            }
        })

        if (isValid) {
            return (dispatch) => {
                updateInvCall(inv).then(response => {
                    dispatch(NavigationActions.back({ key: null }))
                    dispatch({ type: LINE_SUCCESSFULLY_SAVED })
                    dispatch({ type: INV_SET, payload: inv })
                })
            }
        } else {
            return { type: LINE_MISSING_REQUIRED_FIELDS, payload: isValid }
        }
    } else {
        let inv_index
        let line_index

        invs.forEach((inv, invIndex) => {
            inv.lines.forEach((line, lineIndex) => {
                line.forEach(field => {
                    if (field._id === task.lines[0]._id) {
                        inv_index = invIndex
                        line_index = lineIndex
                    }
                })
            });
        })

        let inv = invs[inv_index]
        const prevLineState = inv.lines[line_index]
        inv.lines[line_index] = task.lines
        task.is_completed = true

        if (task.number === 1) {
            task.lines = prevLineState
        }
        
        task.lines.forEach(l => {
            l.user = user
            l.date = new Date().getTime()
        })


        return (dispatch) => {
            updateTaskCall(task).then(updatedTask => {

                updateInvCall(inv).then(response => {
                    dispatch(NavigationActions.back({ key: null }))
                    dispatch({ type: TASK_SUCCESSFULLY_SAVED })
                    dispatch({ type: INV_SET, payload: inv })
                })
            })
        }
    }
}

export const taskSavedReset = () => {
    return { type: TASK_SUCCESSFULLY_SAVED_RESET }
}

export const resetMissingFields = () => {
    return { type: LINE_MISSING_REQUIRED_FIELDS_RESET }
}

export const resetLineSaved = () => {
    return { type: LINE_SUCCESSFULLY_SAVED_RESET }
}