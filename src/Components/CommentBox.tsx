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

const Board: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [initialLoad] = useState(true);

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:3001/Posts");
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, [initialLoad]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPost) return;
    await axios.post("http://localhost:3001/Posts", {
      content: newPost,
      replies: [],
    });
    setNewPost("");
    fetchPosts();
  };

  const handleDeletePost = async (id: number) => {
    await axios.delete(`http://localhost:3001/Posts/${id}`);
    fetchPosts();
  };

  const handleDeleteReply = async (postId: number, replyId: number) => {
    try {
        const postResponse = await axios.get(`http://localhost:3001/Posts/${postId}`);
        const post = postResponse.data;
        const updatedReplies = post.replies.filter((reply:Reply) => reply.id !== replyId);
        post.replies = updatedReplies;

        await axios.put(`http://localhost:3001/Posts/${postId}`, post);
        fetchPosts();
    } catch (error) {
        console.error("error:", error);
    }
};

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const handleReplySubmit = async (postId: number, content: string) => {
    if(!content) return;
    try {
      const postResponse = await axios.get(
        `http://localhost:3001/Posts/${postId}`
      );
      const post = postResponse.data;
      const newReply = {
        id: Date.now(),
        content: content
      };
      const updatedReplies = [...post.replies, newReply];
      post.replies = updatedReplies;
      await axios.put(`http://localhost:3001/Posts/${postId}`, post);
      fetchPosts();
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <BoardContainer>
      <PostsContainer>
        {posts.slice(0, visibleCount).map((post) => (
          <PostItem key={post.id}>
            <PostContentContainer>
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
            </PostContentContainer>
            <ReplyInput
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const target = e.target as typeof e.target & {
                  reply: { value: string };
                };
                handleReplySubmit(post.id, target.reply.value);
                target.reply.value="";
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
      </PostsContainer>
      {posts.length > visibleCount && (
        <ShowMoreButton onClick={handleShowMore}>더 보기</ShowMoreButton>
      )}
      <InputArea onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="댓글 작성..."
        />
        <SubmitButton type="submit">댓글 등록</SubmitButton>
      </InputArea>
    </BoardContainer>
  );
};

export default Board;

const BoardContainer = styled.div`
  margin: 20px;
  padding: 10px;
`;

const PostsContainer = styled.div`
  margin-bottom: 20px;
`;

const PostItem = styled.div`
  position: relative;
  width: 450px;
  text-align: left;
  background-color: #f2f2f2;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PostContentContainer = styled.div`
  position: relative;
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
  padding-left: 10px;
`;

const ReplyInput = styled.form`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const InputArea = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const StyledInput = styled.input`
  border: none;
  width: 450px;
  height: 30px;
  resize: vertical;
`;

const ShowMoreButton = styled.button`
  background-color: #3498db;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #2980b9;
  }
`;

const ReplyId = styled.div`
  font-size: 12px;
  color: #707070;
  margin-bottom: 5px;
`;
