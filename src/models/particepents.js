import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ParticepentsSchema = new Schema({
    fullName: {
        type: 'string',
        required: true
    },
    email: {
        type: string,
        required:true
    },
    hasVoted: {
        type: 'boolean',
        default: false
    },
    recipe_id: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }
})

export default mongoose.model('Particepent', ParticepentsSchema)