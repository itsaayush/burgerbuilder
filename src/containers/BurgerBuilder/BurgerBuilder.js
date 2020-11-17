import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 0.5
}


class BurgerBuilder extends Component {
    state = {
        
       ingredients: null,
        totalPrice: 4,
        purchaseable: true,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        console.log(this.props)
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
    }

    addIngredient = (type) => {
        const count = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = count;
        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseable(updatedIngredients);

    };

    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const count = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = count;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseable(updatedIngredients);

    };

    updatePurchaseable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchaseable: sum > 0 });
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        // // alert('you continue')
        
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+ this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        add={this.addIngredient}
                        remove={this.removeIngredient}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                        purchaseable={this.state.purchaseable} />
                </Aux>
            );
            orderSummary = <OrderSummary
                totalPrice={this.state.totalPrice}
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler}
                ingredients={this.state.ingredients} />;

        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }



        return (
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
};

export default withErrorHandler(BurgerBuilder, axios);
