import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from '../CheckoutSummary/CheckoutSummary.css'

const checkoutSummary = (props) =>{
    
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it taste well!!</h1>
            <div>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btn='Danger' clicked={props.goToPrev}>Cancel</Button>
            <Button btn='Success' clicked={props.goToCheckoutForm}>Continue</Button>
        </div>
    )
}

export default checkoutSummary;