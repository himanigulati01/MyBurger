import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import { connect } from 'react-redux'

class checkout extends Component{
    cancelCheckoutHandler=(event)=>{
        event.preventDefault()
        this.props.history.goBack()
    }
    checkoutFormHandler=()=>{
        this.props.history.replace('checkout/contact-data')
    }
    

    render(){
        let summary = <Redirect to="/" />
            if(this.props.ings){
                const purchasedRedirect = this.props.purchased ? <Redirect to = '/' />: null
                summary= (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        goToPrev={this.cancelCheckoutHandler}
                        goToCheckoutForm={this.checkoutFormHandler}/>
        
                    <Route path={this.props.match.path+'/contact-data'} 
                           render={()=>(
                            <ContactData ingredients={this.props.ings} totalPrice={this.props.price}/>
                    )}/>
                </div>
                )
            }
        
        return summary
    }
}

const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        purchased : state.order.purchased
    }
}


export default connect(mapStateToProps )(checkout)