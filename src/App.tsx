import { useEffect, useState } from "react";
import axios from "axios";
import WeatherUI from "./components/WeatherUI/WeatherUI";
import { Weather } from "./components/WeatherUI/WeatherUI";
import SearchInput from "./components/SearchInput/SearchInput";
import "./App.scss";

function App() {
  const [weatherData, setWeatherData] = useState({} as Weather);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const errorText = `Couldn't fetch weather data at the moment. Please try again...`;
  const default_city = "Liverpool";

  useEffect(() => {
    getWeatherData(default_city);
  }, []);

  const createWeatherDataObject = (data: any) => {
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

  const getWeatherData = async (searchCity: string) => {
    setIsLoading(true);
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      )
      .then(({ data }) => {
        if (showError === true) setShowError(false);
        if (data !== null) {
          setWeatherData(createWeatherDataObject(data));
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setShowError(true);
        console.error(err);
      });
  };

  const handleClick = (searchInput: string) => {
    if (searchInput === "") return;
    getWeatherData(searchInput);
  };

  return (
    <>
      {showError ? (
        <>
          <div className="message">{errorText}</div>
          <div className="retry" onClick={() => window.location.reload()}>Go back</div>
        </>
      ) : (
        <>
          <SearchInput handleClick={handleClick} />
          <WeatherUI weatherData={weatherData} isLoading={isLoading} />
        </>
      )}
    </>
  );
}

export default App;
