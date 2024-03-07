import React from 'react';
import styled from 'styled-components'
const BottomComponent=styled.div`
box-sizing: border-box;
max-width:100%;
display:flex;
flex-wrap: wrap;
height:90%;
`;
const BottomComponent1=styled.div`
box-sizing: border-box;
width:25%;
align-items: center;
justify-content: center;
display:flex;

height:50%;`;
const BottomComponent1Caffee=styled.div`
border-radius: 25px;

width:250px;

height:200px;
box-shadow: 5px 5px 5px 5px gray;
&:hover{
    height:220px;
    width:270px;
  transition: 0.5s;
}
`;

const BottomComponent1CaffeeImg=styled.div`
border-style: solid;
border: 0;
border-radius:25px 25px 0px 0px;
background-position: center;
background-repeat: repeat;
background-size:cover;
box-sizing: border-box;

width:100%;
height:85%;
`;

const BottomComponent1CaffeeText=styled.div`
height:15%;
display:flex;
justify-content: space-around;
border: 0;

border-radius: 0px 0px 25px 25px;`;
function MainContents2() {
    const coffee=[
        "https://gyeongju.go.kr/upload/content/thumb/20200429/AF0FBCACF6E141DEBAD30FDB6082D979.jpg",
        "https://i.namu.wiki/i/5FGUIiyTGl3EkaSlnnRnmoAsPBMkL8w1tVdj5pgDOoydk2T0brSqYsWyLgGqyELwn5oP8HWRhF8A-p8ZyN4FtQ.webp",
        "https://img.freepik.com/premium-photo/generative-ai-a-large-bright-cafe-environment-with-chairs-concrete-walls-and-a-hardwood-floor_28914-19636.jpg",
        
        "https://cdn.imweb.me/thumbnail/20230522/31017371829ad.jpg",
        "https://a.cdn-hotels.com/gdcs/production161/d1403/b5f1876a-9e64-4d13-ab7a-a0fd2cbc5224.jpg",
        "https://www.qplace.kr/content/images/2022/10/No.3185------.jpg",
        "https://media.istockphoto.com/id/1286692956/ko/%EC%82%AC%EC%A7%84/%EC%9D%98%EC%9E%90%EC%99%80-%ED%85%8C%EC%9D%B4%EB%B8%94%EC%9D%B4-%EC%9E%88%EB%8A%94-%EB%B9%88-%EC%B9%B4%ED%8E%98-%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4.jpg?s=612x612&w=0&k=20&c=dgWlZUPam-dJb_bRpXqCPUyRd-UWaYxCKiFkJT4fYSQ=",
        
        "https://media.istockphoto.com/id/1428594094/ko/%EC%82%AC%EC%A7%84/%EB%82%98%EB%AC%B4-%ED%85%8C%EC%9D%B4%EB%B8%94-%EC%BB%A4%ED%94%BC-%EB%A9%94%EC%9D%B4%EC%BB%A4-%ED%8C%A8%EC%8A%A4%ED%8A%B8%EB%A6%AC-%EB%B0%8F-%ED%8E%9C%EB%8D%98%ED%8A%B8-%EC%A1%B0%EB%AA%85%EC%9D%B4%EC%9E%88%EB%8A%94-%EB%B9%88-%EC%BB%A4%ED%94%BC-%EC%88%8D-%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4.jpg?s=612x612&w=0&k=20&c=5bHJXVEZ4D9zsN_ZV-XVZsTxwxL5GdUOo5D0PPs3fsI="
      ];
      const local = [
        "홍대",
        "강남",
        "판교",
        "인천",
        "홍대",
        "김포",
        "강남",
        "인천"
    
         ]; 
    return (
        <BottomComponent>
        {[...Array(8)].map((_, index) => (
            <BottomComponent1 key={index} >
          
             <BottomComponent1Caffee>
                <BottomComponent1CaffeeImg style={{ backgroundImage: `url(${coffee[index]})` }}></BottomComponent1CaffeeImg>
                  
                   <BottomComponent1CaffeeText>
                        <div>{`카페 ${index + 1}`}</div>
                        <div>{local[index]}</div>
                        </BottomComponent1CaffeeText>
                    </BottomComponent1Caffee>
                </BottomComponent1>
        ))}
    </BottomComponent>
    );
}

export default MainContents2;