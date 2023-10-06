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
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const tweetlikes = mongoose.model('tweetlikes', createSchema);

export default tweetlikes;