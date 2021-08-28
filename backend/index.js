import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import UserRoutes from './routes/users.js';

const app = express();


app.use(express.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());


app.use('/register', UserRoutes)

const CONNECTION_URL = 'mongodb+srv://karimdarakji:Karim@123@cluster0.aw1wt.mongodb.net/twitterclone?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
       .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);