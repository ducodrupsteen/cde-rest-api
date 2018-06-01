import {Router as router} from 'express';
import actions from './actions';

const {
  getAllCategories,
  getSingleCategory,
  insertCategory,
  updateCategoryItems
} = actions

export default function categoriesController({ verify }) {
  const cat = router()

  cat.get('/',getAllCategories)
  cat.get('/:categoryId', getSingleCategory)
  cat.post('/create', insertCategory)
  cat.put('/update', updateCategoryItems)

  return cat
}
