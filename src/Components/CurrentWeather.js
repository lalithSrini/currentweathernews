import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';


const CurrentWeather = ({ weatherData }) => {
  const { theme } = useTheme();
  const [weatherInfo, setWeatherInfo] = useState({});

  const [date, setdate] = useState("");

  useEffect(() => {
    console.log("meow");
    let weatherdatacurr = JSON.parse(weatherData);


    console.log(weatherData);

    weatherdatacurr = null;


    
    const timestamp = weatherdatacurr?.dt;

    // console.log(timestamp.dt);

    if(timestamp === null)
    {
      return;
    }


    const formattedDate = new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    });

    setdate(formattedDate); // Print in console

    // console.log(formattedDate)


    if (weatherdatacurr) {

      // console.log(weatherdatacurr.weather[0].description);

      setWeatherInfo({

        temperature: weatherdatacurr.main.temp,
        description: weatherdatacurr.weather[0].description,
        name: weatherdatacurr.name,
        icon: weatherdatacurr.weather[0].icon

      });
    }


  }, [weatherData]);



  return (
    <div className="col-12">
      <div
        className={`card ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}
        style={{ color: theme === "light" ? "#333333" : "#202124" }}
      >
        <div className="d-flex justify-content-between">
          <div className="card-body">
            <p>Now</p>
            {weatherInfo.temperature ? (
              <>
                <h2>{weatherInfo.temperature} °C</h2>
                <p>{weatherInfo.description || "Weather description not available"}</p>
                <div>
                  <p>{date}</p>
                </div>
              </>
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>

          <div
            className="card-body"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '4.5vh' }}
          >
            <img
              src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
              alt={theme === "light" ? "Sunlight" : "Sun in Dark Mode"}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      <div
        className={`card ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}
        style={{ textAlign: 'center' }}
      >
        <p>{weatherInfo.name}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
