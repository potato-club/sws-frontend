import React from "react";
import { PRIMARY_COLOR_B } from "../Constants/constants";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";

interface community {
  id: string;
  title: string;
  name: string;
  like: number;
  contents: string;
  hash: string;
}
interface info {
  showCount: any;
}

const LoungeMain: React.FC<info> = ({ showCount }) => {
  return (
    <>
      {showCount.map((b: community) => (
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
};

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
  &:hover {
    transition: all 2s;
    background-color: ${PRIMARY_COLOR_B};
    color: white;
  }
`;
const Incontents = styled.div`
  width: 450px;
  padding-left: 20px;
  padding-right: 20px;
`;
