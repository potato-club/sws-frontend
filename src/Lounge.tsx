// import React, { useEffect, useState }from 'react';
// import styled from 'styled-components'
// interface MainProps {
//     isSidebarOpen: boolean;
// }
// const Lounge: React.FC<MainProps> = ({ isSidebarOpen }) => {
//     const [pL, setPL] = useState(0);
//     useEffect(() => {
//         const Left = isSidebarOpen ? 200 : 0;
//         setPL(Left);
//     }, [isSidebarOpen]);


//     const MainContainer = styled.div<{ paddingLeft: number }>`
//     padding-top: 70px;
//     margin-left: 0; /* 기본값 */
//     height: 855px;
//     padding-left: ${props => props.paddingLeft}px;
// `;
//     return (
//         <MainContainer paddingLeft={pL}>
//             라운지 입니다
//             </MainContainer>
//     );
// }

// export default Lounge;


import React, { useState, useEffect } from 'react';




import styled from 'styled-components';

export const StyledBigBox = styled.div`
    padding: auto;
    padding-top: 0px;
   
    width:1860px;
    height: 100vh;  // 수정: 뷰포트 높이로 설정
   
    display: flex;
    flex-direction: column; /* 세로로 배치 */
    position: absolute;
    
`;

export const StyledSmallBox = styled.div`
    padding: 10px;
    margin: 5px; /* 상단과 하단 여백 */
    height: auto;
    display: flex;
    flex-direction: column; /* 내부에 있는 박스들을 가로로 배치 */
    align-items: flex-start; /* 세로 정렬을 맨 위로 조절 */
`;

export const TitleContainer = styled.div`
    font-size: 15px;
    margin-left: 13px;
    margin-bottom: 20px;
`;

export const InnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    width: row;
    align-items: flex-start; /* 세로 정렬을 맨 위로 조절 */
`;

export const InnerBox = styled.div<{ likes: number }>`
    padding: 10px;
    margin: 10px;
    height: 300px;
    width: 100%;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #BDBDBD;
    position: relative;

    &::after {
        content: '${(props) => (props.likes ? `${props.likes} likes` : '')}';
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: yellow;  // 추가: 배경색을 흰색으로 지정
        padding: 10px;  // 추가: 좋아요 횟수에 여백 추가
        border-radius: 10px;
    }
`;

export const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: auto;
`;
const MainContainer = styled.div<{ paddingLeft: number }>`
     padding-top: 70px;
     margin-left: 0; 
    
     height: 855px;
     
     padding-left: ${props => props.paddingLeft}px;
 `;

interface UserDataItem {
    username: string;
    category: string;
    likes: number;
}

interface UserData {
    [key: string]: UserDataItem[];
}

interface MainProps {
    isSidebarOpen: boolean;
}

const App: React.FC<MainProps> = ({ isSidebarOpen }) => {
    const [pL, setPL] = useState(0);

    useEffect(() => {
        const Left = isSidebarOpen ? 200 : 0;
        setPL(Left);
    }, [isSidebarOpen]);

    const [userData, setUserData] = useState<UserData>({
        "인기순": [
            { username: "송태진", category: "카페", likes: 30 },
            { username: "송태진", category: "카페", likes: 15 },
            { username: "송태진", category: "카페", likes: 10 },
            { username: "송태진", category: "카페", likes: 100 },
            { username: "송태진", category: "카페", likes: 10 },
        ],
        
        "카테고리별": [
            { username: "사용자1", category: "카페", likes: 10 },
            { username: "사용자1", category: "카페", likes: 5 },
            { username: "사용자1", category: "카페", likes: 10 },
            { username: "사용자1", category: "카페", likes: 10 },
            { username: "사용자1", category: "카페", likes: 10 },
        ],
        "친구 구해요!": [
            { username: "사용자1", category: "카페", likes: 30 },
            { username: "사용자1", category: "카페", likes: 15 }, 
            { username: "사용자1", category: "카페", likes: 5 },  
            { username: "사용자1", category: "카페", likes: 10 },
            { username: "사용자1", category: "카페", likes: 10 },
        ]
    });

    const handleLikeClick = (key: string, index: number) => {
        const updatedData = { ...userData };
        updatedData[key][index].likes += 1;
        setUserData(updatedData);
    };

    // 좋아요 많이 받은 순으로 정렬하는 함수
    const sortInnerContents = (contents: UserDataItem[]) => {
        return contents.slice().sort((a, b) => b.likes - a.likes);
    };

    return (
      
           
                
                <MainContainer paddingLeft={pL}>
               
                {Object.entries(userData).map(([key, innerContents]) => (
                    <StyledSmallBox key={key}>
                        <TitleContainer>{key}</TitleContainer>
                        <InnerContainer>
                            {sortInnerContents(innerContents).map((userContent, index) => (
                                <InnerBox key={index} likes={userContent.likes}>
                                    <UserInfoContainer>
                                        {/* Render user information here */}
                                    </UserInfoContainer>
                                </InnerBox>
                            ))}
                        </InnerContainer>
                    </StyledSmallBox>
                ))}
           
             </MainContainer>
        
       
    );
};

export default App;
