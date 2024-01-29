


import React, { useState ,useEffect} from 'react';
import './Main.css';
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
function Main() {
  const slides = ["예시1", "예시2", "예시3"]; // 슬라이드 내용
  const images = [
    "https://www.lge.co.kr/kr/upload/admin/storyThumbnail/tvc_codezero_thumb[20230607_105950].jpg",
  "https://company.eduwill.net/img/promotion/20230331154337ef62af81-9b54-4e6f-8f86-044e3e55f5fc.png",
  "https://www.samchully.co.kr/upload/pr/paperad/l3tppifzgysi7kp3k8re.png"
  ]; // 이미지 URL

  const [currentSlide, setCurrentSlide] = useState(0);
const currentImage = images[currentSlide]; // 현재 슬라이드에 해당하는 이미지 URL


  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // 4초마다 변경
    return () => clearInterval(interval);
  }, [currentSlide]); // currentSlide가 변경될 때마다 useEffect 실행

  return (
    <div className="Main">
        <div className="Top" >
      <button onClick={prevSlide}><BiChevronLeft size="40"/></button>
      <div className="Slide">
        <img  className="Slide_img" src={currentImage} alt={slides[currentSlide]} />
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
            <div className="bottom_component1">
                <div className="bottom_component1_caffee">카페 1</div>
            </div>
            <div className="bottom_component1">
                <div className="bottom_component1_caffee">카페 2</div>
            </div>
            <div className="bottom_component1">
                <div className="bottom_component1_caffee">카페 3</div>
            </div>
            <div className="bottom_component1">
                <div className="bottom_component1_caffee">카페 4</div>
            </div>
            <div className="bottom_component1">
                <div className="bottom_component1_caffee">카페 5</div>
            </div>
            <div className="bottom_component1">
                <div className="bottom_component1_caffee">카페 6</div>
            </div>
            <div className="bottom_component1">
                <div className="bottom_component1_caffee">카페 7</div>
            </div>
            <div className="bottom_component1">
                <div className="bottom_component1_caffee">카페 8</div>
            </div>
            </div>   
      </div>
    </div>
  );
}

export default Main;




