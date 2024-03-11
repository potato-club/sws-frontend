import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

 const BigBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BigBoxWrite = styled.p`
  position: absolute;
  left: 50%;
  transform: translateX(-50%); //translateX를 사용함으로서 위치 결정에 영향을 주지 않고 수평으로 중심을 잡아준다.
  display: flex;
  justify-content: center;
  padding-bottom: 750px;
  padding-left: 110px;
  font-size: 30px;
`

 const Box = styled.div`
  width: 1600px;
  height: 850px;
  padding-top: 40px;
  margin-top: 120px;
  border: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

 const InnerBox = styled.div`
  width: 1000px;
  height: 800px;
 
  display: flex;
  flex-direction: column;
  border-top: 3px solid green;
`;
 const SmallBox = styled.div`
  width: 100%;
  height: 50%;
  
  display: flex;
  flex-direction: row;
  border-bottom: 3px solid green;

`;

const RowBox1 = styled.div`
  width: 30%;
  height: 100%;
 
  display: flex;
  flex-direction: column;
  border-right: 3px solid green;
`;

const RowBox2 = styled.div`
  width: 70%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
`;

 const  RowSmallBox1 = styled.div`
  width: 100%;
  height: 30%;
 
`;

 const  RowSmallBox2 = styled.div`
  width: 100%;
  height: 70%;
 
`;

const  RowSmallBox3 = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Added space between button and counter */
`;

 const InputFieldA = styled.textarea`
  width: 53%;
  height: 30%;
  margin-left: 3%;
  padding: 5px;
  border: 2px solid #A4A4A4;
  font-size: 20px;
  text-align: left;
  box-sizing: border-box;
  resize: none; // Prevent textarea from being resized by user
`;

 const InputFieldB = styled.textarea`
  width: 95%;
  height: 100%;
  margin-left: 3%;
  margin-top: 2%;
  padding: 5px;
  border: 2px solid #A4A4A4;
  font-size: 20px;
  text-align: left;
  box-sizing: border-box;
  resize: none; // Prevent textarea from being resized by user
`;

 const RowSmallBox4 = styled.div`
  width: 100%;
  height: 70%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
 const  MainWrite = styled.div`
  font-size: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100%;
`;

 const InnerWhiteBox = styled.div`
  position: relative;
  width: 95%;
  height: 95%;
  margin-right: auto;
  margin-left: 3%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  object-fit: cover;
 
`;
// Adding a new styled component for the image
 const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const TextareaField = styled.textarea`
  width: 90%;
  height: 70%;
  margin-left: 3%;
  margin-top: 8%;
  padding: 5px;
  border: 1px solid #000;
  font-size: 25px;
  resize: none; // Prevent textarea from being resized by user
`;

export const TextBox = styled.div`
  width: 90%;
  height: 70%;
  margin-left: 3%;
  margin-top: 8%;
  padding: 5px;
  font-size: 25px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
`;

export const Dot = styled.span`
  height: 10px;
  width: 10px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin: 0 5px;
  cursor: pointer;
`;

const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  cursor: pointer;
  font-size: 24px;
`;

const LeftArrow = styled(ArrowButton)`
  left: 5%;
`;

const RightArrow = styled(ArrowButton)`
  right: 5%;
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 5%;
  width: 100%;
  text-align: center;
`;

function SecondPage() {
  const [likes, setLikes] = useState(0);
  const [inputBValue, setInputBValue] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imagesLinkes = [
    'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/E172/production/_126241775_getty_cats.png',
    'https://flexible.img.hani.co.kr/flexible/normal/970/777/imgdb/resize/2019/0926/00501881_20190926.JPG'
  
  ];

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleInputBChange = (e: ChangeEvent<HTMLTextAreaElement>) => { // ChangeEvent<HTMLTextAreaElement> instead of ChangeEvent<HTMLInputElement>
    const value = e.target.value;
    setInputBValue(value);
  };

  const handleLeftArrowClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imagesLinkes.length - 1 : prevIndex - 1));
  };

  const handleRightArrowClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === imagesLinkes.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
     <BigBox>
      <BigBoxWrite>
        글작성
      </BigBoxWrite>
      <Box>
        <InnerBox>
          <SmallBox>
            <RowBox1>
              <RowSmallBox1>
                <MainWrite>제목</MainWrite>
              </RowSmallBox1>
              <RowSmallBox2>
                <MainWrite>사진</MainWrite>
              </RowSmallBox2>
            </RowBox1>
            
            <RowBox2>
              <RowSmallBox3>
                <InputFieldA rows={1} maxLength={15} /> 
              </RowSmallBox3>
              <RowSmallBox4>
        <InnerWhiteBox>
          <Image src={imagesLinkes[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />

          {/* Left Arrow */}
          <LeftArrow onClick={handleLeftArrowClick}>{'<'}</LeftArrow>

          {/* Right Arrow */}
          <RightArrow onClick={handleRightArrowClick}>{'>'}</RightArrow>

          {/* Dots */}
          <DotsContainer>
            {imagesLinkes.map((_, index) => (
              <Dot
                key={index}
                style={{ backgroundColor: index === currentImageIndex ? '#555' : '#bbb' }}
              />
            ))}
          </DotsContainer>
        </InnerWhiteBox>
      </RowSmallBox4>
            </RowBox2>
          </SmallBox>

          <SmallBox>
            <RowBox1>
              <MainWrite>내용</MainWrite>
            </RowBox1>
            <RowBox2>
              <InputFieldB rows={3} value={inputBValue} onChange={handleInputBChange} maxLength={500} />
              <p>({inputBValue.length} / 500 )</p>
            </RowBox2>
          </SmallBox>
        </InnerBox>
      </Box>
    </BigBox>  
    </div>
  );
}

export default SecondPage;
