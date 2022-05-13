import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  IoHeartOutline,
  IoHeart,
  IoChatbubbleOutline,
  IoRepeatOutline,
  IoPushOutline,
} from "react-icons/io5";
import { TextareaAutosize } from "@material-ui/core";
import { Button } from "react-bootstrap";

//import { gettweet, liketweet, commenttweet } from "../../redux/actions";

import TweetComments from "../../Components/Tweets";

function TweetPage() {
  // const userInfo = getLocalStorage('ui')

  // const tweet_id = window.location.href.split('/tweet/')[1]

  // const dispatch = useDispatch()

  // //variables to declare after fetching data from api
  // const [tempData, setTempData] = useState({
  //     isLiked: false,
  //     likeCount: 0,
  //     commentCount: 0,
  //     allComments: []
  // })

  // const first = useRef(false)
  // const data = useSelector(state => state.tweet.tweet[0])

  // useEffect(() => {
  //     dispatch(gettweet( tweet_id ))
  // }, [dispatch, tweet_id])

  // if(data && !first.current) {
  //     setTempData({
  //         isLiked: data.is_liked,
  //         likeCount: data.likes,
  //         commentCount: data.comments,
  //         allComments: data.allcomments
  //     })
  //     first.current = true
  // }

  // const [commentDetail, setCommentDetail] = useState({
  //     show: false,
  //     id:'',
  //     name: '',
  //     username: '',
  //     data: '',
  //     tweet: '',
  // })

  // const like_tweet = (tweet_id, user_id) => {

  //     // reduce number of comments by 1
  //     if(tempData.isLiked)
  //     setTempData({ ...tempData, likeCount: tempData.likeCount - 1, isLiked: !tempData.isLiked })
  //     else setTempData({ ...tempData, likeCount: tempData.likeCount + 1, isLiked: !tempData.isLiked })

  //     // remove like from database
  //     dispatch(liketweet( tweet_id, user_id ))
  // }

  // const [tweet, setTweet] = useState({
  //     text: ''
  // })
  // //comment inout handle change
  // const handleChange = (e) => {
  //     const { name, value } = e.target
  //     setTweet({...tweet, [name]: value})
  // }

  // //reply tweet action
  // const replyAction = (values) => {
  //     dispatch(commenttweet(values))
  //     setTempData({
  //         ...tempData,
  //         commentCount: tempData.commentCount + 1,
  //         allComments: [
  //             {
  //                 comment: tweet.text,
  //                 createdAt: moment(),
  //                 tweet_id: tweet_id,
  //                 user: {
  //                     name: userInfo.name,
  //                     picture: userInfo.picture,
  //                     username: userInfo.username,
  //                     _id: userInfo._id
  //                 },
  //                 __v: 0
  //             },
  //             ...tempData.allComments,
  //         ]
  //     })
  //     setTweet({ text: '' })
  // }

  return (
    <div className="cont">
      {
        // data &&
        //     <>
        //         <div className="d-flex">
        //             <div style={{width:'10%', textAlign:'center'}}>
        //                 <img className="profile-image" src={`http://localhost:5000/${userInfo.picture}`} alt="user profile" onClick={() => history.push(`/profile/${data.user.username}`)}/>
        //             </div>
        //             <div className="ml-2">
        //                 <span className="fw-bold" style={{textTransform: 'capitalize'}}>{ data.user.name }</span>
        //                 <div className="username">@{ data.user.username }</div>
        //             </div>
        //         </div>
        //         <div className="mt-3 fs-4 ms-2">
        //             {data.text}
        //         </div>
        //         <div className="mt-4 d-flex ms-2">
        //             <div>{moment(data.createdAt).format('hh:mm A')}&nbsp;</div>
        //             <div> · {moment(data.createdAt).format('MMM DD, YYYY')}</div>
        //         </div>
        //         <hr/>
        //         <div className="d-flex ms-2">
        //             <div className="col-3"><span className="fw-bold">{tempData.commentCount}</span> Comments</div>
        //             <div className="col-3"> <span className="fw-bold">0</span> Retweets</div>
        //             <div className="col-3"><span className="fw-bold">{tempData.likeCount}</span> Likes</div>
        //         </div>
        //         <hr/>
        //         <div className="d-flex mb-2 justify-content-around px-2">
        //             <div className="d-flex">
        //                 <IoChatbubbleOutline className="mt-auto me-2 tweet_options_icons" style={{marginBottom:'2px', color: 'grey'}} onClick={() => { setCommentDetail({
        //                     show: true,
        //                     id: data._id,
        //                     name: data.user.name,
        //                     username: data.user.username,
        //                     //date: moment(startDate).format('MMM D'),
        //                     tweet: data.text
        //                 })}} />
        //             </div>
        //             <div>
        //                 <IoRepeatOutline className="tweet_options_icons" style={{ color: 'grey' }} />
        //             </div>
        //             <div className="d-flex">
        //                 <div className="me-2" onClick={() => { like_tweet({ tweet_id: data._id, user_id: data.user._id }) } }>
        //                     { tempData.isLiked ?
        //                     <IoHeart className="tweet_options_icons" style={{color:'red'}} />
        //                     :
        //                     <IoHeartOutline className="tweet_options_icons" style={{color:'red'}} />
        //                     }
        //                 </div>
        //             </div>
        //             <div>
        //                 <IoPushOutline className="tweet_options_icons" style={{ color: 'grey' }} />
        //             </div>
        //         </div>
        //         <hr/>
        //         <div className="d-flex">
        //             <div className="text-center" style={{width:'10%'}}>
        //                 <img className="profile-image" src={`http://localhost:5000/${userInfo.picture}`} alt="user profile" onClick={() => history.push(`/profile/${userInfo.username}`)}/>
        //             </div>
        //             <TextareaAutosize className="ms-2 mt-auto mb-2 text_area" name="text" value={tweet.text} onChange={handleChange} aria-label="empty textarea" placeholder="Tweet your reply" />
        //             <Button className="d-block py-1 px-3 mt-auto ms-auto tweet_btn" style={{height:'34px'}} onClick={() => replyAction({ user_id: userInfo._id, tweet_id: tweet_id, comment: tweet.text })} disabled={(!tweet || !tweet.text) ? true : false}>Reply</Button>
        //         </div>
        //         <hr/>
        //         {
        //             tempData.allComments && tempData.allComments.map((item) => <TweetComments data={item} />)
        //         }
        //     </>
        //
      }
    </div>
  );
}

export default TweetPage;
