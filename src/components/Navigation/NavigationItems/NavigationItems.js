import React from 'react'
import classes from './NavigationItems.module.css'
import NavItem from './NavigationItem/NavigationItem'

const navItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavItem exact link="/">Burger Builder</NavItem>
            <NavItem link="/orders" >Orders</NavItem>
        </ul>
    )
}

export default navItems;