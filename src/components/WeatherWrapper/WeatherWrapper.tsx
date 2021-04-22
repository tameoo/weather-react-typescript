import React, { useEffect, useState } from 'react';
import { fetchForecastWeatherCoords } from '../../services';
import {Highlight} from '../Highlight';
import {WeatherList} from '../WeatherList';
import {Spinner} from '../Spinner';
import { filterHighlight } from '../../helper';

interface WeatherWrapperProps{
    coords: {
        lat: number | null,
        lon : number | null
    },
    toggleTemp: string
}

const WeatherWrapper:React.FC<WeatherWrapperProps> = ({coords, toggleTemp}) => {
    const [highlight, seHighlight] = useState<number>(0);
    const [forecastWeather, setForecastWeather] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            setForecastWeather(await fetchForecastWeatherCoords(coords));
        }
        fetchData();
    },[coords]);

    const OnSetHighlight = (index: number) => {
        seHighlight(index);
    }

    return (
        forecastWeather ? (
            <>
                <WeatherList toggleTemp={toggleTemp} forecastWeather={forecastWeather} OnSetHighlight={OnSetHighlight}/>
                <Highlight forecastWeather={filterHighlight(forecastWeather,highlight)}/>
            </>
        ) : <Spinner /> 
    );
}

export {WeatherWrapper};


    
