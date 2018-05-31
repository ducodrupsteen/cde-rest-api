import log from '../../log';
import Recipe from '../../models/recipe'
import Particepent from '../../models/particepents'
export default {

    getAllRecipes(req, res) {
        Recipe.find( err => {
            if( err ) {
                log.error({ err })
            }
        })
        .populate({path: 'particepent', select: 'fullName'})
        .then( recipes => res.json(recipes))
    },

    createRecipe(req, res) {
        const body = req.body
        const ingredients = body.ingredients
        const newRecipe = new Recipe

        newRecipe.name = body.name
        newRecipe.body = body.body
        newRecipe.ingredients = body.ingredients

        newRecipe.save( err => {
            if( err ) {
                log.error({ err })
                res.json({
                    succes: false,
                    message: 'A problem occured while saving your recipe'
                })
            } else {
                const newParticepent = new Particepent

                newParticepent.fullName = body.userName
                newParticepent.email = body.email
                newParticepent.recipeId = newRecipe._id

                newParticepent.save( err => {
                    if( err ) {
                        log.error({ err })
                        res.json({
                            succes: false,
                            message: 'A problem occured while saving your recipe'
                        })
                    } else {

                        Recipe.findOneAndUpdate({ _id: newRecipe._id}, {$set: {particepent: newParticepent._id}}, err => {
                            if( err ) {
                                log.error({ err })
                                res.json({
                                    succes: false,
                                    message: 'A problem occured while saving your recipe'
                                })
                            }
                        })

                        res.json({
                            succes: true,
                            message: 'Your recipe has been saved! Dont forget to share it!'
                        })
                    }
                })
            }
        })
    },

    removeRecipe(req, res) {
        Recipe.findByIdAndRemove({ _id: req.params.id}, err => {
            if( err ){
                log.error({ err })
                res.json({ err })
            } else {
                res.json({
                    succes: true,
                    message: 'The recipe has been removed'
                })
            }
        })
    }
}