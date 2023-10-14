import React, { useState } from "react";
import moment from "moment";
import {
  IoHeartOutline,
  IoHeart,
  IoChatbubbleOutline,
  IoRepeatOutline,
  IoPushOutline,
} from "react-icons/io5";
import { useDispatch } from "react-redux";

//import { liketweet } from "../../redux/actions";

import CommentModal from "../Modals/CommentModal";

function Tweets() {
  // const userInfo = getLocalStorage('ui')

  // const dispatch = useDispatch()

  // const { data, history } = props

  // const [isLiked, setIsLiked] = useState(data.is_liked)

  // const [likeCount, setLikeCount] = useState(data.likes)
  // const [commentCount, setCommentCount] = useState(data.comments)

  // const [commentDetail, setCommentDetail] = useState({
  //     show: false,
  //     id:'',
  //     name: '',
  //     username: '',
  //     date: '',
  //     tweet: '',
  // })

  // const startDate = moment(data.createdAt);
  // const timeEnd = moment();
  // const diff = timeEnd.diff(startDate);
  // const diffDuration = moment.duration(diff);

  // const like_tweet = (tweet_id, user_id) => {

  //     // reduce number of comments by 1
  //     if(isLiked)
  //     setLikeCount(likeCount - 1)
  //     else setLikeCount(likeCount + 1)

  //     // remove like
  //     setIsLiked(!isLiked)

  //     // remove like from database
  //     dispatch(liketweet( tweet_id, user_id ))
  // }

  return (
    <>
      {/* <div className="tweet_div" onClick={() => {history.push(`/${data.user.username}/tweet/${data._id}`)} }>
            <div className="p-3">
                <div className="d-flex">
                    <div className="text-center" style={{width:'10%'}}>
                        <img className="profile-image" src={`http://localhost:5000/` + userInfo.picture} alt="user profile" onClick={() => history.push(`/profile/${data.user.username}`)}/>
                    </div>
                    <div className="ms-2" >
                        <div className="d-flex">
                            <div className="fw-bold">{ data.user.name }</div>
                            <div className="username" style={{marginLeft:'3px'}}>@{ data.user.username } · { 
                            parseInt(diffDuration.months()) > 0 ?
                            moment(startDate).format('MMM D')
                            : parseInt(diffDuration.days()) > 0 ?
                            diffDuration.days() + ' days ago'
                            : parseInt(diffDuration.hours()) > 0 ?
                            diffDuration.hours() + ' hours ago'
                            : diffDuration.minutes() + ' min ago' 
                            }
                            </div>
                        </div>
                        <div className="mb-2">{ data.text ? data.text : data.comment }</div>
                        <div className="d-flex mb-2 justify-content-between tweet_options_icons--p">
                            <div className="d-flex">
                                <IoChatbubbleOutline className="mt-auto me-2" style={{marginBottom:'2px', color: 'grey', pointerEvents:'auto'}} onClick={(e) => {e.stopPropagation(); setCommentDetail({
                                    show: true,
                                    id: data._id,
                                    name: data.user.name,
                                    username: data.user.username,
                                    date: moment(startDate).format('MMM D'),
                                    tweet: data.text
                                })}} />
                                <div className="mt-auto" style={{fontSize: '14px', color:'grey'}}>{commentCount}</div>
                            </div>

                            <div>
                                <IoRepeatOutline style={{ color: 'grey' }} />
                            </div>

                            <div className="d-flex">
                                <div className="me-2" onClick={(e) => {e.stopPropagation(); like_tweet({ tweet_id: data._id, user_id: data.user._id }) } }>
                                    { isLiked ?
                                    <IoHeart style={{color:'red'}} />
                                    :
                                    <IoHeartOutline style={{color:'red'}} />
                                    }
                                </div>
                                <div className="mt-auto" style={{fontSize: '14px', color:'grey'}}>{likeCount}</div>
                            </div>

                            <div>
                                <IoPushOutline style={{ color: 'grey' }} />
                            </div>

                        </div>
                    </div>
                
                </div>
            </div>
        </div>

        
        <CommentModal
        show={commentDetail.show}
        tweetId={commentDetail.id}
        tweetName={commentDetail.name}
        tweetUsername={commentDetail.username}
        tweetDate={commentDetail.date}
        tweet={commentDetail.tweet}
        onHide={() => setCommentDetail({ ...commentDetail, show: !commentDetail.show })}
        changeCommentCount={ () => setCommentCount(commentCount + 1)}
        history={history}
        /> */}
    </>
  );
}

export default Tweets;
