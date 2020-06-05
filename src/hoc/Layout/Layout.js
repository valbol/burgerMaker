import React, { Component } from 'react';

import Auxi from '../Auxi/Auxi';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    
    state = {
        showSideDrawer:false
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }
    //clean way of setting a state - if we do it directly it can be not updated on time due to the async way of REACT
    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer : !prevState.showSideDrawer };
        });
    }
    
    render() {
        return (
            <Auxi>
                <Toolbar drewrToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxi>

        );
    }
}

export default Layout;