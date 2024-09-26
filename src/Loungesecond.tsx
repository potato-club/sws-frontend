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
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  padding-bottom: 750px;
  padding-left: 110px;
  font-size: 30px;
  color: #7ba1da;
`;

const Box = styled.div`
  width: 1600px;
  height: 850px;
  padding-top: 40px;
  margin-top: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;

`;

const InnerBox = styled.div`
  width: 1000px;
  height: 800px;
  display: flex;
  flex-direction: column;
  border-top: 3px solid #7ba1da;
  border-radius: 20px;
  background-color: white;
`;

const SmallBox = styled.div`
  width: 100%;
  height: 50%;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  border-bottom: 3px solid #7ba1da;
  background-color: #7ba1da;
  box-shadow: 2px 2px 2px 2px gray;
`;

const RowBox1 = styled.div`
  width: 30%;
  height: 100%;
  background-color: #7ba1da;
  display: flex;
  flex-direction: column;
  border-right: 3px solid #7ba1da;
  border-radius: 20px;
`;

const RowBox2 = styled.div`
  width: 70%;
  height: 100%;
  background-color: #7ba1da;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
`;

const RowSmallBox1 = styled.div`
  width: 100%;
  height: 30%;
`;

const RowSmallBox2 = styled.div`
  width: 100%;
  height: 70%;
`;

const RowSmallBox3 = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputFieldA = styled.textarea`
  width: 95%;
  height: 30%;
  margin-left: 3%;
  padding: 5px;
  border: 3px solid #a4a4a4;
  font-size: 20px;
  text-align: left;
  box-sizing: border-box;
  resize: none;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    transform: scale(1.0);
  }
`;

const InputFieldB = styled.textarea`
  width: 95%;
  height: 100%;
  margin-left: 3%;
  margin-top: 2%;
  padding: 5px;
  border: 3px solid #a4a4a4;
  font-size: 20px;
  text-align: left;
  box-sizing: border-box;
  resize: none;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    transform: scale(1.0);
  }
`;

const RowSmallBox4 = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainWrite = styled.div`
  font-size: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid white;
  border-radius: 10px;
  color: #ffff;
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

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    transform: scale(1.0);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ModalBackground = styled.div` //modal 기능을 통해서 사진 확대 축소 기능 넣음
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1); /* 반투명한 검은 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 다른 요소들 위에 보이도록 설정 */
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const ModalImage = styled.img`
  max-width: 90vw; /* 화면 너비의 90%까지만 차지 */
  max-height: 90vh; /* 화면 높이의 90%까지만 차지 */
`;

export const TextareaField = styled.textarea`
  width: 90%;
  height: 70%;
  margin-left: 3%;
  margin-top: 8%;
  padding: 5px;
  border: 1px solid #000;
  font-size: 25px;
  resize: none;
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

const CompletionBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate()(-50%, -50%);
  background-color: #ffffff;
  padding: 10px;
  border: 1px solid #ffffff;
`;

const CompletionButton = styled.button`
  font-size: 15px;
  padding: 5px 10px;
  background-color: #7ba1da;
  border-radius: 10px;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    transform: scale(1.0);
  }
`;

const CompletionButtonContainer = styled.div`
  margin-top: auto;
  margin-left: 1550px;
  align-self: flex-start;
`;

const StarRatingContainer = styled.div`
  position: absolute; //위치 조정을 위해서 position을 사용한다음 top left right bottom을 사용하였다.
  top: 130px;
  right: 650px;
  display: flex;
  align-items: center;
  align-items: flex-end; //텍스트를 아래로 정렬
`;

const Star = styled.span`
  font-size: 30px;
  cursor: pointer;
  color: #bbb;
`;

const FilledStar = styled(Star)`
  color: #ffc107;
`;

function SecondPage() {
  const [likes, setLikes] = useState(0);
  const [inputBValue, setInputBValue] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  
  const imagesLinks = [
    'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/E172/production/_126241775_getty_cats.png',
    'https://flexible.img.hani.co.kr/flexible/normal/970/777/imgdb/resize/2019/0926/00501881_20190926.JPG',
    'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
    'https://lifet-img.s3.ap-northeast-2.amazonaws.com/6b980705-1d57-46a4-8193-ca490d19d00d'
  ];

  const handleImageClick = (imageUrl: string) => {
    setModalImageUrl(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompletion = () => {
    setIsCompleted(true);
    setTimeout(() => {
      setIsCompleted(false);
    }, 3500);
  };

  const handleInputBChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputBValue(value);
  };

  const handleLeftArrowClick = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? imagesLinks.length - 1 : prevIndex - 1));
  };

  const handleRightArrowClick = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === imagesLinks.length - 1 ? 0 : prevIndex + 1));
  };

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleMouseMove = (index: number) => {
    setRating(index + 1);
  } //마우스 기능을 넣기 위해 handleMouseMove의 index number를 만들어줬다.
  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (index: number) => {
    setRating(index + 1);
  }

  return (
    <div>
      <BigBox>
        <BigBoxWrite>글작성</BigBoxWrite>
        <Box>
        <StarRatingContainer onMouseLeave={handleMouseLeave}>
            {[...Array(5)].map((_, index) => {
              if (index < (hoveredRating || rating)) {
                return (
                  <FilledStar
                    key={index}
                    onMouseMove={() => handleMouseMove(index)}
                    onClick={() => handleClick(index)}
                  >
                    &#9733;
                  </FilledStar>
                );
              } else {
                return (
                  <Star
                    key={index}
                    onMouseMove={() => handleMouseMove(index)}
                    onClick={() => handleClick(index)}
                  >
                    &#9733;
                  </Star>
                );
              }
            })}
            ({hoveredRating || rating}점)
          </StarRatingContainer>
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
                  <InputFieldA rows={1} maxLength={20} />
                </RowSmallBox3>
                <RowSmallBox4>
                  <InnerWhiteBox>
                    <Image src={imagesLinks[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`}  onClick={() => handleImageClick(imagesLinks[currentImageIndex])} />
                    
                    <LeftArrow onClick={handleLeftArrowClick}>{'<'}</LeftArrow>
                    <RightArrow onClick={handleRightArrowClick}>{'>'}</RightArrow>

                    <DotsContainer>
                      {imagesLinks.map((_, index) => (
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

                {isCompleted && (
                  <CompletionBox>
                    <p>작성완료가 되었습니다.</p>
                  </CompletionBox>
                )}
              </RowBox2>
            </SmallBox>
          </InnerBox>
        </Box>
      </BigBox>

      {showModal && (
        <ModalBackground onClick={handleCloseModal}>
          <ModalContent>
            <ModalImage src={modalImageUrl} alt="Enlarged Image" />
          </ModalContent>
        </ModalBackground>
      )}

      <CompletionButtonContainer>
        <CompletionButton onClick={handleCompletion}>작성완료</CompletionButton>
      </CompletionButtonContainer>
    </div>
  );
}

export default SecondPage;

