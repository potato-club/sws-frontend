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
background-color: #7ba1da;
font-size:100px;
width:500px;
height:500px;
border-radius:50%;
display:flex;
justify-content:center;
align-items:center;
margin-bottom:50px;
`;
const MakeLeftButton=styled.button`
background-color: #7ba1da;
padding:6px 25px 6px 25px;
border-radius: 15px;
color:white;
border:0;

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
margin-top:100px;
display:flex;
align-items:center;
height:660px;
flex-direction:column;
`;
const MakeRightTitle=styled.div`
background-color: #7ba1da;
width:600px;
max-height:50px;
border-radius:25px;
display:flex;
align-items:center;
justify-content:center;
`;

const MakeRightfriend=styled.div`
display:flex;
justify-content:space-around;
align-items:center;
`;
const MakeRightinput =styled.input`
height:70px;
width:530px;
margin-right:20px;
border-left:0px;
border-top:0px;
border-right:0px;
display:flex;
align-items:center;
`;
const MakeRightbutton =styled.button`
display:flex;
align-items:center;
height:60px;
width:80px;
justify-content:center;
border:0px;
color:white;
border-radius:10px;
background-color:#7ba1da;

`;
const MakeRightCenter=styled.div`
height:550px;
overflow-y: auto;
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
border:0;

border-radius:25px;
background-color: #7ba1da;

&:hover{
    height:110px;
    width:350px;
  transition: 1s;
}
`;



interface MainProps {
    isSidebarOpen: boolean;
}

const Make: React.FC<MainProps> = ({ isSidebarOpen }) =>{
    const [pL, setPL] = useState(0);
const[number,setNumber]=useState(0);

const Click = () => {
   alert("선택 완료");
   
  };
    useEffect(() => {
        const Left = isSidebarOpen ? 200 : 0;
        setPL(Left);
    }, [isSidebarOpen]);


    const plus=()=>{
        setNumber(number+1);
    }
    const minus=()=>{
        setNumber(number-1);
    }
    return (
<>
        <MainContainer paddingLeft={pL}>
           <MakeTop>
                        <MakeLeft>
<MakeLeftNumber>
    {number}
</MakeLeftNumber>
<MakeLeftButtonBox>
    <MakeLeftButton><BiChevronLeft size="40" onClick={minus}/></MakeLeftButton>
        <MakeLeftIn>{number}</MakeLeftIn>
    <MakeLeftButton><BiChevronRight size="40"  onClick={plus}/></MakeLeftButton>
</MakeLeftButtonBox>
            
            </MakeLeft>


            <MakeRight>
<MakeRightTitle>
    같이 공부 할 친구를 입력하세요!
</MakeRightTitle>
<MakeRightCenter>
{Array.from({ length: number }).map((_, index) => (
    <MakeRightfriend>
<MakeRightinput/>
<MakeRightbutton  onClick={Click}>확인</MakeRightbutton>
</MakeRightfriend>
 ))}
 </MakeRightCenter>
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