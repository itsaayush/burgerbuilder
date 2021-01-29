import React from 'react'
import Logo from '../../Logo/Logo'
import NavItems from '../../Navigation/NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxi/Auxi'
import classes from './SideDrawer.module.css'

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if (props.visible) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }

  return (
    <Aux>
      <Backdrop clicked={props.closed} show={props.visible} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  )
}

export default sideDrawer
