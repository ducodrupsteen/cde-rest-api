import Ingredients from '../../models/ingredients'
import Categories from '../../models/categories'

export default {

  getAllIngredients() {
    return Ingredients.find()
    .populate({path: 'category', select: "name"})
      .then( function retrieveIngredients(ingriedentArr) {
        return ingriedentArr
      })
  },

  insertIngredient(body) {
    const newIngredient = new Ingredients

    newIngredient.name = body.name;
    newIngredient.category = body.cat_id;
    newIngredient.messurement.unit = body.unit;

    for(const i in body.amount) {
      const am = body.amount[i]
      newIngredient.messurement.amount.push(am)
    }

    return newIngredient.save( function(err, newIngredient){
      if(err) {
        return err;
      }

      Categories.findOneAndUpdate({_id: body.cat_id}, {$push: {items: newIngredient._id}},function (err) {
        if(err) {
          return err
        }
      })

    })
  },

  getCategorizedIngredients() {
    return Categories.find()
      .populate({
        path: 'items',

      })
  },

  updateIngredient(body) {
    return Ingredients.findOneAndUpdate({ _id: body.ing_id }, 
      {
        name: body.name,
        category: body.category,
        messurement: {
          unit: body.unit, 
          amount: body.amount
        },
      },{
        new: true,
        upsert: true
      })
  }
}
