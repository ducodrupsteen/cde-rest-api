import {Router as router} from 'express';
import Categories from '../../models/categories';
import actions from './actions';

export default function categoriesController({ config, log, verify }) {
  const cat = router()

  cat.get('/', function(req, res){
    actions.getAllCategories()
      .then( categories => {
        log.info({ categories })
        res.json({ categories })
      })
      .catch( err => {
        log.error({ err })
        res.json({ err })
      })
  })

  cat.post('/create',function(req, res){
    actions.insertCategory(req.body)
      .then( result => {
        res.json({
          succes: true,
          message: 'the category has been saved',
          result
        })
        log.info({
          succes: true,
          message: 'the category has been saved',
          result
        })
      })
      .catch( err => {
        res.json({ err })
        log.error({ err })
      })
  })

  cat.put('/update', function(req, res){
    actions.updateCategoryItems(req.body)
      .then( result => {
        res.json({
          succes: true,
          message: 'the cat has been updated',
          result
         })
        log.info({ 
          succes: true,
          message: 'the cat has been updated',
          result 
        })
      })
      .catch( err => {
        log.error({ err })
        res.json({ err })
      })
  })

  return cat
}
