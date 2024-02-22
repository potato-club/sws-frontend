import React from 'react';
import styled from 'styled-components';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineEnter } from "react-icons/ai";
import { CgHeart } from "react-icons/cg";
const CommunityComponent=styled.div`
width:100%;

height:1500px;

display:flex;
align-items:center;
justify-content:center;
`;
const CommunityBox=styled.div`
width:50%;
height:100%;
padding-top:30px;
margin-top:150px;
background-color:gray;
display:flex;
flex-direction:column;
align-items:center;
`;
const CommunityDetail=styled.div`
width:80%;
border-radius:25px;
padding:50px;
height:500px;
background-color:white;
`;
const Communityinput=styled.input`
height:70px;
width:70%;
`;
const CommunityButton=styled.button`
border-radius:25px;
height:70px;
width:30%;
`;
const CommunityMid=styled.div`
display:flex;
width:46%;
height:120px;
align-items:center;
background-color:gray;

top:840px;
position:fixed;
`;
const CommunityBottom=styled.div`
width:90%;
height:500px;
margin-top:20px;
`;
const Communityanswer=styled.div`

margin-top:20px;
width:100%;
height:80px;
border-radius:15px;
background-color:white;
`;
const Detailtop=styled.div`
display:flex;


height:70px;
justify-content:space-between;


`;
const Detailtitle=styled.div`
font-size:25px;`;
const Detailname=styled.div``;
const Detailcomponent=styled.div``;

const Answertop=styled.div`
display:flex;

padding:10px;
height:25px;
justify-content:space-between;
align-items:center;
`;
const Answersetting=styled.div``;
const Answername=styled.div``;
const Answercomponent=styled.div``;
function Community() {
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
    <Communityanswer>
        <Answertop>
            <Answername>이름</Answername>
                <Answersetting><CgHeart />/<AiOutlineEnter />/<BiDotsVerticalRounded /></Answersetting>
        </Answertop>
            <Answercomponent>혹시 저 가능 할까요?</Answercomponent>
    </Communityanswer>
    <Communityanswer>
        <Answertop>
            <Answername>이름</Answername>
                <Answersetting><CgHeart />/<AiOutlineEnter />/<BiDotsVerticalRounded /></Answersetting>
        </Answertop>
            <Answercomponent>혹시 저 가능 할까요?</Answercomponent>
    </Communityanswer>
    <Communityanswer>
        <Answertop>
            <Answername>이름</Answername>
                <Answersetting><CgHeart />/<AiOutlineEnter />/<BiDotsVerticalRounded /></Answersetting>
        </Answertop>
            <Answercomponent>혹시 저 가능 할까요?</Answercomponent>
    </Communityanswer>
    <Communityanswer>
        <Answertop>
            <Answername>이름</Answername>
                <Answersetting><CgHeart />/<AiOutlineEnter />/<BiDotsVerticalRounded /></Answersetting>
        </Answertop>
            <Answercomponent>혹시 저 가능 할까요?</Answercomponent>
    </Communityanswer>
    <Communityanswer>
        <Answertop>
            <Answername>이름</Answername>
                <Answersetting><CgHeart />/<AiOutlineEnter />/<BiDotsVerticalRounded /></Answersetting>
        </Answertop>
            <Answercomponent>혹시 저 가능 할까요?</Answercomponent>
    </Communityanswer>
    <Communityanswer>
        <Answertop>
            <Answername>이름</Answername>
                <Answersetting><CgHeart />/<AiOutlineEnter />/<BiDotsVerticalRounded /></Answersetting>
        </Answertop>
            <Answercomponent>혹시 저 가능 할까요?</Answercomponent>
    </Communityanswer>
    <Communityanswer>
        <Answertop>
            <Answername>이름</Answername>
                <Answersetting><CgHeart />/<AiOutlineEnter />/<BiDotsVerticalRounded /></Answersetting>
        </Answertop>
            <Answercomponent>혹시 저 가능 할까요?</Answercomponent>
    </Communityanswer>
</CommunityBottom>


            <CommunityMid>
                <Communityinput/>
                <CommunityButton>답장하기</CommunityButton>
            </CommunityMid>
    
    </CommunityBox>
</CommunityComponent>
            
    );
}



export default Community;