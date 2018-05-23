import Categories from '../../models/categories'
import Ingredients from '../../models/ingredients'
export default {

  getAllCategories() {
    return Categories.find()
      .populate({
        path: 'items',
        select: 'name messurement'
      })
  },

  insertCategory(body) {
    const newCat = new Categories;
    newCat.name = body.name;
    return newCat.save()
  },

  updateCategoryItems(body) {
    return Categories.findOneAndUpdate({ name: body.catName }, {$push: {items: body.ing_id}})
  },

}
