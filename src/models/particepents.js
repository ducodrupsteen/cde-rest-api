import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ParticepentsSchema = new Schema({
    fullName: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    hasVoted: {
        type: 'boolean',
        default: false
    },
    votedFor: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    recipeId: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }
})

export default mongoose.model('Particepents', ParticepentsSchema)