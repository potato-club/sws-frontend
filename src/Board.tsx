import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface Post {
    id: number;
    content: string;
  }

const Board:React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState("");
    const [visibleCount, setVisibleCount] = useState(5);
    const [initialLoad] = useState(true);

    const fetchPosts = async () => {
        const response = await axios.get('http://localhost:3001/Posts');
        setPosts(response.data);
    };

    useEffect(() => {
        fetchPosts();
    }, [initialLoad]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newPost) return;
        await axios.post('http://localhost:3001/Posts', { content: newPost });
        setNewPost("");
        fetchPosts(); 
    };

    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:3001/Posts/${id}`);
        fetchPosts();
      };


      const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 5);
    };

      
    return (
        <BoardContainer>
        <PostsContainer>
        {posts.slice(0, visibleCount).map((post) => (
                 <PostItem key={post.id}>
                 <PostId>ID: {post.id}</PostId>
                 <PostContent>{post.content}</PostContent>
                 <DeleteButton onClick={() => handleDelete(post.id)}>X</DeleteButton>
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
                placeholder='댓글 작성...'
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
    width:450px;
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
  top: 0;
  right: 0;
  border: none;
  background-color: transparent;
  color: #707070;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const InputArea = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const SubmitButton = styled.button`
    background-color: #4CAF50;
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