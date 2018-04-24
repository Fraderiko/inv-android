import { combineReducers } from 'redux'
import AuthReducer from '../reducers/AuthReducer'
import InvsListReducer from '../reducers/InvsListReducer'

export default combineReducers({ 
    auth: AuthReducer,
    invs: InvsListReducer
})