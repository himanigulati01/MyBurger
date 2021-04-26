import React from 'react';
import classes from '../Burger/burger.css'
import BurgerIngredient from '../Burger/BurgerIngredients/BurgerIngredient'

const Burger= (props)=> {
    let transformedIngred = Object.keys(props.ingredients)
    .map(igkey=> {
            return [...Array( props.ingredients[igkey] )].map( (_, i)=>{ 
                return <BurgerIngredient key={igkey+i} type={igkey} />;
            } )
        } )
    .reduce((arr,el)=>{return arr.concat(el)},[]);

    if (transformedIngred.length===0){
        transformedIngred.push('Please fill the Ingredients!')
    }

    
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngred}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
    }

export default Burger;