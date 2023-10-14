import {WeatherForecast} from "../generated-api";
import dayjs from 'dayjs';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTemperatureThreeQuarters} from "@fortawesome/free-solid-svg-icons/faTemperatureThreeQuarters";

interface WeatherForecastProps {
    weather: WeatherForecast
}

export const WeatherForecastComponent = (weatherForecastProps: WeatherForecastProps) => {
    return (
        <div>
            <p>{dayjs(weatherForecastProps.weather.date).format('DD/MM/YYYY')} - {weatherForecastProps.weather.summary} {weatherForecastProps.weather.temperatureC}
                <FontAwesomeIcon icon={faTemperatureThreeQuarters}/></p>
        </div>
    )
}