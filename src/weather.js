import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.css';
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

      const next24HoursForecast = forecastResponse.data.list.filter(
        (data, index) => index < 12
      );
      setHourlyForecast(next24HoursForecast);

      const next7DaysForecast = forecastResponse.data.list.filter(
        (data, index) => index % 8 === 0 && index !== 0
      );
      setDailyForecast(next7DaysForecast);
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
      case 'Storm':
        return thunderstormImage;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleCityChange} placeholder="Enter city" />
        <button type="submit">Get Weather</button>
      </form>

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <img src={getWeatherImage(weather.weather[0].main)} alt={weather.weather[0].description} />
          <p>Temperature: {weather.main.temp}°F</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Conditions: {weather.weather[0].description}</p>
        </div>
      )}

      {hourlyForecast.length > 0 && (
        <div>
          <h2>Hourly Weather Forecast for the next 24 hours</h2>
          <ul>
            {hourlyForecast.map((data, index) => (
              <li key={index}>
                <img src={getWeatherImage(data.weather[0].main)} alt={data.weather[0].description} />
                <strong>{new Date(data.dt * 1000).toLocaleTimeString()}</strong>: {data.main.temp}°F, {data.weather[0].description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {dailyForecast.length > 0 && (
        <div>
          <h2>Daily Weather Forecast for the next 7 days</h2>
          <ul>
            {dailyForecast.map((data, index) => (
              <li key={index}>
                <img src={getWeatherImage(data.weather[0].main)} alt={data.weather[0].description} />
                <strong>{new Date(data.dt * 1000).toLocaleDateString()}</strong>: {data.main.temp}°F, {data.weather[0].description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
