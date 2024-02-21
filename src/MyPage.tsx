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


const MyPage = () => {
    return (
        <MyPageContaine>
            <MyPageContent>
                <MyPageTop>
                    <MPTphoto><AiOutlineUser size="140" /></MPTphoto>
                    <div>
                        <MPTname>이름</MPTname>
                        <div>#뭐시기</div>
                    </div>
                    <MPTbutton>내 정보 수정</MPTbutton>
                    </MyPageTop>
                <MyPageBottom>
                    <MPBwrite><Link to="/">내가 쓴 글 목록 </Link></MPBwrite>
                    <div className="MP_b_friend">
                        <div>내 친구들 </div>
                        <MPBfriendContent>
                            <div>친구 이름</div>
                            <MPBfriendContentButton>친구 삭제</MPBfriendContentButton>
                            </MPBfriendContent>
                            <MPBfriendContent>
                            <div>친구 이름</div>
                            <MPBfriendContentButton>친구 삭제</MPBfriendContentButton>
                            </MPBfriendContent>
                        <MPBfriendContent>
                            <div>친구 이름</div>
                            <MPBfriendContentButton>친구 삭제</MPBfriendContentButton>
                            </MPBfriendContent>
                    </div>
                </MyPageBottom>
            </MyPageContent>
        </MyPageContaine>
    );
}

export default MyPage;
