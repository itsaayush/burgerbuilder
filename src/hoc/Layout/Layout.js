import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }
    closeSideDrawer = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState)=> {
            return {showSideDrawer : !prevState.showSideDrawer}
        });
    }

    render() {
        return (
            <Aux>
                <div>
                    <Toolbar toggleDrawer={this.sideDrawerToggleHandler}/>
                    <SideDrawer
                        visible={this.state.showSideDrawer}
                        closed={this.closeSideDrawer} />
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;
