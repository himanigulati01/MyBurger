import * as actions from '../actions/actionTypes'
import {updatedObject} from '../../shared/utility'

const initialState = {
    token : null,
    userId : null,
    error : null,
    loading : false,
    authRedirectPath : '/'
}

const authStart = (state, action) =>{
    return updatedObject(state, {loading:true, error:null})
}

const authSuccess = (state, action) =>{
    return updatedObject(state, {
        loading: false,
        token: action.idToken,
        userId: action.userId,
        error: null
    })
}

const authFail = (state, action ) =>{
    return updatedObject(state,{
        loading: false,
        error: action.error
    })
}
const authLogOut = (state) =>{
    return updatedObject(state,{
        userId:null,
        token:null
    })
}

const setAuthRedirectPath = (state, action) => {
    return updatedObject(state, {authRedirectPath:action.path })
}

const reducer = (state=initialState, action) =>{
    switch (action.type) {
        case actions.AUTH_START: return authStart(state,action)
        case actions.AUTH_SUCCESS: return authSuccess(state,action)
        case actions.AUTH_FAIL: return authFail(state,action)
        case actions.AUTH_LOGOUT: return authLogOut(state,action)
        case actions.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
        default:
            return state
    }
}

export default reducer;