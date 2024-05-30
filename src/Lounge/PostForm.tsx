import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

interface PostFormInputs {
  title: string;
  content: string;
  category: string;
  tag: string[];
}

const PostForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<PostFormInputs>();
  const history = useHistory();
  const accessToken = localStorage.getItem("jwtToken");

  const onSubmit = async (data: PostFormInputs) => {
    try {
      const response = await axios.post(
        "https://shallwestudy.store/post",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Post created successfully:", response.data);
      alert("게시글이 성공적으로 생성되었습니다.");
      reset();
      history.push("/"); // 홈 페이지 또는 원하는 페이지로 이동
    } catch (error) {
      console.error("Error creating post:", error);
      alert("게시글 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input {...register("title", { required: true })} />
      </div>
      <div>
        <label>Content</label>
        <textarea {...register("content", { required: true })} />
      </div>
      <div>
        <label>Category</label>
        <input {...register("category", { required: true })} />
      </div>
      <div>
        <label>Tag</label>
        <input {...register("tag", { required: true })} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
