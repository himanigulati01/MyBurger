import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class orders extends Component{

    componentDidMount(){
        this.props.onFetchOrder(this.props.token, this.props.userId)
    }
    render(){
        let order = <Spinner/>
        if (!this.props.loading){
            order = this.props.orders.map(order=>(
                    <Order ingredients={order.ingredients} totalPrice={order.price} key={order.id}/>
                )
        )}         
        return(
            <div>
                {order}
            </div>
        )
    
}
}
const mapStateToProps = state =>{
    return {
        orders:state.order.order,
        loading:state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrder : (token, userId) =>dispatch(actions.fetchOrders(token, userId))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));