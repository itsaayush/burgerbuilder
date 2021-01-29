import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle click={props.toggleDrawer} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  )
}

export default toolbar
