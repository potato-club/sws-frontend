import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineEnter } from "react-icons/ai";
import { CgHeart } from "react-icons/cg";
import { BiSubdirectoryRight } from "react-icons/bi";
import { FaHeart } from "react-icons/fa6";
import { PRIMARY_COLOR_BLUE } from "../src/constants";
import { useParams } from "react-router-dom";
interface c {
  id: string;
  title: string;
  name: string;
  like: number;
  contents: string;
  hash: string;
}

function Community() {
  const [inputText, setInputText] = useState("");
  const [Community, setCommunity] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();
  const [heart, setHeart] = useState(false);

  const [ReplyText, setReplyText] = useState("");
  const [Reply, setReply] = useState<string[]>([]);
  const [Change, setChange] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const handleClick = () => {
    setCommunity([...Community, inputText]);
    setInputText("");
  };

  const heartClick = () => {
    setHeart((prevChange) => !prevChange);
  };

  const ReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(e.target.value);
  };
  const handleReplyClick = () => {
    alert("대댓글을 작성하시겠습니까?");
    setChange((prevChange) => !prevChange);
  };
  const ReplyClick = () => {
    setReply([...Reply, ReplyText]);
    setReplyText("");
    setChange((prevChange) => !prevChange);
  };
  const [commun, setCommun] = useState<c>({
    id: "",
    title: "",
    name: "",
    like: 0,
    contents: "",
    hash: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/Community/${id}`)
      .then((res) => {
        setCommun(res.data);
        console.log(id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]); // id가 변경될 때만 useEffect 실행

  return (
    <CommunityComponent>
      <CommunityBox>
        <CommunityDetail>
          <Detailtop>
            <div>
              <Detailtitle>{commun.title}</Detailtitle>
              <div>
                {commun.hash} {commun.id}
              </div>
            </div>
            <div>
              <Detailname>{commun.name}</Detailname>
              <div>좋아요 {commun.like}</div>
            </div>
          </Detailtop>
          <Detailcomponent>{commun.contents}</Detailcomponent>
        </CommunityDetail>

        <CommunityBottom>
          {Community.map((text: string, index: number) => (
            <Communityanswer key={index}>
              <Answertop>
                <Answername>이름</Answername>
                <Answersetting>
                  <div onClick={heartClick}>
                    {heart ? <CgHeart /> : <FaHeart />}
                  </div>
                  /
                  <div onClick={handleReplyClick}>
                    <AiOutlineEnter />
                  </div>
                  /
                  <div>
                    <BiDotsVerticalRounded />
                  </div>
                </Answersetting>
              </Answertop>
              <Answercomponent>{text}</Answercomponent>
            </Communityanswer>
          ))}

          {Reply.map((Text2: string, index: number) => (
            <Ca key={index}>
              <BiSubdirectoryRight size="40" />
              <Cmanswer>
                <Answertop>
                  <Answername>이름</Answername>
                  <Answersetting>
                    <div onClick={heartClick}>
                      {heart ? <CgHeart /> : <FaHeart />}
                    </div>
                    /<BiDotsVerticalRounded />
                  </Answersetting>
                </Answertop>
                <Answercomponent>{Text2}</Answercomponent>
              </Cmanswer>
            </Ca>
          ))}

          {Change && (
            <>
              <Replyinput
                value={ReplyText}
                onChange={ReplyChange}
                placeholder="내용을 입력하세요"
              />
              <ReplyButton onClick={ReplyClick}>대댓글 쓰기 </ReplyButton>
            </>
          )}
        </CommunityBottom>

        <CommunityMid>
          <Communityinput
            value={inputText}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
          />
          <CommunityButton onClick={handleClick}>답장하기</CommunityButton>
        </CommunityMid>
      </CommunityBox>
    </CommunityComponent>
  );
}

export default Community;

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
  background-color: ${PRIMARY_COLOR_BLUE};
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
const Replyinput = styled.input`
  margin-left: 200px;
  height: 50px;
  width: 50%;
`;

const CommunityButton = styled.button`
  border-radius: 25px;
  height: 70px;
  width: 30%;
`;
const ReplyButton = styled.button`
  border-radius: 25px;
  height: 50px;
  width: 15%;
`;
const CommunityMid = styled.div`
  display: flex;
  width: 46%;
  height: 120px;
  padding-left: 38px;
  padding-right: 38px;
  margin-top: 70px;
  align-items: center;
  background-color: ${PRIMARY_COLOR_BLUE};
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

const Answersetting = styled.div`
  display: flex;
`;

const Answername = styled.div``;
const Answercomponent = styled.div``;
const Cmanswer = styled.div`
  background-color: white;
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
