import * as actionTypes from '../actions/actionTypes'
import {updatedObject} from '../../shared/utility'

const initialState = {
    order : [],
    loading : false,
    purchased: false
}

const fetchOrderStart = (state) =>{
    return updatedObject(state, {loading:false})
}

const fetchOrderSuccess = (state, action) =>{
    return updatedObject(state, {order:action.order, loading:false,})
}

const fetchOrderFails = (state) =>{
    return updatedObject(state, {loading : false})
}
const purchaseInit = (state) =>{
    return updatedObject(state, {purchased:false})
}

const purchaseBurgerStart = (state) =>{
    return updatedObject(state, {loading:true})
}

const purchaseBurgerSuccess = (state, action) =>{
    const newOrder = updatedObject(action.orderData, {id: action.orderId})
    return updatedObject(state,{
        loading:false,
        orders : state.order.concat(newOrder),
        purchased : true
    } )
}
const purchaseBurgerFail = (state, action) =>{
    return updatedObject(state, {loading:false})
}

const orderReducer = (state = initialState, action ) => {
    switch(action.type){
        case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAILS: return fetchOrderFails(state, action)
        case actionTypes.PURCHASE_INIT: return purchaseInit(state)
        case(actionTypes.PURCHASE_BURGER_START): return purchaseBurgerStart(state)
        case(actionTypes.PURCHASE_BURGER_SUCCESS):return purchaseBurgerSuccess(state, action) 
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state)
        default:
            return state
    }
}

export default orderReducer;