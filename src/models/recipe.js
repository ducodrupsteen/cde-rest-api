import mongoose, { SchemaType } from 'mongoose';

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
    particepent: {
        type: Schema.Types.ObjectId,
        ref: 'Particepents'
    },
    items: {
        type: Schema.Types.ObjectId,
        ref: 'Ingredients'
    },
    upvotes: {
        type: 'number',
        default: 0
    }
})

export default mongoose.model('Recipe', RecipeSchema);