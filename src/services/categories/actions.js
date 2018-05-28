import log from '../../log'
import Categories from '../../models/categories'
import Ingredients from '../../models/ingredients'
export default {

  getAllCategories(req, res) {
    return Categories.find()
      .populate({
        path: 'items',
        select: 'name messurement'
      })
      .then( categories => res.json(categories))
  },

  insertCategory(req, res) {
    const body = req.body
    const newCat = new Categories;

    newCat.name = body.name;

    return newCat.save( err => {
      if( err ) {
        log.error({ err })
        res.json({
          succes: false,
          message: 'An error occurred!'
        })
      } else {
        res.json({
          succes: true,
          message: 'The category has been saved!'
        })
      }
    })
  },

  updateCategoryItems(req, res) {
    const body = req.body

    Categories.findOneAndUpdate({ name: body.catName }, {$push: {items: body.ing_id}}, err => {
      if( err ) {
        log.error({ err })
        res.json({
          succes: false,
          message: 'An error Occurred!'
        })
      } else {
        res.json({
          succes: true,
          message: 'The category has been updated'
        })
      }
    })
  },

  deleteCategory() {
    //something
  }

}
