import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }
    componentWillMount() {

        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1]
            } else {
                //param--> ['salad' , '1']   // + to --> casting to integer
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: price });
    }

    onCheckoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    onCheckoutCancleHandler = () => {

        this.props.history.goBack();
    }
    render() {
        return (
            <div>

                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutCancle={this.onCheckoutCancleHandler}
                    onCheckoutContinue={this.onCheckoutContinueHandler} />
                <Route
                    path={this.props.match.url + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>
        );
    }
}

export default Checkout;