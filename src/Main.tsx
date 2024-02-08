// Main 컴포넌트
import React, { useEffect, useState } from 'react';

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styled from 'styled-components'
interface MainProps {
    isSidebarOpen: boolean;
}

const Main: React.FC<MainProps> = ({ isSidebarOpen }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [paddingLeft, setPaddingLeft] = useState(0);
    const coffee=[
          "https://a.cdn-hotels.com/gdcs/production161/d1403/b5f1876a-9e64-4d13-ab7a-a0fd2cbc5224.jpg",
          "https://img.freepik.com/premium-photo/generative-ai-a-large-bright-cafe-environment-with-chairs-concrete-walls-and-a-hardwood-floor_28914-19636.jpg",
          "https://i.namu.wiki/i/5FGUIiyTGl3EkaSlnnRnmoAsPBMkL8w1tVdj5pgDOoydk2T0brSqYsWyLgGqyELwn5oP8HWRhF8A-p8ZyN4FtQ.webp",
          "https://cdn.imweb.me/thumbnail/20230522/31017371829ad.jpg",
          "https://www.qplace.kr/content/images/2022/10/No.3185------.jpg",
          "https://media.istockphoto.com/id/1286692956/ko/%EC%82%AC%EC%A7%84/%EC%9D%98%EC%9E%90%EC%99%80-%ED%85%8C%EC%9D%B4%EB%B8%94%EC%9D%B4-%EC%9E%88%EB%8A%94-%EB%B9%88-%EC%B9%B4%ED%8E%98-%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4.jpg?s=612x612&w=0&k=20&c=dgWlZUPam-dJb_bRpXqCPUyRd-UWaYxCKiFkJT4fYSQ=",
          "https://gyeongju.go.kr/upload/content/thumb/20200429/AF0FBCACF6E141DEBAD30FDB6082D979.jpg",
          "https://media.istockphoto.com/id/1428594094/ko/%EC%82%AC%EC%A7%84/%EB%82%98%EB%AC%B4-%ED%85%8C%EC%9D%B4%EB%B8%94-%EC%BB%A4%ED%94%BC-%EB%A9%94%EC%9D%B4%EC%BB%A4-%ED%8C%A8%EC%8A%A4%ED%8A%B8%EB%A6%AC-%EB%B0%8F-%ED%8E%9C%EB%8D%98%ED%8A%B8-%EC%A1%B0%EB%AA%85%EC%9D%B4%EC%9E%88%EB%8A%94-%EB%B9%88-%EC%BB%A4%ED%94%BC-%EC%88%8D-%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4.jpg?s=612x612&w=0&k=20&c=5bHJXVEZ4D9zsN_ZV-XVZsTxwxL5GdUOo5D0PPs3fsI="
        ];
        const local = [
          "강서",
          "인천",
          "김포",
          "당정",
          "홍대",
          "이태원",
          "강남",
          "판교"
      
           ]; 
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
background-color:#272829;
color:white;
border-radius: 50%;
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
const ButtonsButton=styled.div`
background-color: #cfd2d4;
    border-radius: 50%;
    border:none;
    width:10px;
    height:10px;

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
    height:50px;
    width:220px;
    border-right: 50px;
    border-radius: 25px;
    background-color: antiquewhite; 
`;
const BottomInputInput=styled.input`
border-radius: 25px;
width:80%;
height:60%;
 border:none;

`;
const BottomComponent=styled.div`
box-sizing: border-box;
max-width:100%;
display:flex;
flex-wrap: wrap;
height:90%;
`;
const BottomComponent1=styled.div`
box-sizing: border-box;
    width:25%;
    align-items: center;
    justify-content: center;
    display:flex;
  
    height:50%;`;
const BottomComponent1Caffee=styled.div`
border-radius: 25px;
   
width:250px;
border:#272829;
height:200px;`;
const BottomComponent1CaffeeImg=styled.div`
border-style: solid;
border-bottom: 0;
border-radius:25px 25px 0px 0px;
background-position: center;
background-repeat: repeat;
background-size:cover;
box-sizing: border-box;

width:100%;
height:80%;`;
const BottomComponent1CaffeeText=styled.div`
display:flex;
justify-content: space-around;
border-style: solid;
border-radius: 0px 0px 25px 25px;`;
const BottomCheck=styled.div`
display:flex;
align-items: center;
justify-content: center;
`;
const BottomCheckDiv =styled.div`
margin: 0px 10px 0px 10px;
`;
const BottomCheckButton=styled.button`
background-color: white;
display:flex;
align-items: center;
justify-content: center;
border:none;
`;

    return (
       
        <MainContainer paddingLeft={paddingLeft}>
            <Top>
                <TopButton onClick={prevSlide}><BiChevronLeft size="40" /></TopButton>
                                <Slide>
                    <SlideImg src={images[currentSlide]} alt={slides[currentSlide]}/>
                   <Buttons>
                        {slides.map((slide, index) => (
                            <ButtonsButton key={index} onClick={() => goToSlide(index)}></ButtonsButton>
                            
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
                <BottomComponent>
                    {[...Array(8)].map((_, index) => (
                        <BottomComponent1 key={index} >
                      
                         <BottomComponent1Caffee>
                            <BottomComponent1CaffeeImg style={{ backgroundImage: `url(${coffee[index]})` }}></BottomComponent1CaffeeImg>
                              
                               <BottomComponent1CaffeeText>
                                    <div>{`카페 ${index + 1}`}</div>
                                    <div>{local[index]}</div>
                                    </BottomComponent1CaffeeText>
                                </BottomComponent1Caffee>
                            </BottomComponent1>
                    ))}
                </BottomComponent>
               <BottomCheck>
                   <BottomCheckButton><BiChevronLeft size="15" /></BottomCheckButton>
                    <BottomCheckDiv>1</BottomCheckDiv>
                    <BottomCheckDiv>2</BottomCheckDiv>
                    <BottomCheckDiv>3</BottomCheckDiv>
                    <BottomCheckDiv>4</BottomCheckDiv>
                    <BottomCheckDiv>5</BottomCheckDiv>
                    <BottomCheckButton><BiChevronRight size="15" /></BottomCheckButton>
                    </BottomCheck>
                </Bottom>
            </MainContainer>
       
    );
}

export default Main;






