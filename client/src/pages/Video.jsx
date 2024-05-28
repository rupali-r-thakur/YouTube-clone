import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReplyIcon from "@mui/icons-material/Reply";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Comments from "../components/Comments";
// import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchSuccess } from "../dedux/videoSlice";
import { format } from "timeago.js";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import Recommendation from "../components/Recommendation";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div`
  flex: 5;
`;
const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const Description = styled.p`
  font-size: 14px;
`;
const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

function Video() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  const { currentVideo } = useSelector((state) => state.video);
  console.log(currentVideo);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});
  const fetchData = async () => {
    try {
      const videoRes = await axios.get(
        `http://localhost:8000/api/videos/find/${path}`
      );
      const channelRes = await axios.get(
        `http://localhost:8000/api/users/find/${videoRes.data.userId}`
      );

      setChannel(channelRes.data);
      dispatch(fetchSuccess(videoRes.data));
    } catch (error) {}
  };

  const handleLike = async () => {
    const auth_token = localStorage.getItem("auth_token");
    if (!auth_token) {
      return navigate("/signin");
    }
    await axios.put(
      `http://localhost:8000/api/users/like/${currentVideo._id}`,
      {},
      { headers: { Authorization: auth_token } }
    );
    // dispatch(like(currentUser._id))
    fetchData();
  };
  const handleDisLike = async () => {
    const auth_token = localStorage.getItem("auth_token");
    if (!auth_token) {
      return navigate("/signin");
    }
    await axios.put(
      `http://localhost:8000/api/users/dislike/${currentVideo._id}`,
      {},
      { headers: { Authorization: auth_token } }
    );
    // dispatch(dislike(currentUser._id))
    fetchData();
  };

  const handleSub = async () => {
    const auth_token = localStorage.getItem("auth_token");
    if (!auth_token) {
      return navigate("/signin");
    }
    channel?.subscribedUsers?.includes(currentUser?._id)
      ? await axios.put(
          `http://localhost:8000/api/users/unsub/${channel?._id}`,
          {},
          { headers: { Authorization: auth_token } }
        )
      : await axios.put(
          `http://localhost:8000/api/users/sub/${channel?._id}`,
          {},
          { headers: { Authorization: auth_token } }
        );

    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, [path, dispatch]);

  return (
    <Container>
      <Content>
        <VideoWrapper>
          {/* <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg"
            alt="tree"
            width="100%"
            height="420"
          /> */}
          <video
            src={currentVideo?.videoUrl}
            width="750"
            height="340"
            controls
            loop
          ></video>
          {/* <VideoFrame src={currentVideo?.videoUrl} controls/> */}
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views . {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOffAltIcon />
              )}
              {currentVideo?.likes?.length-1}
            </Button>
            <Button onClick={handleDisLike}>
              {currentVideo?.disLikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltIcon />
              )}
              Dislike
            </Button>
            <Button>
              <ReplyIcon /> Share
            </Button>
            <Button>
              <BookmarkAddIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>
                {channel?.subscribers} subscribers
              </ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {" "}
            {channel?.subscribedUsers?.includes(currentUser?._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
}

export default Video;
