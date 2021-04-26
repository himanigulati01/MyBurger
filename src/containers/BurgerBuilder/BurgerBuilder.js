import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        // loading:false,
        // error: null
    }

    componentDidMount(){
        this.props.onInitIngredient()
    }
    purchasedHandler = () => {
        if(this.props.isAuth){
            this.setState({ purchasing: true })
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map((igkey) => {
                return ingredients[igkey]
            })
            .reduce((sum, el) => { return sum + el }, 0)
        return sum>0
    }

    
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    continueOrderSummary = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //displayInfo = {salad: false,meat:true}..etc


        let orderSummary = null

        let burger = this.props.err ? (<p>Can't load ingredients...</p>) : <Spinner/>

        if (this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
    
                    <BuildControls
                        ingredAdded={this.props.onAddIngred}
                        ingredRemoved={this.props.onRemovedIngred}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        disabled={disabledInfo}
                        ordered={this.purchasedHandler}
                        isAuth = {this.props.isAuth}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary
                        ingredients={this.props.ings}
                        price={this.props.price}
                        cancelOrderSummary={this.purchaseCancelHandler}
                        continueOrderSummary={this.continueOrderSummary} />;
        }
        if (this.state.loading){
            orderSummary= <Spinner/>
        }
     
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}
                
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return{
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        err : state.burgerBuilder.error,
        isAuth : state.auth.token !== null 
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onAddIngred : (ingName) => dispatch(actions.addIngred(ingName)),
        onRemovedIngred : (ingName) => dispatch(actions.removeIngred(ingName)),
        onInitIngredient : () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));