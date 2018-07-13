import { Router as router } from 'express'
import actions from './actions.js'
import verifyToken from './middlewares/verify'

const {
  insertContent,
  createNewPage,
  getPageSections,
  getSectionById,
  getPage,
  updateSection,
  getPages
} = actions

export default function contentController({ verify }) {
  const content = router();

  content.post('/newpage', verifyToken, createNewPage)
  content.post('/:pageId/newsection/', verifyToken, insertContent)
  content.get('/:pageId', getPage)
  content.get('/:pageId/sections', getPageSections)
  content.get('/single/:sectionId', getSectionById)
  content.put('/update/:sectionId', verifyToken, updateSection)
  content.get('/pages', getPages)

  return content;
}
