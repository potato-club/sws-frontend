import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

function LWriting() {
  // 상태 변수 생성
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 입력 핸들러
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3001/Lboard`, {
        title,
        content,
      });
      alert("글이 성공적으로 등록되었습니다.");
      // 상태 초기화
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("글 등록에 실패했습니다.", error);
    }
  };

  return (
    <Write>
      <Writein onSubmit={handleSubmit}>
        <h1>작성 페이지</h1>
        <Writeindiv>
          <Dii>제목</Dii>
          <Writeinput
            placeholder="제목을 입력하세요"
            value={title}
            onChange={handleTitleChange}
          />
        </Writeindiv>
        <Writeindiv>
          <Dii>내용</Dii>
          <Writetextarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={handleContentChange}
          />
        </Writeindiv>
        <Writeindiv>
          <Writebottom>
            <button type="button">파일선택</button>
            선택된 파일이 없음
          </Writebottom>
          <Writebtn type="submit">등록</Writebtn>
        </Writeindiv>
      </Writein>
    </Write>
  );
}

export default LWriting;
const Writebtn = styled.button`
  background-color: orange;
  width: 60px;
  height: 30px;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #ff5e00;
  }
`;
const Writebottom = styled.div`
  margin-left: 40px;
`;
const Dii = styled.div`
  width: 40px;
  margin-top: 5px;
`;
const Writetextarea = styled.textarea`
  width: 100%;
  height: 350px;
  border-radius: 15px;
  padding: 10px;
`;
const Writeinput = styled.input`
  padding-left: 10px;
  width: 100%;
  height: 30px;
  border-radius: 15px;
`;
const Writeindiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Write = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;
const Writein = styled.form`
  width: 650px;
  height: 650px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px gray;
  padding: 50px;
  display: flex;
  flex-direction: column;
`;
