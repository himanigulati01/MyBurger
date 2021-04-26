import * as actions from './actionTypes'
import axios from 'axios'

export const authStart = () =>{
    return{
        type:actions.AUTH_START
    }
}

export const authSuccess = (token, userId) =>{
    localStorage.setItem('userId', userId)
    return{
        type: actions.AUTH_SUCCESS,
        idToken : token,
        userId : userId
    }
}

export const authFail = (error) =>{
    return{
        type: actions.AUTH_FAIL,
        error: error
    }
}

export const logOut = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return{
        type: actions.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expirationTime) =>{
    return dispatch=>(
        setTimeout(()=>
            {dispatch(logOut())},
                expirationTime * 1000)
    )
}

export const setAuthRedirectPath = (path) => {
    return{
        type: actions.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}

export const auth = (email, password, isSignUp) =>{
    return dispatch =>{
        dispatch(authStart())
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIDj8nFVYHtL-LEMTcJnSA1CtepLiteHI'
        
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIDj8nFVYHtL-LEMTcJnSA1CtepLiteHI'
        }

        axios.post(url,authData)
            .then(res=>{
            
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn*1000)
                localStorage.setItem('token',res.data.idToken)
                localStorage.setItem('expirationDate',expirationDate)
                dispatch(authSuccess(res.data.idToken,res.data.localId))
                dispatch(checkAuthTimeOut(res.data.expiresIn))
                
            })
            .catch(err=>{
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const authCheckState = () =>{
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logOut())
        } else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate > new Date()){
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId ))
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())/1000))
            }else{
                dispatch(logOut())
            }
        }
    }
}