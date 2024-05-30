// DailyForecast.jsx
import React from 'react';
import clearImage from './images/sun.png';
import cloudyImage from './images/cloudy.png';
import rainImage from './images/rain.png';
import thunderstormImage from './images/thunderstorm.png';
import './DailyForecast.css';

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

const toTitleCase = (str) => {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const DailyForecast = ({ dailyForecast }) => {
  return (
    <div className='daily-forecast'>
      <h2>Daily Weather Forecast for the Next 5 Days</h2>
      <ul>
        {dailyForecast.map((data, index) => (
          <li key={index}>
            <img src={getWeatherImage(data.weather[0].main)} alt={data.weather[0].description} />
            <p className='daily-temp'>{Math.round(data.main.temp)}°</p>
            <p className='daily-time'><strong>{new Date(data.dt * 1000).toLocaleDateString([],{ weekday: 'short' })}</strong></p>
            <p className='daily-condition'>{toTitleCase(data.weather[0].description)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyForecast;
