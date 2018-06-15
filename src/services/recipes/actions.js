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
        .sort({field: 'asc', upvotes: -1})
        .then( recipes => res.json(recipes))
        .catch(err => {
            log.error({ err })
        })
    },

    getSingleRecipe(req, res) {
        const params = req.params

        Recipe.findById(params.recipeId)
        .populate({path: 'particepent', select: 'fullName'})
        .then(recipe => res.json(recipe))
        .catch(err => {
            log.error({ err })
            res.json({
                succes: false,
                message: 'An error occurred'
            })
        })
    },

    createRecipe(req, res) {
        const params = req.params
        const body = req.body

        Particepent.findById(params.userId)
        .then(particepent => {
            if(!particepent) {
                res.json({message: 'No user found'})
            } else if(particepent.recipeId !== '') {
                res.json({message: 'You already created a recipe'})
            } else {
                const newRecipe = new Recipe

                newRecipe.name = body.name
                newRecipe.body = body.body
                newRecipe.ingredients = body.ingredients
                newRecipe.particepent = particepent._id
                newRecipe.save()

                particepent.recipeId = newRecipe._id
                particepent.save()

                res.json({
                    succes: true,
                    message: 'Your recipe is saved, do not forget to share it!'
                })
            }
        })
        .catch(err => {
            log.error({ err })
            res.json({message: 'An error occured'})
        })
    },

    createRecipeAndUser(req, res) {
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

    upvoteRecipe(req, res){
        const params = req.params

        Recipe.findById(params.recipeId)
        .then(recipe => {
            const newCount = recipe.upvotes + 1

            recipe.upvotes = newCount
            recipe.save()

            res.json({
                succes: true,
                message: 'Your vote het been added'
            })
        })
        .catch(err => {
            log.error({ err })
            res.json({message: 'An error occurred'})
        })
    },

    // downvoteRecipe(req, res) {
    //     const params = req.params

    //     Particepent.findById(params.userId)
    //     .then(particepent => {
    //         if(particepent.hasVoted) {
    //             Recipe.findById(params.recipeId)
    //             .then(recipe => {
    //                 const newCount = recipe.upvotes - 1

    //                 recipe.upvotes = newCount
    //                 recipe.save()

    //                 particepent.hasVoted = false
    //                 particepent.save()

    //                 res.json({
    //                     succes: true,
    //                     message: 'Your vote has been removed'
    //                 })
    //             })
    //         } else {
    //             res.json({message: 'You have not voted yet'})
    //         }
    //     })
    //     .catch(err => {
    //         log.error({ err })
    //         res.json({message: 'An error occurred'})
    //     })
    // },

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
