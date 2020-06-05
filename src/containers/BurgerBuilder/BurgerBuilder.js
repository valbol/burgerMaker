import React, { Component } from 'react';

import Auxi from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrrorHandler from '../../hoc/withErrrorHandler/withErrrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7

}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        totalPrice: 4,
        // If ingredients added or None 
        purchasable: false,
        // purchasing --> if Order button was clicked
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        axios.get('https://react-myburger-d3afc.firebaseio.com/Ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(err => {
                this.setState({ error: true });
            });
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });

    }
    addIngredientHendler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);

    };
    removeIngredientHendler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    };
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    pucrchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        // alert('you continued !');
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            //in production --> should be calculated in the BE so the user will no manipulate the data which being sent to the server!!.
            price: this.state.totalPrice,
            customer: {
                name: 'val bolt',
                address: {
                    street: 'teststreet 13',
                    zipcode: '345235',
                    country: 'Israel'
                },
                email: 'test@ok.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                this.setState({ loading: false, purchasing: false });
            })
            .catch(err => {
                console.log(err)
                this.setState({ loading: false, purchasing: false });
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Auxi>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHendler}
                        ingredientRemoved={this.removeIngredientHendler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Auxi>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                canceld={this.pucrchaseCancelHandler}
                continue={this.purchaseContinueHandler} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        // {salad: true, meat: false, ...}
        return (
            <Auxi>
                <Modal show={this.state.purchasing} modalClosed={this.pucrchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxi>
        );
    }
}

export default withErrrorHandler(BurgerBuilder, axios);