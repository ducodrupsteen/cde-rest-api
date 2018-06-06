import log from '../../log'
import Categories from '../../models/categories'
import Ingredients from '../../models/ingredients'
export default {

  getAllCategories(req, res) {
    return Categories.find()
    .populate('items','name messurement',null,{sort: {'name':1}})
    .sort({field: 'asc', name: '1'})
    .then( categories => res.json(categories))
  },

  getSingleCategory(req, res) {
    const params = req.params

    Categories.findById(params.categoryId)
    .then( category => {
      res.json(category)
    })
    .catch(err => {
      log.error({ err })
      res.json({message: 'An error occurred'})
    })
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
