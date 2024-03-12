import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';


const StyledSmallBox = styled.div`
    padding: 10px;
    margin: 5px; /* 상단과 하단 여백 */
    height: auto;
    display: flex;
    flex-direction: column; /* 내부에 있는 박스들을 가로로 배치 */
    align-items: flex-start; /* 세로 정렬을 맨 위로 조절 */
`;
 const TitleContainer = styled.div`
    font-size: 15px;
    margin-left: 13px;
    margin-bottom: 20px;
`;

const InnerContainer = styled.div`
    display: flex;
    width: 100%;
    overflow-x: auto; /* Enable horizontal scrolling */
    justify-content: flex-start; /* Adjust alignment based on your preference */
    background-color: #7ba1da;
    border-radius: 50px;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
`;

const InnerBox = styled.div<{ likes: number }>`
    flex: 0 0 auto; /* Prevent flex items from growing and shrinking */
    padding: 10px;
    margin: 15px;
    width: 350px; /* Adjust the width based on your design */
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    position: relative;

    &::after {
        content: '${(props) => (props.likes ? `${props.likes} likes` : '')}';
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: #3f7bd6;
        padding: 10px;
        border-radius: 10px;
    }

    &:hover {
        cursor: pointer;
    }
`;

const UserInfoContainerLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`

const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: auto;

    .hashtags {
        margin-top: 280px;
        color: #333; // 원하는 색상으로 설정
    }
`;
const MainContain = styled.div<{ paddingLeft: number }>`
     padding-top: 70px;
     margin-left: 0; 
     height: 855px;
     padding-left: ${props => props.paddingLeft}px;
 `;

interface UserDataItem {
    likes: number;
    hashtags?: string[]; // 새로운 hashtags 속성 추가
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
            { likes: 30, hashtags: ["#커피", "#디저트","#맛있다"] },
            { likes: 150, hashtags: ["#카공족"] },
            { likes: 10, hashtags: ["#카공족"] },
            { likes: 100 },
            { likes: 10 },
            { likes: 10 },
            { likes: 10 },
            { likes: 10 },

        ],
        
        "카테고리별": [
            { likes: 10 },
            { likes: 10 },
            { likes: 10 },
            { likes: 10 },
            { likes: 10 },
            { likes: 10 },
            
            

        ],
        "친구 구해요!": [
            { likes: 10 },
            { likes: 10}, 
            { likes: 10},  
            { likes: 10 },
            { likes: 10 },
            { likes: 10 },

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
                <MainContain paddingLeft={pL}>
               
                {Object.entries(userData).map(([key, innerContents]) => (
                    <StyledSmallBox key={key}>
                        <TitleContainer>{key}</TitleContainer>
                        <InnerContainer>
                            {sortInnerContents(innerContents).map((userContent, index) => (
                 
                               <InnerBox key={index} likes={userContent.likes}>
                                <UserInfoContainerLink to="/Loungesecond">
                                <UserInfoContainer>
                                    {/* Render user information here */}
                                   
                                    <div className="hashtags">
                                        {/* Render hashtags here */}
                                        {userContent.hashtags && userContent.hashtags.map((tag, tagIndex) => (
                                            <span key={tagIndex}>{tag} </span>
                                        ))}
                                    </div>
                                </UserInfoContainer>
                               </UserInfoContainerLink> 
                            </InnerBox>
                            ))}
                        </InnerContainer>
                    </StyledSmallBox>
                ))}
           
             </MainContain>
        
       
    );
};

export default App;





