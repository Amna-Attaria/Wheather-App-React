import React, { useRef, useState } from 'react';
import './Wheather.css';
import axios from 'axios';

const Wheather = () => {
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState([]);

  const getCityName = async () => {
    const cityName = inputRef.current.value.trim();
    const apiKey = "2bc5d900ba1a9c87e86dbaee55a2f391";

    if (!cityName) {
      console.error("City name is required!");
      return;
    }

    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      console.log("Weather Data:", result.data);

      // Update the weatherData array with the new result
      setWeatherData((prevData) => [result.data, ...prevData]);
    } catch (e) {
      console.error("Error fetching weather data:", e.response?.data || e.message);
    }
  };

  return (
    <>
      <h1 className="heading">Find Weather</h1>
      <div className="inputdiv">
        <input
          type="text"
          placeholder="Enter City Name....."
          className="input"
          ref={inputRef}
        />
        <button className="btn" onClick={getCityName}>
          Find
        </button>
      </div>

      {/* Render Weather Data */}
      <div>
        {weatherData.length > 0 ? (
          weatherData.map((data, index) => (
            <div className="center" key={index}>
              <h3>Wheather in  {data.name}</h3>
              <p>Country : {data.sys.country}</p>
              <p>Temperature : {data.main.temp}°C</p>
              <p>Feels Like : {data.main.feels_like}°C</p>
              <p>Humidity : {data.main.humidity}%</p>
            </div>
          ))
        ) : (
    ""
        )}
      </div>
    </>
  );
};

export default Wheather;
