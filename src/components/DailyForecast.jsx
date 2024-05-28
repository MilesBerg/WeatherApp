// DailyForecast.jsx
import React from 'react';
import clearImage from './images/sun.png';
import cloudyImage from './images/cloudy.png';
import rainImage from './images/rain.png';
import thunderstormImage from './images/thunderstorm.png';
import './DailyForecast.css'

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

const DailyForecast = ({ dailyForecast }) => {
  return (
    <div className='daily-forecast'>
      <h2>Daily Weather Forecast for the next 5 days</h2>
      <ul>
        {dailyForecast.map((data, index) => (
          <li key={index}>
            <img src={getWeatherImage(data.weather[0].main)} alt={data.weather[0].description} />
            <strong>{new Date(data.dt * 1000).toLocaleDateString()}</strong>: {data.main.temp}°, {data.weather[0].description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyForecast;
