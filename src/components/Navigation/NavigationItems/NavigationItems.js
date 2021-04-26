import React from 'react';
import classes from '../NavigationItems/NavigationItems.css'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'


const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>

        <NavigationItem
            link='/'
            exact
            >Burger Builder</NavigationItem>
        
        {props.isAuth
            ? <NavigationItem link='/orders'>Orders</NavigationItem>
            : null}

        {props.isAuth
            ?<NavigationItem link = '/logOut'>LogOut</NavigationItem>
            :<NavigationItem link = '/auth'>Authenticate</NavigationItem>}
    </ul>
)

export default navigationItems;