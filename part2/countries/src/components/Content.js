import React from "react";
import WeatherDetails from "./WearherDetails";

const Content = ({ country }) => {

    let languages = []

    
        Object.values(country.languages).forEach((val, i) => {
            languages.push(<li key={i}>{val}</li>)
        });
    
    return (
        <>
            <h2>{country.name.common}</h2><br />
            <p><b>Capital:</b> {country.capital}</p>
            <p><b>Area:</b>  {country.area}</p>

            <h3>Languages:</h3>
            <ul>
                {languages}
            </ul>
            {<img src={country.flags.png} alt="Flag" />}
            <WeatherDetails country={country} />
        </>
    )
}

export default Content