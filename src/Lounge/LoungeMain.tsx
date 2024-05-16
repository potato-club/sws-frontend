import React from "react";
import { PRIMARY_COLOR_B } from "../Constants/constants";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";

interface Community {
  id: string;
  title: string;
  name: string;
  like: number;
  contents: string;
  hash: string;
}

interface LoungeMainProps {
  showCount: Community[];
  linkPath: string;
}

const LoungeMain: React.FC<LoungeMainProps> = ({ showCount, linkPath }) => {
  return (
    <>
      {showCount.map((b: Community) => (
        <Loungein key={b.id} to={`/${linkPath}/${b.id}`}>
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
