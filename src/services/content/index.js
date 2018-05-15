import { Router as router } from 'express'
import actions from './actions.js'

const {
  insertContent,
  createNewPage
} = actions

export default function contentController({
  config,
  log,
  verify
}) {
  const content = router();

  content.post('/newpage', createNewPage)
  content.post('/:pageId/newsection/', insertContent)

  return content;
}
