import React from "react";
import { PRIMARY_COLOR_BLUE, PRIMARY_COLOR_BLU } from "../Constants/constants";
import styled from "styled-components";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function Pagination({
  total, //전체 항목수
  eight, //한 페이지당 보여질 컴포넌트 8개
  currentpage, //현재 페이지 번호
  setPage, //페이지 변경함수
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
            <BottomCheckLink
              key={i}
              onClick={() => setPage(i + 1)}
              className={currentpage === i + 1 ? "active" : ""}
            >
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
  border: 1px solid ${PRIMARY_COLOR_BLU};
  color: ${PRIMARY_COLOR_BLU};
  height: 35px;

  &:hover {
    background-color: ${PRIMARY_COLOR_BLU};
    color: white;
  }

  &.active {
    background-color: ${PRIMARY_COLOR_BLUE};
    color: white;
  }
`;

const BottomCheckButton = styled.button`
  background-color: ${PRIMARY_COLOR_BLUE};
  border: 1px solid ${PRIMARY_COLOR_BLU};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 37px;
  color: white;
`;
