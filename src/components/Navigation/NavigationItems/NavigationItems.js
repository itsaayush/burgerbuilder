import React from 'react'
import classes from './NavigationItems.module.css'
import NavItem from './NavigationItem/NavigationItem'

const navItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavItem exact link='/'>
        Burger Builder
      </NavItem>
      {props.isAuthenticated ? <NavItem link='/orders'>Orders</NavItem> : null}
      {!props.isAuthenticated ? (
        <NavItem link='/auth'>Authenticate </NavItem>
      ) : (
        <NavItem link='/logout'>Logout </NavItem>
      )}
    </ul>
  )
}

export default navItems
