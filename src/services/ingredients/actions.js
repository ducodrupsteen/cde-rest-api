import Ingredients from '../../models/ingredients'
import Categories from '../../models/categories'
import log from '../../log'
export default {

  getAllIngredients(req, res) {
    Ingredients.find( err => {
      if( err ) {
        log.error({ err })
      }
    })
      .populate({path: 'category', select: 'name'})
      .then( ingredients =>  res.json(ingredients)    )
  },

  insertIngredient(req, res) {
    const body = req.body
    const newIngredient = new Ingredients

    newIngredient.name = body.name;
    newIngredient.category = body.cat_id;
    newIngredient.messurement.unit = body.unit;


    for(const i in body.amount) {
      if(i > 0) {
        const am = body.amount[i]
        newIngredient.messurement.amount.push(am)
      }
    }

    newIngredient.save( err => {
      if( err ){
        log.error({ err })
        res.json({ err })
      } else {
        Categories.findOneAndUpdate({ _id: body.cat_id}, { $push: { items: newIngredient._id}}, err => {
          if ( err ) {
            log.info({ err })
            res.json({ err })
          } else {
            res.json({
              succes: true,
              message: 'The ingredient has been save and the category has been updated'
            })
          }
        })
      }
    })
  },

  updateIngredient(req, res) {
    const body = req.body
    const objForUpdate = {}

    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        objForUpdate[key] = body[key]
      }
    }

    Ingredients.findOneAndUpdate({ _id: body.ing_id }, { $set: objForUpdate}, {upsert: true, new: true}, err => {
      if ( err ) {
        log.error({ err })
        res.json({ err })
      }else {
        res.json({
          succes: true,
          message: 'The ingredient has been updated'
        })
      }
    })
  },

  deleteIngredient(req, res) {
    const body = req.body

    Ingredients.findByIdAndRemove({ _id: body.id }, err =>{
      if( err ) {
        log.error({ err })
        res.json({ err })
      } else {
        res.json({
          succes: true,
          message: 'The ingredient has been deleted'
        })
      }
    })
  }
}
