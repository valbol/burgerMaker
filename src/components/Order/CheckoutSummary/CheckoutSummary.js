import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it taste well</h1>
            <div style={{ witdh: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
                clicked={props.onCheckoutCancle}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.onCheckoutContinue}>CONTINUE</Button>
        </div>
    )
}
export default CheckoutSummary; 