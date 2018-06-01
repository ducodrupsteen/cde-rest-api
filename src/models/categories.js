import mongoose from 'mongoose'
import Ingredients from './ingredients'

const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: 'string',
    required: true
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Ingredients'
  }]
},
  {
    timestamps: true
  }
)

export default mongoose.model('Categories', categorySchema)
