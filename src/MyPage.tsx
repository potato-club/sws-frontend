import React from 'react';
import './MyPage.css';
import {Link} from 'react-router-dom';
import { AiOutlineUser } from "react-icons/ai";
function MyPage() {
    return (
        <div className="Main">
            <div className="MyPage">
                <div className="MyPage1">
                <div className="MyPage_top">
                    <div className="MP_t_photo"><AiOutlineUser size="140"/></div>
                <div>
                    <div className="MP_t_name">이름</div>
                    <div>#뭐시기</div>
                    </div>
               
                 <button className="MP_t_button">내 정보 수정</button>  {/*<button>친구 추가</button> 다른 사람이 봤을때는 친구추가 내가봤을땐 수정 버튼 나중에 할 예정*/}
                
                </div>
                <div className="MyPage_bottom">
                    <div className="MP_b_write"><Link to="/">내가 쓴 글 목록 </Link></div>
                    <div className="MP_b_friend">
                        <div>내 친구들 </div>
                        <div className="MP_b_friend_content">
                            <div>친구 이름</div>
                            <button  className="MP_b_friend_content_button">친구 삭제</button>
                        </div>
                        <div className="MP_b_friend_content">
                            <div>친구 이름</div>
                            <button className="MP_b_friend_content_button">친구 삭제</button>
                        </div>
                        <div className="MP_b_friend_content">
                            <div>친구 이름</div>
                            <button className="MP_b_friend_content_button">친구 삭제</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default MyPage;