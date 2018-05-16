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
      .then( succes => {
        res.json({
          succes: true,
          message: 'the category has been saved'
        })
        log.info({
          succes: true,
          message: 'the category has been saved'
        })
      })
      .catch( err => {
        res.json({ err })
        log.error({ err })
      })
  })

  cat.put('/update', function(req, res){
    actions.insertIngredientToCategory(req.body)
      .then( succes => {
        res.json({
          succes: true,
          message: 'the cat has been updated'
         })
        log.info({ succes })
      })
      .catch( err => {
        log.error({ err })
        res.json({ err })
      })
  })

  return cat
}
