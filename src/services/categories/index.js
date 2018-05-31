import {Router as router} from 'express';
import actions from './actions';

const {
  getAllCategories,
  insertCategory,
  updateCategoryItems
} = actions

export default function categoriesController({ verify }) {
  const cat = router()

  cat.get('/',getAllCategories)
  cat.post('/create', insertCategory)
  cat.put('/update', updateCategoryItems)

  return cat
}
