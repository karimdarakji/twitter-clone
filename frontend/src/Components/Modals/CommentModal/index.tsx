import React, { useState } from "react";
import { useDispatch } from "react-redux";


import "./CommentModal.css";

import image from "../../../public/image.svg";
import gif from "../../../public/gif.svg";
import poll from "../../../public/poll.svg";
import emoji from "../../../public/happy.svg";
//import { commenttweet } from "../../../redux/actions";

export default function CommentModal() {
  // const {show, tweetId, tweetName, tweetUsername, tweetDate, tweet, onHide, history, changeCommentCount} = props

  // const UserInfo = getLocalStorage('ui')

  // /* states */
  // const [tweetInfo, setTweetInfo] = useState({
  //     text:''
  // })

  // /* on change */
  // const handleChange = (e) => {
  //     const { name, value } = e.target
  //     setTweetInfo({...tweetInfo, [name]: value})

  // }

  // const dispatch = useDispatch()

  // const add_comment = (values) => {
  //     dispatch(commenttweet(values))
  //     setTweetInfo({ text: '' })
  //     changeCommentCount()
  //     onHide()

  // }

  return (
    <>
      {/* <Modal
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header>
                <Modal.Title style={{textAlign:'center', width:'100%'}}>
                    <div className="d-flex">
                        
                        <div style={{cursor:'pointer'}} onClick={() => onHide()}>X</div>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{padding:'2%'}}>
            <div>
                <div className="d-flex">
                    <div >
                        <img className="profile-image" src={`http://localhost:5000/` + getLocalStorage('ui').picture} alt="user pic" />
                        <div className="vertical_line" />
                    </div>

                    <div className="col-9">
                        <div className="d-flex">
                            <div style={{fontWeight: 'bold', textTransform: 'capitalize',marginRight:'10px'}}>{tweetName}</div>
                            <div style={{fontSize: '16px', color: 'grey'}}>@{tweetUsername}</div>
                            <div style={{color: 'grey'}}>&nbsp;· {tweetDate}</div>

                        </div>
                        <div style={{minHeight:'50px'}}>{tweet}</div>
                        <div className="mb-4" style={{color: 'grey', fontSize: '14px'}}>Replying to <span style={{color: '#1A8CD8', cursor:'pointer'}} onClick={() => history.push('/profile/' + tweetUsername)}>@{tweetUsername}</span></div>
                    </div>
                </div>

                <div className="d-flex">
                <img className="profile-image mb-auto" src={`http://localhost:5000/` + UserInfo.picture} alt="profile pic" />
                
                <TextareaAutosize className="ml-2 mt-2 text_area" minRows="4" name="text" value={tweetInfo.text} onChange={handleChange} aria-label="empty textarea" placeholder="Tweet Your Reply" />
                </div>

                <div className="image-tweet">
                    <div className="d-flex tweet-options ml-3">
                        <img width="20" height="20" src={image} alt="upload img" />
                        <img width="20" height="20" src={gif} alt="upload gif" />
                        <img width="20" height="20" src={poll} alt="upload poll" />
                        <img width="20" height="20" src={emoji} alt="upload emoji" />
                    </div>
                    <Button className="d-block py-1 px-3 ml-auto tweet_btn" onClick={() => add_comment({ user_id: UserInfo._id, tweet_id: tweetId, comment: tweetInfo.text }) } disabled={(!tweetInfo || !tweetInfo.text) ? true : false}>Tweet</Button>

                </div>
            </div>
               
            </Modal.Body>

            
        </Modal> */}
    </>
  );
}
