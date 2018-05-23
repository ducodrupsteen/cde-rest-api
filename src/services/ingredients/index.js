import { Router as router } from 'express'
import Ingredients from '../../models/ingredients'
import actions from './actions.js'

export default function ingredientsController({ config, log, verify }) {
  const ingredient = router()

  ingredient.get('/', function(req, res) {
    actions.getAllIngredients()
      .then( ingredients => {
        log.info({ ingredients })
        res.json({ ingredients })
      })
      .catch( err => {
        log.error({ err })
        res.json({ err })
      })
  })

  ingredient.get('/categorized', function(req, res) {
    actions.getCategorizedIngredients()
      .then( categories => {
        log.info({ categories })
        res.send({ categories })
      })
      .catch( err => {
        log.error({ err })
        res.json({ err })
      })
  })

  ingredient.post('/create', function(req, res) {
    // log.info(req.body)
    actions.insertIngredient(req.body)
      .then( result => {
        log.info({
          succes: true,
          message: 'The item has been saved',
          result
        })
        res.json({
          succes: true,
          message: 'The item has been saved',
          result
        })
      })
      .catch( err => {
        log.error({ err })
        res.json({ err })
      })
  })

  return ingredient
}
