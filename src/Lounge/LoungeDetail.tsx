// 글 각 페이지

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { PRIMARY_COLOR_BLUE } from "../Constants/constants";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import Comment from "../Components/Comment";

interface CommunityData {
  id: string;
  title: string;
  name: string;
  like: number;
  contents: string;
  hash: string;
  imageSrcs: (string | ArrayBuffer)[];
}

interface CommunityProps {
  endpoint: string;
}

const Community: React.FC<CommunityProps> = ({ endpoint }) => {
  const { id } = useParams<{ id: string }>();
  const [commun, setCommun] = useState<CommunityData>({
    id: "",
    title: "",
    name: "",
    like: 0,
    contents: "",
    hash: "",
    imageSrcs: [],
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/${endpoint}/${id}`)
        .then((res) => {
          setCommun(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("ID가 없습니다.");
    }
  }, [endpoint, id]);

  const commentEndpointMap: { [key: string]: string } = {
    LFriends: "FriendComment",
    LPopular: "PopularComment",
    Lboard: "BoardComment",
  };

  const commentEndpoint = commentEndpointMap[endpoint] || "default";

  return (
    <CommunityComponent>
      <CommunityBox>
        <CommunityDetail>
          <Detailtop>
            <div>
              <Detailtitle>{commun.title}</Detailtitle>
              <div>#{commun.hash}</div>
            </div>
            <div>
              <div>{commun.name}</div>
              <Detailheart>
                <FaHeart />
                {commun.like}
              </Detailheart>
            </div>
          </Detailtop>
          <Dimgs>
            {commun.imageSrcs &&
              commun.imageSrcs.length > 0 &&
              commun.imageSrcs.map((src, index) => (
                <Detailimg
                  key={index}
                  src={src as string}
                  alt={`게시물 이미지 ${index + 1}`}
                />
              ))}
          </Dimgs>
          <div>{commun.contents}</div>
        </CommunityDetail>
        {commun.id ? (
          <Comment
            postId={parseInt(commun.id)}
            commentEndpoint={commentEndpoint}
          />
        ) : (
          <div>댓글을 로드할 수 없습니다. 게시물 ID가 없습니다.</div>
        )}
      </CommunityBox>
    </CommunityComponent>
  );
};

export default Community;

const Dimgs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Detailimg = styled.img`
  object-fit: contain;
  height: 200px;
  width: 200px;
  margin: 10px 0;
`;

const Detailheart = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 35px;
`;

const CommunityComponent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommunityBox = styled.div`
  width: 950px;
  min-height: 100vh;
  padding-top: 30px;
  margin-top: 70px;
  background-color: ${PRIMARY_COLOR_BLUE};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-y: auto;
`;

const CommunityDetail = styled.div`
  width: 750px;
  border-radius: 10px;
  padding: 50px;
  height: auto;
  background-color: white;
`;

const Detailtop = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const Detailtitle = styled.div`
  font-size: 25px;
`;
