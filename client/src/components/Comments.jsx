import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useNavigate } from "react-router-dom";
const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  color:${({ theme }) => theme.text};
`;

function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/comments/${videoId}`
        );
        setComments(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [videoId]);

  const handleAddComment = async () => {
    if (!input.trim()) return; // Prevent adding empty comments
    const auth_token = localStorage.getItem("auth_token");
    if (!auth_token) {
      return navigate("/signin");
    }
    try {
      const res = await axios.post(
        `http://localhost:8000/api/comments/`,
        {
          videoId,
          desc: input,
        },
        { headers: { Authorization: auth_token } }
      );
      setComments([res.data, ...comments]); // Add new comment to the list
      setInput(""); // Clear the input field
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} alt="User avatar" />
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a comment..."
        />
        <DoubleArrowIcon
          style={{ color: "#3ea6ff", cursor: "pointer" }}
          onClick={handleAddComment}
        />
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
}

export default Comments;
