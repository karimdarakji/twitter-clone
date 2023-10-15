import React, { useRef, useState } from "react";
import {
  Box,
  Avatar,
  Stack,
  TextField,
  IconButton,
  Hidden,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RiFileGifLine, RiImage2Line } from "react-icons/ri";
import "./TweetBox.scss";
import CustomButton from "../CustomButton";
import { useTweetMutation } from "../../redux/tweet";
import { IoCloseCircleOutline } from "react-icons/io5";

interface ITweetBox {
  user: IUser;
}

type Preview = {
  url: string;
  type: "image" | "video";
};

const TweetBox = ({ user }: ITweetBox) => {
  const navigate = useNavigate();
  const [tweetContent, setTweetContent] = useState<{
    text: string;
    images: File[];
    videos: File[];
    gifs: File[];
  }>({
    text: "",
    images: [],
    videos: [],
    gifs: [],
  });

  const [previews, setPreviews] = useState<Preview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const images: File[] = [];
      const videos: File[] = [];
      const newPreviews: Preview[] = [];

      Array.from(e.target.files).forEach((file) => {
        const blobUrl = URL.createObjectURL(file);

        if (file.type.startsWith("image/")) {
          images.push(file);
          newPreviews.push({ url: blobUrl, type: "image" });
        } else if (file.type.startsWith("video/")) {
          videos.push(file);
          newPreviews.push({ url: blobUrl, type: "video" });
        }
      });

      setPreviews((prev) => [...prev, ...newPreviews]);

      setTweetContent((content) => ({
        ...content,
        images: [...content.images, ...images],
        videos: [...content.videos, ...videos],
      }));
    }
  };

  const removeFile = (index: number) => {
    const fileToRemove = previews[index];
    // Revoke the blob URL
    URL.revokeObjectURL(fileToRemove.url);
    setPreviews((prev) => prev.filter((_, idx) => idx !== index));

    setTweetContent((content) => ({
      ...content,
      images:
        fileToRemove.type === "image"
          ? content.images.filter((_, idx) => idx !== index)
          : content.images,
      videos:
        fileToRemove.type === "video"
          ? content.videos.filter((_, idx) => idx !== index)
          : content.videos,
    }));
  };

  const [tweetMutation, { error, isLoading }] = useTweetMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;
    const lines = inputValue.split("\n");

    // Check the number of lines and update the value accordingly
    if (lines.length <= 6) {
      setTweetContent((content) => ({ ...content, text: inputValue }));
    }
  };

  const tweet = async () => {
    const formData = new FormData();
    formData.append("text", tweetContent.text as string);

    tweetContent.images.forEach((img) => formData.append("images", img));
    tweetContent.videos.forEach((vid) => formData.append("videos", vid));
    await tweetMutation(formData);
  };

  return (
    <Box className={"tweetBox"}>
      <Avatar
        sx={{ marginRight: ".5rem", cursor: "pointer" }}
        src={user.image}
        onClick={() => navigate(`/${user.username}`)}
      />
      <Stack justifyContent={"center"} width={"80%"}>
        <TextField
          className="input"
          placeholder="What's happening?!"
          variant="standard"
          multiline
          value={tweetContent.text}
          maxRows={6}
          inputProps={{ maxLength: 200 }}
          onChange={handleChange}
        />
        <div className="media-preview">
          {previews.map((preview, index) => (
            <div key={index} className="media-item">
              {preview.type === "image" ? (
                <img src={preview.url} alt="preview" width="100" height="100" />
              ) : (
                <video width="200" height="200" controls>
                  <source src={preview.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <IconButton
                className="remove-button"
                onClick={() => removeFile(index)}
              >
                <IoCloseCircleOutline />
              </IconButton>
            </div>
          ))}
        </div>
        <br />
        <Box display={"flex"}>
          <input
            type="file"
            accept="video/*,image/*"
            multiple
            onChange={handleFilesSelect}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <IconButton onClick={() => fileInputRef.current?.click()}>
            <RiImage2Line />
          </IconButton>
          <IconButton>
            <RiFileGifLine />
          </IconButton>
          <CustomButton
            width={"5rem"}
            sx={{ padding: 0, marginLeft: "auto" }}
            disabled={!tweetContent.text || isLoading}
            onClick={tweet}
          >
            Tweet
          </CustomButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default TweetBox;
