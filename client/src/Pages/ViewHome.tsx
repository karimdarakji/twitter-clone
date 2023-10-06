import React, { useEffect, useState, useMemo } from "react";
import { Box, Divider } from "@mui/material";
import Header from "../Components/Header/Header";
import { useUserQuery } from "../redux/user";
import CustomAlert from "../Components/Alert";
import TweetBox from "../Components/TweetBox/TweetBox";

const Home = () => {
  const { data: user, isLoading, isError } = useUserQuery();

  if(isLoading || !user) {
    return <p>Loading</p>
  }
  if(isError) {
    return <CustomAlert severity="error">Something went wrong.</CustomAlert>
  }
  // const userInfo = getLocalStorage("ui");

  // console.log(userInfo);

  // /* dispatch */
  // const dispatch = useDispatch();
  // /* get history */
  // const { history } = props;

  // /* states */
  // const [tweet, setTweet] = useState({
  //   text: "",
  // });

  // /* on change */
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setTweet({ ...tweet, [name]: value });
  // };

  // /* tweet button function */
  // const tweetAction = () => {
  //   setTweet({ text: "" });
  //   dispatch(createTweet({ user_id: userInfo._id, text: tweet.text, history }));
  // };

  // useEffect(() => {
  //   dispatch(gettweets({ user_id: userInfo._id }));
  // }, []);

  // /* dispatch(gettweets({ user_id: userInfo.id })) */
  // const alltweets = useSelector((state) =>
  //   state.tweet ? state.tweet.tweets : ""
  // );

  // /* get all tweets function */
  // const getalltweets = useMemo(() => {
  //   return alltweets;
  // }, [alltweets]);

  return (
    <Box width={"50%"}>
      <Header title="Home" />
      <TweetBox user={user} />
      <Divider />
      {/* <div className="tweet-box">
        <div className="d-flex">
          <img
            className="profile-image mb-auto"
            src={`http://localhost:5000/${userInfo.picture}`}
            alt="profile"
          />
          <TextareaAutosize
            className="ms-2 mt-2 text_area"
            name="text"
            value={tweet.text}
            onChange={handleChange}
            aria-label="empty textarea"
            placeholder="What's Happening"
          />
        </div>
        <div className="image-tweet">
          <div className="d-flex tweet-options">
            <img width="20" height="20" src={image} alt="upload" />
            <img width="20" height="20" src={gif} alt="upload gif" />
            <img width="20" height="20" src={poll} alt="upload poll" />
            <img width="20" height="20" src={emoji} alt="upload emoji" />
          </div>
          <Button
            className="d-block py-1 px-3 ms-auto tweet_btn"
            onClick={tweetAction}
            disabled={!tweet || !tweet.text ? true : false}
          >
            Tweet
          </Button>
        </div>
      </div>

      <div>
        {getalltweets &&
          getalltweets.map((item) => {
            return <Tweets key={item._id} data={item} history={history} />;
          })}
      </div> */}
    </Box>
  );
}

export default Home;
