import styled from "styled-components";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface Ct {
  title: string;
  img: string;
  id: string;
}
interface info {
  Pagenation: any;
}
const MainContents: React.FC<info> = ({ Pagenation }) => {
  const [MainCt, setMainCt] = useState<Ct[]>();

  useEffect(() => {
    axios
      .get("http://localhost:3001/MainCt")
      .then((response) => {
        setMainCt(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <BottomComponent>
        {Pagenation !== undefined ? (
          Pagenation.map((ct: Ct) => {
            return (
              <BottomComponent1>
                <BottomComponent1Caffee>
                  <BottomComponent1CaffeeImg
                    style={{ backgroundImage: `url(${ct.img})` }}
                  ></BottomComponent1CaffeeImg>

                  <BottomComponent1CaffeeText>
                    <div>{`카페이름: ${ct.id}`}</div>
                    <div>{`지역: ${ct.title}`}</div>
                  </BottomComponent1CaffeeText>
                </BottomComponent1Caffee>
              </BottomComponent1>
            );
          })
        ) : (
          <BottomComponent1>없음</BottomComponent1>
        )}
      </BottomComponent>
    </>
  );
};

export default MainContents;

const BottomComponent = styled.div`
  box-sizing: border-box;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: 90%;
`;
const BottomComponent1 = styled.div`
  box-sizing: border-box;
  width: 25%;
  align-items: center;
  justify-content: center;
  display: flex;

  height: 50%;
`;
const BottomComponent1Caffee = styled.div`
  border-radius: 25px;

  width: 250px;

  height: 240px;

  &:hover {
    height: 250px;
    width: 260px;
    transition: 0.5s;
  }
`;

const BottomComponent1CaffeeImg = styled.div`
  border-style: solid;
  border: 0;
  border-radius: 25px 25px 25px 25px;
  box-shadow: 4px 4px 4px 4px gray;
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
  box-sizing: border-box;

  width: 100%;
  height: 80%;
  margin-bottom: 20px;
`;

const BottomComponent1CaffeeText = styled.div`
  height: 15%;
  display: flex;
  justify-content: space-around;
  border: 0;

  border-radius: 0px 0px 25px 25px;
`;
