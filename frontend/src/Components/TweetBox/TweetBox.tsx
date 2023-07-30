import React, { useState } from "react";
import { Box, Avatar, Stack, TextField, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RiFileGifLine, RiImage2Line } from "react-icons/ri";
import "./TweetBox.scss";
import CustomButton from "../CustomButton";

interface ITweetBox {
  user: IUser;
}

const TweetBox = ({ user }: ITweetBox) => {
    const navigate = useNavigate();
    const [tweet, setTweet] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTweet(e.target.value)
    }
  return (
    <Box className={"tweetBox"}>
      <Avatar sx={{ marginRight: ".5rem", cursor: "pointer" }} src={user.image ?? "/default.png"} onClick={() => navigate(`/${user.username}`)} />
      <Stack justifyContent={"center"} width={"80%"}>
        <TextField className="input" placeholder="What's happening?!" variant="standard" multiline inputProps={{ maxLength: 400 }} onChange={(e) => handleChange(e)} />
        <br />
        <Box display={"flex"} >
            <IconButton>
            <RiImage2Line />
            </IconButton>
            <IconButton>
                <RiFileGifLine />
            </IconButton>
            <CustomButton width={"5rem"} sx={{padding: 0, marginLeft: "auto"}} disabled={!tweet}>Tweet</CustomButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default TweetBox;
