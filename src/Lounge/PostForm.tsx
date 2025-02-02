import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tag: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    category: "",
    tag: "",
  });
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("jwtToken");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/Posts",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Post created successfully:", response.data);
      navigate("/posts"); // 게시글 목록 페이지로 이동
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        {errors.title && <span>This field is required</span>}
      </div>
      <div>
        <label>Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
        />
        {errors.content && <span>This field is required</span>}
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        />
        {errors.category && <span>This field is required</span>}
      </div>
      <div>
        <label>Tag</label>
        <input
          type="text"
          name="tag"
          value={formData.tag}
          onChange={handleInputChange}
        />
        {errors.tag && <span>This field is required</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
