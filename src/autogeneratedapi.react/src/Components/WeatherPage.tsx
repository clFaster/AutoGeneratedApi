import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDays, faCloud, faShuffle} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {WeatherForecast} from "../generated-api";
import {useApi} from "../Context/ApiContext.ts";
import {WeatherForecastComponent} from "./WeatherForecastComponent.tsx";

export const WeatherPage = () => {
    // Once you've successfully registered the API context, it becomes readily accessible and available for use throughout your application.
    const api = useApi();

    const [weatherForecast, setWeatherForecast] = React.useState<WeatherForecast[]>()

    React.useEffect(() => {
        api.getWeatherForecast().then(updatedWeather => setWeatherForecast(updatedWeather))
    }, [api])

    const updateWeather = () => {
        api.getWeatherForecast().then(updatedWeather => setWeatherForecast(updatedWeather))
    }

    return (
        <>
            <div>
                <FontAwesomeIcon icon={faCloud} size="10x"/>
            </div>
            <h1>Auto Generated Weather API Client Example</h1>
            <div className="card">
                <button onClick={updateWeather}>
                    <FontAwesomeIcon icon={faShuffle}/> Not Happy with the weather? Click to change it!
                </button>
                <h3><FontAwesomeIcon icon={faCalendarDays}/> 5-Day Forecast</h3>
                {weatherForecast?.map((weather) =>
                    <WeatherForecastComponent weather={weather}></WeatherForecastComponent>) || <p>...LOADING</p>}
            </div>
            <p className="read-the-docs">
                You can find a step-by-step guide on how to auto-generate a client for React from a .NET API in the
                README
            </p>
        </>
    );
}