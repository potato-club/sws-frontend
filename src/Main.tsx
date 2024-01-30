


import React, { useState ,useEffect} from 'react';
import './Main.css';
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
function Main() {
  const slides = ["예시1", "예시2", "예시3"]; //alt
  const images = [
    "https://www.lge.co.kr/kr/upload/admin/storyThumbnail/tvc_codezero_thumb[20230607_105950].jpg",
  "https://company.eduwill.net/img/promotion/20230331154337ef62af81-9b54-4e6f-8f86-044e3e55f5fc.png",
  "https://www.samchully.co.kr/upload/pr/paperad/l3tppifzgysi7kp3k8re.png"
  ]; 
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



  const [currentSlide, setCurrentSlide] = useState(0);
const currentImage = images[currentSlide]; // 현재 슬라이드 이미지 URL


  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };
  const goToSlide = (index:number) => {
    setCurrentSlide(index);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // 3초마다 변경
    return () => clearInterval(interval);
  }, [currentSlide]); // currentSlide가 변경될 때마다 useEffect 실행

  return (
    <div className="Main">
        <div className="Top" >
      <button onClick={prevSlide}><BiChevronLeft size="40"/></button>
      <div className="Slide">
        <img  className="Slide_img" src={currentImage} alt={slides[currentSlide]} />

        <div className="buttons">
            {slides.map((slide, index) => (
              <button key={index} onClick={() => goToSlide(index)}></button>
            ))}
          </div>
      </div>
      <button onClick={nextSlide}><BiChevronRight size="40"/></button>


      </div>
      <div className="bottom">
        <div className="bottom_input">
            <div>
            <input placeholder='현재 위치 입력란'/>
            </div>
        </div>
        <div className="bottom_component">
            {[...Array(8)].map((_, index) => (
    <div key={index} className="bottom_component1" >
      <div className="bottom_component1_caffee" >
      <div className="bottom_component1_caffeeimg"style={{backgroundImage: `url(${coffee[index]})`}}></div>
      <div className="bottom_component1_caffeetext">
      <div>{`카페 ${index + 1}`}</div>
      <div>{local[index]}</div>
      </div>
      </div>
    </div>
  ))}
            </div > 
              <div className="bottom_check">
                <button><BiChevronLeft size="15"/></button> 
                  <div>1</div> 
                  <div>2</div> 
                  <div>3</div> 
                  <div>4</div> 
                  <div>5</div> 
                <button><BiChevronRight size="15"/></button> 
              </div>
            </div>
    </div>
  );
}

export default Main;




