//글 각 페이지
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
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/${endpoint}/${id}`)
      .then((res) => {
        setCommun(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
                {" "}
                <FaHeart />
                {commun.like}
              </Detailheart>
            </div>
          </Detailtop>
          <div>{commun.contents}</div>
        </CommunityDetail>
        <Comment
          postId={parseInt(commun.id)}
          commentEndpoint={commentEndpoint}
        />
      </CommunityBox>
    </CommunityComponent>
  );
};

export default Community;
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
  height: 500px;
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
