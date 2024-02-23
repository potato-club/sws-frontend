
import React, { useState } from 'react';
import styled from 'styled-components';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineEnter } from "react-icons/ai";
import { CgHeart } from "react-icons/cg";
import { BiSubdirectoryRight } from "react-icons/bi";

const CommunityComponent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommunityBox = styled.div`
  width: 50%;
  min-height: 90vh;
  padding-top: 30px;
  margin-top: 70px;
  padding-bottom: 30px;
  margin-bottom: 110px;
  background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-y: auto;
`;

const CommunityDetail = styled.div`
  width: 80%;
  border-radius: 25px;
  padding: 50px;
  height: 500px;
  background-color: white;
`;

const Communityinput = styled.input`
  height: 70px;
  width: 70%;
`;

const CommunityButton = styled.button`
  border-radius: 25px;
  height: 70px;
  width: 30%;
`;

const CommunityMid = styled.div`
  display: flex;
  width: 46%;
  height: 120px;
  padding-left: 38px;
  padding-right: 38px;
  margin-top: 70px;
  align-items: center;
  background-color: gray;
  top: 770px;
  position: fixed;
`;

const CommunityBottom = styled.div`
  width: 90%;
  margin-top: 20px;
`;

const Communityanswer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 80px;
  border-radius: 15px;
  background-color: white;
`;

const Detailtop = styled.div`
  display: flex;
  height: 70px;
  justify-content: space-between;
`;

const Detailtitle = styled.div`
  font-size: 25px;
`;

const Detailname = styled.div``;
const Detailcomponent = styled.div``;

const Answertop = styled.div`
  display: flex;
  padding: 10px;
  height: 25px;
  justify-content: space-between;
  align-items: center;
`;

const Answersetting = styled.div``;
const Answername = styled.div``;
const Answercomponent = styled.div``;
const Cmanswer = styled.div`
  background-color:white;
  margin-top: 20px;
  width: 80%;
  height: 70px;
  border-radius: 15px;
`;

const Ca = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function Community() {
  const [inputText, setInputText] = useState("");
  const [inputText2, setInputText2] = useState("");
  const [Community, setCommunity] = useState<string[]>([]);
  const [isChange, setIsChange] = useState(false);
  const [is, setIs] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText2(e.target.value);
  };
  const handleClick = () => {
    setCommunity([...Community, inputText]);
    setInputText("");
  };

  const handleReplyClick = () => {
    alert("대댓글을 작성하시겠습니까?");
    setIsChange((prevIsChange) => !prevIsChange);
  
  };
 
  const ChangeClick = () => {
    setCommunity([...Community, inputText]);
    setInputText("");
    setIsChange((prevIsChange) => !prevIsChange);
    setIs(true);
  };
 

  return (
    <CommunityComponent>
      <CommunityBox>
        <CommunityDetail>
          <Detailtop>
            <Detailtitle>제목 뭐시기</Detailtitle>
            <Detailname>이름</Detailname>
          </Detailtop>
          <Detailcomponent>
            내용 안녕하세요 저는 어디살고 무슨 공부를 하는 사람입니다. 혹시 같이 프로젝트 할사람있으면 같이 해용!
          </Detailcomponent>
        </CommunityDetail>

        <CommunityBottom>
    
        
       
    {Community.map((text:any, index:any) => (
      <Communityanswer key={index}>
        <Answertop>
          <Answername>이름</Answername>
          <Answersetting>
            <CgHeart />/<AiOutlineEnter onClick={handleReplyClick} />/<BiDotsVerticalRounded />
          </Answersetting>
        </Answertop>
        <Answercomponent>{text}</Answercomponent>
      </Communityanswer>
    ))}
    
      {is&&(
         Community.map((inputText2:any, index:any) => (
    <Ca>
    <BiSubdirectoryRight size="40"/>
    <Cmanswer>
      <Answertop>
        <Answername>이름</Answername>
        <Answersetting>
          <CgHeart />/<AiOutlineEnter onClick={handleReplyClick} />/<BiDotsVerticalRounded />
        </Answersetting>
      </Answertop>
      <Answercomponent>{inputText2}</Answercomponent>
    </Cmanswer>
  </Ca> 
   ))  
)}


  {isChange&& (
  <>
  <input
   value={inputText2}
   onChange={handleChange2}
   placeholder="내용을 입력하세요"
  />
  <button onClick={ChangeClick}>대댓글 쓰기</button>
  </>
)}
        </CommunityBottom>

        <CommunityMid>
              <Communityinput
                value={inputText}
                onChange={handleChange}
                placeholder="내용을 입력하세요"
              />
              <CommunityButton onClick={handleClick}>
                답장하기
              </CommunityButton>
           
          
        </CommunityMid>
      </CommunityBox>
    </CommunityComponent>
  );
}

export default Community;
