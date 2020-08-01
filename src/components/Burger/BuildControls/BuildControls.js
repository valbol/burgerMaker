import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [

    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const BuildControls = (porps) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{porps.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => porps.ingredientAdded(ctrl.type)}
                removed={() => porps.ingredientRemoved(ctrl.type)}
                disabled={porps.disabled[ctrl.type]} />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!porps.purchasable}
            onClick={porps.ordered}>{porps.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default BuildControls;