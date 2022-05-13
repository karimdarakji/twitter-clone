import express from 'express';
import { createTweet, getAllTweets, getTweet, likeTweet, commentTweet } from '../controllers/tweets.js';

import { verifyUser } from '../authenticate.js';

const router = express.Router();


router.post('/create', verifyUser, createTweet)
router.post('/comment-tweet', verifyUser, commentTweet)
router.post('/getalltweets', verifyUser, getAllTweets)
router.post('/gettweet', verifyUser, getTweet)

router.post('/like-tweet', verifyUser, likeTweet)
/*router.post('/get?=id', getById) */

export default router;