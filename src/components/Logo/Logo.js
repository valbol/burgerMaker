import React from 'react';

import burgerlogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';


const Logo = (props) => (
    <div className={classes.Logo} sytle={{height: props.height}}> 
        <img src={burgerlogo} alt="burger"/>
    </div>
);

export default Logo;