import React, { useEffect, useState }from 'react';
import styled from 'styled-components'
interface MainProps {
    isSidebarOpen: boolean;
}
const Lounge: React.FC<MainProps> = ({ isSidebarOpen }) => {
    const [pL, setPL] = useState(0);
    useEffect(() => {
        const Left = isSidebarOpen ? 200 : 0;
        setPL(Left);
    }, [isSidebarOpen]);


    const MainContainer = styled.div<{ paddingLeft: number }>`
    padding-top: 70px;
    margin-left: 0; /* 기본값 */
    height: 855px;
    padding-left: ${props => props.paddingLeft}px;
`;
    return (
        <MainContainer paddingLeft={pL}>
            라운지 입니다
            </MainContainer>
    );
}

export default Lounge;
