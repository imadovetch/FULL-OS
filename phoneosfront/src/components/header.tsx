"use client"
import  { useState } from 'react';

export function Header() {
    const [topBarHeight, setTopBarHeight] = useState(8);

    function showFastServices() {
        setTopBarHeight((prevHeight) => (prevHeight === 8 ? 80 : 8));
    }

    const topBarStyle = `h-${topBarHeight} topbarre`;

    return (
        <div onClick={showFastServices} className={topBarStyle}>
           
        </div>
    );
}
