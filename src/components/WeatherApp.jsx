import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = '3903a397badfb1861c46fdfca9fb56d2'; 

  const fetchWeather = async (e) => {
    e.preventDefault();
    
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    setWeatherData(null);

 const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;


    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('City not found. Please try again.');
      } else {
        setError('Failed to fetch data.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="weather-container">
      <div className="left-content">
        <header className="weather-header">
          <h1>Weather Report</h1>
          <p>I can give you a weather report about your city !</p>
        </header>

        <section className="search-section">
          <form onSubmit={fetchWeather} className="search-form">
            <input
              type="text"
              placeholder="Enter your City Name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Get Report
            </button>
          </form>
        </section>

        {loading && <p className="status-message">Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        <article className="weather-card">
          <div className="info-row">
            <span className="info-label">Weather:</span>
            <span className="info-value">
              {weatherData ? weatherData.weather[0].main : ''}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Temperature:</span>
            <span className="info-value">
              {weatherData ? `${Math.round(weatherData.main.temp)}°C` : ''}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Description:</span>
            <span className="info-value">
              {weatherData ? weatherData.weather[0].description : ''}
            </span>
          </div>
        </article>
      </div>

      <div className="right-content">
        <div className="play-button">▶</div>
      </div>
    </main>
  );
};

export default WeatherApp;
