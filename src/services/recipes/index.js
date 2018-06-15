import {Router as router} from 'express'
import actions from './actions'

const {
    getAllRecipes,
    createRecipe,
    createRecipeAndUser,
    removeRecipe,
    getSingleRecipe,
    upvoteRecipe
} = actions

export default function recipeController({ verify  }) {
    const recipe = router()

    recipe.get('/', getAllRecipes)
    recipe.get('/:recipeId', getSingleRecipe)
    recipe.post('/create', createRecipeAndUser)
    recipe.post('/create/:userId', createRecipe)
    recipe.put('/like/:recipeId', upvoteRecipe)
    recipe.delete('/:id/delete', removeRecipe)

    return recipe
}
