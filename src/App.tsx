import { useEffect, useState } from "react";
import axios from "axios";
import WeatherUI from "./components/WeatherUI/WeatherUI";
import "./App.scss";
import { Weather } from "./components/WeatherUI/WeatherUI";
import SearchInput from "./components/SearchInput/SearchInput";

function App() {
  const [weatherData, setWeatherData] = useState({} as Weather);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const errorText = `Couldn't fetch weather data at the moment. Please try again in a while...`;
  const default_city_Name = "Liverpool";

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${default_city_Name}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then(({ data }) => {
        if (showError === true) setShowError(false);
        if (data !== null) {
          setWeatherData(createWeatherObject(data));
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setShowError(true);
        console.error(err);
      });
  }, []);

  const createWeatherObject = (data: any) => {
    const [{ main: weather_mood }] = data.weather;
    const {
      temp: temperature,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
    } = data.main;
    const { visibility } = data;
    const { speed: wind_speed, wind_direction_deg } = data.wind;
    const { country } = data.sys;
    const { name: city } = data;

    const weatherInfo = {
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
    };

    return weatherInfo;
  };

  const handleClick = (searchInput: string) => {
    if (searchInput === "") return;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then(({ data }) => {
        if (showError === true) setShowError(false);
        if (data !== null) {
          setWeatherData(createWeatherObject(data));
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setShowError(true);
        console.error(err);
      });
  };

  return (
    <>
      {isLoading ? (
        <div className="message">Loading...</div>
      ) : showError ? (
        <div className="message">{errorText}</div>
      ) : (
        <>
          <SearchInput handleClick={handleClick} />
          <WeatherUI weatherData={weatherData} />
        </>
      )}
    </>
  );
}

export default App;
