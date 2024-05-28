import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;
function Recommendation({ tags }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/videos/tags?tags=${tags}`
      );
      console.log(res.data);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);
  return (
    <Container>
      {videos.map((video) => {
        return <Card type="sm" key={video?._id} video={video} />;
      })}
      {/* {videos.map((video)=>{
            console.log(video);
            <Card type="sm" key={video?._id} video={video}/>
        })} */}
    </Container>
  );
}

export default Recommendation;
