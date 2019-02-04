import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    totalPrice: 4
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
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            ingredientAdded={this.addIngredient}
            ingredientRemoved={this.removeIngredient}
            disabled={disabledInfo}/>
        </>
    );
  }
}

export default BurgerBuilder;