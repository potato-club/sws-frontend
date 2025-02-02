import React, { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
  userName: string;
  categoryName: string;
  views: number;
  likeNums: number;
  createdAt: string;
  updatedAt: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/Posts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [accessToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>By: {post.userName}</p>
            <p>Category: {post.categoryName}</p>
            <p>Views: {post.views}</p>
            <p>Likes: {post.likeNums}</p>
            <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(post.updatedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
