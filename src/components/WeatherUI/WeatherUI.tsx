import { useEffect, useState } from "react";
import "./WeatherUI.scss";

export type Weather = {
  weather_mood: string;
  temperature: string;
  feels_like: string;
  temp_min: string;
  temp_max: string;
  pressure: string;
  humidity: string;
  visibility: string;
  wind_speed: string;
  wind_direction_deg: string;
  country: string;
  city: string;
};

interface WeatherProps {
  weatherData: Weather;
}

const WeatherUI: React.FC<WeatherProps> = ({ weatherData }) => {
  const [weatherMood, setWeatherMood] = useState("wi wi-day-cloudy");
  const [timeCounter, setTimeCounter] = useState(new Date().toLocaleTimeString())
  const [time, setTime] = useState('');
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
    city,
  } = weatherData;

  useEffect(() => {
    setTimeout(() => {
      setTimeCounter(new Date().toLocaleTimeString())
      setTime(() => {
        let hours = new Date().getHours()
        const minutes = new Date().toLocaleTimeString().slice(3, 5)
        if(hours > 12) hours -= 12
        return (
          `${String(hours).padStart(2, '0')}:${minutes} ${getAmPm()}`
        )
      })
    }, 1000);

    
  }, [timeCounter]);

  const getAmPm = () => {
    const hours = new Date().getHours()
    if (hours < 12) return "AM";
    else return "PM";
  };

  return (
    <div className="widget">
      <div className="weatherIcon">
        <i className={weatherMood}></i>
      </div>
      <div className="weather-info-date-container">
        <div className="weatherInfo">
          <div className="temperature">
            <span>{temperature}&deg;</span>
          </div>
          <div className="description">
            <div className="place-weather-mood">
              <div className="weather-mood">{weather_mood}</div>
              <div className="place">
                {city}, {country}
              </div>
            </div>
            <div className="weather-condition">
              <div className="weather-condition-feels-like">Feels like</div>
              <div className="weather-condition-text">{feels_like}&deg;</div>
            </div>
          </div>
        </div>
        <div className="date">{new Date().toLocaleDateString()}</div>
      </div>
      <div className="weatherIcon-2">
        <div className="weatherIcon-2-child">
          <div className="wi-time-9 icon"></div>
          <div className="text">
            <div className="text-primary">
              {time.slice(0, 5)}
              <span className="text-secondary">
                {getAmPm()}
              </span>
            </div>
          </div>
        </div>
        <div className="vertical-separator-purple"></div>
        <div className="weatherIcon-2-child">
          <div className="wi-barometer icon"></div>
          <div className="text">
            <div className="text-primary">
              {pressure}
              <span className="text-secondary">hPa</span>
            </div>
          </div>
        </div>
        <div className="vertical-separator-purple"></div>
        <div className="weatherIcon-2-child">
          <div className="wi-humidity icon"></div>
          <div className="text">
            <div className="text-primary" >
              {humidity}
              <span className="text-secondary">%</span>
            </div>
          </div>
        </div>
        <div className="vertical-separator-purple"></div>
        <div className="weatherIcon-2-child">
          <div className="wi-strong-wind icon"></div>
          <div className="text">
            <div className="text-primary">
              {wind_speed}
              <span className="text-secondary">Kmph</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherUI;
