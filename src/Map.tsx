import React, { useEffect } from "react";
import styled from "styled-components";
import { PRIMARY_COLOR_BLUE } from "../src/constants";
const MapContainer = styled.div`
  width: 1000px;
  height: 500px;
`;
const Mapc = styled.div`
  padding-top: 70px;
  display: flex;
  background-color: ${PRIMARY_COLOR_BLUE};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 855px;
`;
const MapBottom = styled.div`
  padding-top: 70px;
  width: 1000px;
  display: Flex;
  justify-content: space-around;
`;
const MapTime = styled.h2`
  color: white;
`;
const MapCoffee = styled.h2`
  color: white;
`;
declare global {
  interface Window {
    kakao: any;
  }
}

function Map() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=04d3a8bacc16e1b559e901b8598a7005";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(
            37.56000302825312,
            126.97540593203321
          ),
          level: 3,
        };
        new window.kakao.maps.Map(container, options);
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Mapc>
      <MapContainer id="map" />
      <MapBottom>
        <MapTime>예상시간: 00분</MapTime>
        <MapCoffee>가장 중간 카페:000</MapCoffee>
      </MapBottom>
    </Mapc>
  );
}

export default Map;
