import { Router as router } from 'express'
import Content from '../../models/content'
import actions from './actions.js'

export default function contentController({ config, log }){
  const content = router();

  content.get('/',function(req, res){
    actions.getContent()
      .then(content => {
        log.info({ content })
        res.json({ content })
      })
      .catch(err => {
        log.error({ err })
        res.json({ err })
      })
  })

  content.get('/get/:_id', function(req, res){
    actions.getContentByID(req.params)
      .then(singleContent => {
        log.info({ singleContent })
        res.json({ singleContent })
      })
      .catch(err => {
        log.error({ err })
        res.json({ err })
      })
  })

  content.get('/create', function(req, res){
    actions.insertContent(req.bodyParser.title,req.bodyParser.body)
  })

  content.get('/update/:_id', function(req, res){

  })

  content.get('/delete/:_id', function(req, res){
    actions.deleteContent(req.params).remove(function(err, cont){
      if (err) {
        log.error(err)
        res.json(err)
      }else {
        res.json({
            succes: true,
            message: 'the content item has been removed'
        })
      }
    })
  })

  return content;

}
