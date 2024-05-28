import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
function Home({ type }) {
  const [videos, setVideos] = useState([]);
  // console.log(videos);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/videos/${type}`
        );
        // console.log("response");
        setVideos(response.data); // Assuming response.data contains the videos
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [type]);
  return (
    <Container>
      {videos.map((video) => {
        // console.log(video);
        return <Card key={video?._id} video={video} />;
      })}
    </Container>
  );
}

export default Home;
