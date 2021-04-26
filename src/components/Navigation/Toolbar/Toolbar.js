import React from 'react';
import classes from '../Toolbar/Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../../Navigation/SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.openSideDrawer}></DrawerToggle>
        <div className={classes.Logo}><Logo/></div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth = {props.isAuthenticated}/>
        </nav>
        
    </header>
)

export default toolbar