import React, { Component } from 'react';

import Auxi from '../../../hoc/Auxi/Auxi';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //This could be functional component, doesnt have to be a class
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => { 
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>);
        });

        return (
            <Auxi>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.canceld}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.continue}>CONTINUE</Button> 
            </Auxi>
        );
    }
   
   

};

export default OrderSummary;