// pages/WeatherWidgetPage.js
import React, { useState, useEffect } from "react";
import Image from 'next/image';

const WeatherWidgetPage = () => {
    const [weather, setWeather] = useState({});
    const [location, setLocation] = useState('');

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
                setWeather({icon: <Image src={"https:" + weatherData.current.condition.icon} alt={`It is ${weatherData.current.temp_c} in ${location}`} width={80} height={80} />, temperature: weatherData.current.temp_c + "º C"});
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
        <div className=" p-4 border w-fit font-mono border-gray-300 shadow-lg rounded-md text-2xl font-bold ">
            <h1 className="text-xl font-bold  text-app-light mb-1">{`Weather in ${location}`}</h1>
            <div className="flex  items-center">
                <div className="">{weather.icon}</div>
                <div className="text-2xl font-bold text-app-light ">{weather.temperature}</div>
            </div>
        </div>
    );
};

export default WeatherWidgetPage;
