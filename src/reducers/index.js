import { combineReducers } from 'redux'
import AuthReducer from '../reducers/AuthReducer'
import InvsListReducer from '../reducers/InvsListReducer'
import InvReducer from '../reducers/InvReducer'
import nav from '../reducers/NavReducer'
import line from '../reducers/LineReducer'
import tasks from '../reducers/TaskReducer'

export default combineReducers({ 
    auth: AuthReducer,
    invs: InvsListReducer,
    inv: InvReducer,
    nav,
    line,
    tasks
})