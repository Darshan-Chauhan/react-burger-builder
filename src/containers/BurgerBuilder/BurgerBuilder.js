import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    showModal: false
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({
      purchasable: sum > 0
    })
  }

  addIngredient = type => {
    const updatedIngredients = {
      ...this.state.ingredients
    }
    const unpdatedCount = this.state.ingredients[type] + 1;
    updatedIngredients[type] = unpdatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredient = type => {
    const updatedIngredients = {
      ...this.state.ingredients
    }
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0) {
      return;
    }
    const unpdatedCount = oldCount - 1;
    updatedIngredients[type] = unpdatedCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients);
  }

  purchasehandler = () => {
    const purchasehandler = this.state.showModal;
    this.setState({
      showModal: !purchasehandler
    })
  }

  purchaseContinueHandler = () => {
    alert("You continue!");
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
        <>
          <Modal toggleBackDrop={this.purchasehandler} show={this.state.showModal}>
            <OrderSummary 
              price={this.state.totalPrice}
              cancelOrder={this.purchasehandler}
              continueOrder={this.purchaseContinueHandler}
              ingredients={this.state.ingredients}/>
          </Modal> 
          
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            price={this.state.totalPrice}
            showModal={this.purchasehandler}
            purchasable={this.state.purchasable}
            ingredientAdded={this.addIngredient}
            ingredientRemoved={this.removeIngredient}
            disabled={disabledInfo}/>
        </>
    );
  }
}

export default BurgerBuilder;