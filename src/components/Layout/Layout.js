import React, { Component } from 'react';

import Auxi from '../../hoc/Auxi';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    
    state = {
        showSideDrawer:true
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }
    render() {
        return (
            <Auxi>
                <Toolbar />
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