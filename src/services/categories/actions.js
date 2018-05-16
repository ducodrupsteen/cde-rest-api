import Categories from '../../models/categories'
import Ingredients from '../../models/ingredients'
export default{

  getAllCategories(){
    return Categories.find().populate('Ingredients')
  },

  insertCategory(body){
    //save function
  },

  insertIngredientToCategory(body){
    // const ing = Ingredients.findOne({ name: body.ingName })

    return Categories.findOneAndUpdate({ name: body.catName }, {$push: {items: body.ing_id}})

  }
}
