// Main 컴포넌트
import React, { useEffect, useState } from 'react';
import { Route, Routes ,Link } from 'react-router-dom';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styled from 'styled-components'
import { PRIMARY_COLOR_BLUE} from "../src/constants";
import MainContents from './MainContents';
import MainContents2 from './MainContents2';

const MainContainer = styled.div<{ paddingLeft: number }>`
padding-top: 70px;
margin-left: 0; /* 기본값 */
height: 855px;
padding-left: ${props => props.paddingLeft}px;
`;
const Top = styled.div`
width:100%;
display:flex;
justify-content:center;
align-items: center;
height:36%;

`;
const TopButton = styled.button`
background-color: ${PRIMARY_COLOR_BLUE};
color:white;
border-radius: 15px;
border:0px;
width:40px;
height:40px;
display:flex;
align-items: center;
justify-content: center;
`;
const Slide =styled.div`
height:400px;
width:1200px;
flex-direction: column;
display:flex;
align-items: center;
justify-content: center;

`;
const SlideImg=styled.img`
width:80%;
height:60%;
`;
const Buttons=styled.div`
margin-top:20px;
display:flex;
width:150px;
justify-content:space-around;

`;


const ButtonsButton = styled.div`
 
 width: 10px;
  height: 10px;
  transform: translateX(-50%); 
  background-color:#b9b9b9;

  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
&.active {
  background-color: black;
 
}
`;
const Bottom=styled.div`
height:65%;

`;
const BottomInput=styled.div`
padding-left:90px;
`;
const BottomInputIn=styled.div`
display:flex;
align-items: center;
justify-content: center;
height:30px;
width:220px;
border-right: 50px;
border-radius: 25px;
background-color: ${PRIMARY_COLOR_BLUE};
`;
const BottomInputInput=styled.input`
border-radius: 25px;
width:80%;
height:60%;
border:none;

`;



const BottomCheck=styled.div`
display:flex;
align-items: center;
justify-content: center;    

`;
const BottomCheckbox=styled.div`
width:600px;
height:45px;

display:flex;
align-items: center;
justify-content: center;
`;
const BottomCheckLink=styled(Link)`
width:35px;
display:Flex;
align-items:center;
justify-content:center;
text-decoration:none;
background-color: white;
border:1px solid ${PRIMARY_COLOR_BLUE};
color: ${PRIMARY_COLOR_BLUE};
height:35px;

&:hover {
  background-color:${PRIMARY_COLOR_BLUE};
  color:white; 
}

`;
const BottomCheckButton=styled.button`
background-color: ${PRIMARY_COLOR_BLUE};
border:1px solid ${PRIMARY_COLOR_BLUE};
display:flex;
align-items: center;
justify-content: center;
width:35px;
height:37px;


color: white;
`;

interface MainProps {
    isSidebarOpen: boolean;
}

const Main: React.FC<MainProps> = ({ isSidebarOpen }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [paddingLeft, setPaddingLeft] = useState(0);
 
    const slides = ["예시1", "예시2", "예시3"];
    const images = [
        "https://www.lge.co.kr/kr/upload/admin/storyThumbnail/tvc_codezero_thumb[20230607_105950].jpg",
        "https://company.eduwill.net/img/promotion/20230331154337ef62af81-9b54-4e6f-8f86-044e3e55f5fc.png",
        "https://www.samchully.co.kr/upload/pr/paperad/l3tppifzgysi7kp3k8re.png"
    ];

    //예시 데이터 덩어리 나중에 교체

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, [currentSlide]);//3초뒤 슬라이드 넘어가게 만듬

    useEffect(() => {
        const newPaddingLeft = isSidebarOpen ? 200 : 0;
        setPaddingLeft(newPaddingLeft);
    }, [isSidebarOpen]);//메인페이지 200줄이기


    
    const nextSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    };
    const prevSlide = () => {//전 슬라이드로 가게
        setCurrentSlide(prevSlide => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };

    const goToSlide = (index: number) => {//해당 슬라이드 번호로 이동
        setCurrentSlide(index);
    };



   

    return (
       
        <MainContainer paddingLeft={paddingLeft}>
            <Top>
                <TopButton onClick={prevSlide}><BiChevronLeft size="40" /></TopButton>
                                <Slide>
                    <SlideImg src={images[currentSlide]} alt={slides[currentSlide]}/>


                   <Buttons>
                        {slides.map((slide, index) => (
                            <ButtonsButton  className={`ButtonsButton ${index === currentSlide ? "active" : ""}`} 
                            key={index} onClick={() => goToSlide(index)}></ButtonsButton>
                            
                        ))}
                    </Buttons>
                    
                    </Slide>
                <TopButton onClick={nextSlide}><BiChevronRight size="40" /></TopButton>
                </Top>
           <Bottom>
                
                    <BottomInput>
                   <BottomInputIn>
                   <BottomInputInput placeholder='현재 위치 입력란'/>
                        
                        </BottomInputIn>
                    </BottomInput>
                    <Routes>
              
              <Route path="/*" element={<MainContents/>} />
              <Route path="/2" element={<MainContents2/>} />
              <Route path="/3" element={<MainContents/>} />
              <Route path="/4" element={<MainContents/>} />
              <Route path="/5" element={<MainContents/>} />
                   
              </Routes>

               <BottomCheck>
                <BottomCheckbox>
                   <BottomCheckButton><BiChevronLeft size="40"/></BottomCheckButton>
                    <BottomCheckLink to="/">1</BottomCheckLink>
                    <BottomCheckLink to="2">2</BottomCheckLink>
                    <BottomCheckLink to="3">3</BottomCheckLink>
                    <BottomCheckLink to="4">4</BottomCheckLink>
                    <BottomCheckLink to="5">5</BottomCheckLink>
                    <BottomCheckButton><BiChevronRight size="40"/></BottomCheckButton>
                </BottomCheckbox>
                </BottomCheck>
                
                </Bottom>
            </MainContainer>
       
    );
}

export default Main;






