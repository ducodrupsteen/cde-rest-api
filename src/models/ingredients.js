import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ingredientSchema = new Schema ({
  name: 'string',
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categories'
  },
  messurement: {
    unit: 'string',
    amount: []
  }
  },{
    timestamps: true
})

export default mongoose.model('Ingredients', ingredientSchema)
