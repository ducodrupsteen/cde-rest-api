import Content from '../../models/content'

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
    return cont.save()
  },

  deleteContent(obj_id){
    var cont = Content.findById(obj_id)
    return cont.remove()
  }

}
