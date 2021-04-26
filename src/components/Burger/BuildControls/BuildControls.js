import React from "react";
import BuildControl from '../BuildControls/BuildControl/BuildControl';
import classes from '../BuildControls/BuildControls.css'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'}
]

const buildControls = (props) =>(
    <div className={classes.BuildControls}>
        <p>Price : <strong>{props.price}</strong></p>

        {controls.map(ctrl => (
            <BuildControl 
                label= {ctrl.label} 
                key= {ctrl.label}
                added= {()=>(props.ingredAdded(ctrl.type))} 
                removed= {()=>(props.ingredRemoved(ctrl.type))} 
                disabled= {props.disabled[ctrl.type]}
            />
        ))}
        <button 
        className={classes.OrderButton} 
        disabled={!props.purchasable}
        onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
       
    </div>
);

export default buildControls;