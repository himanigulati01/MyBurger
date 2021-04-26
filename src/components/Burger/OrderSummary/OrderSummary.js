import Aux from "../../../hoc/Auxilliary/Auxilliary";
import React, { Component } from 'react';
import Button from '../../UI/Button/Button'
//import { NavLink} from 'react-router-dom';
//import Checkout from "../../../containers/Checkout/Checkout";

class orderSummary extends Component{
    
    // shouldComponentUpdate(nextProps,nextState){
    //     return nextProps.show!==this.props.show

    // }

    componentDidUpdate(){
        console.log(this.props)
    }
    render(){
        const ingredSummary = Object.keys(this.props.ingredients)
        .map(igkey => {
            return <li
            key={igkey}><span style={{textTransform:'capitalize'}}> {igkey} </span>:{this.props.ingredients[igkey]}
            </li>
        })
        const price = (this.props.price===20)? 0 : this.props.price 
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious Burger with the following Ingredients:</p>
            <ul>
                {ingredSummary}
            </ul>
            <p><strong>Total price : {price}</strong></p>
            <Button clicked={this.props.cancelOrderSummary} btn='Danger'>
                CANCEL
            </Button>
            <Button clicked={this.props.continueOrderSummary} btn='Success'>
                CONTINUE
            </Button>
        </Aux>
    )
}}
export default orderSummary;