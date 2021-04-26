import * as actionTypes from '../actions/actionTypes'
import {updatedObject} from '../../shared/utility'

const initialState = {
    ingredients:null,
    totalPrice: 20,
    error: false,
    building : false
}
const INGRED_PRICES = {
    salad: 12,
    meat: 45,
    bacon: 10,
    cheese: 50,

}

const addIngredient = (state, action) =>{
    const updatedIngredient = { [action.ingredName]: state.ingredients[action.ingredName] +1}
            const updatedIngredients = updatedObject(state.ingredients, updatedIngredient)
            const updatedState = {
                ingredients:updatedIngredients,
                totalPrice: state.totalPrice + INGRED_PRICES[action.ingredName],
                building : true
            }
            return updatedObject(state, updatedState)
}

const removeIngredient = (state, action) =>{
    const updatedIngred = { [action.ingredName]: state.ingredients[action.ingredName] -1}
            const updatedIngreds = updatedObject(state.ingredients, updatedIngred)
            const updatedSt = {
                ingredients:updatedIngreds,
                totalPrice: state.totalPrice - INGRED_PRICES[action.ingredName],
                building : true
            }
            return updatedObject(state, updatedSt)

}

const setIngredient = (state, action) =>{
    return updatedObject(state,{ingredients: action.ingredients,
        totalPrice:20,
        error: false,
        building : false} ) 
}



const reducer = ( state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDS : return addIngredient(state, action)
        case(actionTypes.REMOVED_INGREDS): return removeIngredient(state,action)        
        case(actionTypes.SET_INGREDIENTS): return setIngredient(state,action)
        case(actionTypes.FETCH_INGREDIENTS_FAILED):
            return updatedObject(state, {error:true})
        default:
           return state
    }

}

export default reducer