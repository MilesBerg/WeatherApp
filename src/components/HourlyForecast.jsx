// HourlyForecast.jsx
import React from 'react';
import clearImage from './images/sun.png';
import cloudyImage from './images/cloudy.png';
import rainImage from './images/rain.png';
import thunderstormImage from './images/thunderstorm.png';
import './HourlyForecast.css'

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

const HourlyForecast = ({ hourlyForecast }) => {
  return (
    <div className='hourly-forecast'>
      <h2>Hourly Weather Forecast for the next 12 hours</h2>
      <ul>
        {hourlyForecast.map((data, index) => (
          <li key={index}>
            <img src={getWeatherImage(data.weather[0].main)} alt={data.weather[0].description} />
            <strong>{new Date(data.dt * 1000).toLocaleTimeString()}</strong>: {data.main.temp}°, {data.weather[0].description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HourlyForecast;
