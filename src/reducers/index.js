import { combineReducers } from 'redux'
import AuthReducer from '../reducers/AuthReducer'
import InvsListReducer from '../reducers/InvsListReducer'
import InvReducer from '../reducers/InvReducer'
import nav from '../reducers/NavReducer'

export default combineReducers({ 
    auth: AuthReducer,
    invs: InvsListReducer,
    inv: InvReducer,
    nav

})