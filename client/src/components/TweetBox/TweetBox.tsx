import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Avatar,
  Stack,
  TextField,
  IconButton,
  Hidden,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RiFileGifLine, RiImage2Line } from "react-icons/ri";
import "./TweetBox.scss";
import CustomButton from "../CustomButton";
import { useTweetMutation } from "../../redux/tweet";
import { IoCloseCircleOutline } from "react-icons/io5";
import CustomAlert from "../Alert";

interface ITweetBox {
  user: IUser;
}

interface MediaFile {
  file: File;
  url: string;
  type: string;
}

const TweetBox = ({ user }: ITweetBox) => {
  const navigate = useNavigate();
  const [tweetContent, setTweetContent] = useState({ text: "" });
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tweetMutation, { error, isLoading, isSuccess }] = useTweetMutation();

  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || mediaFiles.length === 2) return;

    const newFiles = Array.from(e.target.files)
      .filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("video/")
      )
      .map((file) => ({
        file,
        url: URL.createObjectURL(file),
        type: file.type.startsWith("image/") ? "image" : "video",
      }));

    setMediaFiles((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setMediaFiles((prev) => {
      const updatedFiles = prev.filter((_, idx) => idx !== index);
      URL.revokeObjectURL(prev[index].url); // Clean up the revoked URL
      return updatedFiles;
    });
  };

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
    formData.append("text", tweetContent.text);

    // Append media files to the form data
    mediaFiles.forEach((mediaFile) => {
      // You could add conditions here based on the media type if needed
      switch (mediaFile.type) {
        case "image":
          formData.append("images", mediaFile.file);
          break;
        case "video":
          formData.append("videos", mediaFile.file);
          break;
        default:
          break;
      }
    });

    // Here, call the function to send the request, passing in the prepared form data
    await tweetMutation(formData);
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setMediaFiles([]);
      setTweetContent({ text: "" });
    }
  }, [isSuccess, isLoading]);

  return (
    <>
      {(error || error?.data?.message) && (
        <CustomAlert id={`error-${Date.now()}`} severity="error">
          {error?.data?.message || error}
        </CustomAlert>
      )}
      {isSuccess && (
        <CustomAlert id={`success-${Date.now()}`} severity="success">
          Your tweet has been saved!
        </CustomAlert>
      )}
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
          <Box className="media-preview">
            {mediaFiles.map((preview, index) => (
              <Grid
                key={`preview-${preview.type}-${index}`}
                className="media-item"
              >
                {preview.type === "image" ? (
                  <img
                    src={preview.url}
                    style={{ objectFit: "contain" }}
                    alt="preview"
                    width="200"
                    height="200"
                  />
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
              </Grid>
            ))}
          </Box>
          <br />
          <Box display={"flex"}>
            <input
              type="file"
              accept="video/*,image/*"
              multiple
              onChange={handleFilesSelect}
              ref={fileInputRef}
              hidden
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
    </>
  );
};

export default TweetBox;
