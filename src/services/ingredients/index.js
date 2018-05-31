import { Router as router } from 'express'
import actions from './actions.js'

const {
  getAllIngredients,
  insertIngredient,
  updateIngredient,
  deleteIngredient
} = actions

export default function ingredientsController({ verify }) {
  const ingredient = router()

  ingredient.get('/', getAllIngredients)
  ingredient.post('/create', insertIngredient)
  ingredient.put('/update', updateIngredient)
  ingredient.delete('/delete', deleteIngredient)

  return ingredient
}
