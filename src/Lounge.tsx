import React, { useEffect, useState }from 'react';
interface MainProps {
    isSidebarOpen: boolean;
}
const Lounge: React.FC<MainProps> = ({ isSidebarOpen }) => {
    const [pL, setPL] = useState(0);
    useEffect(() => {
        const Left = isSidebarOpen ? 200 : 0;
        setPL(Left);
    }, [isSidebarOpen]);
    return (
        <div className="Main" style={{ paddingLeft: `${pL}px` }}>
            라운지 입니다
        </div>
    );
}

export default Lounge;
