import {Router as router} from 'express'
import actions from './actions'

const {
    getAllRecipes,
    createRecipe,
    createRecipeAndUser,
    removeRecipe,
    getSingleRecipe,
    upvoteRecipe,
    downvoteRecipe
} = actions

export default function recipeController({ verify  }) {
    const recipe = router()

    recipe.get('/', getAllRecipes)
    recipe.get('/:recipeId', getSingleRecipe)
    recipe.post('/create', createRecipeAndUser)
    recipe.post('/create/:userId', createRecipe)
    recipe.put('/:userId/like/:recipeId', upvoteRecipe)
    recipe.put('/:userId/dislike/:recipeId', downvoteRecipe)
    recipe.delete('/:id/delete', removeRecipe)

    return recipe
}