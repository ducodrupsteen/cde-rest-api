import log from '../../log'
import Page from '../../models/page'
import Section from '../../models/section'

export default {

  createNewPage(request, response) {
    const { body } = request
    const newPage = new Page(body)
    newPage.created_by = '5afaa60db4ab8b3b03499d14'

    newPage.save(error => {
      if(error) {
        log.error({error})
        response.json({ error })
      } else {
        response.json({ message: 'Succesfully created page'})
      }
    })
  },

  insertContent(request, response) {
    const { body, params: { pageId } } = request
    const newSection = new Section(body)

    Page.findById(pageId)
      .then(page => {
        log.info({ page })
        newSection.belongs_to = pageId
        page.contents.push(newSection)
        newSection.save(err => {
          if(err) {
            log.error({ err })
            response.json({ message: 'Failed inserting content' })
          } else {
            response.json({ message: 'Succesfully inserted content' })
            page.save()
          }
        })
      })
      .catch(err => log.error({ err }))
  },

  getContent() {
    return Content.find()
      .then(function retrieveContent(contentArr) {
        return contentArr
      })
  },

  getContentByID(obj_id) {
    return Content.findById(obj_id, function(err, content) {
      return content
    })
  },

  deleteContent(obj_id) {
    var cont = Content.findById(obj_id)
    return cont.remove()
  }

}
