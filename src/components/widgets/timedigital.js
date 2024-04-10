import React, { useState, useEffect } from 'react';
import './timedigital.css'; // Import your CSS file for styling

const Clockdigitale = () => {
  const [currentTime, setCurrentTime] = useState('11:11'); // Initial state (replace with actual time if needed)
  const [currentDate, setCurrentDate] = useState('Wednesday, June 15th'); // Initial state (replace with actual date if needed)

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, '0'); // Pad hours with leading zero if needed
      const minutes = date.getMinutes().toString().padStart(2, '0'); // Pad minutes with leading zero if needed
      const formattedTime = `${hours}:${minutes}`;

      const day = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }); // Format date

      setCurrentTime(formattedTime);
      setCurrentDate(day);
    };

    updateTime(); // Update time initially

    const intervalId = setInterval(updateTime, 1000); // Update time every second

    return () => clearInterval(intervalId); // Cleanup function to stop interval on unmount
  }, []);

  return (
    <div class="card">
      <div className=' w-2/4 h-full  p-16 flex justify-center  items-start flex-col '>
      <div class="time-text">
        <div>{currentTime}</div>
        <div class="time-sub-text">divM</div></div>    
      <div class="day-text ">{currentDate}</div>
      </div>
      <div className=' w-2/4 h-full '>
        <div className='  '>
        <img width="48" className='moon'  height="48" src="https://img.icons8.com/sf-regular-filled/100/ffffff/time.png" alt="time"/>      </div>
        <div className=' w-full h-full flex  py-10  px-8   justify-start items-end'>
        <div class="hourglassBackground">
      <div class="hourglassContainer">
        <div class="hourglassCurves"></div>
        <div class="hourglassCapTop"></div>
        <div class="hourglassGlassTop"></div>
        <div class="hourglassSand"></div>
        <div class="hourglassSandStream"></div>
        <div class="hourglassCapBottom"></div>
        <div class="hourglassGlass"></div>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Clockdigitale;
