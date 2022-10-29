import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherDetails = (country) => {

    const [temp, setTemp] = useState()
    const [wind, setWind] = useState()
    let capital = country.country.capital[0]
    let country_code = country.country.cca2.toLowerCase()

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
    const ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${capital},${country_code}&appid=${API_KEY}`
    
    console.log(ENDPOINT)
    const [icon, setIcon] = useState('')
    const [iconurl, setIconUrl] = useState('')

    useEffect(() => {
        axios.get(ENDPOINT).then(response => {
            setTemp(response.data.main.temp)
            setWind(response.data.wind.speed) 
            setIcon(response.data.weather[0].icon)
            setIconUrl(`http://openweathermap.org/img/wn/${icon}@2x.png`)
            }   
        )
    })

    return(
        <>
            <h2>Weather in {capital}</h2>
            <p>temperature {temp} Celcius</p>
            <img src={iconurl} alt="icon"/>
            <p>wind {wind} m/s</p>
        </>
    );
}

export default WeatherDetails