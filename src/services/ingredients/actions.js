import Ingredients from '../../models/ingredients'
import Categories from '../../models/categories'

export default {

  getAllIngredients() {
    return Ingredients.find()
      .then( function retrieveIngredients(ingriedentArr) {
        return ingriedentArr
      })
  },

  insertIngredient(body) {
    const cat = Categories.findOne({ name: body.category_name })
    const newIngredient = new Ingredients

    newIngredient.name = body.name;
    newIngredient.category = body.category;
    newIngredient.messurement.unit = body.unit;
    newIngredient.messurement.amount = body.amount;

    return newIngredient.save( function(err){
      if(err) {
        log.error(err)
      }
      
      cat.items = newIngredient._id
      cat.save;
    })
  },

  getCategorizedIngredients() {
    return Ingredients.find().populate('Categories')

  }
}
