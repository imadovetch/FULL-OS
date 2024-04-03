// pages/WeatherWidgetPage.js
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import './add.css';

const WeatherWidgetPage = () => {
    const [weather, setWeather] = useState({});
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                fetchWeather(position.coords.latitude, position.coords.longitude);
                fetchLocation(position.coords.latitude, position.coords.longitude);
            });
        }

        const fetchWeather = async (latitude, longitude) => {
            try {
                const weatherReq = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ee94006c9bb74ce892f181126211305&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`);
                const weatherData = await weatherReq.json();
                setWeather({
                    icon: <Image src={"https:" + weatherData.current.condition.icon} alt={`It is ${weatherData.current.temp_c} in ${location}`} width={100} height={100} />,
                    temperature: weatherData.current.temp_c + "º C",
                    condition: weatherData.current.condition.text
                });
                const formatDate = (dateString) => {
                    const date = new Date(dateString);
                    const options = { day: 'numeric', month: 'short' };
                    return date.toLocaleDateString('en-US', options);
                  };
                  
                  // Utilisation :
                  setDate(formatDate(weatherData.forecast.forecastday[0].date));
            } catch (error) {
                console.error("Weather API error:", error);
            }
        };

        const fetchLocation = async (latitude, longitude) => {
            try {
                const locationReq = await fetch(`https://api.weatherapi.com/v1/current.json?key=ee94006c9bb74ce892f181126211305&q=${latitude},${longitude}`);
                const locationData = await locationReq.json();
                setLocation(locationData.location.name);
            } catch (error) {
                console.error("Location API error:", error);
            }
        };
    }, []);

    return (
        <div className=" h-full  relative border w-full overflow-hidden font-mono border-gray-300 shadow-lg rounded-2xl text-2xl font-bold ">
            <article class="widget">
                <div class="weatherIcon">{weather.icon}</div>
                <div class="weatherInfo">
                    <div class="temperature border-r-2  border-app--dark  border-dashed"><span>{weather.temperature}</span></div>
                    <div class="description border-r-2  border-app--dark border-dashed rounded-xl" >    
                        <div class="weatherCondition">{weather.condition}</div>    
                        <div class="place">{"Morocco, " + location}</div>
                    </div>
                </div>
                <div class="date">{date}</div>
            </article>
        </div>
    );
};

export default WeatherWidgetPage;
