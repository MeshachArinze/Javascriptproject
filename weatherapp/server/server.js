const express = require("express");

const cors = require('cors');

const axios = require('axios');

require("dotenv").config()

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: true}));

app.get("/weather", (req, res) => {
    const { lat, lng } = req.query
    axios.get("https://api.openweathermap.org/data/2.5/onecall", {
      params: {
        lat,
        lon,
        appid: process.env.API_KEY,
        units: "imperial",
        exclude: "minutely,alerts",
      },
    })

    .then(({ data }) => {
        res.json({
          current: parseCurrentWeather(data),
          daily: parseDailyWeather(data),
          hourly: parseHourlyWeather(data),
        })
    })
    .catch(e => {
        console.log(e)
        res.sendStatus(500)
    })
})

function parseCurrentWeather({ current, daily }) {
    const { temp: currentTemp, weather, wind_speed } = current

    const { pop,temp, feels_like} = daily[0];

    return {
      currentTemp: Math.round(currentTemp),
      highTemp: Math.round(temp.max),
      lowTemp: Math.round(temp.min),
      highFeelsLike: Math.round(Math.max(...Object.values(feels_like))),
      lowFeelsLike: Math.round(Math.min(...Object.values(feels_like))),
      windSpeed: Math.round(wind_speed),
      precip: Math.round(pop * 100),
      icon: weather[0].icon,
      description: weather[0].description,
    };
}

function parseDailyWeather({ daily }) {
  return daily.slice(1).map((day) => {
    return {
      timestamp: day.dt * 1000,
      icon: day.weather[0].icon,
      temp: Math.round(day.temp.day),
    };
  });
}