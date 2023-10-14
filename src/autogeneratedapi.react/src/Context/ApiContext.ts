import React from "react";
import {WeatherForecastApi} from "../generated-api";
export const ApiContext = React.createContext<WeatherForecastApi>({} as WeatherForecastApi)

export const useApi = () => React.useContext(ApiContext);