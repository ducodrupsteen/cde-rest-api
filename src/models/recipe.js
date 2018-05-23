import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RecipeSchema = new Schema ({
    name: {
        type: 'string',
        required: true
    },
    body: {
        type: 'string',
        required: false
    },
    ingredients: [{
        ingredient: 'string'
    }]
}) 

export default mongoose.model('Recipe', RecipeSchema);