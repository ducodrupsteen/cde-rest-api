import mongoose from 'mongoose'

const objectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: 'string',
    required: true,
  },
  items: [{
    type: objectId,
    ref: 'Ingredients'
  }]
},
  {
    timestamps: true
  }
)

export default mongoose.model('Categories', categorySchema)
