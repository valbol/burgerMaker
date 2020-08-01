import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    componentWillMount() {
        this.props.onIniitPurchase();
    }

    onCheckoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    onCheckoutCancleHandler = () => {
        this.props.history.goBack();
    }
    render() {
        //to fix if we reload in the checkout page 
        let summary = <Redirect to="/" />
        console.log(this.props.ings)
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        onCheckoutCancle={this.onCheckoutCancleHandler}
                        onCheckoutContinue={this.onCheckoutContinueHandler} />
                    <Route
                        path={this.props.match.url + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }
        //to fix if we reload in the checkout page 
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIniitPurchase: () => dispatch(actions.purchaseInit)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);