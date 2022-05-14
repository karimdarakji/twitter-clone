/* eslint-disable import/no-anonymous-default-export */
import { CREATE_TWEET, 
    CREATE_TWEET_ERROR, 
    CREATE_TWEET_SUCCESS, 
    GET_TWEETS, 
    GET_TWEETS_ERROR, 
    GET_TWEETS_SUCCESS, 
    GET_TWEET, 
    GET_TWEET_ERROR, 
    GET_TWEET_SUCCESS, 
    LIKE_TWEET,
    LIKE_TWEET_SUCCESS,
    LIKE_TWEET_ERROR,
    COMMENT_TWEET,
    COMMENT_TWEET_SUCCESS,
    COMMENT_TWEET_ERROR } from '../actions'

const initialState = {
    data: '',
    tweets: '',
    tweet: '',
    message: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TWEET:
            return  {
                ...state,
            }
        case CREATE_TWEET_SUCCESS:
        return  {
            ...state, message: action.payload
        }
        case CREATE_TWEET_ERROR:
        return  {
            ...state, message: action.payload
        }
        case GET_TWEETS:
        return  {
            ...state,
        }
        case GET_TWEETS_SUCCESS:
        return  {
            ...state, tweets: action.payload
        }
        case GET_TWEETS_ERROR:
        return  {
            ...state, message: action.payload
        }

        case GET_TWEET:
        return  {
            ...state,
        }
        case GET_TWEET_SUCCESS:
        return  {
            ...state, tweet: action.payload
        }
        case GET_TWEET_ERROR:
        return  {
            ...state, message: action.payload
        }

        case LIKE_TWEET:
        return  {
            ...state,
        }
        case LIKE_TWEET_SUCCESS:
        return  {
            ...state, message: action.payload
        }
        case LIKE_TWEET_ERROR:
        return  {
            ...state, message: action.payload
        }

        case COMMENT_TWEET:
        return  {
            ...state,
        }
        case COMMENT_TWEET_SUCCESS:
        return  {
            ...state, message: action.payload
        }
        case COMMENT_TWEET_ERROR:
        return  {
            ...state, message: action.payload
        }
        default:
            return state;
    }
}