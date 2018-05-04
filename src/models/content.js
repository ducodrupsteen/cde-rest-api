import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema

const contentSchema = new Schema({
  title: 'string',
  body: {
    type: 'string',
    maxlength: 300
  },
  // created_by: ObjectId,
  // updated_by: ObjectId,
},{
  timestamps: true
})

export default mongoose.model('Content', contentSchema)
