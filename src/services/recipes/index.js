import {Router as router} from 'express'
import actions from './actions'

const {
    getAllRecipes,
    createRecipe,
    removeRecipe
} = actions

export default function recipeController({ verify  }) {
    const recipe = router()

    recipe.get('/', getAllRecipes)
    recipe.post('/create', createRecipe)
    recipe.delete('/:id/delete', removeRecipe)

    return recipe
}