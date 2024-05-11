import React from "react";
import { PRIMARY_COLOR_BLUE, PRIMARY_COLOR_B } from "../Constants/constants";
import styled from "styled-components";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function Pagination({
  total, //total 컴포넌트 갯수
  eight, //한 페이지당 보여질 컴포넌트 8개
  currentpage, //현재 페이지
  setPage, //바뀐 페이지
}: {
  total: number;
  eight: number;
  currentpage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>; //타입 안정성을 위해씀 number
}) {
  const numPages = Math.ceil(total / eight); //numPages는 아래 보이는 페이지네이션 숫자

  return (
    <BottomCheck>
      <BottomCheckbox>
        <BottomCheckbox>
          <BottomCheckButton
            onClick={() => {
              setPage(currentpage - 1);
            }}
            disabled={currentpage === 1}
          >
            <BiChevronLeft size="40" />
          </BottomCheckButton>
          {Array.from({ length: numPages }).map((_, i) => (
            <BottomCheckLink key={i} onClick={() => setPage(i + 1)}>
              {i + 1}
            </BottomCheckLink>
          ))}
          <BottomCheckButton
            onClick={() => {
              setPage(currentpage + 1);
            }}
            disabled={currentpage === numPages}
          >
            <BiChevronRight size="40" />
          </BottomCheckButton>
        </BottomCheckbox>
      </BottomCheckbox>
      <div>{currentpage} 페이지</div>
    </BottomCheck>
  );
}

export default Pagination;

const BottomCheck = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BottomCheckbox = styled.div`
  width: 255px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomCheckLink = styled.div`
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background-color: white;
  border: 1px solid ${PRIMARY_COLOR_BLUE};
  color: ${PRIMARY_COLOR_BLUE};
  height: 35px;

  &:hover {
    background-color: ${PRIMARY_COLOR_B};
    color: white;
  }
`;

const BottomCheckButton = styled.button`
  background-color: ${PRIMARY_COLOR_B};
  border: 1px solid ${PRIMARY_COLOR_BLUE};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 37px;
  color: white;
`;
