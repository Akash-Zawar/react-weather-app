import "./App.css";
import Search from "./Components/Search/search";
import CurrentWeather from "./Components/Current_Weather/currentWeather";
import { weatherKey, weatherUrl } from "./Components/Search/api";
import { useState } from "react";
import Forecast from "./Components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${weatherUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=metric`
    );

    const forecastFetch = fetch(
      `${weatherUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log({ currentWeather });
  console.log({ forecast });
  return (
    <>
      <div>
        <h1>Weather Forecast App</h1>
      </div>
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
    </>
  );
}

export default App;
