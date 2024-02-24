import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';

const MyPageContaine = styled.div`
    width: 100%;
    height: 880px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MyPageContent = styled.div`
    box-sizing: border-box;
    margin-top: 260px;
    background-color: rgb(155, 154, 154);
    width: 50%;
    height: 1000px;
`;
const MyPageTop = styled.div`
        width: 100%;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: space-around;
`;

const MPTphoto  = styled.div`
width: 150px;
height: 150px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
background-color: aliceblue;
`;
const MPTname  = styled.div`
width: 230px;
height: 40px;
background-color: aliceblue;`;
       
           
      
       
 const MPTbutton= styled.button`
            border-radius: 25px;
            border: none;
            height: 30px;
      
    `;
    const MPBfriendContent  = styled.div`
    
    background-color: aliceblue;
    width: 750px;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 25px;
    padding-left: 25px;
    padding-right: 25px;
    border-radius: 25px;
    `;

const MyPageBottom = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 600px;
    width: 85%;
    margin: 70px;
    `;
const MPBwrite = styled.button`
        width: 200px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
        margin-bottom: 25px;
        background-color: aliceblue;
    `;
const MPBfriendContentButton  = styled.button`
    
        height: 40px;
        width: 80px;
        border-radius: 15px;
        background-color: red;
        border: none;
    `;
const MPBfriendPage=styled.button`
        height: 40px;
        width: 90px;
        border-radius: 15px;
        border: none;

`;

const MPBfriend=styled.div`
overflow-y:auto;
`; 
const MyPage = () => {

    const friend = [
        "테스트하는 인간",
        "늙은 사람",
        "강서쪽 사람",
         ]; 

const friendDelete=()=>{
alert("삭제되었습니다.");

}


    return (
        <MyPageContaine>
            <MyPageContent>
                <MyPageTop>
                    <MPTphoto><AiOutlineUser size="140" /></MPTphoto>
                    <div>
                        <MPTname>이름</MPTname>
                        <div>#강서 #프론트엔드 #웹 개발</div>
                    </div>
                    <MPTbutton>내 정보 수정</MPTbutton>
                    </MyPageTop>
                <MyPageBottom>
                    <MPBwrite><Link to="/">내가 쓴 글 목록 </Link></MPBwrite>
                        <MPBfriend>
                        <div>내 친구들 </div>
                        {[...Array(3)].map((_, index) => (
                        <MPBfriendContent key={index}>
                            <div>{friend[index]}</div>
                            <div>
                            <MPBfriendPage><Link to="/">친구 페이지</Link></MPBfriendPage>
                            <MPBfriendContentButton onClick={friendDelete}>친구 삭제</MPBfriendContentButton>
                            </div>
                            </MPBfriendContent>
))}
                           
                           </MPBfriend>
                </MyPageBottom>
            </MyPageContent>
        </MyPageContaine>
    );
}

export default MyPage;
