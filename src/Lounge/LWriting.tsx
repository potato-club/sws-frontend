import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
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
  const [formData, setFormData] = useState({
    title: "",
    contents: "",
    hash: "",
    imageSrcs: [] as (string | ArrayBuffer | null)[],
  });
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const accessToken = useRecoilValue(jwtTokenState);
  const refreshToken = useRecoilValue(refreshTokenState);
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
      fetchUserData();
    }
  }, [accessToken]);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get("https://sws-back.shop/client/myPage", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setNickname(String(response.data.nickname));
      console.log("데이터 가져오기 성공:", response.data);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  }, [accessToken]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBack = () => navigate(-1);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filePromises = Array.from(files).map((file) => {
        const reader = new FileReader();
        return new Promise<void>((resolve) => {
          reader.onload = () => {
            setFormData((prevData) => ({
              ...prevData,
              imageSrcs: [...prevData.imageSrcs, reader.result],
            }));
            resolve();
          };
          reader.readAsDataURL(file);
        });
      });
      Promise.all(filePromises).then(() => console.log("All files read"));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, contents, hash, imageSrcs } = formData;
    if (!title || !contents || !hash) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "https://sws-back.shop/post",
        {
          title,
          contents,
          hash,
          name: nickname || "익명",
          like: 0,
          imageSrcs,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("글이 성공적으로 등록되었습니다.");
      navigate(`/`);
      resetForm();
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        console.error("401 Unauthorized:", error.message);
        alert("인증이 만료되었습니다. 다시 로그인 해주세요.");
        navigate("/login");
      } else {
        console.error("글 등록에 실패했습니다.", error);
        alert("글 등록에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      contents: "",
      hash: "",
      imageSrcs: [],
    });
  };

  return (
    <Write>
      <WriteIn onSubmit={handleSubmit}>
        <Header>
          <ImArrowLeft onClick={handleBack} style={{ fontSize: "20px" }} />
          <h1>작성 페이지</h1>
        </Header>
        <WriteIndiv>
          <Label>제목</Label>
          <WriteInput
            name="title"
            placeholder="제목을 입력하세요"
            value={formData.title}
            onChange={handleInputChange}
          />
        </WriteIndiv>
        <WriteMid>
          <span>hash</span>
          <WriteInput
            name="hash"
            placeholder="해시태그를 입력하세요"
            value={formData.hash}
            onChange={handleInputChange}
          />
        </WriteMid>
        <WriteIndiv>
          <Label>내용</Label>
          <WriteTextarea
            name="contents"
            placeholder="내용을 입력하세요"
            value={formData.contents}
            onChange={handleInputChange}
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
            <ImagePreviewContainer>
              {formData.imageSrcs.map((src, index) => (
                <PreviewImage
                  key={index}
                  src={src as string}
                  alt={`게시물 이미지 ${index + 1}`}
                />
              ))}
            </ImagePreviewContainer>
          </WriteBottom>
          <WriteBtn type="submit">등록</WriteBtn>
        </WriteIndiv>
      </WriteIn>
      {loading && <LoadingIndicator>로딩 중...</LoadingIndicator>}
    </Write>
  );
};

export default LWriting;

// Styled Components
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

const Header = styled.div`
  display: flex;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 600;
  align-items: center;
  width: 200px;
  justify-content: space-between;
`;

const WriteIndiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const WriteMid = styled.div`
  margin-left: 351px;
  display: Flex;
  align-items: center;
`;

const WriteInput = styled.input`
  padding-left: 10px;
  width: 100%;
  height: 30px;
  border-radius: 10px;
`;

const WriteTextarea = styled.textarea`
  width: 100%;
  height: 300px;
  border-radius: 7px;
  padding: 10px;
`;

const WriteBottom = styled.div`
  margin-left: 40px;
  display: flex;
  flex-direction: column;
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

const Label = styled.div`
  width: 40px;
  margin-top: 5px;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 300px;
  height: 100px;
`;

const PreviewImage = styled.img`
  object-fit: contain;
  height: 40%;
  width: 20%;
`;

const LoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: ${PRIMARY_COLOR_BLU};
`;
