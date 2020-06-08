import React, { Component } from 'react';

import classes from './Modal.module.css'
import Auxi from '../../../hoc/Auxi/Auxi';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children; 
    }
    componentWillUpdate (){
        console.log('[Modal] componentWillUpdate')
    }

    render(){
        return(
            <Auxi>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-120vh)',
                    opacity: this.props.show ? '1' : ''
                }}>
                {this.props.children}
            </div>
        </Auxi>
        );
    }

};

export default Modal;
