import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ImArrowLeft } from "react-icons/im";
interface LWritingProps {
  apiEndpoint: string;
}
const LWriting: React.FC<LWritingProps> = ({ apiEndpoint }) => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [hash, setHash] = useState("");

  const [imageSrcs, setImageSrcs] = useState<(string | ArrayBuffer | null)[]>(
    []
  );

  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };
  const handlehashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHash(e.target.value);
  };

  const Change = () => {
    navigate(-1);
  };
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const fileReaders: FileReader[] = [];
    const filePromises: Promise<void>[] = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        fileReaders.push(reader);

        const filePromise = new Promise<void>((resolve) => {
          reader.onload = () => {
            setImageSrcs((prevSrcs) => [...prevSrcs, reader.result]);
            resolve();
          };
        });

        filePromises.push(filePromise);
        reader.readAsDataURL(file);
      }

      Promise.all(filePromises).then(() => {
        console.log("All files read");
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3001/${apiEndpoint}`, {
        title,
        contents,
        hash,
        name: "익명",
        like: 0,
        imageSrcs,
      });
      alert("글이 성공적으로 등록되었습니다.");
      navigate(`/${apiEndpoint}`);
      setImageSrcs([]);
      setTitle("");
      setContents("");
      setHash("");
    } catch (error) {
      console.error("글 등록에 실패했습니다.", error);
    }
  };

  return (
    <Write>
      <Writein onSubmit={handleSubmit}>
        <Wr>
          <ImArrowLeft onClick={Change} style={{ fontSize: "20px" }} />
          <h1>작성 페이지</h1>
        </Wr>

        <Writeindiv>
          <Dii>제목</Dii>

          <Writeinput
            placeholder="제목을 입력하세요"
            value={title}
            onChange={handleTitleChange}
          />
        </Writeindiv>

        <Writemid>
          <span>hash tag</span>

          <Writeinput2
            placeholder="해시태그을 입력하세요"
            value={hash}
            onChange={handlehashChange}
          />
        </Writemid>
        <Writeindiv>
          <Dii>내용</Dii>
          <Writetextarea
            placeholder="내용을 입력하세요"
            value={contents}
            onChange={handleContentChange}
          />
        </Writeindiv>
        <Writeindiv>
          <Writebottom>
            <input
              accept="image/*"
              multiple
              type="file"
              onChange={(e) => onUpload(e)}
            />
            <Wimgs>
              {imageSrcs.map((src, index) => (
                <Wrimg
                  key={index}
                  src={src as string}
                  alt={`게시물 이미지 ${index + 1}`}
                />
              ))}
            </Wimgs>
          </Writebottom>
          <Writebtn type="submit">등록</Writebtn>
        </Writeindiv>
      </Writein>
    </Write>
  );
};

export default LWriting;
const Wimgs = styled.div`
  display: flex;
  justify-content: flex-start;

  width: 300px;
  height: 100px;
`;
const Wrimg = styled.img`
  object-fit: contain;
  height: 40%;
  width: 20%;
`;
const Writemid = styled.div`
  margin-left: 351px;
`;
const Wr = styled.div`
  display: flex;

  align-items: center;
  width: 200px;
  justify-content: space-between;
`;
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
  display: flex;
  flex-direction: column;
`;
const Dii = styled.div`
  width: 40px;
  margin-top: 5px;
`;
const Writetextarea = styled.textarea`
  width: 100%;
  height: 300px;
  border-radius: 7px;
  padding: 10px;
`;
const Writeinput2 = styled.input`
  margin-left: 20px;
  padding-left: 10px;
  width: 200px;
  height: 30px;
  border-radius: 10px;
`;
const Writeinput = styled.input`
  padding-left: 10px;
  width: 100%;
  height: 30px;
  border-radius: 10px;
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
