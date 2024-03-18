import styled from "styled-components";
import axios from "axios";
import React, { useState, useEffect } from "react";
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

  height: 200px;
  box-shadow: 5px 5px 5px 5px gray;
  &:hover {
    height: 220px;
    width: 270px;
    transition: 0.5s;
  }
`;

const BottomComponent1CaffeeImg = styled.div`
  border-style: solid;
  border: 0;
  border-radius: 25px 25px 0px 0px;
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
  box-sizing: border-box;

  width: 100%;
  height: 85%;
`;

const BottomComponent1CaffeeText = styled.div`
  height: 15%;
  display: flex;
  justify-content: space-around;
  border: 0;

  border-radius: 0px 0px 25px 25px;
`;

interface Ct {
  title: string;
  img: string;
  id: string;
}
function MainContents() {
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
    <BottomComponent>
      {MainCt?.map((ct: Ct) => (
        <BottomComponent1>
          <BottomComponent1Caffee>
            <BottomComponent1CaffeeImg
              style={{ backgroundImage: `url(${ct.img})` }}
            ></BottomComponent1CaffeeImg>

            <BottomComponent1CaffeeText>
              <div>{`카페 ${ct.id}`}</div>
              <div>{ct.title}</div>
            </BottomComponent1CaffeeText>
          </BottomComponent1Caffee>
        </BottomComponent1>
      ))}
    </BottomComponent>
  );
}

export default MainContents;
