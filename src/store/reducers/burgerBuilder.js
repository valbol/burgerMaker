import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

//defualt value gets when object undefined
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            //dynamicly overide a property in an object (ES6) --> [] not array ,this is dynamic overide
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
            const updatedState = {
                // state copies the variables, however ingredident is an object that being passed as pointer
                //thefore we need to copy it as well
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedState);

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: false

            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                // ingredidents: {
                //     salad: action.ingredidents.salad,
                //     bacon: action.ingredidents.bacon,
                //     cheese: action.ingredidents.cheese,
                //     meat: action.ingredidents.meat
                // },
                totalPrice: 4,
                error: false,
                building: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true });
        default:
            return state;
    }
}

export default reducer;