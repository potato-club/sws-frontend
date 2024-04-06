import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

interface community {
  id: string;
  title: string;
  name: string;
  like: number;
  contents: string;
  hash: string;
}
const Lboard = () => {
  const [commu, setCommu] = useState<community[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/Community")
      .then((res) => {
        setCommu(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <MainContain>
      <LoungeTop>최신 게시판</LoungeTop>
      <Loungemargin>
        {commu.map((b) => (
          <InnerBox likes={b.like}>
            <Link to={`/Community/${b.id}`}>
              {b.id} {b.hash}
              {b.like}
            </Link>
          </InnerBox>
        ))}
      </Loungemargin>
      <Loungebottom to="/LoungeCreate">글쓰기</Loungebottom>
    </MainContain>
  );
};

export default Lboard;
const Loungebottom = styled(Link)`
  width: 700px;

  margin-top: 50px;
`;
const LoungeTop = styled.div`
  width: 700px;

  margin-top: 50px;
`;
const Loungemargin = styled.div`
  display: flex;
  width: 900px;

  align-items: center;

  flex-direction: column;
  background-color: gray;
`;
const InnerBox = styled.div<{ likes: number }>`
  padding: 10px;
  margin: 15px;
  width: 90%;
  height: 100px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #7093c0;
  position: relative;
  opacity: 1;
`;

const MainContain = styled.div`
  padding-top: 70px;
  margin-left: 0;
  height: 855px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
