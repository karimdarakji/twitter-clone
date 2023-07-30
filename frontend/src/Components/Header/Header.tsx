import { useNavigate } from "react-router-dom";

import "./Header.scss";
import { Stack, Typography, IconButton } from "@mui/material";
import { RiArrowLeftLine } from "react-icons/ri";

interface IHeader {
  title: string;
  username?: string;
  tweets?: number;
  back?: boolean;
}

export default function Header({ title, username, tweets, back = false }: IHeader) {
  const navigate = useNavigate();

  return (
    <Stack
    display={"flex"}
    direction={"row"}
    spacing={1}
    paddingY={".4rem"}
    paddingX={"1rem"}
  >
      {
        back && <IconButton sx={{ height: "3rem", width: "3rem" }} onClick={() => navigate(-1)}><RiArrowLeftLine /></IconButton>
      }
      <Stack>
        <Typography variant="h6" fontWeight={"bold"}>{title}</Typography>
        {
          username && <Typography component="span" fontSize={14}>@{username}</Typography>
        }
        {
          tweets?.toString() && <Typography>{tweets} Tweets</Typography>
        }
      </Stack>
    </Stack>
  )
}
