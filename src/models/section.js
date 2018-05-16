import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema

const sectionSchema = new Schema({
  title: String,
  contents: Object,
  belongs_to: {
    type: Schema.Types.ObjectId,
    ref: 'Page'
  }
})

export default mongoose.model('Section', sectionSchema)
