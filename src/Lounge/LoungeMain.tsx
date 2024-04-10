import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";

interface LoungeMainProps {
  showCount?: number;
}

interface community {
  id: string;
  title: string;
  name: string;
  like: number;
  contents: string;
  hash: string;
}

function LoungeMain({ showCount }: LoungeMainProps) {
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
  }, []);

  let displayedData = commu;
  if (showCount !== undefined) {
    displayedData = commu.slice(0, showCount);
  }

  return (
    <>
      {displayedData.map((b) => (
        <Loungein key={b.id} to={`/Community/${b.id}`}>
          <Loungein2>
            <div>{b.title}</div>
            <div>{b.name}</div>
          </Loungein2>
          <Incontents>{b.contents}</Incontents>
          <InIcon>
            <FaHeart />
            {b.like}
          </InIcon>
        </Loungein>
      ))}
    </>
  );
}

export default LoungeMain;

const Loungein2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 60px;
`;
const InIcon = styled.div`
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Loungein = styled(Link)`
  width: 100%;
  color: white;
  text-decoration: none;
  height: 110px;
  align-items: center;
  justify-content: space-around;

  display: Flex;

  border-top: 1px solid black;
`;
const Incontents = styled.div`
  width: 450px;
  padding-left: 20px;
  padding-right: 20px;
`;
