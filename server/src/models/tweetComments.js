import mongoose from 'mongoose';

const createSchema = mongoose.Schema({
    tweet_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const tweetComments = mongoose.model('tweetComments', createSchema);

export default tweetComments;