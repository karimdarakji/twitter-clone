import { call, put, takeLatest, all, } from "redux-saga/effects"

import { CREATE_TWEET, GET_TWEETS, GET_TWEET, LIKE_TWEET, COMMENT_TWEET } from "../actions"

import {
  createTweetSuccess, 
  createTweetError, 
  gettweetsSuccess, 
  gettweetsError, 
  gettweetSuccess, 
  gettweetError,
  liketweetSuccess,
  liketweetError,
  commenttweetError,
  commenttweetSuccess } from './actions'

import axios from 'axios'
import { getLocalStorage } from "../../storage"

axios.defaults.withCredentials = true

/* CREATE TWEET */

const TweetAsync = async (user_id, text) =>
await axios.post("http://localhost:5000/tweets/create", { user_id, text }, 
{
  headers: {
  'Authorization': `Bearer ${getLocalStorage('ui').token}`
  }
})
.then((res) => res.data)
.catch((error) => error.response.data);

function* create({ payload }) {
  const { user_id, text, changeLoader } = payload;
  try {
    const tweet = yield call(TweetAsync, user_id, text);
    if (!tweet.message) {
      yield put(createTweetSuccess('success'));

    } else {
      yield put(createTweetError(tweet.message));
    }  
    changeLoader(false)
  } catch (error) {
     yield put(createTweetError(error));
  }
}

/* GET ALL TWEETS */

const getAllTweetsAsync = async (user_id) =>
await axios.post("http://localhost:5000/tweets/getalltweets", { user_id, withCredentials: true }, 
{
  headers: {
    'Authorization': `Bearer ${getLocalStorage('ui').token}` 
}})
.then((res) => res.data)
.catch((error) => error.response.data);

function* getTweets({ payload }) {
  const { user_id } = payload;
  try {
    const tweet = yield call(getAllTweetsAsync, user_id);
    if (!tweet.message) {
      yield put(gettweetsSuccess(tweet));

    } else {
      yield put(gettweetsError(tweet.message));
    }  
  } catch (error) {
     yield put(gettweetsError(error));
  }
}

/* GET ONE TWEET */

const getTweetAsync = async (tweet_id) =>
await axios.post("http://localhost:5000/tweets/gettweet", { tweet_id, withCredentials: true }, 
{
  headers: {
    'Authorization': `Bearer ${getLocalStorage('ui').token}` 
}})
.then((res) => res.data)
.catch((error) => error.response.data);

function* getTweet({ payload }) {
  const { tweet_id } = payload;
  try {
    const tweet = yield call(getTweetAsync, tweet_id);
    if (!tweet.message) {
      yield put(gettweetSuccess(tweet));

    } else {
      yield put(gettweetError(tweet.message));
    }  
  } catch (error) {
     yield put(gettweetError(error));
  }
}

/* LIKE TWEET */
const LikeTweetAsync = async (tweet_id, user_id) =>
await axios.post("http://localhost:5000/tweets/like-tweet", { tweet_id, user_id }, 
{
  headers: {
  'Authorization': `Bearer ${getLocalStorage('ui').token}`
  }
})
.then((res) => res.data)
.catch((error) => error.response.data);

function* liketweetfunction({ payload }) {
  const { tweet_id, user_id } = payload;
  try {
    const like = yield call(LikeTweetAsync, tweet_id, user_id);
    if (!like.message) {
      yield put(liketweetSuccess('success'));

    } else {
      yield put(liketweetError(like.message));
    }  
  } catch (error) {
     yield put(liketweetError(error));
  }
}

/* COMMENT TWEET */
const CommentTweetAsync = async (tweet_id, user_id, comment) =>
await axios.post("http://localhost:5000/tweets/comment-tweet", { tweet_id, user_id, comment }, 
{
  headers: {
  'Authorization': `Bearer ${getLocalStorage('ui').token}`
  }
})
.then((res) => res.data)
.catch((error) => error.response.data);

function* commenttweetfunction({ payload }) {
  const { tweet_id, user_id, comment } = payload;
  try {
    const commentAction = yield call(CommentTweetAsync, tweet_id, user_id, comment);
    if (!commentAction.message) {
      yield put(commenttweetSuccess('success'));

    } else {
      yield put(commenttweetError(commentAction.message));
    }  
  } catch (error) {
     yield put(commenttweetError(error));
  }
}

export default function* tweetSaga() {
  yield all ([
    takeLatest(CREATE_TWEET, create),
    takeLatest(GET_TWEETS, getTweets),
    takeLatest(GET_TWEET, getTweet),
    takeLatest(LIKE_TWEET, liketweetfunction),
    takeLatest(COMMENT_TWEET, commenttweetfunction),
  ])
}