import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;
const Imagevideo = styled.video`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;
const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;
const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;
const Texts = styled.div``;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
const Sub = styled.sup`
  font-weight: 900;
`;
function Card({ type, video }) {
  console.log(video);
  // console.log(video.userId);
  const [channel, setChannel] = useState({});
  console.log(channel);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/find/${video.userId}`
        );
        // console.log("response");
        setChannel(response.data); // Assuming response.data contains the videos
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchChannel();
  }, [video.userId]);
  return (
    <Link to={`/video/${video?._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        {/* <video src={currentVideo?.videoUrl}  width="750" height="340" controls></video> */}
        {video.imgUrl ? (
          <Image type={type} src={video.imgUrl}></Image>
        ) : (
          <Imagevideo type={type} src={video.videoUrl}></Imagevideo>
        )}

        <Details type={type}>
          <ChannelImage type={type} src={channel?.img} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel?.name}</ChannelName>
            <Info>
              {video.views} views <Sub>.</Sub> {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default Card;
