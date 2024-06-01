import React, { useState, useEffect } from "react";
import axios from "axios";
import { PRIMARY_COLOR_W, PRIMARY_COLOR_BLU } from "../Constants/constants";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ImArrowLeft } from "react-icons/im";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { jwtTokenState, refreshTokenState } from "../recoil/atom";
interface LWritingProps {
  category: string;
}

const LWriting: React.FC<LWritingProps> = ({ category }) => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [hash, setHash] = useState("");
  const [imageSrcs, setImageSrcs] = useState<(string | ArrayBuffer | null)[]>(
    []
  );
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const accessToken = useRecoilValue(jwtTokenState);
  const setJwtToken = useSetRecoilState(jwtTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);

  useEffect(() => {
    const storedJwtToken = localStorage.getItem("jwtToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedJwtToken && storedRefreshToken) {
      setJwtToken(storedJwtToken);
      setRefreshToken(storedRefreshToken);
    } else {
      console.error("저장된 토큰이 없습니다.");
    }
  }, [setJwtToken, setRefreshToken]);

  useEffect(() => {
    if (accessToken) {
      axios
        .get("https://shallwestudy.store/client/myPage", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setNickname(String(response.data.nickname));
          console.log("데이터 가져오기 성공:", response.data);
        })
        .catch((error) => {
          console.error("데이터 가져오기 실패:", error);
        });
    }
  }, [accessToken]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  const handleHashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHash(e.target.value);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileReaders: FileReader[] = [];
      const filePromises: Promise<void>[] = [];

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

    if (!title || !contents || !hash) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`https://shallwestudy.store/post/${category}`, {
        title,
        contents,
        hash,
        name: nickname || "익명",
        like: 0,
        imageSrcs,
      });
      alert("글이 성공적으로 등록되었습니다.");
      navigate(`/${category}`);
      setImageSrcs([]);
      setTitle("");
      setContents("");
      setHash("");
    } catch (error) {
      console.error("글 등록에 실패했습니다.", error);
      alert("글 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Write>
      <WriteIn onSubmit={handleSubmit}>
        <Wr>
          <ImArrowLeft onClick={handleBack} style={{ fontSize: "20px" }} />
          <h1>작성 페이지</h1>
        </Wr>
        <WriteIndiv>
          <Dii>제목</Dii>
          <WriteInput
            placeholder="제목을 입력하세요"
            value={title}
            onChange={handleTitleChange}
          />
        </WriteIndiv>
        <WriteMid>
          <span>hash tag</span>
          <WriteInput2
            placeholder="해시태그를 입력하세요"
            value={hash}
            onChange={handleHashChange}
          />
        </WriteMid>
        <WriteIndiv>
          <Dii>내용</Dii>
          <WriteTextarea
            placeholder="내용을 입력하세요"
            value={contents}
            onChange={handleContentChange}
          />
        </WriteIndiv>
        <WriteIndiv>
          <WriteBottom>
            <input
              accept="image/*"
              multiple
              type="file"
              onChange={handleUpload}
            />
            <WImgs>
              {imageSrcs.map((src, index) => (
                <WrImg
                  key={index}
                  src={src as string}
                  alt={`게시물 이미지 ${index + 1}`}
                />
              ))}
            </WImgs>
          </WriteBottom>
          <WriteBtn type="submit">등록</WriteBtn>
        </WriteIndiv>
      </WriteIn>
      {loading && <LoadingIndicator>로딩 중...</LoadingIndicator>}
    </Write>
  );
};

export default LWriting;

const WImgs = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 300px;
  height: 100px;
`;

const WrImg = styled.img`
  object-fit: contain;
  height: 40%;
  width: 20%;
`;

const WriteMid = styled.div`
  margin-left: 351px;
`;

const Wr = styled.div`
  display: flex;
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  align-items: center;
  width: 200px;
  justify-content: space-between;
`;

const WriteBtn = styled.button`
  background-color: ${PRIMARY_COLOR_BLU};
  width: 60px;
  height: 30px;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: ${PRIMARY_COLOR_W};
  }
`;

const WriteBottom = styled.div`
  margin-left: 40px;
  display: flex;
  flex-direction: column;
`;

const Dii = styled.div`
  width: 40px;
  margin-top: 5px;
`;

const WriteTextarea = styled.textarea`
  width: 100%;
  height: 300px;
  border-radius: 7px;
  padding: 10px;
`;

const WriteInput2 = styled.input`
  margin-left: 20px;
  padding-left: 10px;
  width: 200px;
  height: 30px;
  border-radius: 10px;
`;

const WriteInput = styled.input`
  padding-left: 10px;
  width: 100%;
  height: 30px;
  border-radius: 10px;
`;

const WriteIndiv = styled.div`
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

const WriteIn = styled.form`
  width: 650px;
  height: 650px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px gray;
  padding: 50px;
  display: flex;
  flex-direction: column;
`;

const LoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: ${PRIMARY_COLOR_BLU};
`;
