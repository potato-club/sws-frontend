import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

interface Post {
  id: number;
  content: string;
  replies: Reply[];
}

interface Reply {
  id: number;
  content: string;
}

interface CommentProps {
  postId: number;
  commentEndpoint: string;
}

const Comment: React.FC<CommentProps> = ({ postId, commentEndpoint }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/${commentEndpoint}?postId=${postId}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (!isNaN(postId)) {
      fetchPosts();
    } else {
      console.error("Invalid postId:", postId);
    }
  }, [postId, commentEndpoint]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPost) return;

    try {
      await axios.post(`http://localhost:3001/${commentEndpoint}`, {
        content: newPost,
        replies: [],
        postId: postId,
      });
      setNewPost("");
      fetchPosts();
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  //댓글 삭제
  const handleDeletePost = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/${commentEndpoint}/${id}`);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  //대댓글 삭제
  const handleDeleteReply = async (postId: number, replyId: number) => {
    try {
      const postResponse = await axios.get(
        `http://localhost:3001/${commentEndpoint}/${postId}`
      );
      const post = postResponse.data;
      const updatedReplies = post.replies.filter(
        (reply: Reply) => reply.id !== replyId
      );
      post.replies = updatedReplies;

      await axios.put(
        `http://localhost:3001/${commentEndpoint}/${postId}`,
        post
      );
      fetchPosts();
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  //대댓글 작성
  const handleReplySubmit = async (postId: number, content: string) => {
    if (!content) return;
    try {
      const postResponse = await axios.get(
        `http://localhost:3001/${commentEndpoint}/${postId}`
      );
      const post = postResponse.data;
      const newReply = {
        id: Date.now(),
        content: content,
      };
      const updatedReplies = [...post.replies, newReply];
      post.replies = updatedReplies;

      await axios.put(
        `http://localhost:3001/${commentEndpoint}/${postId}`,
        post
      );
      fetchPosts();
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const [nickname, setNickname] = useState("");

  const accessToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (accessToken) {
      axios
        .get("http://localhost:3001/MyPage", {
          //https://shallwestudy.store/client/myPage
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setNickname(String(response.data.nickname));
        })
        .catch((error) => {
          console.error("Error fetching nickname:", error);
        });
    } else {
      console.error("Access token is missing");
    }
  }, [accessToken]);

  return (
    <BoardContainer>
      {posts.map((post) => (
        <PostItem key={post.id}>
          <PostId>ID: {post.id}</PostId>
          <PostContent>{post.content}</PostContent>
          {post.replies.map((reply) => (
            <ReplyItem key={reply.id}>
              <ReplyId>ID: {reply.id}</ReplyId>
              <ReplyContent>- {reply.content}</ReplyContent>
              <DeleteButton
                onClick={() => handleDeleteReply(post.id, reply.id)}
              >
                X
              </DeleteButton>
            </ReplyItem>
          ))}
          <ReplyInput
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const target = e.target as typeof e.target & {
                reply: { value: string };
              };
              handleReplySubmit(post.id, target.reply.value);
              target.reply.value = "";
            }}
          >
            <StyledInput
              type="text"
              name="reply"
              placeholder="대댓글 작성..."
            />
            <SubmitButton type="submit">등록</SubmitButton>
          </ReplyInput>
          <DeleteButton onClick={() => handleDeletePost(post.id)}>
            X
          </DeleteButton>
        </PostItem>
      ))}
      <InputArea onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="댓글 작성..."
        />
        <SubmitButton type="submit">등록</SubmitButton>
      </InputArea>
    </BoardContainer>
  );
};

export default Comment;

const BoardContainer = styled.div`
  margin: 30px;
`;

const PostItem = styled.div`
  position: relative;
  width: 825px;
  text-align: left;
  background-color: #f2f2f2;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PostId = styled.div`
  font-size: 12px;
  color: #707070;
  margin-bottom: 5px;
`;

const PostContent = styled.div`
  font-size: 14px;
  color: #000;
  resize: vertical;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  color: #707070;
  cursor: pointer;
`;

const ReplyItem = styled.div`
  position: relative;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const ReplyContent = styled.div`
  font-size: 14px;
  color: #555;
`;

const ReplyInput = styled.form`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const InputArea = styled.form`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  width: 100px;
  padding: 7px 18px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 4px 4px 16px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const StyledInput = styled.input`
  border: none;
  width: 720px;
  height: 30px;
`;

const ReplyId = styled.div`
  font-size: 12px;
  color: #707070;
  margin-bottom: 5px;
`;
