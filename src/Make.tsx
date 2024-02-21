import React , { useState, useEffect }from 'react';
import styled from 'styled-components';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
const MainContainer = styled.div<{ paddingLeft: number }>`
     padding-top: 70px;
     margin-left: 0; 
   
     height: 875px;
     display:flex;
     flex-direction:column;
     padding-left: ${props => props.paddingLeft}px;
 `;
const MakeTop=styled.div`
display:flex;
width:100%;
height:90%;

`;
const MakeLeft=styled.div`
width:50%;
height:90%;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;

`;
const MakeLeftNumber=styled.div`
background-Color:gray;
width:500px;
height:500px;
border-radius:50%;
display:flex;
justify-content:center;
align-items:center;
margin-bottom:50px;
`;
const MakeLeftButton=styled.button`
background-color:gray;
padding:12px;

`;
const MakeLeftIn=styled.div`
padding:12px;
display:flex;
align-items:center;
justify-content:center;
width:100px;
font-size:40px;
`;

const MakeLeftButtonBox=styled.div`
display:flex;
`;

const MakeRight=styled.div`
width:50%;
display:flex;
align-items:center;
justify-content:center;
height:80%;
flex-direction:column;
`;
const MakeRightTitle=styled.div`
background-color:gray;
width:700px;
height:50px;
border-radius:25px;
display:flex;
align-items:center;
justify-content:center;
`;
const MakeRightFriend =styled.div`
height:70px;
display:flex;
align-items:center;
`;

const MakeBottom=styled.div`
width:100%;
height:15%;
display:flex;

justify-content:center;
align-items:center;
`;
const MakeBottomButton=styled.button`
padding:30px 70px 30px 70px;
font-size:30px;
border-radius:25px;
background-color:gray;
`;



interface MainProps {
    isSidebarOpen: boolean;
}

const Make: React.FC<MainProps> = ({ isSidebarOpen }) =>{
    const [pL, setPL] = useState(0);

    useEffect(() => {
        const Left = isSidebarOpen ? 200 : 0;
        setPL(Left);
    }, [isSidebarOpen]);
    return (
<>
        <MainContainer paddingLeft={pL}>
           <MakeTop>
                        <MakeLeft>
<MakeLeftNumber>
    1
</MakeLeftNumber>
<MakeLeftButtonBox>
    <MakeLeftButton><BiChevronLeft size="40" /></MakeLeftButton>
        <MakeLeftIn>1</MakeLeftIn>
    <MakeLeftButton><BiChevronRight size="40" /></MakeLeftButton>
</MakeLeftButtonBox>
            
            </MakeLeft>
            <MakeRight>
<MakeRightTitle>
    같이 공부 할 친구를 입력하세요!
</MakeRightTitle>
<MakeRightFriend>
    아이디를 입력하세요
</MakeRightFriend>
<MakeRightFriend>
    asdsdasas
</MakeRightFriend>
<MakeRightFriend>
    asdsdasas
</MakeRightFriend>
<MakeRightFriend>
    asdsdasas
</MakeRightFriend>
            </MakeRight>
            </MakeTop>

            <MakeBottom>
            <MakeBottomButton>중간 장소 확인</MakeBottomButton>
         </MakeBottom>
        </MainContainer>
        
         </>
    );
}

export default Make;