import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../shared/utility'

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 0.5,
}

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  }
  const updatedIngredients = updateObj(state.ingredients, updatedIngredient)
  const updatedState = {
    ingredients: updatedIngredients,
    building: true,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
  }
  return updateObj(state, updatedState)
}

const removeIngredient = (state, action) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  }
  const updatedIngs = updateObj(state.ingredients, updatedIng)
  const updatedSt = {
    ingredients: updatedIngs,
    building: true,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
  }
  return updateObj(state, updatedSt)
}

const setIngredients = (state, action) => {
  return updateObj(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 4,
    building: false,
  })
}

const fetchIngredientsFailed = (state, action) => {
  return updateObj(state, { error: true })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action)
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action)
    case actionTypes.SET_INGREDIENT:
      return setIngredients(state, action)
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return fetchIngredientsFailed(state, action)
    default:
      return state
  }
}

export default reducer
