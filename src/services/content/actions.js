import Content from '../../models/content'
import bodyParses from 'body-parser'

export default{

  getContent(){
    return Content.find()
    .then( function retrieveContent(contentArr){
      return contentArr
    })
  },

  getContentByID(obj_id){
    return Content.findById(obj_id, function(err, content){
      return content
    })
  },

  insertContent(title, body){
    var cont = new Content({
      title: title,
      body: body
    })
    cont.save(function(err, cont){
      if(err) log.info(err)
      log.info(err)
    })
    return cont
  },

  deleteContent(obj_id){
    return Content.findById(obj_id, function(err, cont){
      return cont
    })
  }

}
