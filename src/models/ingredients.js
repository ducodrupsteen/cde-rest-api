import mongoose from 'mongoose';

const objectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const ingredientSchema = new Schema ({
  name: 'string',
  category: {
    type: objectId,
    ref: 'Ingredients'
  },
  messurement: {
    unit: 'string',
    amount: 'number'
  }
  },{
    timestamps: true
})

export default mongoose.model('Ingredients', ingredientSchema)
