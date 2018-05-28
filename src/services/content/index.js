import { Router as router } from 'express'
import actions from './actions.js'

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

  content.post('/newpage', createNewPage)
  content.post('/:pageId/newsection/', insertContent)
  content.get('/:pageId', getPage)
  content.get('/:pageId/sections', getPageSections)
  content.get('/single/:sectionId', getSectionById)
  content.put('/update/:sectionId', updateSection)
  content.get('/pages', getPages)

  return content;
}
