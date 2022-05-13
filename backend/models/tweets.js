import mongoose from 'mongoose';

const createSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    text: {
        type: String,
    },
    imggif: {
        type: String,
    },
    video: {
        type: String,
       
    },
    poll_id: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const tweets = mongoose.model('tweets', createSchema);

export default tweets;