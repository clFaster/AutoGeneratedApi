import React from 'react'
import {Configuration, WeatherForecastApi} from "./generated-api";
import {ApiContext} from './Context/ApiContext';
import {WeatherPage} from "./Components/WeatherPage.tsx";

const App = () => {
    // Generates an instance of the auto-generated WeatherForecastApi Client.
    const api = React.useMemo(() => {
            const config = new Configuration({basePath: "http://localhost:5176"});
            return new WeatherForecastApi(config)
        }
        , [])

    return (
        <ApiContext.Provider value={api}>
            <WeatherPage/>
        </ApiContext.Provider>
    )
}

export default App
