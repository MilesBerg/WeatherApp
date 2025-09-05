// HourlyForecast.jsx
import React from 'react';
import clearImage from './images/sun.png';
import cloudyImage from './images/cloudy.png';
import rainImage from './images/rain.png';
import thunderstormImage from './images/thunderstorm.png';
import './HourlyForecast.css';

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
    case 'Mist':
      return rainImage;
    default:
      return null;
  }
};

const toTitleCase = (str) => {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const HourlyForecast = ({ hourlyForecast }) => {
  return (
    <div className='hourly-forecast'>

      <ul>
        <h2>Hourly Weather Forecast for the next 12 hours</h2>
        {hourlyForecast.map((data, index) => (
          <li key={index}>
            
            <img src={getWeatherImage(data.weather[0].main)} alt={data.weather[0].description} />
            <p className="time">
              <strong>{new Date(data.dt * 1000).toLocaleTimeString([], { hour: 'numeric', hour12: true })}</strong>
            </p>
            <p className="temp">{Math.round(data.main.temp)}°</p>
            <p className="weather">{toTitleCase(data.weather[0].description)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HourlyForecast;
