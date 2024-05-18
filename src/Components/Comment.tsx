import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
//댓글 테스트입니다.
interface Post {
  id: number;
  content: string;
  replies: Reply[];
}

interface Reply {
  id: number;
  content: string;
}
interface CommunityProps {
  Comment: string;
}
const Board: React.FC<CommunityProps> = ({ Comment }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");

  const [initialLoad] = useState(true);

  const fetchPosts = async () => {
    const response = await axios.get(`http://localhost:3001/${Comment}`);
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, [initialLoad]);
  //댓글 작성
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPost) return;
    await axios.post(`http://localhost:3001/${Comment}`, {
      content: newPost,
      replies: [],
    });
    setNewPost("");
    fetchPosts();
  };
  // 댓글 삭제
  const handleDeletePost = async (id: number) => {
    await axios.delete(`http://localhost:3001/${Comment}/${id}`);
    fetchPosts();
  };
  //대댓글 삭제
  const handleDeleteReply = async (postId: number, replyId: number) => {
    try {
      const postResponse = await axios.get(
        `http://localhost:3001/${Comment}/${postId}`
      );
      const post = postResponse.data;
      const updatedReplies = post.replies.filter(
        (reply: Reply) => reply.id !== replyId
      );
      post.replies = updatedReplies;

      await axios.put(`http://localhost:3001/${Comment}/${postId}`, post);
      fetchPosts();
    } catch (error) {
      console.error("error:", error);
    }
  };
  //대댓글 작성
  const handleReplySubmit = async (postId: number, content: string) => {
    if (!content) return;
    try {
      const postResponse = await axios.get(
        `http://localhost:3001/${Comment}/${postId}`
      );
      const post = postResponse.data;
      const newReply = {
        id: Date.now(),
        content: content,
      };
      const updatedReplies = [...post.replies, newReply];
      post.replies = updatedReplies;
      await axios.put(`http://localhost:3001/${Comment}/${postId}`, post);
      fetchPosts();
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <BoardContainer>
      <PostsContainer>
        {posts.map((post) => (
          <PostItem key={post.id}>
            {/*//여기가 댓글 내용을 보여주는 곳*/}
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
            {/*대댓글*/}
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
      </PostsContainer>
      {/*여기까지가 댓글과 대댓글 보여주는 컴포넌트*/}

      <InputArea onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="댓글 작성..."
        />
        <SubmitButton type="submit">등록</SubmitButton>
      </InputArea>
      {/*댓글 작성 맨아래 있는거*/}
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
  width: 820px;
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
  //
`;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styled from "styled-components";

// interface Post {
//   id: number;
//   content: string;
//   replies: Reply[];
// }

// interface Reply {
//   id: number;
//   content: string;
// }

// interface CommentProps {
//   postId: string;
// }

// const Comment: React.FC<CommentProps> = ({ postId }) => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [newPost, setNewPost] = useState("");

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/comments/${postId}`
//       );
//       setPosts(response.data);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!newPost) return;
//     try {
//       await axios.post(`http://localhost:3001/comments/${postId}`, {
//         content: newPost,
//         replies: [],
//       });
//       setNewPost("");
//       fetchPosts();
//     } catch (error) {
//       console.error("Error submitting post:", error);
//     }
//   };

//   const handleDeletePost = async (id: number) => {
//     try {
//       await axios.delete(`http://localhost:3001/comments/${postId}/${id}`);
//       fetchPosts();
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   const handleDeleteReply = async (postId: number, replyId: number) => {
//     try {
//       const postResponse = await axios.get(
//         `http://localhost:3001/comments/${postId}`
//       );
//       const post = postResponse.data;
//       const updatedReplies = post.replies.filter(
//         (reply: Reply) => reply.id !== replyId
//       );
//       post.replies = updatedReplies;

//       await axios.put(`http://localhost:3001/comments/${postId}`, post);
//       fetchPosts();
//     } catch (error) {
//       console.error("Error deleting reply:", error);
//     }
//   };

//   const handleReplySubmit = async (postId: number, content: string) => {
//     if (!content) return;
//     try {
//       const postResponse = await axios.get(
//         `http://localhost:3001/comments/${postId}`
//       );
//       const post = postResponse.data;
//       const newReply = {
//         id: Date.now(),
//         content: content,
//       };
//       const updatedReplies = [...post.replies, newReply];
//       post.replies = updatedReplies;
//       await axios.put(`http://localhost:3001/comments/${postId}`, post);
//       fetchPosts();
//     } catch (error) {
//       console.error("Error submitting reply:", error);
//     }
//   };

//   return (
//     <BoardContainer>
//       <PostsContainer>
//         {posts.map((post) => (
//           <PostItem key={post.id}>
//             <PostContentContainer>
//               <PostId>ID: {post.id}</PostId>
//               <PostContent>{post.content}</PostContent>
//               {post.replies.map((reply) => (
//                 <ReplyItem key={reply.id}>
//                   <ReplyId>ID: {reply.id}</ReplyId>
//                   <ReplyContent>- {reply.content}</ReplyContent>
//                   <DeleteButton
//                     onClick={() => handleDeleteReply(post.id, reply.id)}
//                   >
//                     X
//                   </DeleteButton>
//                 </ReplyItem>
//               ))}
//             </PostContentContainer>
//             <ReplyInput
//               onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
//                 e.preventDefault();
//                 const target = e.target as typeof e.target & {
//                   reply: { value: string };
//                 };
//                 handleReplySubmit(post.id, target.reply.value);
//                 target.reply.value = "";
//               }}
//             >
//               <StyledInput
//                 type="text"
//                 name="reply"
//                 placeholder="대댓글 작성..."
//               />
//               <SubmitButton type="submit">등록</SubmitButton>
//             </ReplyInput>
//             <DeleteButton onClick={() => handleDeletePost(post.id)}>
//               X
//             </DeleteButton>
//           </PostItem>
//         ))}
//       </PostsContainer>

//       <InputArea onSubmit={handleSubmit}>
//         <StyledInput
//           type="text"
//           value={newPost}
//           onChange={(e) => setNewPost(e.target.value)}
//           placeholder="댓글 작성..."
//         />
//         <SubmitButton type="submit">등록</SubmitButton>
//       </InputArea>
//     </BoardContainer>
//   );
// };

// export default Comment;

// const BoardContainer = styled.div`
//   margin: 20px;
//   padding: 10px;
// `;

// const PostsContainer = styled.div`
//   margin-bottom: 20px;
// `;

// const PostItem = styled.div`
//   position: relative;
//   width: 820px;
//   text-align: left;
//   background-color: #f2f2f2;
//   margin: 10px 0;
//   padding: 10px;
//   border-radius: 5px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const PostContentContainer = styled.div`
//   position: relative;
// `;

// const PostId = styled.div`
//   font-size: 12px;
//   color: #707070;
//   margin-bottom: 5px;
// `;

// const PostContent = styled.div`
//   font-size: 14px;
//   color: #000;
//   resize: vertical;
// `;

// const DeleteButton = styled.button`
//   position: absolute;
//   top: 5px;
//   right: 5px;
//   background-color: transparent;
//   border: none;
//   color: #707070;
//   cursor: pointer;
//   font-size: 12px;
//   &:hover {
//     color: red;
//   }
// `;

// const ReplyItem = styled.div`
//   font-size: 14px;
//   margin: 10px 0 0 20px;
// `;

// const ReplyId = styled.div`
//   font-size: 12px;
//   color: #707070;
//   margin-bottom: 5px;
// `;

// const ReplyContent = styled.div`
//   font-size: 14px;
//   color: #000;
// `;

// const ReplyInput = styled.form`
//   display: flex;
//   margin-top: 10px;
// `;

// const StyledInput = styled.input`
//   flex: 1;
//   padding: 5px;
//   border-radius: 3px;
//   border: 1px solid #ddd;
//   margin-right: 5px;
//   font-size: 14px;
// `;

// const SubmitButton = styled.button`
//   padding: 5px 10px;
//   border: none;
//   background-color: #007bff;
//   color: white;
//   cursor: pointer;
//   font-size: 14px;
//   border-radius: 3px;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const InputArea = styled.form`
//   display: flex;
//   margin-top: 10px;
// `;
