import mongoose from 'mongoose';

const createSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
    },
    username: {
        type: String,
        min: 6,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
       
    },
    birth: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    active: {
        type: Number,
        
    },
});

const UserMessage = mongoose.model('UserMessage', createSchema);

export default UserMessage;