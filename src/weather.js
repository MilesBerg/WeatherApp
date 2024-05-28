// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.css';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import clearImage from './images/sun.png';
import cloudyImage from './images/cloudy.png';
import rainImage from './images/rain.png';
import thunderstormImage from './images/thunderstorm.png';

const API_KEY = '3e713af95d3d7836e126ee8fa584d246';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);

  useEffect(() => {
    if (city !== '') {
      fetchWeather(city);
    }
  }, [city]);

  const fetchWeather = async (city) => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
      );
      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`
      );

      const currentTime = new Date().getTime() / 1000; 
      const next12HoursForecast = forecastResponse.data.list.filter(
        (data) => data.dt >= currentTime && data.dt <= currentTime + 12 * 3600
      );
      setHourlyForecast(next12HoursForecast);

 
      const dailyForecastData = [];
      for (let i = 4; i < forecastResponse.data.list.length; i += 8) {
        dailyForecastData.push(forecastResponse.data.list[i]);
      }
      setDailyForecast(dailyForecastData.slice(0, 7)); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const getWeatherImage = (condition) => {
    switch (condition) {
      case 'Clear':
        return clearImage;
      case 'Clouds':
        return cloudyImage;
      case 'Rain':
        return rainImage;
      case 'Thunderstorm':
        return thunderstormImage;
      case 'Haze':
        return rainImage;
      case 'Mist':
        return rainImage;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>MyForecast</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleCityChange} placeholder="Enter city" />
        <button type="submit">Get Weather</button>
      </form>

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <img src={getWeatherImage(weather.weather[0].main)} alt={weather.weather[0].description} />
          <p>{weather.main.temp}°</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Conditions: {weather.weather[0].description}</p>
        </div>
      )}

      {hourlyForecast.length > 0 && <HourlyForecast hourlyForecast={hourlyForecast} />}
      {dailyForecast.length > 0 && <DailyForecast dailyForecast={dailyForecast} />}
    </div>
  );
}

export default App;
