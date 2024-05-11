import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { PRIMARY_COLOR_BLUE } from "../Constants/constants";
import axios from "axios";
interface PostCafeProps {
  onSubmit: (cafeName: string, cafeInfo: string, images: File[]) => void;
}
const PostMainBoxForm: React.FC<PostCafeProps> = () => {
  const [cafeName, setCafeName] = useState("");
  const [cafeInfo, setCafeInfo] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      cafeName: cafeName,
      cafeInfo: cafeInfo,
      images: images.map((file) => ({ img: file })),
    };
    console.log(images[0]);

    axios
      .post("http://localhost:3001/MainBox", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const newImages: File[] = Array.from(fileList);
      setImages((prevImages) => [...prevImages, ...newImages]);

      const newPreviews: string[] = [];
      for (let i = 0; i < newImages.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === newImages.length) {
            setImagePreviews((prevPreviews) => [
              ...prevPreviews,
              ...newPreviews,
            ]);
          }
        };
        reader.readAsDataURL(newImages[i]);
      }
    }
  };
  const handleRemoveImage = (index: number, e: React.MouseEvent) => {
    //기본 동작 방지(이미지 x버튼 누르면 파일 첨부까지 함께 눌러짐.)
    e.preventDefault();

    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor="Name">
        <StyledInput
          id="Name"
          type="text"
          placeholder="카페이름"
          value={cafeName}
          onChange={(e) => setCafeName(e.target.value)}
          required
        />
        <StyledDIv />
      </StyledLabel>
      <StyledLabel htmlFor="Info">
        <StyledTextArea
          id="Info"
          placeholder="카페정보"
          value={cafeInfo}
          onChange={(e) => setCafeInfo(e.target.value)}
          required
        />
        <StyledDIv />
      </StyledLabel>
      <StyledLabel htmlFor="Images">
        <StyledInputFile
          id="Images"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          required
        />
        {images.length > 0 && (
          <SelectedFileNames>
            {images.map((file, index) => (
              <div key={index}>
                {file.name}
                <StyledBTN
                  type="button"
                  onClick={(e) => handleRemoveImage(index, e)}
                />
              </div>
            ))}
          </SelectedFileNames>
        )}
      </StyledLabel>
      <PreviewContainer>
        {imagePreviews.map((preview, index) => (
          <PreviewImageWrapper key={index}>
            <PreviewImage src={preview} alt={`Preview ${index}`} />
          </PreviewImageWrapper>
        ))}
      </PreviewContainer>

      <StyledButton type="submit">등록하기</StyledButton>
    </StyledForm>
  );
};
export default PostMainBoxForm;

const StyledLabel = styled.label`
  margin-top: 50px;
  margin-bottom: 50px;
  display: block;
  width: 100%;
`;

const StyledForm = styled.form`
  height: 100%;
  width: 75%;
`;

const StyledButton = styled.button`
  position: relative;
  font-size: 20px;
  border: none;
  outline: none;
  border-radius: 15px;
  background-color: white;
  height: 45px;
  width: 45%;
  top: 50px;
  font-weight: bold;
  cursor: pointer;

  transition: all 0.4s ease;
  &:hover {
    transform: scale(1.2);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  }
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: ${PRIMARY_COLOR_BLUE};
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  width: 500px;
  text-align: center;
`;

const StyledDIv = styled.div`
  background-color: white;
  height: 2px;
`;

const StyledTextArea = styled.textarea`
  border: none;
  outline: none;
  background-color: ${PRIMARY_COLOR_BLUE};
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  width: 90%;
  height: 200px;
  overflow-y: auto;
  resize: none;

  text-align: center;
`;

const StyledInputFile = styled.input``;

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: -5px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const PreviewImageWrapper = styled.div`
  width: calc(33.33% - 10px);
  margin: 5px;
`;

const SelectedFileNames = styled.div`
  margin-top: 10px;
`;

const StyledBTN = styled.button`
  border-radius: 30px;
  font-size: 8px;
  background-color: #ffffff;
  border: solid 1px grey;

  &::before {
    content: "x";
    cursor: pointer;
  }
`;
