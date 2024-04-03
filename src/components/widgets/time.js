import React, { useEffect } from 'react';
import './time.css';

const Clock = () => {
  useEffect(() => {
    const dialLines = document.getElementsByClassName('diallines');
    const clockEl = document.getElementsByClassName('clock')[0];

    for (let i = 1; i < 60; i++) {
      clockEl.innerHTML += "<div class='diallines'></div>";
      dialLines[i].style.transform = "rotate(" + 6 * i + "deg)";
    }

    const updateClock = () => {
      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      const d = new Date();
      const h = d.getHours();
      const m = d.getMinutes();
      const s = d.getSeconds();
      const date = d.getDate();
      let month = d.getMonth() + 1;
      const year = d.getFullYear();

      let hDeg = h * 30 + m * (360 / 720);
      let mDeg = m * 6 + s * (360 / 3600);
      const sDeg = s * 6;

      const hEl = document.querySelector('.hour-hand');
      const mEl = document.querySelector('.minute-hand');
      const sEl = document.querySelector('.second-hand');
      const dateEl = document.querySelector('.date');
      const dayEl = document.querySelector('.day');

      const day = weekday[d.getDay()];

      if (month < 9) {
        month = "0" + month;
      }

      hEl.style.transform = "rotate(" + hDeg + "deg)";
      mEl.style.transform = "rotate(" + mDeg + "deg)";
      sEl.style.transform = "rotate(" + sDeg + "deg)";
      dateEl.innerHTML = date + "/" + month + "/" + year;
      dayEl.innerHTML = day;
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="clock">
      <div>
        <div className="info date"></div>
        <div className="info day"></div>
      </div>
      <div className="dot"></div>
      <div>
        <div className="hour-hand"></div>
        <div className="minute-hand"></div>
        <div className="second-hand"></div>
      </div>
      <div>
        <span className="h3">3</span>
        <span className="h6">6</span>
        <span className="h9">9</span>
        <span className="h12">12</span>
      </div>
      <div className="diallines"></div>
    </div>
  );
};

const Home = () => {
  return (
    <Clock />
  );
};

export default Home;
