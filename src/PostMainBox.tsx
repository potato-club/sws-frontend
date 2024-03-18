import styled from "styled-components";
import { useState} from 'react';
import PostMainBoxForm from "./PostMainBoxForm";


const PostMainBox =()=>{
    const [error, setError] = useState<string>("");
  
   const handleSubmit= (cafeName:String,cafeInfo: string, images:File[])=>{
    if (!images[0]) {
        setError("이미지를 선택하세요.");
    } else {
        setError("");
        console.log('등록', cafeName, cafeInfo, images);
    }
};
   

    return(
        
        <MainBoxContainer>
        
        <ContainerArea>
          
          <PostMainBoxForm onSubmit={handleSubmit}/>
        
                

              
               
        </ContainerArea>
           
            
            
        </MainBoxContainer>
     
    );

};

export default PostMainBox;

const MainBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContainerArea = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #cac8c8;
  width: 800px;
  min-height: 800px;
  margin-top: 70px;
  padding: 0 0 100px 0;
  text-align: center;
  align-items: center;
`;




