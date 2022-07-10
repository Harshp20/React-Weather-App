import { useState } from 'react'
import './WeatherUI.scss'

export type Weather = {
  weather_mood: string,
  temperature: string,
  feels_like: string,
  temp_min: string,
  temp_max: string,
  pressure: string,
  humidity: string,
  visibility: string,
  wind_speed: string,
  wind_direction_deg: string,
  country: string,
  city: string
}

interface WeatherProps {
  weatherData: Weather
}

const WeatherUI: React.FC<WeatherProps> = ({ weatherData }) => {
  const [weatherMood, setWeatherMood] = useState('wi wi-day-cloudy')

  const {
    weather_mood,
    temperature,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    visibility,
    wind_speed,
    wind_direction_deg,
    country,
    city
  } = weatherData

  return (
    <div className="widget">
      <div className="weatherIcon"><i className={weatherMood}></i></div>
      <div className="weather-info-date-container">
        <div className="weatherInfo">
          <div className="temperature"><span>{temperature}&deg;</span></div>
          <div className="description">
            <div className="place-weather-mood">
              <div className="weather-mood">{weather_mood}</div>
              <div className="place">{city}, {country}</div>
            </div>
            <div className="vertical-separator-white"></div>
            <div className="weather-condition">
              <div className="weather-condition-feels-like">Feels like</div>
              <div className='weather-condition-text'>{feels_like}&deg;</div>
            </div>
          </div>
        </div>
        <div className="date">
          {new Date().toLocaleString().split(',')[0]}
        </div>
      </div>
      <div className="weatherIcon-2">
        <div className="weatherIcon-2-child">
          <div className="wi-time-9 icon"></div>
          <div className="text">
            <div className="text-primary">
              <span>
                {`${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`}
              </span>
              <span className="text-secondary">
                {(new Date().toLocaleString().slice(-2))}
              </span>
            </div>
          </div>
        </div>
        <div className="vertical-separator-purple"></div>
        <div className="weatherIcon-2-child">
          <div className="wi-barometer icon"></div>
          <div className="text">
            <div className="text-primary">{pressure}<span className="text-secondary">hPa</span></div>
          </div>
        </div>
        <div className="vertical-separator-purple"></div>
        <div className="weatherIcon-2-child">
          <div className="wi-humidity icon"></div>
          <div className="text">
            <div className="text-primary" style={{ marginLeft: '-35px' }}>{humidity}<span className='text-secondary'>%</span></div>
          </div>
        </div>
        <div className="vertical-separator-purple"></div>
        <div className="weatherIcon-2-child">
          <div className="wi-strong-wind icon"></div>
          <div className="text">
            <div className="text-primary">{wind_speed}<span className="text-secondary">Kmph</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherUI