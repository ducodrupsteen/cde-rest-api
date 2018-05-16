import mongoose from 'mongoose'
const Schema = mongoose.Schema

const contentSchema = new Schema({
  pageTitle: String,
  contents: [{
    type: Schema.Types.ObjectId,
    ref: 'Section'
  }],
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'Admin'
  }
})

export default mongoose.model('Page', contentSchema)
